import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { changeTabRedirect } from "../home.thunk.js";

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
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [value, setValue] = useState(() => {
    props.tab;
  });
  const dispatch = useDispatch();

  function onTabClick(route) {
    dispatch(changeTabRedirect(route));
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
            <TagFilterTab label={props.tag} onClick={onTabClick}></TagFilterTab>
            <GlobalFeedTab onTabClick={onTabClick} />
            <TagFilterTab tag={props.tag} />
          </Tabs>
        </AppBar>
      </div>
    );
  }
};

export default TabsMenu;
