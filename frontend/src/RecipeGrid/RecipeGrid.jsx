import React from "react";
import CardColumns from "react-bootstrap/CardColumns";

import RecipeCard from "./RecipeCard/RecipeCard";

const recipesItems = [
  {
    name: "AAA",
    text: "aaa",
  },
  {
    name: "BBB",
    text: "bbb",
  },
  {
    name: "CCC",
    text: "ccc",
  },
  {
    name: "DDD",
    text: "ddd",
  },
  {
    name: "EEE",
    text: "eee",
  },
  {
    name: "FFF",
    text: "fff",
  },
  {
    name: "GGG",
    text: "ggg",
  },
];

function RecipeGrid() {
  return (
    <CardColumns>
      {recipesItems.map((item, idx) => (
        <RecipeCard key={idx} item={item} />
      ))}
    </CardColumns>
  );
}

export default RecipeGrid;
