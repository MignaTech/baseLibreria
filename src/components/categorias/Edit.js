import { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import {
  Container,
  Button,
  Label,
  Input,
  Form,
  Col,Row,
  Alert,
} from "reactstrap";

class EditCategoria extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idCategoria: "",
      nombre: "",
      estado: "",
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
    axios
      .get(`http://localhost:5000/api/categorias/${id}`, {
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
              idCategoria: id,
              nombre: data.nombre,
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
      .put(
        `http://localhost:5000/api/categorias/${this.state.idCategoria}`,
        {
          nombre: this.state.nombre,
          estado: parseInt(this.state.estado),
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
            pathname: "/ListCategoria",
            state: {
              from: this.props.location,
            },
          }}
        />
      );
    }

    return (
      <Container className="App">
        <h4 className="PageHeading">Editar Informacion de Categoria</h4>
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
              <Label for="name" sm={2}>
                Categoria
              </Label>
              <Input
                type="text"
                name="nombre"
                onChange={this.handleChange}
                value={this.state.nombre}
              />
              <Label for="name" sm={2}>
                Estado
              </Label>
              <select
                class="form-control"
                name="estado"
                onChange={this.handleChange}
                value={this.state.estado}
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
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

export default EditCategoria;
