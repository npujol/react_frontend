import {
  LOAD_STORY_PAGE,
  UNLOAD_STORY_PAGE,
  SAVE_SETTINGS_FAILED,
  SAVE_SETTINGS_SUCCESS,
  UNLOAD_SETTINGS_PAGE,
} from "../../constants/actionTypes.js";

import { StoriesApi, ProfilesApi } from "../../client";
const storiesApi = new StoriesApi();
const profilesApi = new ProfilesApi();

export const onloadStory = (slug) => {
  return async (dispatch) => {
    const story = await storiesApi.storiesRead(slug);
    const comments = await storiesApi.storiesCommentsList(slug, {
      limit: 10,
      offset: 0,
    });
    const payload = {
      story: story,
      comments: comments,
    };
    dispatch({ type: LOAD_STORY_PAGE, payload });
  };
};

export const unloadStory = () => {
  return { type: UNLOAD_STORY_PAGE };
};

export const saveBio = (username, values) => {
  return async (dispatch) => {
    try {
      const payload = await profilesApi.profilesPartialUpdate(username, values);
      dispatch({ type: SAVE_SETTINGS_SUCCESS, payload });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SAVE_SETTINGS_FAILED,
        payload: JSON.parse(error.response.text),
      });
    }
  };
};
export const saveImage = (username, image) => {
  return async (dispatch) => {
    const payload = await profilesApi.profilesChangeImage(username, image);
    dispatch({ type: SAVE_SETTINGS_SUCCESS, payload });
  };
};
