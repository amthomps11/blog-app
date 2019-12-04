import React, { Component } from "react";
import { getUserPosts } from "../../services/api-helper";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  async getPosts() {
    let posts = await getUserPosts(1);
    this.setState({ posts });
  }

  componentDidMount() {
    this.getPosts();
  }
  render() {
    return <div>UserProfile</div>;
  }
}

export default UserProfile;
