
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import JwtService from "../../jwt.service";
import Header from './Header';
import Story from '../Story/Story';
import Editor from '../Story/Editor';
import Home from '../Home';
import Login from '../Auth/Login';
import Profile from '../Profile/Profile';
import ProfileFavorites from '../Profile/ProfileFavorites';
import Register from '../Auth/Register';
import Settings from '../Profile/Settings';
import { store } from '../../store';
import { push } from 'react-router-redux';
import { UsersApi } from "../../client"


import React, { Fragment, Suspense } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../../theme";
import GlobalStyles from "../../GlobalStyles";
// import * as serviceWorker from "./serviceWorker";

const usersApi = new UsersApi();


const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  UNSAFE_componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      JwtService.setHeader();
    }

    this.props.onLoad(token ? usersApi.usersRead(JwtService.getUsername()) : null, token);
    // console.log("in middleware", this.props);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <div>
              <Header
                appName={this.props.appName}
                currentUser={this.props.currentUser} />
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
        </BrowserRouter>

      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
