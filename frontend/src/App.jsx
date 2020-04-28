import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";

import RecipeGrid from "./RecipeGrid/RecipeGrid";
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import AddRecipe from "./AddRecipe/AddRecipe";

import "./App.css";

function App() {
  return (
    <Fragment>
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
        </Navbar.Collapse>
      </Navbar>

      <Col md={9} className="mx-auto">
        <BrowserRouter>
          <Switch>
            <Route exact path="/recipes/add_recipe">
              <AddRecipe />
            </Route>
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
