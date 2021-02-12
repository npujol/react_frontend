import MainView from "./MainView";
import React from "react";
import Tags from "./Tags";
import { TagsApi, StoriesApi } from "../../client";
import { connect } from "react-redux";
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
import { Link } from "react-router-dom";

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

const GeneralHomeGrid = (props) => {
  const classes = useStyles();

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
            <Tags tags={props.tags} onClickTag={props.onClickTag} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

class Home extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? "feed" : "all";
    const storiesPromise = this.props.token
      ? storiesApi.storiesFeedList
      : storiesApi.storiesList;
    this.props.onLoad(
      tab,
      storiesPromise,
      Promise.all([
        tagsApi.tagsList(),
        storiesApi.storiesFeedList({ offset: 0, limit: 10 }),
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div>
        <GeneralHomeGrid
          token={this.props.token}
          appName={this.props.appName}
          onClickTag={this.props.onClickTag}
          tags={this.props.tags}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
