import React, { Fragment } from "react";
import { axiosInstanceNoAuth } from "../axiosApi";

import InfiniteScroll from "../RecipeGrid/InifiniteScroll";
import RecipeGrid from "../RecipeGrid/RecipeGrid";

function MainRecipesPage() {
  return (
    <Fragment>
      <h1 className="text-center">Voici les dernières recettes !</h1>
      <InfiniteScroll
        componentToScroll={RecipeGrid}
        axiosInstance={axiosInstanceNoAuth}
        limit={6}
        url={"api/recipes"}
      />
    </Fragment>
  );
}

export default MainRecipesPage;
