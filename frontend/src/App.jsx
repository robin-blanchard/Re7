import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Col from "react-bootstrap/Col";

import LoginNavbar from "./LoginNavbar/LoginNavbar";
import RecipeGrid from "./RecipeGrid/RecipeGrid";
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import AddRecipe from "./AddRecipe/AddRecipe";
import Login from "./Login/Login";

import "./App.css";

function App() {
  return (
    <Fragment>
      <LoginNavbar />

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
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </Col>
    </Fragment>
  );
}

export default App;
