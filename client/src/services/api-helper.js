import axios from "axios";
const BASE_URL = "http://localhost:3000/";

const JWT_TOKEN = localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`
  }
});

export const loginUser = async loginData => {
  try {
    let resp = await apiClient.post(
      `/auth/login?username=${loginData.username}&password=${loginData.password}`
    );
    return resp;
  } catch (e) {
    throw e;
  }
};

export const createUser = async userData => {
  try {
    let resp = await apiClient.post(`/users`, userData);
    return resp;
  } catch (e) {
    throw e;
  }
};

export const getUsers = async () => {
  try {
    const resp = await apiClient.get("/users/");
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const getUsername = async userId => {
  try {
    const resp = await apiClient.get(`/users/${userId}`);
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const getUserPosts = async userId => {
  try {
    const resp = await apiClient.get(`/users/${userId}/posts`);
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const submitPost = async postData => {
  try {
    await apiClient.post(`/posts`, postData);
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = async postID => {
  try {
    await apiClient.delete(`/posts/${postID}`);
  } catch (e) {
    console.log(e);
  }
};

export const followUser = async followData => {
  try {
    await apiClient.post("/follows", followData);
  } catch (e) {
    console.log(e);
  }
};

export const getFollowees = async id => {
  try {
    let resp = await apiClient.get(`/followees/${id}`);
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const getFolloweesPosts = async id => {
  try {
    let resp = await apiClient.get(`/followeeposts/${id}`);
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};

export const getFollowers = async id => {
  try {
    let resp = await apiClient.get(`/followersonly/${id}`);
    return resp.data;
  } catch (e) {
    console.log(e);
  }
};
