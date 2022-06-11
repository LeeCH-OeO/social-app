import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Heading, StyledAppBar } from "./style";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./feature/postSlice";
import { fetchPosts } from "./api";
function App() {
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
    <Container>
      <AppBar position="static" color="inherit">
        <StyledAppBar>
          <Heading>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              123
            </Typography>
          </Heading>
          <InsertPhotoIcon fontSize="large" />
        </StyledAppBar>
      </AppBar>

      <Grow in>
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
      </Grow>
    </Container>
  );
}

export default App;
