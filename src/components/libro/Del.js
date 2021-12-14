import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import {
  Container,
  Button,
  Form,
  Alert,
} from "reactstrap";

export default class DelLibro extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idLibro: '',
      titulo: '',
      autor: '',
      categoria: '',
      editorial: '',
      ejemplares: '',
      costo: '',
      precio: '',
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
      .get(`http://localhost:5000/api/libro/${id}`, {
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
              
              idLibro: id,
              titulo: data.titulo,
              autor: data.autor,
              categoria: data.categoria,
              editorial: data.editorial,
              ejemplares: data.ejemplares,
              costo: data.costo,
              precio: data.precio,
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
        `http://localhost:5000/api/libro/${this.state.idLibro}`,
        {
          nombre: this.state.nombre,
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
            pathname: "/ListLibro",
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
              ¿Estás seguro que deseas eliminar al Libro {this.state.titulo} ?
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
