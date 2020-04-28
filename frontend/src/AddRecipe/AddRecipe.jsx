import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

function AddRecipe() {
  const [prepTime, setPrepTime] = useState(0);
  const [bakeTime, setBakeTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const onTimeChange = (e, setValue) => {
    if (e.target.value < 0) {
      setValue(0);
    } else {
      setValue(Math.round(e.target.value));
    }
  };

  useEffect(() => {
    setTotalTime(prepTime + bakeTime);
  }, [prepTime, bakeTime]);

  return (
    <Form>
      <Form.Group controlId="form.ControlName">
        <Form.Label>Nom de la recette</Form.Label>
        <Form.Control placeholder="Purée" />
      </Form.Group>

      <Form.Group controlId="form.ControlDifficulty">
        <Form.Label>Difficulté</Form.Label>
        <Form.Control as="select">
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
            onChange={(e) => onTimeChange(e, setPrepTime)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="form.ControlBakeTime">
          <Form.Label>Temps de cuisson</Form.Label>
          <Form.Control
            type="number"
            step="1"
            value={bakeTime}
            onChange={(e) => onTimeChange(e, setBakeTime)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="form.ControlBakeTime">
          <Form.Label>Temps total</Form.Label>
          <Form.Control
            type="number"
            disabled
            value={totalTime}
            onChange={(e) => onTimeChange(e, setBakeTime)}
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
export default AddRecipe;
