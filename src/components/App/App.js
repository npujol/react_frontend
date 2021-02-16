import { APP_LOAD, REDIRECT } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import JwtService from "../../jwt.service";
import Header from "./Header";
import Home from "../Home";
import { UsersApi } from "../../client";
import { useRoutes, A } from "hookrouter";
import routes from "./router";

import React, { Fragment, Suspense, useEffect } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../../theme";
import GlobalStyles from "../../GlobalStyles";

const usersApi = new UsersApi();

// const mapStateToProps = (state) => {
//   return {
//     appLoaded: state.common.appLoaded,
//     appName: state.common.appName,
//     currentUser: state.common.currentUser,
//     redirectTo: state.common.redirectTo,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   onLoad: (payload, token) =>
//     dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
//   onRedirect: () => dispatch({ type: REDIRECT }),
// });

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
    console.log("nextProps", redirectTo, "history", history);
    if (redirectTo) {
      history.push(redirectTo);
      onRedirect();
    }
  }, [redirectTo]);

  // function componentWillReceiveProps(nextProps) {
  //   console.log("nextProps", nextProps.redirectTo);
  //   if (nextProps.redirectTo) {
  //     // this.context.router.replace(nextProps.redirectTo);
  //     store.dispatch(push(nextProps.redirectTo));
  //     this.props.onRedirect();
  //   }
  // }

  // function componentWillMount() {
  //   const token = window.localStorage.getItem("jwt");
  //   if (token) {
  //     JwtService.setHeader();
  //   }

  //   this.props.onLoad(
  //     token ? usersApi.usersRead(JwtService.getUsername()) : null,
  //     token
  //   );
  //   // console.log("in middleware", this.props);
  // }
  console.log(
    "appLoaded",
    appLoaded,
    "appName",
    appName,
    "currentUser",
    currentUser
  );
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
          <div>{routeResult || <Home />}</div>
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
      {routeResult || <Home />}
    </div>
  );
};

export default App;
