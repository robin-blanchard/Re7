import React, { useState, useEffect } from "react";
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

  return <RecipeGrid items={recipesItems} />;
}

export default MainRecipesPage;
