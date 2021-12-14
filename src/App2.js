import React from "react";
import ListAutor from "./components/autores/List";
import AddAutor from "./components/autores/Add";
import EditAutor from "./components/autores/Edit";
import DelAutor from "./components/autores/Del";

import ListEditorial from "./components/editoriales/List";
import AddEditorial from "./components/editoriales/Add";
import EditEditorial from "./components/editoriales/Edit";
import DelEditorial from "./components/editoriales/Del";

import ListCategoria from "./components/categorias/List";
import AddCategoria from "./components/categorias/Add";
import EditCategoria from "./components/categorias/Edit";
import DelCategoria from "./components/categorias/Del";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./App.css";
import {
  Container,
  Navbar,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavbarBrand,
} from "reactstrap";

function App(props) {
  return (
    <Router>
      <Container>
        <Navbar expand="sm" className="navheader">
          <NavbarBrand>
            <Link to={"/"} className="text-decoration-none">
              LIBRERIA
            </Link>
          </NavbarBrand>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  AUTOR
                </DropdownToggle>
                <DropdownMenu >
                  <Link to={"/ListAutor"} className="dropdown-item">
                    Lista de Autor
                  </Link>
                  <Link to={"/AddAutor"} className="dropdown-item">
                    Añadir Autor
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  EDITORIAL
                </DropdownToggle>
                <DropdownMenu>
                  <Link to={"/ListEditorial"} className="dropdown-item">
                    Lista de Editorial
                  </Link>
                  <Link to={"/AddEditorial"} className="dropdown-item">
                    Añadir Editorial
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  CATEGORIA
                </DropdownToggle>
                <DropdownMenu>
                  <Link to={"/ListCategoria"} className="dropdown-item">
                    Lista de Categoria
                  </Link>
                  <Link to={"/AddCategoria"} className="dropdown-item">
                    Añadir Categoria
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </ul>
          </div>
        </Navbar>
      </Container>
      <br />
      <Switch>
        <Route exact path="/ListAutor" component={ListAutor} />
        <Route exact path="/editAutor/:id" component={EditAutor} />
        <Route exact path="/AddAutor" component={AddAutor} />
        <Route exact path="/DelAutor/:id" component={DelAutor} />

        <Route exact path="/ListEditorial" component={ListEditorial} />
        <Route exact path="/editEditorial/:id" component={EditEditorial} />
        <Route exact path="/AddEditorial" component={AddEditorial} />
        <Route exact path="/DelEditorial/:id" component={DelEditorial} />

        <Route exact path="/ListCategoria" component={ListCategoria} />
        <Route exact path="/editCategoria/:id" component={EditCategoria} />
        <Route exact path="/AddCategoria" component={AddCategoria} />
        <Route exact path="/DelCategoria/:id" component={DelCategoria} />
      </Switch>
    </Router>
  );
}

export default App;
