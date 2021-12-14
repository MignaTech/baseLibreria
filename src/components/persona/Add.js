import { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import {
  Container,
  Button,
  Input,
  Form,
  Label,
  Col,
  Row,
  Alert,
} from "reactstrap";

class AddPersona extends Component {
  constructor(props) {
    super(props);
    // var token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: "",
      correo: "",
      usuario: "",
      idNivel: "1",
      password: "",
      estado: "",
      niveles: [],
      // token: token,
      isSubmitted: false,
      error: false,
      isCanceled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/nivel")
    .then(res=>res.json())
    .then(nivelJson=>this.setState({niveles: nivelJson}))
  }

  add(e) {
    axios
      .post(
        "http://localhost:5000/api/persona",
        {
          nombre: this.state.nombre,
          apellido: this.state.apellido,
          direccion: this.state.direccion,
          telefono: this.state.telefono,
          correo: this.state.correo,
          usuario: this.state.usuario,
          password: this.state.password,
          idNivel: this.state.idNivel,
          estado: parseInt(this.state.estado),
        }
        // ,{
        //   headers: {
        //     "Content-type": "application/json",
        //     Authorization: `Bearer ${this.state.token}`,
        //   },
        // }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              isSubmitted: true,
              error: false,
            });
          }
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
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: "",
      correo: "",
      usuario: "",
      password:"",
      idNivel: "",
      estado: "",
    });
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
    const {niveles}=this.state;

    return (
      <Container className="App">
        <h4 className="PageHeading">Ingresa informacion de Persona</h4>
        <Alert
          isOpen={this.state.isSubmitted}
          color={!this.state.error ? "success" : "warning"}
          toggle={() => this.setState({ isSubmitted: false })}
        >
          {!this.state.error
            ? "Information was saved!"
            : "An error occurs while trying to save information"}
        </Alert>
        <Form inline>
          <Row>
            <Col md={{ offset: 4, size: 4 }} sm="12">
              <Label>Persona</Label>
              <Input
                type="text"
                name="nombre"
                onChange={this.handleChange}
                value={this.state.nombre}
              />
              <Label>Apellido</Label>
              <Input
                type="text"
                name="apellido"
                onChange={this.handleChange}
                value={this.state.apellido}
              />
              <Label>Dirección</Label>
              <Input
                type="text"
                name="direccion"
                onChange={this.handleChange}
                value={this.state.direccion}
              />
              <Label>Telefono</Label>
              <Input
                type="text"
                name="telefono"
                onChange={this.handleChange}
                value={this.state.telefono}
              />
              <Label>Correo</Label>
              <Input
                type="email"
                name="correo"
                onChange={this.handleChange}
                value={this.state.correo}
              />
              <Label>Usuario</Label>
              <Input
                type="text"
                name="usuario"
                onChange={this.handleChange}
                value={this.state.usuario}
              />
              <Label>Contraseña</Label>
              <Input
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <Label>Nivel</Label>
              <select
                className="form-control"
                name="idNivel"
                onChange={this.handleChange}
              >
                {niveles.map((areas,i)=>
                  <option value={areas.idNivelUser} key={i}>{areas.nombre}</option>
                )}
              </select>
              <Label>Estado</Label>
              <select
                className="form-control"
                name="estado"
                onChange={this.handleChange}
              >
                <option defaultValue value="1">
                  Activo
                </option>
                <option value="0">Inactivo</option>
              </select>
            </Col>
            <center className="pt-3">
              <Button color="primary" onClick={this.add}>
                Añadir
              </Button>{" "}
              <Button color="secondary" onClick={this.cancel}>
                Cancel
              </Button>
            </center>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default AddPersona;
