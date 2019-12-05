import React from "react";
import "./App.css";
import { getUsers } from "./services/api-helper";
import UserProfile from "./components/userprofile";
import LoginForm from "./components/loginform";
import Homepage from "./components/homepage";
import { Route, Switch } from "react-router-dom";
import UserList from "./components/userlist";
import OtherUser from "./components/otheruser";

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
          <Route exact path="/userlist" component={UserList} />
          <Route
            exact
            path="/users/:id"
            render={props => (
              <OtherUser {...props} id={props.match.params.id} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
