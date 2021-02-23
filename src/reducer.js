import story from "./modules/Story/story.reducer";
import auth from "./modules/Auth/auth.reducer";
import common from "./modules/App/common.reducer";
import editor from "./modules/Story/editor.reducer";
import home from "./modules/Home/home.reducer";
import profile from "./modules/Profile/profile.reducer";
import settings from "./modules/Profile/settings.reducer";
import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

export default combineReducers({
  story,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
  router: routerReducer,
});
