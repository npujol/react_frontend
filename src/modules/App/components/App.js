import { LOAD_APP, REDIRECT } from "../../../constants/actionTypes.js";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import JwtService from "../../../jwt.service";
import Header from "./Header";
import Story from "../../Story/components/Story";
import Editor from "../../Story/components/Editor";
import HomeGlobal from "../../Home/components/HomeGlobal";
import HomeYours from "../../Home/components/HomeYours";
import HomeFavorites from "../../Home/components/HomeFavorites";
import HomeTag from "../../Home/components/HomeTag";
import Login from "../../Auth/components/Login";
import Profile from "../../Profile/components/Profile";
import ProfileFavorites from "../../Profile/components/ProfileFavorites";
import Register from "../../Auth/components/Register";
import Settings from "../../Profile/components/Settings";
import { UsersApi } from "../../../client";

import React, { Fragment, Suspense, useEffect } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";

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
    dispatch({ type: LOAD_APP, payload, token, skipTracking: true });
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
            <Route exact path="/" component={HomeGlobal} />
            <Route exact path="/yours" component={HomeYours} />
            <Route exact path="/favorites" component={HomeFavorites} />
            <Route path="/tag/:tag" component={HomeTag} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route exact path="/editor" component={Editor} />
            <Route path="/story/:id" component={Story} />
            <Route exact path="/settings" component={Settings} />
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
