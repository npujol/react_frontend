import React from "react";
import { useDispatch } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { removeComment } from "../comment.thunk";

const DeleteButton = (props) => {
  const dispatch = useDispatch();

  function handelDeleteComment() {
    dispatch(removeComment(props.commentId, props.slug));
  }

  if (props.show) {
    return (
      <Tooltip title="Delete Comment" placement="bottom">
        <IconButton
          edge="end"
          color="default"
          aria-label="delete"
          onClick={handelDeleteComment}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  }
  return null;
};

export default DeleteButton;
