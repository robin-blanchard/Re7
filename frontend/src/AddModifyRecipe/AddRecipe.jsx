import React, { useState, Fragment } from "react";

import UseAnimations from "react-useanimations";

import { axiosInstanceAuth } from "../axiosApi";
import SubmissionAlert from "./SubmissionAlert";
import RecipeForm from "./RecipeForm";

function AddRecipe(props) {
  const initialState = {
    name: "",
    difficulty: "1",
    prep_time: 0,
    bake_time: 0,
    total_time: 0,
    photo: null,
    nb_covers: 1,
    ingredients: [
      {
        quantity: 0,
        unit: "kg",
        product: { id: "", name: "" },
      },
    ],
    instructions: [
      {
        order: 0,
        text: "",
      },
    ],
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [recipeFormData, setRecipeFormData] = useState({});

  const handleSubmit = () => {
    const orderedInstructions = recipeFormData["instructions"].map((item, idx) => ({
      order: idx,
      text: item.text,
    }));

    const formData = new FormData();
    formData.append("name", recipeFormData["name"]);
    formData.append("difficulty", recipeFormData["difficulty"]);
    formData.append("prep_time", recipeFormData["prep_time"]);
    formData.append("bake_time", recipeFormData["bake_time"]);
    formData.append("total_time", recipeFormData["total_time"]);
    formData.append("nb_covers", recipeFormData["nb_covers"]);
    formData.append("creater", localStorage.getItem("username"));

    formData.append("ingredients", JSON.stringify(recipeFormData["ingredients"]));
    formData.append("instructions", JSON.stringify(orderedInstructions));

    if (!!recipeFormData["photo"]) {
      formData.set("photo", recipeFormData["photo"]);
    }

    axiosInstanceAuth
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
  return props.logged ? (
    <Fragment>
      <SubmissionAlert show={showAlert} type={alertType} unshowAlert={() => setShowAlert(false)} />
      <RecipeForm initialState={initialState} submitName={"Ajouter la recette"} setRecipeFormData={setRecipeFormData} handleSubmit={handleSubmit} />
    </Fragment>
  ) : (
    <div className="d-flex flex-row justify-content-center">
      <UseAnimations animationKey="alertCircle" />
      Vous devez vous connecter pour pouvoir ajouter une recette
      <UseAnimations animationKey="alertCircle" />
    </div>
  );
}
export default AddRecipe;
