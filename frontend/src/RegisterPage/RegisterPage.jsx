import React, { useState, Fragment } from "react";
import { axiosInstanceNoAuth } from "../axiosApi";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const RegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showFailAlert, setShowFailAlert] = useState(false);
  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();
    setShowFailAlert(false);

    const formData = {
      email: email,
      username: username,
      password: password,
    };

    axiosInstanceNoAuth
      .post("auth/user/create/", formData)
      .then((response) => {
        const formDataLogin = new FormData();
        formDataLogin.append("username", username);
        formDataLogin.append("password", password);

        axiosInstanceNoAuth
          .post("auth/token/obtain/", formDataLogin)
          .then((response) => {
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            localStorage.setItem("username", username);
            props.handleLogin();
            history.push("/recipes");
          })
          .catch((error) => {
            console.log(error);
            setShowFailAlert(true);
          });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);

        setShowFailAlert(true);
        return;
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
        Une erreur est survenue. Veuillez ré-essayer
      </Alert>
      <Form onSubmit={handleRegister}>
        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </Form.Group>
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
        <Button type="submit">Créer mon compte</Button>
      </Form>
    </Fragment>
  );
};

export default RegisterPage;
