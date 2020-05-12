import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import RecipeGrid from "../RecipeGrid/RecipeGrid";

const UserPage = (props) => {
  const { username } = useParams();
  const [recipesItems, setRecipesItems] = useState([]);

  useEffect(() => {
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();

    const url = process.env.REACT_APP_BACKEND_URL + "api/user/" + username;

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

  return (
    <Fragment>
      <h1>Welcome to {username}'s page</h1>
      <RecipeGrid items={recipesItems} />
    </Fragment>
  );
};

export default UserPage;