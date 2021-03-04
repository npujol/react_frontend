import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    justify: "flex-start",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
}));

const CommentContainer = (props) => {
  const classes = useStyles();

  if (props.currentUser) {
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CommentInput slug={props.slug} currentUser={props.currentUser} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CommentList
              comments={props.comments}
              slug={props.slug}
              currentUser={props.currentUser}
            />
          </Paper>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h2" gutterBottom>
              <Link to="/login">Sign in</Link>
              &nbsp;or&nbsp;
              <Link to="/register">sign up</Link>
              &nbsp;to add comments on this story.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CommentList
              comments={props.comments}
              slug={props.slug}
              currentUser={props.currentUser}
            />
          </Paper>
        </Grid>
      </div>
    );
  }
};

export default CommentContainer;
