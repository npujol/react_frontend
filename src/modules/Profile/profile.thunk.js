import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  LOAD_PROFILE_PAGE,
  UNLOAD_PROFILE_PAGE,
  SAVE_SETTINGS_FAILED,
  SAVE_SETTINGS_SUCCESS,
  UNLOAD_SETTINGS_PAGE,
} from "../../constants/actionTypes.js";

import { StoriesApi, ProfilesApi } from "../../client";
const storiesApi = new StoriesApi();
const profilesApi = new ProfilesApi();

export const fetchProfileStories = (username) => {
  return async (dispatch) => {
    const yoursStories = await storiesApi.storiesList({
      favoritedByUserUsername: username,
      offset: 0,
      limit: 10,
    });
    const favoriteStories = await storiesApi.storiesList({
      ownerUserUsername: username,
      offset: 0,
      limit: 10,
    });
    const profile = await profilesApi.profilesRead(username);
    const payload = {
      yoursStories: yoursStories,
      favoriteStories: favoriteStories,
      profile: profile,
    };
    dispatch({ type: LOAD_PROFILE_PAGE, payload });
  };
};

export const onFollow = (username) => {
  return async (dispatch) => {
    const data = await profilesApi.profilesFollow(username, {});
    const payload = {
      profile: data,
    };
    dispatch({ type: FOLLOW_USER, payload });
  };
};

export const onUnfollow = (username) => {
  return async (dispatch) => {
    const data = await profilesApi.profilesUnfollow(username, {});
    const payload = {
      profile: data,
    };
    dispatch({ type: UNFOLLOW_USER, payload });
  };
};

export const unloadProfile = () => {
  return { type: UNLOAD_PROFILE_PAGE };
};

export const unloadSettings = () => {
  return { type: UNLOAD_SETTINGS_PAGE };
};

export const saveBio = (username, values) => {
  return async (dispatch) => {
    try {
      const payload = await profilesApi.profilesPartialUpdate(username, values);
      dispatch({ type: SAVE_SETTINGS_SUCCESS, payload });
    } catch (error) {
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
