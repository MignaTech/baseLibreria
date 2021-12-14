import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

const NavbarNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="sm" className="py-2">
      <NavbarBrand>
        <Link to={"/"} className="text-decoration-none">
          LIBRERIA
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Miguel Sixtega
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Mi Perfil</DropdownItem>
              <DropdownItem>Configuraciones</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Cerrar Sesión</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarNav;
