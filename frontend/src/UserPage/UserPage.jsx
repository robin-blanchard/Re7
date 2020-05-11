import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const UserPage = (props) => {
  const { username } = useParams();
  return <h1>Welcome to {username}'s profile</h1>;
};

export default UserPage;
