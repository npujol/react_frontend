import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Divider } from "@material-ui/core";

import Tags from "../../Home/components/Tags";
import PreviewFavorite from "./PreviewFavorite";

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
              />
            </Link>
          }
          title={story.title}
          subheader={new Date(story.createdAt).toDateString()}
        />
        <CardMedia
          className={classes.media}
          image={
            story.image ? story.image : "https://picsum.photos/510/300?random"
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
          <PreviewFavorite story={story}></PreviewFavorite>
          <Divider></Divider>
        </CardActions>
      </Card>
      <Divider flexItem />
    </div>
  );
};

export default StoryPreview;
