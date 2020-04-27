import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import CardColumns from "react-bootstrap/CardColumns";

import RecipeCard from "./RecipeCard/RecipeCard";

const initialRecipesItems = [
  {
    name: "AAA",
    text: "aaa",
  },
  {
    name: "BBB",
    text: "bbb",
  },
];

function RecipeGrid() {
  const [recipesItems, setRecipesItems] = useState(initialRecipesItems);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + "recipes";
    Axios.get(url)
      .then((response) => {
        setRecipesItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <CardColumns>
      {recipesItems.map((item, idx) => (
        <Link key={idx} to={`/${item.id}`}>
          <RecipeCard key={idx} item={item} />
        </Link>
      ))}
    </CardColumns>
  );
}

export default RecipeGrid;
