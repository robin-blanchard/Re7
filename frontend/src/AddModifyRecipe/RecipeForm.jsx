import React, { useState, useEffect, Fragment } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { FaPlus, FaTimes } from "react-icons/fa";

import useElementsState from "./useElementsState";

import { extractPhotoName } from "../utils";

import "./RecipeForm.css";

const RecipeForm = (props) => {
  const [recipeName, setRecipeName] = useState(props.initialState["name"]);
  const [difficulty, setDifficulty] = useState(props.initialState["difficulty"]);
  const [prepTime, setPrepTime] = useState(props.initialState["prep_time"]);
  const [bakeTime, setBakeTime] = useState(props.initialState["bake_time"]);
  const [totalTime, setTotalTime] = useState(props.initialState["total_time"]);
  const [photo, setPhoto] = useState(props.initialState["photo"]);
  const [nbCovers, setNbCovers] = useState(props.initialState["nb_covers"]);
  const [ingredients, addIngredient, deleteIngredient, updateIngredient, resetIngredients] = useElementsState(props.initialState["ingredients"]);
  const [instructions, addInstruction, deleteInstruction, updateInstruction, resetInstructions] = useElementsState(props.initialState["instructions"]);

  const [validated, setValidated] = useState(false);

  const setRecipeFormData = props.setRecipeFormData;

  const onChangePositiveNumber = (e, setValue, minValue = 0) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === "" || value < 0) setValue(minValue);
    else if (isNaN(value) || !Number(value) & (Number(value) !== 0)) return;
    else {
      setValue(Number(value));
    }
  };

  useEffect(() => {
    setTotalTime(prepTime + bakeTime);
  }, [prepTime, bakeTime]);

  const clearForm = () => {
    setRecipeName("");
    setDifficulty("1");
    setPrepTime(0);
    setBakeTime(0);
    setNbCovers(1);
    resetIngredients();
    resetInstructions();
  };

  useEffect(() => {
    const recipeFormData = {
      name: recipeName,
      difficulty: difficulty,
      prep_time: prepTime,
      bake_time: bakeTime,
      total_time: totalTime,
      nb_covers: nbCovers,
      photo: photo,
      ingredients: ingredients,
      instructions: instructions,
    };
    setRecipeFormData(recipeFormData);
  }, [recipeName, difficulty, prepTime, bakeTime, totalTime, nbCovers, photo, ingredients, instructions, setRecipeFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    if (form.checkValidity()) {
      const result = props.handleSubmit();
      if (result === 0) {
        clearForm();
      }
    }
    setValidated(true);
  };

  return (
    <Fragment>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="form.ControlName">
          <Form.Label>Nom de la recette</Form.Label>
          <Form.Control required value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          <Form.Control.Feedback type="invalid">Un nom est requis pour votre recette !</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Photo</Form.Label>
          <Form.File
            id="custom-file"
            label={photo ? (photo.name ? photo.name : extractPhotoName(photo)) : "Photo"}
            custom
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
          />
        </Form.Group>

        <Form.Group controlId="form.ControlDifficulty">
          <Form.Label>Difficulté</Form.Label>
          <Form.Control as="select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="1">Simple</option>
            <option value="2">Modéré</option>
            <option value="3">Difficile</option>
          </Form.Control>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="form.ControlPrepTime">
            <Form.Label>Temps de préparation</Form.Label>
            <Form.Control type="number" min="0" step="1" value={prepTime} onChange={(e) => onChangePositiveNumber(e, setPrepTime)} />
            <Form.Control.Feedback type="invalid">Cette valeur doit être positive</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="form.ControlBakeTime">
            <Form.Label>Temps de cuisson</Form.Label>
            <Form.Control type="number" min="0" step="1" value={bakeTime.toString().replace(/^0+[^0]+/, "")} onChange={(e) => onChangePositiveNumber(e, setBakeTime)} />
            <Form.Control.Feedback type="invalid">Cette valeur doit être positive</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="form.ControlBakeTime">
            <Form.Label>Temps total</Form.Label>
            <Form.Control type="number" min="0" disabled value={totalTime} />
            <Form.Control.Feedback type="invalid">Cette valeur doit être positive</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="form.ControlNbCovers">
            <Form.Label>Nombre de couverts</Form.Label>
            <Form.Control type="number" min="1" step="1" value={nbCovers} onChange={(e) => onChangePositiveNumber(e, setNbCovers, 1)} />
            <Form.Control.Feedback type="invalid">Votre recette ne va pas vous nourrir si elle ne donne au moins 1 couvert...</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Label>Ingrédients</Form.Label>
            <Button className="plus-btn" onClick={() => addIngredient()} variant="outline-dark">
              <FaPlus />
            </Button>
          </Col>
        </Form.Row>

        {ingredients.map((ingredientItem, idx) => (
          <Form.Row key={idx}>
            <Form.Group as={Col} md={2}>
              <Form.Control
                type="number"
                min="0"
                value={ingredientItem.quantity}
                onChange={(e) => {
                  onChangePositiveNumber(e, (value) => {
                    updateIngredient(idx, "quantity", value);
                  });
                }}
              />
            </Form.Group>

            <Form.Group as={Col} md={3}>
              <InputGroup>
                <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title="">
                  {["g", "kg", "L", "cL", "mL"].map((unitType, unitIdx) => (
                    <Dropdown.Item
                      name={unitType}
                      key={unitIdx}
                      onClick={(e) => {
                        updateIngredient(idx, "unit", unitType);
                      }}
                    >
                      {unitType}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <Form.Control
                  value={ingredientItem.unit}
                  placeholder="unités"
                  onChange={(e) => {
                    updateIngredient(idx, "unit", e.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>

            {ingredientItem.unit !== "" ? <Form.Group>de</Form.Group> : ""}

            <Form.Group as={Col} md={3}>
              <Form.Control
                required
                value={ingredientItem.product.name}
                onChange={(e) => {
                  updateIngredient(idx, "product", { name: e.target.value });
                }}
              />
              <Form.Control.Feedback type="invalid">Le nom de l'ingrédient est nécessaire. Vous pouvez aussi supprimer cette ligne avec la croix.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Button
                onClick={(e) => {
                  deleteIngredient(idx);
                }}
                variant="outline-dark"
              >
                <FaTimes />
              </Button>
            </Form.Group>
          </Form.Row>
        ))}

        <Form.Row>
          <Col>
            <Form.Label>Instructions</Form.Label>
            <Button
              onClick={() =>
                addInstruction({
                  order: instructions.length,
                  text: "",
                })
              }
              className="plus-btn"
              variant="outline-dark"
            >
              <FaPlus />
            </Button>
          </Col>
        </Form.Row>

        {instructions.map((instructionItem, idx) => (
          <Form.Row key={idx}>
            <Form.Group as={Col} md={2}>
              <Form.Control
                required
                value={instructionItem.text}
                onChange={(e) => {
                  updateInstruction(idx, "text", e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">L'instruction est nécessaire. Vous pouvez aussi supprimer cette ligne avec la croix.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Button
                onClick={(e) => {
                  deleteInstruction(idx);
                }}
                variant="outline-dark"
              >
                <FaTimes />
              </Button>
            </Form.Group>
          </Form.Row>
        ))}
        {}
        <Button type="submit" variant="dark">
          {props.submitName}
        </Button>
      </Form>
    </Fragment>
  );
};
export default RecipeForm;
