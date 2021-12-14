import Navegacion from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import Error401 from "./components/Error401";
import Error500 from "./components/Error500";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import "./App.css";

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

import ListProveedor from "./components/proveedor/List";
import AddProveedor from "./components/proveedor/Add";
import EditProveedor from "./components/proveedor/Edit";
import DelProveedor from "./components/proveedor/Del";

import ListLibro from "./components/libro/List";
import AddLibro from "./components/libro/Add";
import EditLibro from "./components/libro/Edit";
import DelLibro from "./components/libro/Del";

import ListPersona from "./components/persona/List";
import AddPersona from "./components/persona/Add";
import EditPersona from "./components/persona/Edit";
import DelPersona from "./components/persona/Del";

import ListPre from "./components/precompra/List";
import AddPre from "./components/precompra/Add";
import EditPre from "./components/precompra/Edit";
import DelPre from "./components/precompra/Del";

import ListEntrada from "./components/entrada/List";
import AddEntrada from "./components/entrada/Add";
import EditEntrada from "./components/entrada/Edit";
import DelEntrada from "./components/entrada/Del";

import React from "react";

function App(props) {
  return (
    <Router>
      <Navegacion />
      <div className="flex">
        <Sidebar />
        <div className="content w-100">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/ListAutor" component={ListAutor} />
            <Route exact path="/EditAutor/:id" component={EditAutor} />
            <Route exact path="/AddAutor" component={AddAutor} />
            <Route exact path="/DelAutor/:id" component={DelAutor} />

            <Route exact path="/ListEditorial" component={ListEditorial} />
            <Route exact path="/EditEditorial/:id" component={EditEditorial} />
            <Route exact path="/AddEditorial" component={AddEditorial} />
            <Route exact path="/DelEditorial/:id" component={DelEditorial} />

            <Route exact path="/ListCategoria" component={ListCategoria} />
            <Route exact path="/EditCategoria/:id" component={EditCategoria} />
            <Route exact path="/AddCategoria" component={AddCategoria} />
            <Route exact path="/DelCategoria/:id" component={DelCategoria} />

            <Route exact path="/ListProveedor" component={ListProveedor} />
            <Route exact path="/EditProveedor/:id" component={EditProveedor} />
            <Route exact path="/AddProveedor" component={AddProveedor} />
            <Route exact path="/DelProveedor/:id" component={DelProveedor} />

            <Route exact path="/ListLibro" component={ListLibro} />
            <Route exact path="/EditLibro/:id" component={EditLibro} />
            <Route exact path="/AddLibro" component={AddLibro} />
            <Route exact path="/DelLibro/:id" component={DelLibro} />

            <Route exact path="/ListPersona" component={ListPersona} />
            <Route exact path="/EditPersona/:id" component={EditPersona} />
            <Route exact path="/AddPersona" component={AddPersona} />
            <Route exact path="/DelPersona/:id" component={DelPersona} />

            <Route exact path="/ListPre" component={ListPre} />
            <Route exact path="/EditPre/:id" component={EditPre} />
            <Route exact path="/AddPre" component={AddPre} />
            <Route exact path="/DelPre/:id" component={DelPre} />

            <Route exact path="/ListEntrada" component={ListEntrada} />
            <Route exact path="/EditEntrada/:id" component={EditEntrada} />
            <Route exact path="/AddEntrada" component={AddEntrada} />
            <Route exact path="/DelEntrada/:id" component={DelEntrada} />

            <Route exact path="/autoriza" component={Error401} />
            <Route exact path="/servidor" component={Error500} />
            <Route path="*" component={Error404} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
