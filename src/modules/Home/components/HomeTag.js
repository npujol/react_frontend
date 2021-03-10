import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Tags from "./Tags";
import TabsMenu from "./TabsMenu";
import Banner from "./Banner";
import StoryList from "../../StoryList/components/StoryList";

import { fetchStoriesTag, unloadHome } from "../home.thunk.js";

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

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const paramTag = useParams();
  const tags = useSelector((state) => state.home.tags);
  const home = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchStoriesTag(paramTag.tag));
  }, [paramTag, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(unloadHome());
    };
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Banner currentUser={currentUser} />
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <TabsMenu
              tab={currentUser ? 3 : 1}
              tag={paramTag.tag}
              currentUser={currentUser}
            />
            <StoryList
              stories={home.stories}
              loading={home.loading}
              storiesCount={home.storiesCount}
              currentPage={home.currentPage}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h5" gutterBottom>
              Popular Tags
            </Typography>
            <Tags tags={tags} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
