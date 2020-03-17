import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: true };
  }

  handleLogoutButton = () => {
    // let loggedIn = !this.state.loggedIn;
    // this.setState({ loggedIn });
  };

  handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    this.handleLogoutButton();
    let loggedIn = !this.state.loggedIn;
    this.setState({ loggedIn });
  };

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <>
        <ul>
          <NavLink
            className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
            to="/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
            to="/userlist"
          >
            Userlist
          </NavLink>
          <button
            className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"
            onClick={this.handleLogout}
          >
            Sign Out
          </button>
        </ul>
      </>
    );
  }
}

export default NavBar;
