import React from "react";
import "./App.css";
import { getUsers } from "./services/api-helper";
import UserProfile from "./components/userprofile";

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
        <UserProfile></UserProfile>
      </div>
    );
  }
}

export default App;
