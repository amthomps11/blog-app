import React, { Component } from "react";
import "./postcard.css";

class Postcard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="max-w-sm mx-auto my-2 p-6 bg-white rounded-lg shadow-xl">
        <div className="block">{this.props.username}</div>
        <hr></hr>
        <div className="block">{this.props.body}</div>
      </div>
    );
  }
}

export default Postcard;
