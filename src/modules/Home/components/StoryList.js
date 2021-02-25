import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import StoryPreview from "../../Story/components/StoryPreview";

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const StoryList = (props) => {
  const classes = useStyles();

  if (!props.stories) {
    return (
      <Paper className={classes.paper}>
        <Typography
          className={classes.paper}
          variant="h4"
          component="h2"
          gutterBottom
        >
          loading...
        </Typography>
      </Paper>
    );
  }

  if (props.stories.length === 0) {
    return (
      <Paper className={classes.paper}>
        <Typography
          className={classes.paper}
          variant="h4"
          component="h2"
          gutterBottom
        >
          There are not stories yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      {props.stories.map((story) => {
        return <StoryPreview story={story} key={story.slug} />;
      })}
    </Paper>
  );
};

export default StoryList;
