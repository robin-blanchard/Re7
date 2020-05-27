import React, { Fragment } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import Login from "./Login";

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
              <Nav.Link onClick={props.handleSignOut}>
                Se déconnecter <FaSignOutAlt />
              </Nav.Link>
            </Fragment>
          ) : (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose
              overlay={
                <Popover>
                  <Popover.Content>
                    <Login handleLogin={props.handleLogin} />
                  </Popover.Content>
                </Popover>
              }
            >
              <Nav.Link>
                Se connecter <FaSignInAlt />
              </Nav.Link>
            </OverlayTrigger>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default LoginNavbar;
