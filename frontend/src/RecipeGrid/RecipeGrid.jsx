import React from "react";
import CardColumns from "react-bootstrap/CardColumns";

import RecipeCard from "./RecipeCard/RecipeCard";

function RecipeGrid(props) {
  return (
    <CardColumns>
      {props.items.map((item, idx) => (
        <RecipeCard key={idx} item={item} />
      ))}
    </CardColumns>
  );
}

export default RecipeGrid;
