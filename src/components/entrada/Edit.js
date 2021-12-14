import { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import {
  Container,
  Button,
  Label,
  Input,
  Form,
  Col,
  Row,
  Alert,
} from "reactstrap";

class EditEntrada extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idProd: "",
      fecha: "",
      idLibro: "",
      libro: "",
      cantidad: "",
      libros: [],
      // token: token,
      error: false,
      isSubmitted: false,
      isCanceled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch("http://localhost:5000/api/libro")
      .then((res) => res.json())
      .then((libroJson) => this.setState({ libros: libroJson }));
    axios
      .get(`http://localhost:5000/api/entradaproductos/${id}`, {
        headers: {
          "Content-type": "application/json",
          // Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then(
        (response) => {
          if (response.status === 200) {
            const data = response.data;
            this.setState({
              idProd: id,
              fecha: data.fecha.substr (0, 10),
              idLibro: data.idLibro,
              libro: data.libro,
              cantidad: data.cantidad,
            });
          }
        },
        (error) => {
          if (error.response.status === 401) {
            console.log("Token falso");
            // localStorage.removeItem("ACCESS_TOKEN");
            // this.setState({
            //   token: "",
            // });
          }
        }
      );
  }

  add() {
    axios
      .put(
        `http://localhost:5000/api/entradaproductos/${this.state.idProd}`,
        {
          fecha: this.state.fecha,
          idLibro: this.state.idLibro,
          cantidad: this.state.cantidad,
        },
        {
          headers: {
            "Content-type": "application/json",
            // Authorization: `Bearer ${this.state.token}`,
          },
        }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              isSubmitted: true,
              error: false,
            });
          }
          console.log(response);
        },
        (error) => {
          this.setState({
            isSubmitted: true,
            error: true,
          });
          console.log(error);
        }
      );
  }

  cancel(e) {
    this.setState({
      isCanceled: true,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
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

    if (this.state.isCanceled) {
      return (
        <Redirect
          to={{
            pathname: "/ListEntrada",
            state: {
              from: this.props.location,
            },
          }}
        />
      );
    }
    const {libros}=this.state;

    return (
      <Container className="App">
        <h4 className="PageHeading">Editar Informacion de Entrada producto</h4>
        <Alert
          isOpen={this.state.isSubmitted}
          color={!this.state.error ? "success" : "warning"}
          toggle={() => this.setState({ isSubmitted: false })}
        >
          {!this.state.error
            ? "Information was saved!"
            : "An error occurs while trying to update information"}
        </Alert>
        <Form inline>
          <Row>
            <Col md={{ offset: 4, size: 4 }} sm="12">
              <Label>Fecha</Label>
              <Input
                type="date"
                name="fecha"
                onChange={this.handleChange}
                value={this.state.fecha}
              />
              <Label>Libro</Label>
              <select
                className="form-control"
                name="idLibro"
                onChange={this.handleChange}
              >
                <option value={this.state.idLibro}>{this.state.libro}</option>
                {libros.map((e, i) => (
                  <option value={e.idLibro} key={i}>
                    {e.titulo}
                  </option>
                ))}
              </select>

              <Label>Cantidad</Label>
              <Input
                type="text"
                name="cantidad"
                onChange={this.handleChange}
                value={this.state.cantidad}
              />
            </Col>
            <center className="pt-3">
              <Button color="warning" onClick={this.add}>
                Editar
              </Button>{" "}
              <Button color="secondary" onClick={this.cancel}>
                Cancelar
              </Button>
            </center>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default EditEntrada;
