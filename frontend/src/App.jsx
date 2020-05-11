import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Col from "react-bootstrap/Col";

import LoginNavbar from "./LoginNavbar/LoginNavbar";
import RecipeGrid from "./RecipeGrid/RecipeGrid";
import RecipeDetail from "./RecipeDetail/RecipeDetail";
import AddRecipe from "./AddRecipe/AddRecipe";
import Login from "./Login/Login";

import "./App.css";

function App() {
  const [logged, setLogged] = useState(false);

  const handleLogin = () => {
    setLogged(true);
  };
  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setLogged(false);
  };

  useEffect(() => {
    //to do: check connection, refresh token if necessary
    if (!!localStorage.getItem("access_token")) {
      handleLogin();
    }
  }, []);

  return (
    <Fragment>
      <LoginNavbar logged={logged} handleSignOut={handleSignOut} />

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
              <Login handleLogin={handleLogin} />
            </Route>
          </Switch>
        </BrowserRouter>
      </Col>
    </Fragment>
  );
}

export default App;
