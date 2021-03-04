import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import { storyDelete, setFavorite, removeFavorite } from "../story.thunk";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginLeft: "auto",
  },
}));

const StoryActions = (props) => {
  const story = props.story;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [favoriteColor, setFavoriteColor] = useState(() => {
    story.favorited === "true" ? "secondary" : "default";
  });

  function onHandelDelete() {
    dispatch(storyDelete(story.slug));
  }
  useEffect(() => {
    const color = story.favorited === "true" ? "secondary" : "default";
    setFavoriteColor(color);
  }, [story]);

  function handleClickToggleFavorite(ev) {
    ev.preventDefault();
    if (story.favorited === "true") {
      dispatch(removeFavorite(story.slug));
    } else {
      dispatch(setFavorite(story.slug));
    }
  }

  if (props.canModify) {
    return (
      <div>
        <Tooltip title="Edit story" placement="bottom">
          {/* Check this */}
          <Link to={`/editor/${story.slug}`}>
            <IconButton edge="start" color="default" aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Delete Story" placement="bottom">
          <IconButton
            edge="end"
            color="default"
            aria-label="delete"
            onClick={onHandelDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }

  return (
    <IconButton
      className={classes.buttons}
      aria-label="add to favorites"
      onClick={handleClickToggleFavorite}
      color={favoriteColor}
    >
      <FavoriteIcon /> {story.favoritesCount}
    </IconButton>
  );
};

export default StoryActions;
