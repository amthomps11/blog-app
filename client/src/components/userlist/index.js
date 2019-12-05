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
        <div>
          <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
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
        UserList
        {this.renderUsers()}
      </div>
    );
  }
}

export default UserList;
