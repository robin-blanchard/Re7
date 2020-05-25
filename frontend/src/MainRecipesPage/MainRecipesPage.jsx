import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import { axiosInstanceNoAuth } from "../axiosApi";

import RecipeGrid from "../RecipeGrid/RecipeGrid";

function MainRecipesPage() {
  const [recipesItems, setRecipesItems] = useState([]);

  useEffect(() => {
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      axiosInstanceNoAuth
        .get("api/recipes", { cancelToken: source.token })
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

  return (
    <Fragment>
      <h1 className="text-center">Voici les dernières recettes !</h1>
      <RecipeGrid items={recipesItems} />
    </Fragment>
  );
}

export default MainRecipesPage;
