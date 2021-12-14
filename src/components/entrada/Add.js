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

class AddEntrada extends Component {
  constructor(props) {
    super(props);
    // var token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idProd: "",
      fecha: "",
      idLibro: "1",
      cantidad: "",
      libros: [],
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
    fetch("http://localhost:5000/api/libro")
    .then(res=>res.json())
    .then(libroJson=>this.setState({libros: libroJson}))
  }

  add(e) {
    axios
      .post(
        "http://localhost:5000/api/entradaproductos",
        {
          fecha: this.state.fecha,
          idLibro: this.state.idLibro,
          cantidad: this.state.cantidad,
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
      fecha: "",
      idLibro: "",
      cantidad: "",
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
        <h4 className="PageHeading">Ingresa informacion de Entrada producto</h4>
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
                {libros.map((e, i) => (
                  <option value={e.idLibro} key={i}>
                    {e.titulo}
                  </option>
                ))}
              </select>
              <Label>Cantidad</Label>
              <Input
                type="number"
                name="cantidad"
                onChange={this.handleChange}
                value={this.state.cantidad}
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

export default AddEntrada;
