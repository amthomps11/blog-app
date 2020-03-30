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

  // componentDidMount() {
  //   localStorage.setItem("userId", 5);
  // }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <>
        <ul className="border-r border-grey-300 mx-auto container">
          <NavLink
            className="block w-1/2 text-gray-700 text-center px-4 py-2 mx-auto rounded-full hover:bg-blue-200 hover:text-blue-500"
            activeClassName="text-blue-500"
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className="block w-1/2 text-gray-700 text-center px-4 py-2 mx-auto rounded-full hover:bg-blue-200 hover:text-blue-500"
            activeClassName="text-blue-500"
            to="/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className="block w-1/2 text-gray-700 text-center px-4 py-2 mx-auto rounded-full hover:bg-blue-200 hover:text-blue-500"
            activeClassName="text-blue-500"
            to="/userlist"
          >
            Userlist
          </NavLink>
          <button
            className="block w-1/2 text-gray-700 text-center px-4 py-2 mx-auto rounded-full hover:bg-blue-200 hover:text-blue-500"
            activeClassName="text-blue-500"
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
