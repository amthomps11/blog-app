import React, { Component } from "react";
import Navbar from "../navbar";
import Postcard from "../postcard";
import { getFolloweesPosts } from "../../services/api-helper";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { feed: [] };
  }

  getUserPosts = async () => {
    let feed = await getFolloweesPosts(localStorage.getItem("userId"));
    this.setState({ feed });
  };

  renderTEMP = () => {
    let { feed } = this.state;
    return feed.map(post => {
      return (
        <Postcard
          body={post.body}
          username={post.user_restricted.username}
        ></Postcard>
      );
    });
  };

  componentDidMount = async () => {
    this.getUserPosts();
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>
        Homepage
        {this.renderTEMP()}
      </div>
    );
  }
}

export default Homepage;
