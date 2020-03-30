import React, { Component } from "react";
import Navbar from "../navbar";
import Postcard from "../postcard";
import { getFolloweesPosts, getPhoto } from "../../services/api-helper";

import picture from "../userprofile/default.png";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { feed: [], photos: [] };
  }

  getUserPosts = async () => {
    let feed = await getFolloweesPosts(localStorage.getItem("userId"));
    this.setState({ feed });
  };

  getUserPhotos = async () => {
    let photos = [];
    for (let i = 0; i < this.state.feed.length; i++) {
      let temp = await getPhoto(this.state.feed[i].user_id);
      photos.push(temp);
    }
    this.setState({ photos });
  };

  renderTEMP = () => {
    let { feed } = this.state;
    return feed.map((post, index) => {
      let tempImage = this.state.photos[index];
      if (!tempImage) {
        tempImage = picture;
      }
      return (
        <Postcard
          image={tempImage}
          body={post.body}
          userId={post.user_restricted.id}
          username={post.user_restricted.username}
          created_at={post.created_at}
        ></Postcard>
      );
    });
  };

  componentDidMount = async () => {
    await this.getUserPosts();
    await this.getUserPhotos();
  };

  render() {
    return (
      <div className="w-full">
        <div className="flex flex-column">
          <div className="block w-1/4 h-full my-8 fixed">
            <Navbar></Navbar>
          </div>
          <div className="block w-1/2 m-auto">
            <h2 className="text-black text-center px-4 py-2 m-2">Homepage</h2>
            {this.renderTEMP()}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
