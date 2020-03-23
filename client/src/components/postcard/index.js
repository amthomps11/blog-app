import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./postcard.css";

class Postcard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="max-w-sm mx-auto my-2 p-6 bg-white rounded-lg shadow-xl">
        <NavLink className="text-blue-700" to={`/users/${this.props.userId}`}>
          {this.props.username}
        </NavLink>
        <hr></hr>
        <div className="block">{this.props.body}</div>
        <hr></hr>
        <div className="block">{this.props.created_at}</div>
      </div>
    );
  }
}

export default Postcard;
