import React, { Component } from "react";
// import './App.css';
import "./styles/App.scss";
import axios from "axios";
import Cities from "./Cities";

class App extends Component {
  ///this s the constructor method. it is run once at the beginning of the component lifecycle. it is used to set initial state
  render() {
    return (
      <div className="App">        
        <Cities />
      </div>
    );
  }
}

export default App;
