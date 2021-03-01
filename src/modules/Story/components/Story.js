import CommentContainer from "../../Comment/components/CommentContainer";
import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoriesApi } from "../../../client";
import { connect } from "react-redux";
import {
  LOAD_STORY_PAGE,
  UNLOAD_STORY_PAGE,
} from "../../../constants/actionTypes";
import StoryActions from "./StoryActions";
import StoryMeta from "./StoryMeta";

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
import { red, grey } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";

import { onloadStory, unloadStory } from "../story.thunk";
const storiesApi = new StoriesApi();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const StoryPreview = (props) => {
  const classes = useStyles();
  const story = props.story;

  return (
    <div>
      <Card className={classes.root}>
        <StoryMeta story={props.story} canModify={props.canModify} />

        <CardMedia
          className={classes.media}
          image={
            story.image ? story.image : "https://picsum.photos/510/300?random"
          }
          title={story.title}
        ></CardMedia>

        <CardContent>
          <ul className="tag-list">
            {story.tags.map((tag, pk) => {
              return <Chip label={tag} variant="outlined" key={pk} />;
            })}
          </ul>
          <Typography>{story.description}</Typography>
          <Typography>{story.body}</Typography>
        </CardContent>
      </Card>
      <div className="row">
        <CommentContainer
          comments={props.comments || []}
          errors={props.errors}
          slug={props.slug}
          currentUser={props.currentUser}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.story,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: LOAD_STORY_PAGE, payload }),
  onUnload: () => dispatch({ type: UNLOAD_STORY_PAGE }),
});

const Story = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const param = useParams();
  const slug = param.id;

  const story = useSelector((state) => state.story.story);
  const comments = useSelector((state) => state.story.comments);

  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (slug) {
      dispatch(onloadStory(slug));
    }

    return () => {
      dispatch(unloadStory());
    };
  }, [slug, dispatch]);

  console.log(comments);

  if (story) {
    // const markup = { __html: marked(this.props.story.body, { sanitize: true }) };
    const markup = { __html: story.body };

    const canModify =
      currentUser && currentUser.username === story.owner.username;
    return (
      <StoryPreview
        story={story}
        canModify={canModify}
        markup={markup}
        comments={comments}
        // errors={commentErrors}
        slug={slug}
        currentUser={currentUser}
      />
    );
  } else {
    return null;
  }
};

export default Story;
