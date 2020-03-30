import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { convertTime } from "../../services/convertTime";
import "./postcard.css";

class Postcard extends Component {
  constructor(props) {
    super(props);
    this.state = { deleted: false };
  }

  render() {
    return (
      <div className="w-lg mx-auto my-2 bg-white border-b border-grey-300">
        <div className="flex flex-row">
          <div className="block w-12 min-w-12 mx-2">
            <img
              className="h-12 w-12 border rounded-full object-cover object-center"
              src={this.props.image}
            ></img>
          </div>
          <div className="block w-4/5 mx-4">
            <NavLink
              className="text-blue-700"
              to={`/users/${this.props.userId}`}
            >
              {this.props.username}
            </NavLink>

            <div className="block">{this.props.body}</div>
            <div className="flex flex-row justify-between text-gray-600">
              {convertTime(this.props.created_at)}
              {this.props.selfPost ? (
                <button
                  className="text-gray-600 rounded position-top-right"
                  onClick={() => this.props.deleteFunction(this.props.postId)}
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Postcard;
