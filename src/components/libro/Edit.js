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

class EditLibro extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("ACCESS_TOKEN");
    this.state = {
      idLibro: "",
      titulo: "",
      idAutor: "",
      autor: "",
      idCategoria: "",
      categoria: "",
      idEditorial: "",
      editorial: "",
      ejemplares: "",
      costo: "",
      autores: [],
      editoriales: [],
      categorias: [],
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
    fetch("http://localhost:5000/api/autores")
      .then((res) => res.json())
      .then((autorJson) => this.setState({ autores: autorJson }));
    fetch("http://localhost:5000/api/categorias")
      .then((res) => res.json())
      .then((cateJson) => this.setState({ categorias: cateJson }));
    fetch("http://localhost:5000/api/editorial")
      .then((res) => res.json())
      .then((editoJson) => this.setState({ editoriales: editoJson }));
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
              idAutor: data.idAutor,
              autor: data.autor,
              categoria: data.categoria,
              idCategoria: data.idCategoria,
              editorial: data.editorial,
              idEditorial: data.idEditorial,
              ejemplares: data.ejemplares,
              costo: data.costo,
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
        `http://localhost:5000/api/libro/${this.state.idLibro}`,
        {
          titulo: this.state.titulo,
          idAutor: this.state.idAutor,
          idCategoria: this.state.idCategoria,
          idEditorial: this.state.idEditorial,
          ejemplares: this.state.ejemplares,
          costo: this.state.costo,
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
        <h4 className="PageHeading">Editar Informacion de Libro</h4>
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
                <option value={this.state.idAutor}>{this.state.autor}</option>
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
                <option value={this.state.idCategoria}>
                  {this.state.categoria}
                </option>
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
                <option value={this.state.idEditorial}>
                  {this.state.editorial}
                </option>
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

export default EditLibro;
