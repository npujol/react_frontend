import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  banner: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Banner = ({ currentUser }) => {
  const classes = useStyles();
  if (currentUser) {
    <Paper className={classes.banner}>
      <Link to="/story/new">
        <Fab color="secondary" to="/story/new" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
      <Typography
        className={classes.paper}
        variant="h4"
        component="h2"
        gutterBottom
      >
        A place to share your stories
      </Typography>
    </Paper>;
  } else {
    return (
      <Paper className={classes.banner}>
        <Typography
          className={classes.paper}
          variant="h4"
          component="h2"
          gutterBottom
        >
          A place to share your stories
        </Typography>
      </Paper>
    );
  }
};

export default Banner;
