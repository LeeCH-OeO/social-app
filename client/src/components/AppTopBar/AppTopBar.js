import React from "react";
import { AppBar, Typography } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { StyledAppBar } from "./style";
import { useEffect } from "react";
import jwt from "jwt-decode";
import { client_id } from "../../googleLogIn";
/*global google*/
export default function AppTopBar() {
  const handleCallBack = (res) => {
    const user = jwt(res.credential);
    console.log(user);
    localStorage.setItem("userName", JSON.stringify(user.name));
    window.location.reload(false);
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
  const handleSignOut = () => {
    google.accounts.id.disableAutoSelect();
    localStorage.clear();
    window.location.reload(false);
  };
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
      </StyledAppBar>
    </AppBar>
  );
}
