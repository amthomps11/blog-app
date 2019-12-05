import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: true };
  }

  handleLogoutButton = () => {
    let loggedIn = !this.state.loggedIn;
    this.setState({ loggedIn });
  };

  handleLogout = async e => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    this.handleLogoutButton();
  };

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <>
        <ul>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/userlist">Userlist</NavLink>
          <button onClick={this.handleLogout}>Sign Out</button>
        </ul>
      </>
    );
  }
}

export default NavBar;
