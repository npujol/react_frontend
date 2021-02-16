import { APP_LOAD, REDIRECT } from "../../constants/actionTypes";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
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
import { store } from "../../store";
import { push } from "react-router-redux";
import { UsersApi } from "../../client";
import { useRoutes, A } from "hookrouter";
import routes from "./router";

import React, { Fragment, Suspense, useEffect } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../../theme";
import GlobalStyles from "../../GlobalStyles";
import { combineReducers } from "redux";
// import * as serviceWorker from "./serviceWorker";

const usersApi = new UsersApi();

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

const App = () => {
  const routeResult = useRoutes(routes);

  const appLoaded = useSelector((state) => state.common.appLoaded);
  const appName = useSelector((state) => state.common.appName);
  const currentUser = useSelector((state) => state.common.currentUser);
  const redirectTo = useSelector((state) => state.common.redirectTo);
  const history = useHistory();
  const dispatch = useDispatch();

  function onLoad(payload, token) {
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true });
  }
  function onRedirect() {
    dispatch({ type: REDIRECT });
  }

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      JwtService.setHeader();
    }
    onLoad(token ? usersApi.usersRead(JwtService.getUsername()) : null, token);
  }, []);

  useEffect(() => {
    console.log("nextProps", redirectTo);
    if (redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      history.push(redirectTo);
      // store.dispatch(push(nextProps.redirectTo));
      onRedirect();
    }
  }, [redirectTo]);

  function componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps.redirectTo);
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  function componentWillMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      JwtService.setHeader();
    }

    this.props.onLoad(
      token ? usersApi.usersRead(JwtService.getUsername()) : null,
      token
    );
    // console.log("in middleware", this.props);
  }
  console.log(appLoaded, appName, currentUser);
  if (appLoaded) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <div>
          <Header appName={appName} currentUser={currentUser} />
        </div>
        <Suspense fallback={<Fragment />}>
          <div>{routeResult || <Home />}</div>
          {/* <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/editor/:slug" component={Editor} />
              <Route path="/editor" component={Editor} />
              <Route path="/story/:id" component={Story} />
              <Route path="/settings" component={Settings} />
              <Route
                path="/@:username/favorites"
                component={ProfileFavorites}
              />
              <Route path="/@:username" component={Profile} />
            </Switch> */}
        </Suspense>
      </MuiThemeProvider>
    );
  }
  return (
    <div>
      <Header appName={appName} currentUser={currentUser} />
      {routeResult || <Home />}
    </div>
  );
};

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default App;
