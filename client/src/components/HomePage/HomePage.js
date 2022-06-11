import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Fade, Grid, Container } from "@mui/material";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { fetchPosts } from "../../api";
import { getPosts } from "../../feature/postSlice";
export default function HomePage() {
  const disPatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const { data } = await fetchPosts();
      data.forEach((item) => {
        disPatch(getPosts(item));
      });
    }
    getData();
  }, [disPatch]);
  return (
    <Fade in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item>
            <Form />
          </Grid>
          <Grid item>
            <Posts />
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}
