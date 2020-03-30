import React, { Component } from "react";
import NavBar from "../navbar";
import { getUsers } from "../../services/api-helper";
import { NavLink } from "react-router-dom";

import picture from "../userprofile/default.png";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  getAllUsers = async () => {
    let users = await getUsers();
    this.setState({ users });
  };

  renderUsers = () => {
    return this.state.users.map((user, index) => {
      return (
        <div className="flex flex-row w-full m-2 border-b border-grey-500 mb-2 pb-2">
          {user.image ? (
            <img className="rounded-full w-12 h-12" src={user.image.url}></img>
          ) : (
            <img className="rounded-full w-12 h-12" src={picture}></img>
          )}
          <NavLink
            className=" text-center px-4 py-2 hover:text-white hover:text-blue-500"
            to={`/users/${user.id}`}
          >
            {user.username}
          </NavLink>
        </div>
      );
    });
  };

  componentDidMount = async () => {
    await this.getAllUsers();
  };

  render() {
    return (
      <div className="w-full">
        <div className="flex flex-column">
          <div className="block w-1/4 my-8 fixed">
            <NavBar></NavBar>
          </div>
          <div className="block w-1/2 m-auto pl-4">
            <h2 className="text-black text-center px-4 py-2 m-2">UserList</h2>
            {this.renderUsers()}
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
