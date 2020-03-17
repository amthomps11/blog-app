import React, { Component } from "react";
import { getUserPosts, submitPost } from "../../services/api-helper";
import NavBar from "../navbar";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], currentlyLoggedInUser: false, postInput: "" };
  }

  getPosts = async () => {
    let posts = await getUserPosts(localStorage.getItem("userId"));
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

  handleInput = e => {
    let { value } = e.target;
    this.setState(prevState => ({
      postInput: value
    }));
  };

  handleSubmit = async e => {
    e.preventDefault();
    let postData = {
      post: {
        body: this.state.postInput,
        user_id: localStorage.getItem("userId")
      }
    };
    await submitPost(postData);
    this.setState({ postInput: "" });
    await this.getPosts();
  };

  render() {
    return (
      <div>
        <NavBar></NavBar>
        UserProfile
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="new post"
            onChange={this.handleInput}
            value={this.state.postInput}
          ></input>
          <button>submit post</button>
        </form>
        {this.renderPosts()}
      </div>
    );
  }
}

export default UserProfile;
