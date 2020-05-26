import React from "react";

import Alert from "react-bootstrap/Alert";

function SubmissionAlert(props) {
  const color = props.type === "success" ? "success" : "danger";
  const successText = "Votre recette a bien été enregistrée!";
  const failText =
    "Oups, un problème est survenu, votre recette n'a pas été enregistrée.";
  const textToDisplay =
    props.type === "success"
      ? successText
      : props.type === "failure"
      ? failText
      : "";

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
