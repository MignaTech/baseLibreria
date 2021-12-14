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

class EditPersona extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idPersona: '',
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      correo: '',
      usuario: '',
      password: '',
      idNivel: "",
      nivel: "",
      estado: "",
      niveles: [],
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
    fetch("http://localhost:5000/api/nivel")
      .then((res) => res.json())
      .then((nivelJson) => this.setState({ niveles: nivelJson }));
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
              nivel: data.nivel,
              password: data.password,
              estado: data.estado === "1" ? 1 : 0,
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
        `http://localhost:5000/api/persona/${this.state.idPersona}`,
        {
          nombre: this.state.nombre,
          apellido: this.state.apellido,
          direccion: this.state.direccion,
          telefono: this.state.telefono,
          correo: this.state.correo,
          usuario: this.state.usuario,
          idNivel: this.state.idNivel,
          password: this.state.password,
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
        <h4 className="PageHeading">Editar Informacion de Persona</h4>
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
              <Label>Nombre</Label>
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
                <option value={this.state.idNivel}>{this.state.nivel}</option>
                {niveles.map((ni,i)=>
                <option value={ni.idNivelUser} key={i}>{ni.nombre}</option>
                )}
              </select>

              <Label>Estado</Label>
              <select
                className="form-control"
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

export default EditPersona;
