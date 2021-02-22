import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunkMiddleware from "redux-thunk";
import { localStorageMiddleware } from "./middleware.js";
import reducer from "./reducer";

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(localStorageMiddleware, thunkMiddleware);
  } else {
    return applyMiddleware(
      localStorageMiddleware,
      thunkMiddleware,
      createLogger()
    );
  }
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
