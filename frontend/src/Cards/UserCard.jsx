import React from "react";
import Card from "react-bootstrap/Card";

function RecipeCard(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">{props.item.username}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
