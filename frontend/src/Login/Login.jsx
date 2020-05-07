import React, { useState, Fragment } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFailAlert, setShowFailAlert] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFailAlert(false);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    Axios.post(
      process.env.REACT_APP_BACKEND_URL + "auth/token/obtain/",
      formData
    )
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        props.handleLogin();
        history.push("/recipes");
      })
      .catch((error) => {
        setShowFailAlert(true);
      });
  };

  if (props.logged) {
    return (
      <Fragment>
        <p>Already logged !</p>
        <Button variant="danger" onClick={props.handleSignOut}>
          Sign out
        </Button>
      </Fragment>
    );
  } else {
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
          <Button type="submit">Se connecter</Button>
        </Form>
      </Fragment>
    );
  }
}

export default Login;
