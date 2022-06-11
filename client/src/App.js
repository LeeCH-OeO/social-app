import { Container } from "@mui/material";
import HomePage from "./components/HomePage/HomePage";
import AppTopBar from "./components/AppTopBar/AppTopBar";

function App() {
  const user = JSON.parse(localStorage.getItem("userName"));
  return (
    <Container>
      <AppTopBar />
      {user ? (
        <>
          <p>hello, {user}</p>
          <HomePage />
        </>
      ) : (
        <p>請先登入 :D</p>
      )}
    </Container>
  );
}

export default App;
