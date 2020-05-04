import React, { useState, useEffect } from "react";
import Axios from "axios";

import useElementsState from "./useElementsState";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [difficulty, setDifficulty] = useState("1");
  const [prepTime, setPrepTime] = useState(0);
  const [bakeTime, setBakeTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [
    ingredients,
    addIngredient,
    deleteIngredient,
    updateIngredient,
  ] = useElementsState({
    quantity: 0,
    unit: "kg",
    product: { id: "", name: "" },
  });

  const [
    instructions,
    addInstruction,
    deleteInstruction,
    updateInstruction,
  ] = useElementsState({
    order: 0,
    text: "",
  });

  const onChangeShouldBePositive = (e, setValue) => {
    if (e.target.value === "") {
    } else if (e.target.value < 0) {
      setValue(0);
    } else {
      setValue(Math.round(e.target.value));
    }
  };

  useEffect(() => {
    setTotalTime(prepTime + bakeTime);
  }, [prepTime, bakeTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderedIstructions = instructions.map((item, idx) => ({
      order: idx,
      text: item.text,
    }));

    const data = {
      name: recipeName,
      difficulty: difficulty,
      prep_time: prepTime,
      bake_time: bakeTime,
      total_time: totalTime,
      ingredients: ingredients,
      instructions: orderedIstructions,
    };
    Axios.post(process.env.REACT_APP_BACKEND_URL + "recipes", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="form.ControlName">
        <Form.Label>Nom de la recette</Form.Label>
        <Form.Control
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="form.ControlDifficulty">
        <Form.Label>Difficulté</Form.Label>
        <Form.Control
          as="select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="1">Simple</option>
          <option value="2">Modéré</option>
          <option value="3">Difficile</option>
        </Form.Control>
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="form.ControlPrepTime">
          <Form.Label>Temps de préparation</Form.Label>
          <Form.Control
            type="number"
            step="1"
            value={prepTime}
            onChange={(e) => onChangeShouldBePositive(e, setPrepTime)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="form.ControlBakeTime">
          <Form.Label>Temps de cuisson</Form.Label>
          <Form.Control
            type="number"
            step="1"
            value={bakeTime}
            onChange={(e) => onChangeShouldBePositive(e, setBakeTime)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="form.ControlBakeTime">
          <Form.Label>Temps total</Form.Label>
          <Form.Control type="number" disabled value={totalTime} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Label>Ingrédients</Form.Label>
        <Button onClick={() => addIngredient()}>Plus</Button>
      </Form.Row>

      {ingredients.map((ingredientItem, idx) => (
        <Form.Row key={idx}>
          <Form.Group as={Col} md={2}>
            <Form.Control
              type="number"
              value={ingredientItem.quantity}
              onChange={(e) => {
                onChangeShouldBePositive(e, (value) => {
                  updateIngredient(idx, "quantity", value);
                });
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md={1}>
            <Form.Control
              as="select"
              value={ingredientItem.unit}
              onChange={(e) => {
                updateIngredient(idx, "unit", e.target.value);
              }}
            >
              <option>g</option>
              <option>kg</option>
            </Form.Control>
          </Form.Group>

          <p style={{ alignSelf: "center" }}>de</p>

          <Form.Group as={Col} md={3}>
            <Form.Control
              value={ingredientItem.product.name}
              onChange={(e) => {
                updateIngredient(idx, "product", { name: e.target.value });
              }}
            />
          </Form.Group>

          <Button
            onClick={(e) => {
              deleteIngredient(idx);
            }}
          >
            Delete
          </Button>
        </Form.Row>
      ))}

      <Form.Row>
        <Form.Label>Instructions</Form.Label>
        <Button
          onClick={() =>
            addInstruction({
              order: instructions.length,
              text: "",
            })
          }
        >
          Plus
        </Button>
      </Form.Row>

      {instructions.map((instructionItem, idx) => (
        <Form.Row key={idx}>
          <Form.Group as={Col} md={2}>
            <Form.Control
              value={instructionItem.text}
              onChange={(e) => {
                updateInstruction(idx, "text", e.target.value);
              }}
            />
          </Form.Group>
          {instructionItem.order}
          <Button
            onClick={(e) => {
              deleteInstruction(idx);
            }}
          >
            Delete
          </Button>
        </Form.Row>
      ))}
      {}
      <Button type="submit">Submit</Button>
    </Form>
  );
}
export default AddRecipe;
