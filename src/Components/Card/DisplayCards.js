import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { server } from "../../server";
import "holderjs";
import setAuthToken from "../../setAuthToken";

function DisplayCards(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
      axios
        .get(`${server}/aruegame/getrandomcards`)
        .then(res => setData(res.data))
        .catch(err => {
          window.alert(err);
          console.log(err);
        });
    } else {
      props.history.push("/");
    }
  }, []);

  function incrementPoints() { 
    axios
      .post(`${server}/aruegame/incrementpoint`, {})
      .then(res => console.log(res.data))
      .catch(err => {
        window.alert(err);
        console.log(err);
      });
  }
  function generateNewCards() {
    axios
      .get(`${server}/aruegame/getrandomcards`)
      .then(res => setData(res.data))
      .catch(err => {
        window.alert(err);
        console.log(err);
      });
  }
  return (
    <>
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
      <div
        style={{
          height: "90vh",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr 0.5fr",
          justifyItems: "center",
          alignItems: "center"
        }}
      >
        <div>
          <Card bg="primary" style={{ width: "18rem" }} className="mb-2">
            <Card.Img
              variant="top"
              src={`${data[0] ? data[0].photoUrl : ""}`}
            />
            <Card.Body>
              <Card.Text>Name: {data[0] ? data[0].name : ""}</Card.Text>
              <Card.Text>
                Description: {data[0] ? data[0].description : ""}
              </Card.Text>
              <Card.Text>Value: {data[0] ? data[0].value : ""}</Card.Text>
              <Card.Text>Author: {data[0] ? data[0].author : ""}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card bg="info" style={{ width: "18rem" }} className="mb-2">
            <Card.Img
              variant="top"
              src={`${data[1] ? data[1].photoUrl : ""}`}
            />
            <Card.Body>
              <Card.Text>Name: {data[1] ? data[1].name : ""}</Card.Text>
              <Card.Text>
                Description: {data[1] ? data[1].description : ""}
              </Card.Text>
              <Card.Text>Value: {data[1] ? data[1].value : ""}</Card.Text>
              <Card.Text>Author: {data[1] ? data[1].author : ""}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card bg="warning" style={{ width: "18rem" }} className="mb-2">
            <Card.Img
              variant="top"
              src={`${data[2] ? data[2].photoUrl : ""}`}
            />
            <Card.Body>
              <Card.Text>Name: {data[2] ? data[2].name : ""}</Card.Text>
              <Card.Text>
                Description: {data[2] ? data[2].description : ""}
              </Card.Text>
              <Card.Text>Value: {data[2] ? data[2].value : ""}</Card.Text>
              <Card.Text>Author: {data[2] ? data[2].author : ""}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card bg="danger" style={{ width: "18rem" }} className="mb-2">
            <Card.Img
              variant="top"
              src={`${data[3] ? data[3].photoUrl : ""}`}
            />
            <Card.Body>
              <Card.Text>Name: {data[3] ? data[3].name : ""}</Card.Text>
              <Card.Text>
                Description: {data[3] ? data[3].description : ""}
              </Card.Text>
              <Card.Text>Value: {data[3] ? data[3].value : ""}</Card.Text>
              <Card.Text>Author: {data[3] ? data[3].author : ""}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div style={{ margin: "20px" }}>
          <Button onClick={incrementPoints}>Add A Point To Me</Button>
        </div>
        <div style={{ margin: "20px" }}>
          <Button onClick={generateNewCards}>Give A New Card</Button>
        </div>
      </div>
    </>
  );
}

export default DisplayCards;
