import React, { Component } from "react";
import NavBar from "../navbar";
import { getUserPosts, followUser } from "../../services/api-helper";

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

  handleFollowButton = async () => {
    let userId = localStorage.getItem("userId");
    let data = {
      follow: {
        followee_id: this.props.id,
        follower_id: userId
      }
    };
    await followUser(data);
  };
  render() {
    return (
      <div>
        <NavBar></NavBar>
        OtherUser
        <button onClick={this.handleFollowButton}>Follow</button>
        {this.props.id}
        {this.renderPosts()}
      </div>
    );
  }
}

export default OtherUser;
