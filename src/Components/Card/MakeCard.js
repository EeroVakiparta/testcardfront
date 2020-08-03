import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { server } from "../../server";
import setAuthToken from "../../setAuthToken";

function MakeCard(props) {
  const [values, setValues] = useState({
    name: "",
    value: "",
    description: "",
    photoUrl: "",
    author: ""
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    } else {
      props.history.push("/");
    }
  });
  function handleChange(event) {
    event.persist();
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post(`${server}/aruegame/createcard`, values)
      .then(res => {
        console.log(res.data);
        window.alert("Success");
      })
      .catch(err => {
        console.log(err);
        window.alert(err);
      });
  }

  return (
    <div className="App-header">
      <div style={{ textAlign: "center", margin: "20px 0 20px 0" }}>
        <Button
          variant="danger"
          onClick={() => {
            localStorage.removeItem("token");
            props.history.push("/");
          }}
        >
          Logout
        </Button>
      </div>
      <Card border="warning" style={{ width: "60%" }}>
        <Card.Header>Make A Card</Card.Header>
        <Card.Body>
          <Form style={{ textAlign: "left", fontSize: "20px" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Value"
                name="value"
                onChange={handleChange}
                value={values.value}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="description"
                onChange={handleChange}
                value={values.description}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Photo Url"
                name="photoUrl"
                onChange={handleChange}
                value={values.photoUrl}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author"
                name="author"
                onChange={handleChange}
                value={values.author}
              />
            </Form.Group>

            <div style={{ textAlign: "center" }}>
              <Button
                variant="primary"
                type="submit"
                onClick={handleFormSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MakeCard;
