import React, { useState, Fragment } from "react";
import { axiosInstanceNoAuth } from "../axiosApi";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFailAlert, setShowFailAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFailAlert(false);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axiosInstanceNoAuth
      .post("auth/token/obtain/", formData)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("username", username);
        props.handleLogin();
      })
      .catch((error) => {
        console.log(error);
        setShowFailAlert(true);
      });
  };

  return (
    <Fragment>
      <Alert
        show={showFailAlert}
        variant="danger"
        onClose={() => setShowFailAlert(false)}
        dismissible
      >
        Oups, vos identifiants ne fonctionnent pas. Veuillez ré-essayer
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="text-center">
          <Button type="submit" variant="outline-info">
            Se connecter
          </Button>
        </Form.Group>
      </Form>
      <hr />
      <div className="text-center">
        Pas encore de compte?
        <Link to="/register">
          <Button variant="outline-info">Créer un compte</Button>
        </Link>
      </div>
    </Fragment>
  );
}

export default Login;
