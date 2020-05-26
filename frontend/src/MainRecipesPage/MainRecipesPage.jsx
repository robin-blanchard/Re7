import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import { axiosInstanceNoAuth } from "../axiosApi";

import RecipeGrid from "../RecipeGrid/RecipeGrid";

function MainRecipesPage() {
  const [recipesItems, setRecipesItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handlePageBottom = () => {
    setIsFetching(true);
  };

  const checkPageBottom = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
      // document.body.clientHeight < window.innerHeight
    ) {
      handlePageBottom();
    }
  };

  useEffect(() => {
    checkPageBottom();
    window.addEventListener("scroll", checkPageBottom);
    return () => window.removeEventListener("scroll", checkPageBottom);
  }, [recipesItems]);

  const fetchMoreListItems = () => {
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    const offset = recipesItems.length;
    const limit = 6;

    axiosInstanceNoAuth
      .get("api/recipes?limit=" + limit + "&offset=" + offset, {
        cancelToken: source.token,
      })
      .then((response) => {
        setIsFetching(false);
        setRecipesItems([...recipesItems, ...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      source.cancel();
    };
  };

  useEffect(() => {
    if (!isFetching) return;

    return fetchMoreListItems();
  }, [isFetching]);

  return (
    <Fragment>
      <h1 className="text-center">Voici les dernières recettes !</h1>
      <RecipeGrid items={recipesItems} />
    </Fragment>
  );
}

export default MainRecipesPage;
