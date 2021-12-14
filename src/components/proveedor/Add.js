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

class AddProve extends Component {
  constructor(props) {
    super(props);
    // var token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idEditorial: "1",
      nombre: "",
      telefono: "",
      direccion: "",
      correo: "",
      editoriales: [],
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
    fetch("http://localhost:5000/api/editorial")
      .then((res) => res.json())
      .then((editoJson) => this.setState({ editoriales: editoJson }));
  }

  add(e) {
    axios
      .post(
        "http://localhost:5000/api/prove",
        {
          idEditorial: this.state.idEditorial,
          nombre: this.state.nombre,
          telefono: this.state.telefono,
          direccion: this.state.direccion,
          correo: this.state.correo,
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
      editorial: "",
      nombre: "",
      telefono: "",
      direccion: "",
      correo: "",
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
        <h4 className="PageHeading">Ingresa informacion del Proveedor</h4>
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
              <Label>Editorial</Label>
              <select
                className="form-control"
                name="idEditorial"
                onChange={this.handleChange}
              >
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

export default AddProve;
