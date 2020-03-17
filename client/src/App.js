//Main
import React from "react";
import "./App.css";

//Bootstrap
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/css/bootstrap-theme.css";

//React Router
import { Route, Switch, Redirect } from "react-router-dom";
import { getUsers } from "./services/api-helper";

//Components
import UserProfile from "./components/userprofile";
import NavBar from "./components/navbar";

import LoginForm from "./components/loginform";
import UserList from "./components/userlist";
import OtherUser from "./components/otheruser";
import Homepage from "./components/homepage";

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
        <Redirect to="/login"></Redirect>
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
