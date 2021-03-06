import { APP_LOAD, REDIRECT } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import JwtService from "../../jwt.service";
import Header from "./Header";
import Story from "../Story/Story";
import Editor from "../Story/Editor";
import Home from "../Home";
import Login from "../Auth/Login";
import Profile from "../Profile/Profile";
import ProfileFavorites from "../Profile/ProfileFavorites";
import Register from "../Auth/Register";
import Settings from "../Profile/Settings";
import { UsersApi } from "../../client";

import React, { Fragment, Suspense, useEffect } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../../theme";
import GlobalStyles from "../../GlobalStyles";

const usersApi = new UsersApi();

const App = () => {
  const appLoaded = useSelector((state) => state.common.appLoaded);
  const appName = useSelector((state) => state.common.appName);
  const currentUser = useSelector((state) => state.common.currentUser);
  const redirectTo = useSelector((state) => state.common.redirectTo);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      JwtService.setHeader();
    }
    const payload = token ? usersApi.usersRead(JwtService.getUsername()) : null;
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true });
  }, [dispatch]);

  useEffect(() => {
    console.log("redirectTo", redirectTo, "history", history.location);
    if (redirectTo) {
      history.push(redirectTo);
      dispatch({ type: REDIRECT });
    }
  }, [dispatch, history, redirectTo]);

  if (appLoaded) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <div>
          <Header
            appName={appName}
            currentUser={currentUser ? currentUser : null}
          />
        </div>
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/story/:id" component={Story} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    );
  }
  return (
    <div>
      <Header
        appName={appName}
        currentUser={currentUser ? currentUser : null}
      />
    </div>
  );
};

export default App;
