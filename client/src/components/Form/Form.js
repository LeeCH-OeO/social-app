import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../feature/postSlice";
import TextField from "@mui/material/TextField";
import { Button, Paper, Typography } from "@mui/material";
import { FileContainer, FormContainer, MainContainer } from "./style";
export default function Form() {
  const [inputData, setInputData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    likeCount: 0,
  });
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(createPost(inputData));
    setInputData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    window.location.reload(false);
  };
  return (
    <Paper>
      <MainContainer>
        <Typography variant="h4">Create new post</Typography>
        <FormContainer>
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            value={inputData.title}
            label="title"
            onChange={(e) => {
              setInputData({ ...inputData, title: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            value={inputData.creator}
            label="creator"
            onChange={(e) => {
              setInputData({ ...inputData, creator: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            value={inputData.message}
            label="message"
            onChange={(e) => {
              setInputData({ ...inputData, message: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            fullWidth
            variant="outlined"
            value={inputData.tags}
            label="tags"
            onChange={(e) => {
              setInputData({ ...inputData, tags: e.target.value });
            }}
          />
          <FileContainer>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                  console.log("called: ", reader);
                  setInputData({ ...inputData, selectedFile: reader.result });
                };
              }}
            />
          </FileContainer>
          <Button
            onClick={handleSubmit}
            color="primary"
            size="large"
            type="submit"
            fullWidth
            variant="contained"
          >
            Submit
          </Button>
        </FormContainer>
      </MainContainer>
    </Paper>
  );
}
