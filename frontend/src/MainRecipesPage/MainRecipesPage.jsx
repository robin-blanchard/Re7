import React, { Fragment } from "react";
import { axiosInstanceNoAuth } from "../axiosApi";

import InfiniteScroll from "../Grid/InifiniteScroll";
import Grid from "../Grid/Grid";
import RecipeCard from "../RecipeCard/RecipeCard";

function MainRecipesPage() {
  return (
    <Fragment>
      <h1 className="text-center">Voici les dernières recettes !</h1>
      <InfiniteScroll
        componentToScroll={Grid}
        cardComponent={RecipeCard}
        axiosInstance={axiosInstanceNoAuth}
        limit={6}
        url={"api/recipes"}
      />
    </Fragment>
  );
}

export default MainRecipesPage;
