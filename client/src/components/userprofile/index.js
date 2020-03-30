import React, { Component } from "react";
import {
  getUserPosts,
  submitPost,
  getUsername,
  deletePost,
  getFollowees,
  getFollowers,
  postPhoto,
  getPhoto
} from "../../services/api-helper";
import NavBar from "../navbar";
import Postcard from "../postcard";

import picture from "./default.png";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      posts: [],
      currentlyLoggedInUser: false,
      postInput: "",
      followees: [],
      followers: [],
      selectedImage: null
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
          image={this.state.selectedImage}
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
    let selectedImage = await getPhoto(localStorage.getItem("userId"));
    if (!selectedImage) {
      selectedImage = picture;
    }
    await this.setState({ selectedImage });
  };

  handleInput = e => {
    let { value } = e.target;
    this.setState(prevState => ({
      postInput: value
    }));
  };

  // handleSelectFile = async event => {};

  handleSelectUpload = async event => {
    await this.setState({ selectedFile: event.target.files[0] });
    const formData = new FormData();
    formData.append("image", this.state.selectedFile);
    await postPhoto(localStorage.getItem("userId"), formData);
    let selectedImage = await getPhoto(localStorage.getItem("userId"));
    await this.setState({ selectedImage });
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
      <div className="w-full">
        <div className="flex flex-column">
          <div className="block w-1/4 my-8 fixed">
            <NavBar></NavBar>
          </div>
          <div className="block w-1/2 m-auto">
            <div className="my-5 border-b border-grey-300  mb-5 flex flex-column justify-around">
              <div className="relative">
                <img
                  className="relative h-48 w-48 border rounded-full object-cover object-center"
                  src={this.state.selectedImage}
                  alt={picture}
                ></img>
                <label className="absolute bottom-0 right-0 w-16 h-16 flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white rounded-full">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <input
                    onChange={this.handleSelectUpload}
                    type="file"
                    class="hidden"
                  />
                </label>
              </div>
              <div className="m-auto">
                <div className="block text-black text-lg font-bold text-center">
                  {`${this.state.username}'s profile`}
                </div>
                <div className="block">{`${this.state.followers.length} followers and following ${this.state.followees.length}`}</div>
              </div>
            </div>
            <form
              className="text-center bg-white border-b border-grey-300 mb-4"
              onSubmit={this.handleSubmit}
            >
              <div className="flex flex-row">
                <div className="block w-12 min-w-12 mx-2">
                  <img
                    className="block h-12 w-12 border rounded-full object-cover object-center"
                    src={this.state.selectedImage}
                    alt={picture}
                  ></img>
                </div>
                <div className="block w-4/5 mx-4">
                  <input
                    placeholder="New Post"
                    onChange={this.handleInput}
                    value={this.state.postInput}
                    className="block w-full appearance-none rounded w-4/5 my-2 py-2 text-gray-700 leading-tight focus:outline-none focus:border-none"
                  ></input>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <button className="bg-blue-500 mx-4 hover:bg-blue-700 text-white font-bold mb-2 py-2 px-4 rounded-full">
                  Submit post
                </button>
              </div>
            </form>
            {this.renderPosts()}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
