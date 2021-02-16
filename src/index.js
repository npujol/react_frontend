import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
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
    <App />
  </Provider>,

  document.getElementById("root")
);
