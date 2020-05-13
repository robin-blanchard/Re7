import React, { useState, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";

import axiosInstance from "../axiosApi";

import SubmissionAlert from "./SubmissionAlert";
import RecipeForm from "./RecipeForm";

import { extractPhotoName } from "../utils";

function ModifyRecipe() {
  const { id } = useParams();
  const data = useLocation();
  const initialState = data.state.recipeDetails;

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [recipeFormData, setRecipeFormData] = useState({});

  const handleSubmit = () => {
    const orderedInstructions = recipeFormData["instructions"].map(
      (item, idx) => ({
        order: idx,
        text: item.text,
      })
    );

    const formData = new FormData();
    formData.append("name", recipeFormData["name"]);
    formData.append("difficulty", recipeFormData["difficulty"]);
    formData.append("prep_time", recipeFormData["prep_time"]);
    formData.append("bake_time", recipeFormData["bake_time"]);
    formData.append("total_time", recipeFormData["total_time"]);
    formData.append("creater", localStorage.getItem("username"));

    formData.append(
      "ingredients",
      JSON.stringify(recipeFormData["ingredients"])
    );
    formData.append("instructions", JSON.stringify(orderedInstructions));

    if (!!recipeFormData["photo"]) {
      if (
        typeof recipeFormData["photo"] === "string" ||
        recipeFormData["photo"] instanceof String
      ) {
        formData.set("photo", extractPhotoName(recipeFormData["photo"]));
      } else {
        formData.set("photo", recipeFormData["photo"]);
      }
    }
    console.log(formData);
    axiosInstance
      .patch("api/recipes/" + id, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        setShowAlert(true);
        setAlertType("success");
        console.log(response);
        return 0;
      })
      .catch(function (response) {
        setShowAlert(true);
        setAlertType("failure");
        console.log(response);
        return -1;
      });
  };
  return (
    <Fragment>
      <SubmissionAlert
        show={showAlert}
        type={alertType}
        unshowAlert={() => setShowAlert(false)}
      />
      <RecipeForm
        initialState={initialState}
        submitName={"Modifier"}
        setRecipeFormData={setRecipeFormData}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
}
export default ModifyRecipe;
