import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Dashboard(props) {
  return (
    <div className="App-header">
      <div style={{ margin: "20px" }}>
        <Link to="/show-cards">
          <Button
            variant="primary"
            size="lg"
            block
            style={{ padding: "40px 70px 40px 70px" }}
          >
            Play
          </Button>{" "}
        </Link>
      </div>
      <div style={{ margin: "20px" }}>
        <Link to="/make-cards">
          <Button variant="info" size="lg" block style={{ padding: "40px" }}>
            Make Card
          </Button>{" "}
        </Link>
      </div>
      <div style={{ margin: "20px" }}>
        <Button
          variant="danger"
          size="lg"
          block
          style={{ padding: "10px 65px 10px 65px" }}
          onClick={() => {
            localStorage.removeItem("token");
            props.history.push("/");
          }}
        >
          Logout
        </Button>{" "}
      </div>
    </div>
  );
}

export default Dashboard;
