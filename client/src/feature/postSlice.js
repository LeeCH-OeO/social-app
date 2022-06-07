import { createSlice } from "@reduxjs/toolkit";
import {
  createNewPost,
  deleteSelectedPost,
  updateSelectedPost,
  likeSelectedPost,
} from "../api";
const initialState = {
  value: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action) => {
      createNewPost(action.payload);
      state.value.push(action.payload);
    },
    getPosts: (state, action) => {
      state.value.push(action.payload);
    },
    deletePost: (state, action) => {
      deleteSelectedPost(action.payload.id);
      state.value.splice(action.payload.index, 1);
    },
    updatePost: (state, action) => {
      state.value[action.payload.index].creator = action.payload.data.creator;
      state.value[action.payload.index].title = action.payload.data.title;
      state.value[action.payload.index].message = action.payload.data.message;

      updateSelectedPost(action.payload.id, action.payload.data);
    },
    likePost: (state, action) => {
      likeSelectedPost(action.payload.id);
      state.value[action.payload.index].likeCount += 1;
    },
  },
});
export const { createPost, getPosts, deletePost, updatePost, likePost } =
  postSlice.actions;
export default postSlice.reducer;
