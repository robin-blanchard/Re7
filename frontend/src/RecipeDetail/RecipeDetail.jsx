import React, { useState, useEffect, Fragment } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { axiosInstanceNoAuth, axiosInstanceAuth } from "../axiosApi";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
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

  const history = useHistory();

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
  }, [id]);

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

    axiosInstanceAuth
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

  const handleDelete = (e) => {
    e.preventDefault();
    setShowAlert(false);

    axiosInstanceAuth
      .delete(process.env.REACT_APP_BACKEND_URL + "api/recipes/" + id)
      .then(function (response) {
        console.log(response);
        setShowAlert(true);
        setAlertType("deletion-success");
        setTimeout(function () {
          history.push("/recipes");
        }, 1000);
      })
      .catch(function (response) {
        setShowAlert(true);
        setAlertType("deletion-failure");
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

          <h1>{RecipeDetails.name}</h1>
          <Row>
            <Col>
              <h3>{RecipeDetails.creater}</h3>
            </Col>
            <Col>
              {RecipeDetails.creater === current_user ? (
                <Link
                  to={{
                    pathname: `/recipes/mod_recipe/${id}`,
                    state: {
                      recipeDetails: RecipeDetails,
                    },
                  }}
                >
                  <Button variant="secondary">Modifier la recette</Button>
                </Link>
              ) : (
                <Button variant="secondary" onClick={handleFork}>
                  Fork
                </Button>
              )}
            </Col>
            {RecipeDetails.creater === current_user ? (
              <Col>
                <Button variant="secondary" onClick={handleDelete}>
                  Supprimer la recette
                </Button>
              </Col>
            ) : (
              <Fragment />
            )}
          </Row>

          <Row>
            <Col md={4} className="border">
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
            <Col md={4} className="border">
              <Row>
                <p className="mx-auto">Temps de préparation</p>
              </Row>
              <Row>
                <p className="mx-auto">{RecipeDetails.prep_time}</p>
              </Row>
            </Col>
            <Col md={4} className="border">
              <Row>
                <p className="mx-auto">Temps de cuisson</p>
              </Row>
              <Row>
                <p className="mx-auto">{RecipeDetails.bake_time}</p>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              Ingrédients
              <ListGroup>
                {RecipeDetails.ingredients ? (
                  RecipeDetails.ingredients.map((ingredient, idx) => (
                    <ListGroup.Item key={idx}>
                      {ingredient.product.name} : {ingredient.quantity}{" "}
                      {ingredient.unit}
                    </ListGroup.Item>
                  ))
                ) : (
                  <></>
                )}
              </ListGroup>
            </Col>
            <Col md={8}>
              Instructions
              <ListGroup>
                {RecipeDetails.instructions
                  ? RecipeDetails.instructions
                      .sort((a, b) => (a.order < b.order ? -1 : 1))
                      .map((instruction, idx) => (
                        <ListGroup.Item key={idx}>
                          {instruction.text}
                        </ListGroup.Item>
                      ))
                  : "Ingredients"}
              </ListGroup>
            </Col>
          </Row>
        </Col>

        <Row></Row>
      </Container>
    </Container>
  );
}

export default RecipeDetail;
