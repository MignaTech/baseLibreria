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

class EditPre extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idPre: '',
      idCompra: '',
      idLibro: '',
      titulo: '',
      precioUnitario: '',
      cantidad: '',
      precioTotal: '',
      estado: '',
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
      .get(`http://localhost:5000/api/precompra/${id}`, {
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
              idPre: id,
              idCompra: data.idCompra,
              idLibro: data.idLibro,
              titulo: data.titulo,
              cantidad: data.cantidad,
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
        `http://localhost:5000/api/precompra/${this.state.idPre}`,
        {
          idCompra: this.state.idCompra,
          idLibro: this.state.idLibro,
          cantidad: this.state.cantidad,
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
        <h4 className="PageHeading">Editar Informacion de PreCompra</h4>
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
              <Label># Compra</Label>
              <Input
                type="text"
                name="idCompra"
                onChange={this.handleChange}
                value={this.state.idCompra}
              />
              <Label>Titulo</Label>
              <select
                className="form-control"
                name="idLibro"
                onChange={this.handleChange}
              >
                <option value={this.state.idLibro}>{this.state.titulo}</option>
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

export default EditPre;
