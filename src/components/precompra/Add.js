import { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import {
  Container,
  Button,
  Input,
  Form,
  Label,
  Col,Row,
  Alert,
} from "reactstrap";

class AddPre extends Component {
  constructor(props) {
    super(props);
    // var token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idCompra: "",
      idLibro: "",
      cantidad: "",
      estado: "",
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
        "http://localhost:5000/api/precompra",
        {
          idCompra: this.state.idCompra,
          idLibro: this.state.idLibro,
          cantidad: this.state.cantidad,
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
      idCompra: "",
      idLibro: "",
      cantidad: "",
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
            pathname: "/ListPre",
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
        <h4 className="PageHeading">Ingresa informacion de PreCompra</h4>
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
              <Label># Compra</Label>
              <Input
                type="text"
                name="idCompra"
                onChange={this.handleChange}
                value={this.state.idCompra}
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
                type="text"
                name="cantidad"
                onChange={this.handleChange}
                value={this.state.cantidad}
              />
              <Label>Estado</Label>
              <select
                class="form-control"
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

export default AddPre;
