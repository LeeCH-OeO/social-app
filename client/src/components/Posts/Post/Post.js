import React, { useState } from "react";
import {
  Card,
  CardActions,
  Button,
  CardMedia,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deletePost, updatePost, likePost } from "../../../feature/postSlice";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
export default function Post({ post, index }) {
  const disPatch = useDispatch();
  const handleDelete = (id, index) => {
    disPatch(deletePost({ id: id, index: index }));
  };
  const handleEdit = (editData, index, id) => {
    disPatch(updatePost({ data: editData, index: index, id: id }));
    setIsEdit(false);
  };
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({
    creator: post.creator,
    title: post.title,
    message: post.message,
    tags: post.tags,
    selectedFile: post.selectedFile,
  });

  return (
    <>
      {isEdit ? (
        <Card>
          <input
            value={editData.creator}
            onChange={(e) =>
              setEditData({ ...editData, creator: e.target.value })
            }
          />
          <input
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
          <input
            value={editData.message}
            onChange={(e) =>
              setEditData({ ...editData, message: e.target.value })
            }
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleEdit(editData, index, post._id);
            }}
          >
            submit
          </button>
        </Card>
      ) : (
        <Card>
          <Zoom>
            <CardMedia component="img" image={post.selectedFile} />
          </Zoom>
          <Typography> {post.title} </Typography>
          <Typography>{post.creator} </Typography>
          <Typography>{post.message} </Typography>
          <Typography>{post.tags} </Typography>
          <CardActions>
            <Button
              onClick={() => {
                disPatch(likePost({ id: post._id, index: index }));
              }}
            >
              <ThumbUpAltIcon /> Like {post.likeCount}
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(post._id, index);
              }}
            >
              <DeleteIcon /> Delete
            </Button>
          </CardActions>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(true);
            }}
          >
            edit
          </button>
        </Card>
      )}
    </>
  );
}
