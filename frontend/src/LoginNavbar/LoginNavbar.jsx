import React, { Fragment } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

function LoginNavbar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/recipes">Re7</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/recipes">Recettes</Nav.Link>
          <Nav.Link href="/recipes/add_recipe">
            Ajouter une nouvelle recette
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {props.logged ? (
            <Fragment>
              <Nav.Link href={`/profile/${localStorage.getItem("username")}`}>
                {localStorage.getItem("username")}
              </Nav.Link>
              <Navbar.Text>
                <div
                  onClick={props.handleSignOut}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  Se déconnecter <FaSignOutAlt />
                </div>
              </Navbar.Text>
            </Fragment>
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
