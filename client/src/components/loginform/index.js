import React, { Component } from "react";
import decode from "jwt-decode";
import { loginUser, createUser } from "../../services/api-helper";
import { withRouter, Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authData: { username: "", password: "" },
      registerData: { username: "", password: "" },
      loggedIn: false
    };
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

  handleRegisterButton = () => {
    this.props.history.push("/home");
  };

  handleRegister = async e => {
    e.preventDefault();
    await createUser({
      user: this.state.registerData
    });
    // const userData = await loginUser(user);
    // decode(userData.data.token);
    // localStorage.setItem("jwt", userData.data.token);
    // localStorage.setItem("userId", userData.data.userId);
    // this.handleRegisterButton();
  };

  handleLoginInput = async e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState(prevState => ({
      authData: {
        ...prevState.authData,
        [name]: value
      }
    }));
  };

  handleRegisterInput = async e => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState(prevState => ({
      registerData: {
        ...prevState.registerData,
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
              onChange={this.handleLoginInput}
              value={this.state.username}
            />
            <p>Password:</p>
            <input
              type="password"
              name="password"
              onChange={this.handleLoginInput}
              value={this.state.password}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </form>

          <h2>Register</h2>
          <form onSubmit={this.handleRegister}>
            <p>Username:</p>
            <input
              name="username"
              onChange={this.handleRegisterInput}
              value={this.state.username}
            />
            <p>Password:</p>
            <input
              type="password"
              name="password"
              onChange={this.handleRegisterInput}
              value={this.state.password}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
