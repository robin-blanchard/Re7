import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

function LoginNavbar(props) {
  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand href="/">Re7</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/recipes">Recettes</Nav.Link>
          <Nav.Link href="/recipes/add_recipe">
            Ajouter une nouvelle recette
          </Nav.Link>
          <Nav.Link href="/products">Produits</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {props.logged ? (
            <Navbar.Text>
              <div onClick={props.handleSignOut} style={{ cursor: "pointer" }}>
                {" "}
                Se déconnecter <FaSignOutAlt />
              </div>
            </Navbar.Text>
          ) : (
            <Nav.Link href="/login">
              Se connecter <FaSignInAlt />
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default LoginNavbar;
