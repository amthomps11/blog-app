import React, { Component } from "react";
import NavBar from "../navbar";
import { getUserPosts } from "../../services/api-helper";

class OtherUser extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  getPosts = async () => {
    let posts = await getUserPosts(this.props.id);
    this.setState({ posts });
  };

  renderPosts = () => {
    return this.state.posts.map((post, index) => {
      return <div key={index}>{post.body}</div>;
    });
  };

  componentDidMount = async () => {
    await this.getPosts();
  };
  render() {
    return (
      <div>
        <NavBar></NavBar>
        OtherUser
        {this.props.id}
        {this.renderPosts()}
      </div>
    );
  }
}

export default OtherUser;
