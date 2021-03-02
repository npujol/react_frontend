import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { red } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import { storyDelete, setFavorite, removeFavorite } from "../story.thunk";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    flexGrow: 4,
    alignContent: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
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
      console.log("is favorited");
      dispatch(removeFavorite(story.slug));
    } else {
      console.log("no es favorited");
      dispatch(setFavorite(story.slug));
    }
  }

  if (props.canModify) {
    return (
      <div>
        <Tooltip title="Edit story" placement="bottom">
          {/* Check this */}
          <Link to={`/edit/${story.slug}`}>
            <IconButton
              to={`/edit/${story.slug}`}
              edge="start"
              color="default"
              aria-label="edit"
            >
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
