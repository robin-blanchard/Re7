import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { WiDaySunny, WiCloudy, WiThunderstorm } from "react-icons/wi";

function RecipeDetail(props) {
  const { id } = useParams();
  const [RecipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();

    const url = process.env.REACT_APP_BACKEND_URL + "recipes/" + id;

    const loadData = () => {
      Axios.get(url, { cancelToken: source.token })
        .then((response) => {
          setRecipeDetails(response.data);
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
    <Container fluid>
      <Col md={9} className="mx-auto text-center">
        <Image src={RecipeDetails.photo} fluid />
        <h1>{RecipeDetails.name ? RecipeDetails.name : "Nom de la recette"}</h1>
        <Row>
          <Col md={4}>
            <Row>
              <p className="mx-auto">Difficulté</p>
            </Row>
            <Row>
              <p className="mx-auto">
                {RecipeDetails.difficulty === "1" ? (
                  <WiDaySunny size={45} />
                ) : RecipeDetails.difficulty === "2" ? (
                  <WiCloudy size={45} />
                ) : (
                  <WiThunderstorm size={45} />
                )}
              </p>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <p className="mx-auto">Temps de préparation</p>
            </Row>
            <Row>
              <p className="mx-auto">
                {RecipeDetails.prep_time
                  ? RecipeDetails.prep_time
                  : "Temps de préparation"}
              </p>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <p className="mx-auto">Temps de cuisson</p>
            </Row>
            <Row>
              <p className="mx-auto">
                {RecipeDetails.bake_time
                  ? RecipeDetails.bake_time
                  : "Temps de cuisson"}
              </p>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            {RecipeDetails.ingredients
              ? RecipeDetails.ingredients.map((ingredient, idx) => (
                  <li key={idx}>
                    {ingredient.product.name} : {ingredient.quantity}{" "}
                    {ingredient.unit}
                  </li>
                ))
              : "Ingredients"}
          </Col>
          <Col md="auto">
            Instructions
            {RecipeDetails.instructions
              ? RecipeDetails.instructions
                  .sort((a, b) => (a.order < b.order ? -1 : 1))
                  .map((instruction, idx) => (
                    <li key={idx}>{instruction.text}</li>
                  ))
              : "Ingredients"}
          </Col>
        </Row>
      </Col>

      <Row></Row>
    </Container>
  );
}

export default RecipeDetail;
