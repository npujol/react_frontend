import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { store } from "./store";

import App from "./components/App/App";

import { ApiClient } from "./client";

const apiClient = ApiClient.instance;
if (process.env.NODE_ENV === "production") {
  apiClient.basePath = "/api";
} else {
  apiClient.basePath = "http://localhost:8000/api".replace(/\/+$/, "");
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,

  document.getElementById("root")
);
