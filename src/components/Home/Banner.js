import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

const Banner = ({ appName, token }) => {
  const classes = useStyles();
  if (token) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
        A place to share your stories
      </Typography>
    </div>
  );
};

export default Banner;
