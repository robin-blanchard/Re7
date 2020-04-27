import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function RecipeDetail(props) {
  const { id } = useParams();
  const [RecipeDetails, setRecipeDetails] = useState();

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + "recipes/" + id;
    Axios.get(url)
      .then((response) => {
        setRecipeDetails(response.data);
        console.log(RecipeDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return <br />;
}

export default RecipeDetail;
