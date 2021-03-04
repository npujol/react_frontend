import { Link } from "react-router-dom";
import React from "react";

import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import DeleteButton from "./DeleteButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 12,
    marginTop: 12,
  },
  cards: {
    alignContent: "center",
  },
}));

const Comment = (props) => {
  const classes = useStyles();
  const comment = props.comment;
  const show =
    props.currentUser && props.currentUser.username === comment.owner.username;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link to={`/@${comment.owner.username}`}>
            <Avatar
              aria-label="recipe"
              src={
                comment.owner.image
                  ? comment.owner.image
                  : "https://picsum.photos/510/300?random"
              }
              alt={comment.owner.username}
            ></Avatar>
          </Link>
        }
        action={
          <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
        }
        title={comment.owner.username}
        subheader={new Date(comment.createdAt).toDateString()}
      />
      <CardContent className={classes.cards}>
        <Typography>{comment.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
