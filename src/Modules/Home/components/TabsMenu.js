import React, { useState } from "react";
import { StoriesApi } from "../../../client";

import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_TAB,
  CHANGE_TAB_REDIRECT,
} from "../../../constants/actionTypes";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick({ route: "/" });
  };
  return <Tab label=" Global" onClick={clickHandler}></Tab>;
};

const YourFeedTab = (props) => {
  if (props.currentUser) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick({ route: "/yours" });
    };

    return <Tab label="Yours" onClick={clickHandler}></Tab>;
  }
  return null;
};

const FavoritesTab = (props) => {
  if (props.currentUser) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick({ route: "/favorites" });
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

const TabsMenu = (props) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.common.currentUser);
  const [value, setValue] = useState(props.tab);
  const dispatch = useDispatch();

  function onTabClick(payload) {
    dispatch({ type: CHANGE_TAB_REDIRECT, payload });
  }
  const handleChange = (event, newValue) => {
    event.preventDefault();
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
