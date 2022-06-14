import React, { useState } from "react";
import { AppBar, Typography } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { StyledAppBar } from "./style";
import { useEffect } from "react";
import jwt from "jwt-decode";
import { client_id } from "../../googleLogIn";
import { useDispatch } from "react-redux";
import { fetchPostsBySearch } from "../../api";
import { searchPost } from "../../feature/postSlice";

/*global google*/
export default function AppTopBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleCallBack = (res) => {
    const user = jwt(res.credential);
    console.log(user);
    localStorage.setItem("userName", JSON.stringify(user.name));
    window.location.reload(false);
  };
  const handleSignOut = () => {
    google.accounts.id.disableAutoSelect();
    localStorage.clear();
    window.location.reload(false);
  };
  const handleSearch = async () => {
    try {
      const data = await fetchPostsBySearch(search);

      if (data.data.length !== 0) {
        dispatch(searchPost(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userName"))) {
      google.accounts.id.initialize({
        client_id: client_id,
        callback: handleCallBack,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  return (
    <AppBar position="static" color="inherit" sx={{ width: "30" }}>
      <StyledAppBar>
        <Typography variant="h2" sx={{ fontWeight: "bold", color: "red" }}>
          123
        </Typography>
        <InsertPhotoIcon fontSize="large" />
        {!JSON.parse(localStorage.getItem("userName")) ? (
          <div id="signInDiv"></div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSignOut();
            }}
          >
            Sign out
          </button>
        )}
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button onClick={handleSearch}>serch</button>
      </StyledAppBar>
    </AppBar>
  );
}
