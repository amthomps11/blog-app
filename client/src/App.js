import React from "react";
import "./App.css";
import { getUsers } from "./services/api-helper";
import UserProfile from "./components/userprofile";
import LoginForm from "./components/loginform";
import Homepage from "./components/homepage";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  async getAllUsers() {
    let users = await getUsers();
    this.setState({ users });
  }

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    return (
      <div className="app-container">
        <LoginForm />
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/profile" component={UserProfile} />
        </Switch>
      </div>
    );
  }
}

export default App;
