import React, { Component } from "react";
import NavBar from "../navbar";
import Postcard from "../postcard";
import {
  getUserPosts,
  followUser,
  getUsername
} from "../../services/api-helper";

class OtherUser extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", posts: [] };
  }

  getPosts = async () => {
    let posts = await getUserPosts(this.props.id);
    this.setState({ posts });
  };

  renderPosts = () => {
    let tempUsername = this.state.username;
    return this.state.posts.map((post, index) => {
      return (
        <Postcard
          key={index}
          userId={this.props.id}
          username={tempUsername}
          body={post.body}
          created_at={post.created_at}
        ></Postcard>
      );
    });
  };

  componentDidMount = async () => {
    await this.getPosts();
    let user = await getUsername(parseInt(this.props.id));
    let username = user.username;
    await this.setState({ username });
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
        <div className="text-center">
          <h2 className="text-black text-center px-4 py-2 m-2">{`${this.state.username}'s Profile`}</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={this.handleFollowButton}
          >
            Follow
          </button>
        </div>
        {this.renderPosts()}
      </div>
    );
  }
}

export default OtherUser;
