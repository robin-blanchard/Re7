import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import RecipeGrid from "./RecipeGrid/RecipeGrid";
import RecipeDetail from "./RecipeDetail/RecipeDetail";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:id">
          <RecipeDetail />
        </Route>
        <Route path="/">
          <RecipeGrid />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
