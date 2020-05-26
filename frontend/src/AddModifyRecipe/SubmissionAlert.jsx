import React from "react";

import Alert from "react-bootstrap/Alert";

function SubmissionAlert(props) {
  const color =
    "success".repeat(props.type === "success") +
    "danger".repeat(props.type === "failure") +
    "success".repeat(props.type === "deletion-success") +
    "danger".repeat(props.type === "deletion-failure");
  const successText = "Votre recette a bien été enregistrée!";
  const failText =
    "Oups, un problème est survenu, votre recette n'a pas été enregistrée.";
  const deletionSuccessText =
    "Votre recette a bien été supprimée! Vous allez être redirigé.e vers la page d'accueil";
  const deletionFailureText =
    "Oups, un problème est survenu, votre recette n'a pas été supprimée.";
  const textToDisplay =
    successText.repeat(props.type === "success") +
    failText.repeat(props.type === "failure") +
    deletionSuccessText.repeat(props.type === "deletion-success") +
    deletionFailureText.repeat(props.type === "deletion-failure");

  if (props.show) {
    return (
      <Alert variant={color} onClose={props.unshowAlert} dismissible>
        <p>{textToDisplay}</p>
      </Alert>
    );
  }
  return null;
}

export default SubmissionAlert;
