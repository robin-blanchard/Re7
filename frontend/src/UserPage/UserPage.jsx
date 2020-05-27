import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { axiosInstanceNoAuth } from "../axiosApi";

import InfiniteScroll from "../RecipeGrid/InifiniteScroll";
import RecipeGrid from "../RecipeGrid/RecipeGrid";

const UserPage = (props) => {
  const { username } = useParams();

  return (
    <Fragment>
      <h1>Welcome to {username}'s page</h1>
      <InfiniteScroll
        componentToScroll={RecipeGrid}
        axiosInstance={axiosInstanceNoAuth}
        limit={6}
        url={"api/user/" + username}
      />
    </Fragment>
  );
};

export default UserPage;
