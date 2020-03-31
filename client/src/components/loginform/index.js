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
    const userData = await loginUser(this.state.registerData);
    decode(userData.data.token);
    localStorage.setItem("jwt", userData.data.token);
    localStorage.setItem("userId", userData.data.userId);
    this.handleLoginButton();
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
      <div className="">
        <div className="">
          <div className="text-center m-5 text-lg">Twitter-Blog-Clone</div>
          <div className="inline-block px-4 py-2 m-2 ">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={this.handleLogin}
            >
              <h2>Login</h2>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                onChange={this.handleLoginInput}
                value={this.state.username}
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={this.handleLoginInput}
                value={this.state.password}
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </form>
          </div>
          <div className="inline-block px-4 py-2 m-2">
            <form
              onSubmit={this.handleRegister}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <h2>Register</h2>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                onChange={this.handleRegisterInput}
                value={this.state.username}
              />
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      </div>
    );
  }
}

export default withRouter(LoginForm);
