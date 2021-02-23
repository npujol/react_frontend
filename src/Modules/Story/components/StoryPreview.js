import React from "react";
import { StoriesApi } from "../../client";
import {
  STORY_FAVORITED,
  STORY_UNFAVORITED,
} from "../../constants/actionTypes";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Divider } from "@material-ui/core";
import Tags from "../Home/Tags";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const storiesApi = new StoriesApi();

const useStyles = makeStyles((theme) => ({
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

const StoryPreview = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const story = props.story;
  const handleClickToggleFavorite = (ev) => {
    ev.preventDefault();
    if (story.favorited === "true") {
      dispatch({
        type: STORY_UNFAVORITED,
        payload: storiesApi.storiesUnfavorite(story.slug, {}),
      });
    } else {
      dispatch({
        type: STORY_FAVORITED,
        payload: storiesApi.storiesFavorite(story.slug, {}),
      });
    }
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Link to={`/@${story.owner.username}`}>
              <Avatar
                aria-label="recipe"
                src={
                  story.owner.image
                    ? story.owner.image
                    : "https://picsum.photos/510/300?random"
                }
                alt={story.owner.username}
              ></Avatar>
            </Link>
          }
          title={story.title}
          subheader={new Date(story.createdAt).toDateString()}
        />
        <CardMedia
          className={classes.media}
          image={
            story.image
              ? "https://picsum.photos/510/300?random"
              : "https://picsum.photos/510/300?random"
          }
          title={story.title}
        />
        <Tags tags={props.story.tags} onClickTag={props.onClickTag}></Tags>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {story.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link to={`/story/${story.slug}`}>
            <Button size="small" color="primary" variant="contained">
              Read more
            </Button>
          </Link>
          <IconButton
            className={classes.buttons}
            aria-label="add to favorites"
            onClick={handleClickToggleFavorite}
          >
            <FavoriteIcon /> {story.favoritesCount}
          </IconButton>
          <Divider></Divider>
        </CardActions>
      </Card>
      <Divider flexItem />
    </div>
  );
};

export default StoryPreview;
