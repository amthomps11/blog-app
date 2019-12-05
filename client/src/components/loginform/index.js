import React, { Component } from "react";
import decode from "jwt-decode";
import { loginUser } from "../../services/api-helper";
import { withRouter, Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { authData: { username: "", password: "" }, loggedIn: false };
  }

  handleLoginButton = () => {
    this.setState({ loggedIn: true });
  };

  handleLogin = async e => {
    e.preventDefault();
    const userData = await loginUser(this.state.authData);
    decode(userData.data.token);
    localStorage.setItem("jwt", userData.data.token);
    localStorage.setItem("userId", userData.data.userId);
    this.handleLoginButton();
  };

  handleInput = async e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState(prevState => ({
      authData: {
        ...prevState.authData,
        [name]: value
      }
    }));
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="login-component-wrapper">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={this.handleLogin}>
            <p>Username:</p>
            <input
              name="username"
              onChange={this.handleInput}
              value={this.state.username}
            />
            <p>Password:</p>
            <input
              type="password"
              name="password"
              onChange={this.handleInput}
              value={this.state.password}
            />
            <button className="login-button">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
