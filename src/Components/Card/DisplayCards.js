import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { server } from "../../server";
import "holderjs";
import setAuthToken from "../../setAuthToken";

function DisplayCards(props) {
  const [data, setData] = useState([]);
  const [toRemove, setToRemove] = useState([]);
  const colors = [
    "Primary",
    "Secondary",
    "Success",
    "Danger",
    "Warning",
    "Info",
    "Dark"
  ];
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
      axios
        .post(`${server}/aruegame/getfourrandomcards`, {toRemove: toRemove})
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
    console.log("toRemove",toRemove);
    console.log("data", data);
    axios
      .post(`${server}/aruegame/getrandomcards`, {toRemove: toRemove, empty: data.length <= 0 ? true : false} )
      .then(res => res.data.cards.length > 0 ? setData(prevData => prevData.concat(res.data.cards) ): console.log(res.data))
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
          // height: "90vh",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          justifyItems: "center",
          alignItems: "center"
        }}
      >
        {data.map((item, key) => (
          <div>
            <Card
              key={key}
              // text="light"
              bg={"" + colors[5].toLowerCase()}
              style={{ width: "18rem", cursor: "pointer" }}
              className="mb-2"
              onClick={() => {
                const newD = data.filter(i => i.id !== item.id);
                const tRemove = newD.map(i => i.id);
                setToRemove([...tRemove]);
                setData(newD);
              }}
            >
              <Card.Img
                variant="top"
                style={{ height: "200px" }}
                src={`${item ? item.photoUrl : ""}`}
              />
              <Card.Body>
                <Card.Text>Name: {item ? item.name : ""}</Card.Text>
                <Card.Text>
                  Description: {item ? item.description : ""}
                </Card.Text>
                <Card.Text>Value: {item ? item.value : ""}</Card.Text>
                <Card.Text>Author: {item ? item.author : ""}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
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
