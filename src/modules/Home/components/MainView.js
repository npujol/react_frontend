import StoryList from "../../Story/components/StoryList";
import React, { useState, useEffect } from "react";
import { StoriesApi } from "../../../client";

import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TAB } from "../../../constants/actionTypes";
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
  return <Tab label=" Global" value={0} onClick={clickHandler}></Tab>;
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

    return <Tab label="Yours" value={1} onClick={clickHandler}></Tab>;
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

    return <Tab label="Favorites" onClick={clickHandler} value={2}></Tab>;
  }
  return null;
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return <Tab label={props.tag} value={3}></Tab>;
};

// const mapStateToProps = (state) => ({
//   ...state.storyList,
//   tags: state.home.tags,
//   token: state.common.token,
//   currentUser: state.common.currentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   onTabClick: (tab, pager, payload) =>
//     dispatch({ type: CHANGE_TAB, tab, pager, payload }),
// });

const MainView = (props) => {
  const classes = useStyles();
  const token = useSelector((state) => state.common.token);
  const tabStore = useSelector((state) => state.storyList.tab);

  const storyList = useSelector((state) => state.storyList);
  const currentUser = useSelector((state) => state.common.currentUser);

  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  // function onClickTag(tag, pager, payload) {
  //   dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
  // }

  function onTabClick(tab, pager, payload) {
    dispatch({ type: CHANGE_TAB, tab, pager, payload });
  }
  const handleChange = (event, newValue) => {
    console.log("newValue for the tag", newValue);
    setValue(newValue);
  };

  useEffect(() => {
    setValue(tabStore);
  }, [tabStore]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <GlobalFeedTab onTabClick={onTabClick} />
          <YourFeedTab
            token={token}
            currentUser={currentUser}
            onTabClick={onTabClick}
          />
          <FavoritesTab
            token={token}
            currentUser={currentUser}
            onTabClick={onTabClick}
          />
          <TagFilterTab tag={props.tag} />
        </Tabs>

        <StoryList
          pager={storyList.pager}
          stories={storyList.stories}
          loading={storyList.loading}
          storiesCount={storyList.storiesCount}
          currentPage={storyList.currentPage}
        />
      </AppBar>
    </div>
  );
};

export default MainView;
