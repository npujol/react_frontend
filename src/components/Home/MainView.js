import StoryList from "../Story/StoryList";
import React from "react";
import { StoriesApi } from "../../client";

import { connect } from "react-redux";
import { CHANGE_TAB } from "../../constants/actionTypes";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const storiesApi = new StoriesApi();
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick(
      0,
      storiesApi.storiesFeedList,
      storiesApi.storiesFeedList({ offset: 0, limit: 10 })
    );
  };
  return <Tab label=" Global" onClick={clickHandler}></Tab>;
};

const YourFeedTab = (props) => {
  // console.log("now", props);

  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick(
        1,
        storiesApi.storiesList,
        storiesApi.storiesList({
          ownerUserUsername: props.currentUser.username,
          offset: 0,
          limit: 10,
        })
      );
    };

    return <Tab label="Yours" onClick={clickHandler}></Tab>;
  }
  return null;
};

const FavoritesTab = (props) => {
  // console.log("now", props);

  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick(
        2,
        storiesApi.storiesList,
        storiesApi.storiesList({
          favoritedByUserUsername: props.currentUser.username,
          offset: 0,
          limit: 10,
        })
      );
    };

    return <Tab label="Favorites" onClick={clickHandler}></Tab>;
  }
  return null;
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return <Tab label={props.tag}></Tab>;
};

const mapStateToProps = (state) => ({
  ...state.storyList,
  tags: state.home.tags,
  token: state.common.token,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

const MainView = (props) => {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={props.tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <GlobalFeedTab onTabClick={props.onTabClick} />
          <YourFeedTab
            token={props.token}
            currentUser={props.currentUser}
            onTabClick={props.onTabClick}
          />
          <FavoritesTab
            token={props.token}
            currentUser={props.currentUser}
            onTabClick={props.onTabClick}
          />
          <TagFilterTab tag={props.tag} />
        </Tabs>

        <StoryList
          pager={props.pager}
          stories={props.stories}
          loading={props.loading}
          storiesCount={props.storiesCount}
          currentPage={props.currentPage}
        />
      </AppBar>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
