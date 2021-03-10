import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { setFavorite, removeFavorite } from "../storyList.thunk";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginLeft: "auto",
  },
}));

const PreviewFavorite = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const story = props.story;
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [favoriteColor, setFavoriteColor] = useState(() => {
    story.favorited === "true" ? "secondary" : "default";
  });

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

  if (currentUser) {
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
  } else {
    return (
      <Link to={"/login"} className={classes.buttons}>
        <IconButton aria-label="add to favorites" color={favoriteColor}>
          <FavoriteIcon /> {story.favoritesCount}
        </IconButton>
      </Link>
    );
  }
};

export default PreviewFavorite;
