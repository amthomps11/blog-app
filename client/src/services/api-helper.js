import axios from "axios";
const BASE_URL = "http://localhost:3000";

// const JWT_TOKEN = localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: BASE_URL
});

export const getUsers = async () => {
  try {
    const resp = await apiClient.get("/users/");
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
