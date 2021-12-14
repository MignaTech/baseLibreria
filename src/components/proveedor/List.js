import { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import { Container, Table, Alert } from "reactstrap";

class ListProve extends Component {
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
      .get("http://localhost:5000/api/prove", {
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

    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Editorial</th>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Dirección</th>
              <th>Correo</th>
              <th colSpan="2" className="text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.idProv}>
                <td>{item.editorial}</td>
                <td>{item.nombre}</td>
                <td>{item.telefono}</td>
                <td>{item.direccion}</td>
                <td>{item.correo}</td>
                <td className="text-center">
                  <button className="btn btn-warning py-0">
                    <Link
                      className="text-dark text-decoration-none"
                      to={`/EditProveedor/${item.idProv}`}
                    >
                      Editar
                    </Link>
                  </button>{" "}
                </td>
                <td className="text-center">
                  <button className="btn btn-danger py-0">
                    <Link
                      className="text-white text-decoration-none"
                      to={`/DelProveedor/${item.idProv}`}
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

export default ListProve;
