import React from "react";
import "./App.css";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import MakeCard from "./Components/Card/MakeCard";
import DisplayCards from "./Components/Card/DisplayCards";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <header > */}
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/make-cards" component={MakeCard} />
        {/* </header> */}
        <Route exact path="/show-cards" component={DisplayCards} />
      </Router>
    </div>
  );
}

export default App;
