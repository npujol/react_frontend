import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

import CommentContainer from "../../Comment/components/CommentContainer";
import StoryMeta from "./StoryMeta";

import { onloadStory, unloadStory } from "../story.thunk";

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
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    justify: "flex-start",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const Story = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const param = useParams();
  const slug = param.id;

  const story = useSelector((state) => state.story.story);
  const comments = useSelector((state) => state.story.comments);
  const currentUser = useSelector((state) => state.auth.currentUser);

  function htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  useEffect(() => {
    if (slug) {
      dispatch(onloadStory(slug));
    }

    return () => {
      dispatch(unloadStory());
    };
  }, [slug, dispatch]);

  if (story) {
    const canModify =
      currentUser && currentUser.username === story.owner.username;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Card>
            <CardMedia
              className={classes.media}
              image={
                story.image
                  ? story.image
                  : "https://picsum.photos/510/300?random"
              }
              title={story.title}
            ></CardMedia>
            <StoryMeta story={story} canModify={canModify} />

            <CardContent>
              <div className={classes.root}>
                {story.tags.map((tag, pk) => {
                  return (
                    <Chip
                      variant="outlined"
                      size="small"
                      label={tag}
                      key={pk}
                    />
                  );
                })}
              </div>
              <Typography>{story.description}</Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: htmlDecode(story.body),
                }}
              />
              );
            </CardContent>
          </Card>
          <div className="row">
            <CommentContainer
              comments={comments || []}
              slug={slug}
              currentUser={currentUser}
            />
          </div>
        </Paper>
      </div>
    );
  } else {
    return null;
  }
};

export default Story;
