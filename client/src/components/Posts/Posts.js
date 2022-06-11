import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import { MainContainer } from "./style";

export default function Posts() {
  const posts = useSelector((state) => state.posts.value);

  return !posts.length ? (
    <MainContainer>
      <CircularProgress />
    </MainContainer>
  ) : (
    <MainContainer>
      <Grid container alignContent="stretch" spacing={3}>
        {posts.map((data, index) => {
          return (
            <Grid item key={index} xs={12}>
              <Post post={data} index={index} />
            </Grid>
          );
        })}
      </Grid>
    </MainContainer>
  );
}
