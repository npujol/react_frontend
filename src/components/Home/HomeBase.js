import MainView from "./MainView";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Tags from "./Tags";
import { TagsApi, StoriesApi } from "../../client";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Promise = global.Promise;

const storiesApi = new StoriesApi();
const tagsApi = new TagsApi();

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

// const mapStateToProps = (state) => ({
//   ...state.home,
//   appName: state.common.appName,
//   token: state.common.token,
// });

// const mapDispatchToProps = (dispatch) => ({
//   onClickTag: (tag, pager, payload) =>
//     dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
//   onLoad: (tab, pager, payload) =>
//     dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
//   onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
// });

const Home = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.common.currentUser);
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.home.tags);

  const [tab, setTab] = useState(() => (currentUser ? 1 : 0));
  const [storiesPromise, setStoriesPromise] = useState(() =>
    currentUser ? storiesApi.storiesFeedList : storiesApi.storiesList
  );

  // function componentWillMount() {
  //   const tab = currentUser ? 1 : 0;
  //   const storiesPromise = currentUser
  //     ? storiesApi.storiesFeedList
  //     : storiesApi.storiesList;
  //   this.props.onLoad(
  //     tab,
  //     storiesPromise,
  //     Promise.all([
  //       tagsApi.tagsList(),
  //       storiesApi.storiesFeedList({ offset: 0, limit: 10 }),
  //     ])
  //   );
  // }
  function onClickTag(tag, pager, payload) {
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
  }
  // function onLoad(tab, pager, payload) {
  //   dispatch({ type: HOME_PAGE_LOADED, tab, storiesPromise, payload });
  // }

  // function componentWillUnmount() {
  //   this.props.onUnload();
  // }

  useEffect(() => {
    const payload = Promise.all([
      tagsApi.tagsList(),
      storiesApi.storiesFeedList({ offset: 0, limit: 10 }),
    ]);
    dispatch({ type: HOME_PAGE_LOADED, tab, storiesPromise, payload });
  }, [tab, storiesPromise, dispatch]);

  useEffect(() => {
    dispatch({ type: HOME_PAGE_UNLOADED });
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.banner}>
            <Link to="/editor">
              <Fab color="secondary" aria-label="add">
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
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <MainView />
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
