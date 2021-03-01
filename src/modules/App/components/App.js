import React, { Fragment, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./Header";
import Register from "../../Auth/components/Register";
import Login from "../../Auth/components/Login";
import Story from "../../Story/components/Story";
import Editor from "../../Editor/components/Editor";
import HomeGlobal from "../../Home/components/HomeGlobal";
import HomeYours from "../../Home/components/HomeYours";
import HomeFavorites from "../../Home/components/HomeFavorites";
import HomeTag from "../../Home/components/HomeTag";
import Profile from "../../Profile/components/Profile";

import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import theme from "../../../theme";
import GlobalStyles from "../../../GlobalStyles";
import { load_app, redirect } from "../common.thunk.js";

const App = () => {
  const appLoaded = useSelector((state) => state.common.appLoaded);
  const appName = useSelector((state) => state.common.appName);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const redirectTo = useSelector((state) => state.common.redirectTo);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_app());
  }, [dispatch]);

  useEffect(() => {
    console.log("redirectTo", redirectTo, "history", history.location);
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(redirect());
    }
  }, [dispatch, history, redirectTo]);

  if (appLoaded) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {/* <GlobalStyles /> */}
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
