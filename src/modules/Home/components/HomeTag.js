import StoryList from "../../Story/components/StoryList";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Tags from "./Tags";
import TabsMenu from "./TabsMenu";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_HOME_PAGE,
  UNLOAD_HOME_PAGE,
  APPLY_TAG_FILTER,
} from "../../../constants/actionTypes";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fetchStoriesTag } from  "../home.thunk.js";

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
  const paramTag = useParams();
  const tags = useSelector((state) => state.home.tags);
  const storyList = useSelector((state) => state.storyList);

  function onClickTag(tag, pager, payload) {
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
  }

  useEffect(() => {
    dispatch(fetchStoriesTag(paramTag.tag));
  }, [paramTag, dispatch]);

  useEffect(() => {
    dispatch({ type: UNLOAD_HOME_PAGE });
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Banner />
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <TabsMenu tab={currentUser ? 3 : 1} tag={paramTag.tag} />
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
