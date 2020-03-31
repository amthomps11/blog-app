import React, { Component } from "react";
import NavBar from "../navbar";
import Postcard from "../postcard";
import {
  getUserPosts,
  followUser,
  getUsername,
  getFollowees,
  getFollowers,
  getPhoto
} from "../../services/api-helper";
import picture from "../userprofile/default.png";

class OtherUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      posts: [],
      followees: [],
      followers: [],
      selectedImage: null,
      isFollowing: false
    };
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
          image={this.state.selectedImage}
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
    let followees = await getFollowees(this.props.id);
    let followers = await getFollowers(this.props.id);
    let user = await getUsername(parseInt(this.props.id));
    let username = user.username;
    await this.setState({ username, followees, followers });
    let selectedImage = await getPhoto(this.props.id);
    if (!selectedImage) {
      selectedImage = picture;
    }
    await this.setState({ selectedImage });
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

  handleUnFollowButton = async () => {
    let userId = localStorage.getItem("userId");
    let data = {
      follow: {
        followee_id: this.props.id,
        follower_id: userId
      }
    };
  };

  render() {
    return (
      <div className="w-full">
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
            </div>
            <div className="m-auto ">
              <div className="block text-black text-lg font-bold text-center">
                {`${this.state.username}'s profile`}
              </div>
              <div className="block">{`${this.state.followers.length} followers and following ${this.state.followees.length}`}</div>
              <div className="w-full text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 m-auto rounded-full text-white font-bold py-2 px-4 rounded"
                  onClick={this.handleFollowButton}
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

export default OtherUser;
