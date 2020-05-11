import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import CardColumns from "react-bootstrap/CardColumns";

import RecipeCard from "./RecipeCard/RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecipeGrid() {
  const [recipesItems, setRecipesItems] = useState([]);

  useEffect(() => {
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();

    const url = process.env.REACT_APP_BACKEND_URL + "api/recipes";

    const loadData = () => {
      Axios.get(url, { cancelToken: source.token })
        .then((response) => {
          setRecipesItems(response.data);
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

  const rows = [];

  for (var i = 0; i < Math.ceil(recipesItems.length / 3); i++) {
    const cols = [];
    const limit =
      i + 1 === Math.ceil(recipesItems.length / 3)
        ? recipesItems.length % 3
        : 3;
    for (var j = 0; j < limit; j++) {
      cols.push(
        <Col md={4} key={3 * i + j}>
          <Link
            to={`/recipes/${recipesItems[3 * i + j].id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <RecipeCard key={3 * i + j} item={recipesItems[3 * i + j]} />
          </Link>
        </Col>
      );
    }
    rows.push(
      <Row key={i} className="mt-4">
        {cols}
      </Row>
    );
  }
  return <Container>{rows}</Container>;
}

export default RecipeGrid;
