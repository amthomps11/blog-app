import React, { Component } from "react";
import Navbar from "../navbar";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar></Navbar>
        Homepage
      </div>
    );
  }
}

export default Homepage;
