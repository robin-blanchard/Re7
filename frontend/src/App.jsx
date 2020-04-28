import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";

import RecipeGrid from "./RecipeGrid/RecipeGrid";
import RecipeDetail from "./RecipeDetail/RecipeDetail";

import "./App.css";

function App() {
  return (
    <Fragment>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="/">Re7</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Col md={9} className="mx-auto">
        <BrowserRouter>
          <Switch>
            <Route path="/recipes/:id">
              <RecipeDetail />
            </Route>
            <Route path="/recipes/">
              <RecipeGrid />
            </Route>
          </Switch>
        </BrowserRouter>
      </Col>
    </Fragment>
  );
}

export default App;
