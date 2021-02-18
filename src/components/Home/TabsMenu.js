import StoryList from "../Story/StoryList";
import React, { useState, useEffect } from "react";
import { StoriesApi } from "../../client";

import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TAB, CHANGE_TAB_REDIRECT } from "../../constants/actionTypes";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

const storiesApi = new StoriesApi();
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    // props.onTabClick(
    //   0,
    //   storiesApi.storiesFeedList,
    //   storiesApi.storiesFeedList({ offset: 0, limit: 10 })
    // );
    props.onTabClick({ route: "/" });
  };
  return <Tab label=" Global" value={0} onClick={clickHandler}></Tab>;
};

const YourFeedTab = (props) => {

  // console.log("now", props);

  if (props.currentUser) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      // props.onTabClick(
      //   1,
      //   storiesApi.storiesList,
      //   storiesApi.storiesList({
      //     ownerUserUsername: props.currentUser.username,
      //     offset: 0,
      //     limit: 10,
      //   })
      // );
      props.onTabClick({ route: "/yours" });
    };

    return <Tab label="Yours" value={1} onClick={clickHandler}></Tab>;
  }
  return null;
};

const FavoritesTab = (props) => {
  // console.log("now", props);

  if (props.currentUser) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      // props.onTabClick(
      //   2,
      //   storiesApi.storiesList,
      //   storiesApi.storiesList({
      //     favoritedByUserUsername: props.currentUser.username,
      //     offset: 0,
      //     limit: 10,
      //   })
      // );
      props.onTabClick({ route: "/favorites" });
    };

    return <Tab label="Favorites" onClick={clickHandler} value={2}></Tab>;
  }
  return null;
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return <Tab label={props.tag}></Tab>;
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

const TabsMenu = (props) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.common.currentUser);

  const dispatch = useDispatch();
  const [value, setValue] = useState(props.tab);
  // function onClickTag(tag, pager, payload) {
  //   dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
  // }

  // function onTabClick(tab, pager, payload) {
  //   dispatch({ type: CHANGE_TAB, tab, pager, payload });
  // }
  function onTabClick(payload) {
    // history.push(path);
    dispatch({ type: CHANGE_TAB_REDIRECT, payload });
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (currentUser) {
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
            {/* <Link to="/">
              <Tab label=" Global"></Tab>
            </Link>
            <Link to="/yours">
              <Tab label=" Yours"></Tab>
            </Link>
            <Link to="/favorites">
              <Tab label=" Favorites"></Tab>
            </Link>
            <Link to={`/${props.tag}`}>
              <Tab label={props.tag}></Tab>
            </Link> */}
            <GlobalFeedTab onTabClick={onTabClick} />
            <YourFeedTab currentUser={currentUser} onTabClick={onTabClick} />
            <FavoritesTab currentUser={currentUser} onTabClick={onTabClick} />
            <TagFilterTab tag={props.tag} />
          </Tabs>
        </AppBar>
      </div>
    );
  } else {
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
            {/* <Link to="/"> */}
            {/* <Tab label=" Global" onClick={handleTabClick}></Tab> */}
            {/* // </Link> */}
            {/* <Link to={`/${props.tag}`}> */}
            <TagFilterTab label={props.tag} onClick={onTabClick}></TagFilterTab>
            {/* </Link> */}
            <GlobalFeedTab onTabClick={onTabClick} />
            {/* <YourFeedTab
          token={token}
          currentUser={currentUser}
          onTabClick={onTabClick}
        />
        <FavoritesTab
          token={token}
          currentUser={currentUser}
          onTabClick={onTabClick}
        />*/}
            <TagFilterTab tag={props.tag} />
          </Tabs>
        </AppBar>
      </div>
    );
  }
};

export default TabsMenu;
