import StoryList from "../Story/StoryList";
import React, { useEffect } from "react";
import Tags from "./Tags";
import TabsMenu from "./TabsMenu";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";
import {
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fetchStoriesFavorites } from "../../thunk/storiesThunk.js";

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
  const currentUser = useSelector((state) => state.common.currentUser);
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.home.tags);
  const storyList = useSelector((state) => state.storyList);

  function onClickTag(tag, pager, payload) {
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
  }

  useEffect(() => {
    dispatch(fetchStoriesFavorites(currentUser.username));
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: HOME_PAGE_UNLOADED });
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Banner />
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <TabsMenu tab={2} />
            <StoryList
              pager={storyList.pager}
              stories={storyList.stories}
              loading={storyList.loading}
              storiesCount={storyList.storiesCount}
              currentPage={storyList.currentPage}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h5" gutterBottom>
              Popular Tags
            </Typography>
            <Tags tags={tags} onClickTag={onClickTag} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
