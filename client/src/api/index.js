import axios from "axios";

const url = "http://localhost:5920/posts";
export const fetchPosts = () => axios.get(url);
export const createNewPost = (newPost) => {
  axios.post(url, newPost);
  console.log(newPost);
};
export const deleteSelectedPost = (id) => axios.delete(`${url}/${id}`);
export const updateSelectedPost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const likeSelectedPost = (id) => axios.patch(`${url}/${id}/likePost`);
