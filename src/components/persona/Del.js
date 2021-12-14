import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import {
  Container,
  Button,
  Form,
  Alert,
} from "reactstrap";

export default class DelAutor extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idAutor: "",
      nombre: "",
      apellido: '',
      direccion: '',
      telefono: '',
      correo: '',
      usuario: '',
      idNivel: '',
      estado: '',
      // token: token,
      error: false,
      isSubmitted: false,
      isCanceled: false,
    };
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:5000/api/persona/${id}`, {
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
              idPersona: id,
              nombre: data.nombre,
              apellido: data.apellido,
              direccion: data.direccion,
              telefono: data.telefono,
              correo: data.correo,
              usuario: data.usuario,
              idNivel: data.idNivel,
              estado: (data.estado === 'Activo') ? 1 : 0,
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
      .delete(
        `http://localhost:5000/api/persona/${this.state.idPersona}`,
        {
          nombre: this.state.nombre,
          apellido: this.state.apellido,
          direccion: this.state.direccion,
          telefono: this.state.telefono,
          correo: this.state.correo,
          usuario: this.state.usuario,
          idNivel: this.state.idNivel,
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

  render() {
    if (this.state.isCanceled) {
      return (
        <Redirect
          to={{
            pathname: "/ListPersona",
            state: {
              from: this.props.location,
            },
          }}
        />
      );
    }

    return (
      <Container className="App">
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
          <center>
            <h5 className="PageHeading text-danger">
              ¿Estás seguro que deseas eliminar a {this.state.nombre} ?
            </h5>
            <div className="pt-3">
              <Button color="danger" onClick={this.add}>
                Eliminar
              </Button>{" "}
              <Button color="secondary" onClick={this.cancel}>
                Cancelar
              </Button>
            </div>
          </center>
        </Form>
      </Container>
    );
  }
}
