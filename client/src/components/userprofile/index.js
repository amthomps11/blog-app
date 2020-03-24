import React, { Component } from "react";
import {
  getUserPosts,
  submitPost,
  getUsername,
  deletePost,
  getFollowees,
  getFollowers
} from "../../services/api-helper";
import NavBar from "../navbar";
import Postcard from "../postcard";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      posts: [],
      currentlyLoggedInUser: false,
      postInput: "",
      followees: [],
      followers: []
    };
  }

  getPosts = async () => {
    let posts = await getUserPosts(localStorage.getItem("userId"));
    let user = await getUsername(localStorage.getItem("userId"));
    let username = user.username;
    await this.setState({ username, posts });
  };

  handleDelete = async id => {
    await deletePost(id);
    await this.getPosts();
  };

  renderPosts = () => {
    return this.state.posts.map((post, index) => {
      return (
        <Postcard
          key={index}
          selfPost={true}
          postId={post.id}
          deleteFunction={this.handleDelete}
          username={this.state.username}
          userId={localStorage.getItem("userId")}
          created_at={post.created_at}
          body={post.body}
        ></Postcard>
      );
    });
  };

  componentDidMount = async () => {
    let followees = await getFollowees(localStorage.getItem("userId"));
    let followers = await getFollowers(localStorage.getItem("userId"));
    await this.setState({ followees, followers });
    await this.getPosts();
  };

  handleInput = e => {
    let { value } = e.target;
    this.setState(prevState => ({
      postInput: value
    }));
  };

  handleFileUpload = e => {
    console.log(e.target);
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
    await this.setState({ postInput: "" });
    await this.getPosts();
  };

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <h2 className="text-black text-center px-4 py-2 m-2">
          {`${this.state.username}'s profile`}
          <input type="file" onChange={this.handleFileUpload}></input>
        </h2>
        {/* <div>{`${this.state.followers.length} followers and following ${this.state.followees.length}`}</div> */}

        <form className="text-center" onSubmit={this.handleSubmit}>
          <input
            placeholder="new post"
            onChange={this.handleInput}
            value={this.state.postInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            submit post
          </button>
        </form>
        {this.renderPosts()}
      </div>
    );
  }
}

export default UserProfile;
