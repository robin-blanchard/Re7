import React, { useState, Fragment } from "react";
import axiosInstance from "../axiosApi";

import SubmissionAlert from "./SubmissionAlert";
import RecipeForm from "./RecipeForm";

function AddRecipe() {
  const initialState = {
    recipeName: "",
    difficulty: "1",
    prepTime: 0,
    bakeTime: 0,
    totalTime: 0,
    recipePhoto: null,
    ingredients: {
      quantity: 0,
      unit: "kg",
      product: { id: "", name: "" },
    },
    instructions: {
      order: 0,
      text: "",
    },
  };

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
    formData.append("name", recipeFormData["recipeName"]);
    formData.append("difficulty", recipeFormData["difficulty"]);
    formData.append("prep_time", recipeFormData["prepTime"]);
    formData.append("bake_time", recipeFormData["bakeTime"]);
    formData.append("total_time", recipeFormData["totalTime"]);
    formData.append("creater", localStorage.getItem("username"));

    formData.append(
      "ingredients",
      JSON.stringify(recipeFormData["ingredients"])
    );
    formData.append("instructions", JSON.stringify(orderedInstructions));

    if (!!recipeFormData["recipePhoto"]) {
      formData.set("photo", recipeFormData["recipePhoto"]);
    }

    axiosInstance
      .post("api/recipes", formData, {
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
        submitName={"Ajouter"}
        setRecipeFormData={setRecipeFormData}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
}
export default AddRecipe;
