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

class AddLibro extends Component {
  constructor(props) {
    super(props);
    // var token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      titulo: "",
      idAutor: "1",
      idCategoria: "1",
      idEditorial: "1",
      ejemplares: "",
      costo: "",
      autores: [],
      editoriales: [],
      categorias: [],
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
    fetch("http://localhost:5000/api/autores")
      .then((res) => res.json())
      .then((autorJson) => this.setState({ autores: autorJson }));
    fetch("http://localhost:5000/api/categorias")
      .then((res) => res.json())
      .then((cateJson) => this.setState({ categorias: cateJson }));
    fetch("http://localhost:5000/api/editorial")
      .then((res) => res.json())
      .then((editoJson) => this.setState({ editoriales: editoJson }));
  }

  add(e) {
    axios
      .post(
        "http://localhost:5000/api/libro",
        {
          titulo: this.state.titulo,
          idAutor: this.state.idAutor,
          idCategoria: this.state.idCategoria,
          idEditorial: this.state.idEditorial,
          ejemplares: this.state.ejemplares,
          costo: this.state.costo,
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
      titulo: "",
      idAutor: "",
      idCategoria: "",
      idEditorial: "",
      ejemplares: "",
      costo: "",
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
            pathname: "/ListLibro",
            state: {
              from: this.props.location,
            },
          }}
        />
      );
    }
    const { autores, categorias, editoriales } = this.state;

    return (
      <Container className="App">
        <h4 className="PageHeading">Ingresa informacion de Libro</h4>
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
              <Label>Titulo</Label>
              <Input
                type="text"
                name="titulo"
                onChange={this.handleChange}
                value={this.state.titulo}
              />
              <Label>Autor</Label>
              <select
                className="form-control"
                name="idAutor"
                onChange={this.handleChange}
              >
                {autores.map((e, i) => (
                  <option value={e.idAutor} key={i}>
                    {e.nombre}
                  </option>
                ))}
              </select>
              <Label>Categoria</Label>
              <select
                className="form-control"
                name="idCategoria"
                onChange={this.handleChange}
              >
                {categorias.map((e, i) => (
                  <option value={e.idCategoria} key={i}>
                    {e.nombre}
                  </option>
                ))}
              </select>
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
              <Label>Ejemplares</Label>
              <Input
                type="text"
                name="ejemplares"
                onChange={this.handleChange}
                value={this.state.ejemplares}
              />
              <Label>Costo</Label>
              <Input
                type="text"
                name="costo"
                onChange={this.handleChange}
                value={this.state.costo}
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

export default AddLibro;
