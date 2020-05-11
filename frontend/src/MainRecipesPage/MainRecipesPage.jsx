import React, { useState, useEffect } from "react";
import Axios from "axios";

import RecipeGrid from "../RecipeGrid/RecipeGrid";

function MainRecipesPage() {
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

  return <RecipeGrid items={recipesItems} />;
}

export default MainRecipesPage;
