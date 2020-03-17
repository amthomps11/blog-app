import React, { Component } from "react";
import NavBar from "../navbar";
import { getUsers } from "../../services/api-helper";
import { NavLink } from "react-router-dom";

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
        <div className="bg-gray-200 p-4">
          <NavLink
            className="block text-gray-700 text-center bg-gray-400 px-4 py-2 hover:text-white hover:bg-blue-700"
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
      <div>
        <NavBar></NavBar>
        <h2 className="text-black text-center px-4 py-2 m-2">UserList</h2>
        <hr className="mx-2"></hr>
        {this.renderUsers()}
      </div>
    );
  }
}

export default UserList;
