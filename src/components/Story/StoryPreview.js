import React from "react";
import { A } from "hookrouter";
import { StoriesApi } from "../../client";
import { connect } from "react-redux";
import {
  STORY_FAVORITED,
  STORY_UNFAVORITED,
  APPLY_TAG_FILTER,
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
import Chip from "@material-ui/core/Chip";
import { Divider } from "@material-ui/core";
import Tags from "../Home/Tags";
import { Link } from "react-router-dom";

const storiesApi = new StoriesApi();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
    alignContent: "center",
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

const FAVORITED_CLASS = "";
const NOT_FAVORITED_CLASS = "";

const mapDispatchToProps = (dispatch) => ({
  favorite: (slug) =>
    dispatch({
      type: STORY_FAVORITED,
      payload: storiesApi.storiesFavorite(slug, {}),
    }),
  unfavorite: (slug) =>
    dispatch({
      type: STORY_UNFAVORITED,
      payload: storiesApi.storiesUnfavorite(slug, {}),
    }),
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
});

const StoryPreview = (props) => {
  const classes = useStyles();

  const story = props.story;
  const favoriteButtonClass =
    story.favorited === "false" ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;

  const handleClick = (ev) => {
    ev.preventDefault();
    if (story.favorited === "true") {
      props.unfavorite(story.slug);
    } else {
      props.favorite(story.slug);
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
            className={favoriteButtonClass}
            onClick={handleClick}
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

export default connect(() => ({}), mapDispatchToProps)(StoryPreview);
