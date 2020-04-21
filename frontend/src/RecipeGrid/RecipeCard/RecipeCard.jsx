import React from "react";
import Card from "react-bootstrap/Card";

function RecipeCard(props) {
  return (
    <Card>
      <Card.Img variant="top" src="https://via.placeholder.com/150x70" />
      <Card.Body>
        <Card.Title>{props.item.name}</Card.Title>
        <Card.Text>{props.item.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
