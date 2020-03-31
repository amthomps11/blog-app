import React, { Component } from "react";
import NavBar from "../navbar";
import Postcard from "../postcard";
import {
  getUserPosts,
  followUser,
  getUsername,
  getFollowees,
  getFollowers,
  getPhoto,
  getFollowId,
  deleteFollow
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
      isFollowing: false,
      followid: null
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
    let followingId = await getFollowId(
      localStorage.getItem("userId"),
      this.props.id
    );
    if (followingId.length != 0) {
      await this.setState({ isFollowing: true });
      await this.setState({ followid: followingId[0].id });
    }
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
    await this.setState({ isFollowing: true });
    let followees = await getFollowees(this.props.id);
    let followers = await getFollowers(this.props.id);
    await this.setState({ followees, followers });
    let followingId = await getFollowId(
      localStorage.getItem("userId"),
      this.props.id
    );
    await this.setState({ followid: followingId[0].id });
  };

  handleUnFollowButton = async () => {
    await deleteFollow(this.state.followid);
    await this.setState({ isFollowing: false });
    let followees = await getFollowees(this.props.id);
    let followers = await getFollowers(this.props.id);
    await this.setState({ followees, followers });
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
                {this.state.isFollowing ? (
                  <button
                    className="bg-white-500 hover:bg-blue-500 hover:text-white m-auto border border-blue-500 rounded-full text-blue-500 font-bold py-2 px-4 rounded"
                    onClick={this.handleUnFollowButton}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 m-auto rounded-full text-white font-bold py-2 px-4 rounded"
                    onClick={this.handleFollowButton}
                  >
                    Follow
                  </button>
                )}
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
