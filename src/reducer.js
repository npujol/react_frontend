import story from "./modules/Story/story.reducer";
import auth from "./modules/Auth/auth.reducer";
import common from "./modules/App/common.reducer";
import editor from "./modules/Editor/editor.reducer";
import home from "./modules/Home/home.reducer";
import profile from "./modules/Profile/profile.reducer";

import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

export default combineReducers({
  story,
  auth,
  common,
  editor,
  home,
  profile,
  router: routerReducer,
});
