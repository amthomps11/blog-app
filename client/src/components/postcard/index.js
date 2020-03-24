import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./postcard.css";

class Postcard extends Component {
  constructor(props) {
    super(props);
    this.state = { deleted: false };
  }

  render() {
    return (
      <div className="max-w-sm mx-auto my-2 p-6 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between">
          <NavLink className="text-blue-700" to={`/users/${this.props.userId}`}>
            {this.props.username}
          </NavLink>
          {this.props.selfPost ? (
            <button
              className="text-white bg-red-500 rounded"
              onClick={() => this.props.deleteFunction(this.props.postId)}
            >
              X
            </button>
          ) : null}
        </div>
        <hr></hr>
        <div className="block">{this.props.body}</div>
        <hr></hr>
        <div className="block">{this.props.created_at}</div>
      </div>
    );
  }
}

export default Postcard;
