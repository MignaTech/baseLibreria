import { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import { Container, Table, Alert } from "reactstrap";

class ListEntrada extends Component {
  constructor(props) {
    super(props);
    // var token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      items: [],
      isFetched: false,
      error: null,
      servidor: false,
      // token: token,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/entradaproductos", {
        headers: {
          "Content-type": "application/json",
          // Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then(
        (response) => {
          console.log("Response: " + response.status);
          if (response.status === 200) {
            this.setState({
              items: response.data,
              isFetched: true,
              error: null,
            });
          }
        },
        (error) => {
          if (JSON.parse(JSON.stringify(error)).message === "Network Error") {
            this.setState({ servidor: true });
          } else {
            if (error.response.status === 401) {
              console.log("Falta token");
              // localStorage.removeItem("ACCESS_TOKEN");
              // this.setState({
              //   token: "",
              // });
            }
          }
        }
      );
  }

  render() {
    // if (!this.state.token) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/login",
    //         state: {
    //           from: this.props.location,
    //         },
    //       }}
    //     />
    //   );
    // }
    if (this.state.servidor) {
      return (
        <Redirect
          to={{
            pathname: "/servidor",
            state: {
              from: this.props.location,
            },
          }}
        />
      );
    }
    if (!this.state.isFetched) {
      return (
        <Container>
          <Alert color="primary">Loading....</Alert>
        </Container>
      );
    }
    const items = this.state.items;
    const dateFormatter = (date) => {
      var formatter = new Intl.DateTimeFormat("en-mx", "dd-MM-yyyy");
      return formatter.format(new Date(date));
    };

    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">Fecha</th>
              <th>Libro</th>
              <th className="text-center">Cantidad</th>
              <th colSpan="2" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.idProd}>
                <td className="text-center">{dateFormatter(item.fecha)}</td>
                <td>{item.libro}</td>
                <td className="text-center">{item.cantidad}</td>
                <td className="text-center">
                  <button className="btn btn-warning py-0">
                    <Link
                      className="text-dark text-decoration-none"
                      to={`/EditEntrada/${item.idProd}`}
                    >
                      Editar
                    </Link>
                  </button>{" "}
                </td>
                <td className="text-center">
                  <button className="btn btn-danger py-0">
                    <Link
                      className="text-white text-decoration-none"
                      to={`/DelEntrada${item.idProd}`}
                    >
                      Eliminar
                    </Link>
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default ListEntrada;
