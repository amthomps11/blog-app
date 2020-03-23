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
          userId={post.user_restricted.id}
          username={post.user_restricted.username}
          created_at={post.created_at}
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

        <h2 className="text-black text-center px-4 py-2 m-2">Homepage</h2>

        {this.renderTEMP()}
      </div>
    );
  }
}

export default Homepage;
