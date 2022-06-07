import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from "../feature/postSlice";

export const store = configureStore({
  reducer: {
    posts: postSliceReducer,
  },
});
