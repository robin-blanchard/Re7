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
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { WiDaySunny, WiCloudy, WiThunderstorm } from "react-icons/wi";

import ImageModal from "./ImageModal";
import SubmissionAlert from "../AddModifyRecipe/SubmissionAlert";

import "../image-center-crop.css";

function RecipeDetail(props) {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [nbCovers, setNbCovers] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");

  const history = useHistory();

  const current_user = localStorage.getItem("username");

  useEffect(() => {
    if (!recipeDetails.nb_covers) return;
    setNbCovers(recipeDetails.nb_covers);
  }, [recipeDetails]);

  const onChangeShouldBePositive = (value, setValue) => {
    if (isNaN(value)) {
      return;
    } else if (value === "" || value < 0) {
      setValue(0);
    } else {
      setValue(Math.round(value));
    }
  };

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
    const newUserRecipeDetails = JSON.parse(JSON.stringify(recipeDetails));
    newUserRecipeDetails["creater"] = localStorage.getItem("username");

    const photoUrlRegex = /https:\/\/storage\.googleapis\.com\/?[\w-]+\/((photos\/)?([\w-_]+\.(jpg|png)))\?/g;
    const photoUrl = photoUrlRegex.exec(newUserRecipeDetails["photo"])[1];
    newUserRecipeDetails["photo"] = photoUrl;

    delete newUserRecipeDetails["id"];
    delete newUserRecipeDetails["creation_date"];
    delete newUserRecipeDetails["update_date"];

    axiosInstanceAuth
      .post(process.env.REACT_APP_BACKEND_URL + "api/recipes", newUserRecipeDetails)
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
      <SubmissionAlert type={alertType} show={showAlert} unshowAlert={() => setShowAlert(false)} />
      <ImageModal show={showModal} title={recipeDetails.name} photo={recipeDetails.photo} handleClose={() => setShowModal(false)} />
      <Container fluid>
        <Col md={9} className="mx-auto text-center">
          <div className="image-ccrop-container">
            <Image
              src={recipeDetails.photo ? recipeDetails.photo : "https://icons-for-free.com/iconfiles/png/512/bakery+svglinecolor+recipe+book-1319964872908984700.png"}
              className="image-ccrop"
              onClick={() => setShowModal(true)}
            />
          </div>

          <h1>{recipeDetails.name}</h1>
          <Row>
            <Col>
              <h3>{recipeDetails.creater}</h3>
            </Col>
            <Col>
              {recipeDetails.creater === current_user ? (
                <Link
                  to={{
                    pathname: `/recipes/mod_recipe/${id}`,
                    state: {
                      recipeDetails: recipeDetails,
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
            {recipeDetails.creater === current_user ? (
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
            <Col className="border">
              <Row>
                <p className="mx-auto">Difficulté</p>
              </Row>
              <Row>
                <p className="mx-auto">{recipeDetails.difficulty === "1" ? <WiDaySunny size={45} /> : recipeDetails.difficulty === "2" ? <WiCloudy size={45} /> : <WiThunderstorm size={45} />}</p>
              </Row>
            </Col>
            <Col className="border">
              <Row>
                <p className="mx-auto">Temps de préparation</p>
              </Row>
              <Row>
                <p className="mx-auto">{recipeDetails.prep_time}</p>
              </Row>
            </Col>
            <Col className="border">
              <Row>
                <p className="mx-auto">Temps de cuisson</p>
              </Row>
              <Row>
                <p className="mx-auto">{recipeDetails.bake_time}</p>
              </Row>
            </Col>
            {recipeDetails.nb_covers ? (
              <Col className="border">
                <Row>
                  <p className="mx-auto">Nombre de couverts</p>
                </Row>
                <Row>
                  <InputGroup className="mx-3" style={{ width: "100%" }}>
                    <InputGroup.Prepend
                      onClick={() => {
                        onChangeShouldBePositive(nbCovers - 1, setNbCovers);
                      }}
                    >
                      <Button variant="outline-secondary">-</Button>
                    </InputGroup.Prepend>
                    <Form.Control value={nbCovers} className="text-center" onChange={(e) => onChangeShouldBePositive(e.target.value, setNbCovers)} />
                    <InputGroup.Append
                      onClick={() => {
                        onChangeShouldBePositive(nbCovers + 1, setNbCovers);
                      }}
                    >
                      <Button variant="outline-secondary">+</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Row>
              </Col>
            ) : (
              <></>
            )}
          </Row>

          <Row>
            <Col md={4}>
              Ingrédients
              <ListGroup>
                {recipeDetails.ingredients ? (
                  recipeDetails.ingredients.map((ingredient, idx) => (
                    <ListGroup.Item key={idx}>
                      {ingredient.product.name} : {recipeDetails.nb_covers ? Math.round((ingredient.quantity * nbCovers) / recipeDetails.nb_covers) : ingredient.quantity} {ingredient.unit}
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
                {recipeDetails.instructions
                  ? recipeDetails.instructions.sort((a, b) => (a.order < b.order ? -1 : 1)).map((instruction, idx) => <ListGroup.Item key={idx}>{instruction.text}</ListGroup.Item>)
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
