import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import HandleFormValidation from "./handleFormValidation";
import validateLoginForm from "./validateLoginForm";
import validateRegisterForm from "./validateRegisterForm";
import axios from "axios";
import { server } from "../../server";
import setAuthToken from "../../setAuthToken";

const INITIAL_STATE = {
  username: "",
  password: "",
  confirmPassword: ""
};
function Login(props) {
  const [login, setLogin] = useState(true);
  const {
    handleChange,
    values,
    handleBlur,
    errors,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleRegisterFormBlue,
    setValues
  } = HandleFormValidation(
    INITIAL_STATE,
    validateLoginForm,
    authenticateUser,
    validateRegisterForm
  );

  function authenticateUser() {
    if (login) {
      const loginObj = {
        username: values.username,
        password: values.password
      };
      axios
        .post(`${server}/auth/login`, loginObj)
        .then(res => {
          localStorage.setItem("token", res.data.accessToken);
          setAuthToken(localStorage.getItem("token"));
          props.history.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
          window.alert(err);
        });
    } else {
      const registerObj = {
        username: values.username,
        password: values.password
      };
      axios
        .post(`${server}/auth/signup`, registerObj)
        .then(res => {
          props.history.push("/");
        })
        .catch(err => {
          console.log(err);
          window.alert(err);
        });
    }
  }

  function LoginForm() {
    return (
      <Card border="primary" style={{ width: "60%" }}>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form style={{ textAlign: "left", fontSize: "20px" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={handleChange}
                value={values.username}
                onBlur={handleBlur}
              />
              <div style={{ color: "red", fontSize: "15px" }}>
                {errors.username ? errors.username : ""}
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <div style={{ color: "red", fontSize: "15px" }}>
                {errors.password ? errors.password : ""}
              </div>
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleLoginSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }

  function SignupForm() {
    return (
      <Card border="success" style={{ width: "60%" }}>
        <Card.Header>Sign Up</Card.Header>
        <Card.Body>
          <Form style={{ textAlign: "left", fontSize: "20px" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={handleChange}
                value={values.username}
                onBlur={handleRegisterFormBlue}
              />
              <div style={{ color: "red", fontSize: "15px" }}>
                {errors.username ? errors.username : ""}
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                onBlur={handleRegisterFormBlue}
                value={values.password}
              />
              <div style={{ color: "red", fontSize: "15px" }}>
                {errors.password ? errors.password : ""}
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleRegisterFormBlue}
                value={values.confirmPassword}
              />
              <div style={{ color: "red", fontSize: "15px" }}>
                {errors.confirmPassword ? errors.confirmPassword : ""}
              </div>
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleRegisterSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
  return (
    <div className="App-header">
      <h3 style={{ padding: "20px" }}>ARUE CARD GAME</h3>
      {login ? LoginForm() : SignupForm()}
      {login ? (
        <div style={{ padding: "10px", fontSize: "18px" }}>
          Don't have an account?{" "}
          <Button
            variant="link"
            onClick={() => setLogin(false)}
            style={{ padding: "0" }}
          >
            Register
          </Button>
        </div>
      ) : (
        <div style={{ padding: "10px", fontSize: "18px" }}>
          Already have an account?{" "}
          <Button
            variant="link"
            onClick={() => setLogin(true)}
            style={{ padding: "0" }}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default Login;
