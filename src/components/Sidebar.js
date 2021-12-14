import { NavLink } from "react-router-dom";
import {
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark">
      <Nav justified vertical>
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            AUTOR
          </DropdownToggle>
          <DropdownMenu>
            <NavLink
              to="/ListAutor"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Lista de Autor
            </NavLink>
            <NavLink
              to="/AddAutor"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Añadir Autor
            </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            CATEGORIA
          </DropdownToggle>
          <DropdownMenu>
            <NavLink
              to="/ListCategoria"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Lista de Categoria
            </NavLink>
            <NavLink
              to="/AddCategoria"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Añadir Categoria
            </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            EDITORIAL
          </DropdownToggle>
          <DropdownMenu>
            <NavLink
              to="/ListEditorial"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Lista de Editorial
            </NavLink>
            <NavLink
              to="/AddEditorial"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Añadir Editorial
            </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            PROVEEDOR
          </DropdownToggle>
          <DropdownMenu>
            <NavLink
              to="/ListProveedor"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Lista de Proveedores
            </NavLink>
            <NavLink
              to="/AddProveedor"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Añadir Proveedor
            </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            LIBRO
          </DropdownToggle>
          <DropdownMenu>
            <NavLink
              to="/ListLibro"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Lista de Libros
            </NavLink>
            <NavLink
              to="/AddLibro"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Añadir Libro
            </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            PERSONA
          </DropdownToggle>
          <DropdownMenu>
            <NavLink
              to="/ListPersona"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Lista de Personas
            </NavLink>
            <NavLink
              to="/AddPersona"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Añadir Persona
            </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            PRECOMPRA
          </DropdownToggle>
          <DropdownMenu>
            <NavLink
              to="/ListPre"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Lista de Precompra
            </NavLink>
            <NavLink
              to="/AddPre"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Añadir Pre
            </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            ENTRADA
          </DropdownToggle>
          <DropdownMenu>
            <NavLink
              to="/ListEntrada"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Lista de Entradas
            </NavLink>
            <NavLink
              to="/AddEntrada"
              exact
              className="rounded py-1 w-100 d-inline-block"
            >
              Añadir Entrada
            </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </div>
  );
};

export default Sidebar;
