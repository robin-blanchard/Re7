import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import { axiosInstanceNoAuth } from "../axiosApi";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { WiDaySunny, WiCloudy, WiThunderstorm } from "react-icons/wi";

import ImageModal from "./ImageModal";
import SubmissionAlert from "../AddModifyRecipe/SubmissionAlert";

import "../image-center-crop.css";

function RecipeDetail(props) {
  const { id } = useParams();
  const [RecipeDetails, setRecipeDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");

  const current_user = localStorage.getItem("username");

  useEffect(() => {
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      axiosInstanceNoAuth
        .get("api/recipes/" + id, { cancelToken: source.token })
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
  }, []);

  const handleFork = () => {
    setShowAlert(false);
    const newUserRecipeDetails = JSON.parse(JSON.stringify(RecipeDetails));
    newUserRecipeDetails["creater"] = localStorage.getItem("username");

    const photoUrlRegex = /https:\/\/storage\.googleapis\.com\/?[\w-]+\/((photos\/)?([\w-_]+\.(jpg|png)))\?/g;
    const photoUrl = photoUrlRegex.exec(newUserRecipeDetails["photo"])[1];
    newUserRecipeDetails["photo"] = photoUrl;

    delete newUserRecipeDetails["id"];
    delete newUserRecipeDetails["creation_date"];
    delete newUserRecipeDetails["update_date"];

    axiosInstanceNoAuth
      .post(
        process.env.REACT_APP_BACKEND_URL + "api/recipes",
        newUserRecipeDetails
      )
      .then(function (response) {
        console.log(response);
        setShowAlert(true);
        setAlertType("success");
      })
      .catch(function (response) {
        setShowAlert(true);
        setAlertType("failure");
        console.log(response);
      });
  };

  return (
    <Container>
      <SubmissionAlert
        type={alertType}
        show={showAlert}
        unshowAlert={() => setShowAlert(false)}
      />
      <ImageModal
        show={showModal}
        title={RecipeDetails.name}
        photo={RecipeDetails.photo}
        handleClose={() => setShowModal(false)}
      />
      <Container fluid>
        <Col md={9} className="mx-auto text-center">
          <div className="image-ccrop-container">
            <Image
              src={RecipeDetails.photo}
              className="image-ccrop"
              onClick={() => setShowModal(true)}
            />
          </div>

          <h1>
            {RecipeDetails.name ? RecipeDetails.name : "Nom de la recette"}
          </h1>
          <h3>
            {RecipeDetails.creater
              ? RecipeDetails.creater
              : "Créateur de la recette"}
          </h3>
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
          {RecipeDetails.creater === current_user ? (
            <Link
              to={{
                pathname: `/recipes/mod_recipe/${id}`,
                state: {
                  recipeDetails: RecipeDetails,
                },
              }}
            >
              <Button>Modifier la recette</Button>
            </Link>
          ) : (
            <Button onClick={handleFork}>Fork</Button>
          )}
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
    </Container>
  );
}

export default RecipeDetail;
