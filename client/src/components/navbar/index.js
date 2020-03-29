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

  componentDidMount() {
    localStorage.setItem("userId", 8);
  }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <>
        <ul>
          <NavLink
            className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 hover:bg-blue-700 hover:text-white"
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 hover:bg-blue-700 hover:text-white"
            to="/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 hover:bg-blue-700 hover:text-white"
            to="/userlist"
          >
            Userlist
          </NavLink>
          <button
            className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 hover:bg-blue-700 hover:text-white"
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
