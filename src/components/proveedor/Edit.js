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

class EditProve extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idProv: "",
      idEditorial: "",
      editorial: "",
      nombre: "",
      telefono: "",
      direccion: "",
      correo: "",
      editoriales: [],
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
    fetch("http://localhost:5000/api/editorial")
      .then((res) => res.json())
      .then((editoJson) => this.setState({ editoriales: editoJson }));
    axios
      .get(`http://localhost:5000/api/prove/${id}`, {
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
              idProv: id,
              idEditorial: data.idEditorial,
              editorial: data.editorial,
              nombre: data.nombre,
              telefono: data.telefono,
              direccion: data.direccion,
              correo: data.correo,
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
        `http://localhost:5000/api/prove/${this.state.idProv}`,
        {
          idEditorial: this.state.idEditorial,
          nombre: this.state.nombre,
          telefono: this.state.telefono,
          direccion: this.state.direccion,
          correo: this.state.correo,
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
            pathname: "/ListProveedor",
            state: {
              from: this.props.location,
            },
          }}
        />
      );
    }
    const { editoriales } = this.state;

    return (
      <Container className="App">
        <h4 className="PageHeading">Editar Informacion de Proveedor</h4>
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
              <Label>Editorial</Label>
              <select
                className="form-control"
                name="idEditorial"
                onChange={this.handleChange}
              >
                <option value={this.state.idEditorial}>{this.state.editorial}</option>
                {editoriales.map((e, i) => (
                  <option value={e.idEditorial} key={i}>
                    {e.nombre}
                  </option>
                ))}
              </select>
              <Label>Nombre</Label>
              <Input
                type="text"
                name="nombre"
                onChange={this.handleChange}
                value={this.state.nombre}
              />
              <Label>Telefono</Label>
              <Input
                type="text"
                name="telefono"
                onChange={this.handleChange}
                value={this.state.telefono}
              />
              <Label>Dirección</Label>
              <Input
                type="text"
                name="direccion"
                onChange={this.handleChange}
                value={this.state.direccion}
              />
              <Label>Correo</Label>
              <Input
                type="email"
                name="correo"
                onChange={this.handleChange}
                value={this.state.correo}
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

export default EditProve;
