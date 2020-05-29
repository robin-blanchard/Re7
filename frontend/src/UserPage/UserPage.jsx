import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { axiosInstanceNoAuth } from "../axiosApi";

import InfiniteScroll from "../Grid/InfiniteScroll";
import Grid from "../Grid/Grid";
import RecipeCard from "../Cards/RecipeCard";

const UserPage = () => {
  const { username } = useParams();

  return (
    <Fragment>
      <h1>Profil de {username}</h1>
      <InfiniteScroll
        componentToScroll={Grid}
        cardComponent={RecipeCard}
        axiosInstance={axiosInstanceNoAuth}
        limit={6}
        url={"api/user/" + username}
      />
    </Fragment>
  );
};

export default UserPage;
