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
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();

    const url = process.env.REACT_APP_BACKEND_URL + "recipes";

    const loadData = () => {
      Axios.get(url, { cancelToken: source.token })
        .then((response) => {
          setRecipesItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadData();
    return () => {
      source.cancel();
    };
  });

  return (
    <CardColumns>
      {recipesItems.map((item, idx) => (
        <Link
          key={idx}
          to={`/${item.id}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <RecipeCard key={idx} item={item} />
        </Link>
      ))}
    </CardColumns>
  );
}

export default RecipeGrid;
