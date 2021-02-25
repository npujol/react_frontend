import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  LOAD_PROFILE_PAGE,
  UNLOAD_PROFILE_PAGE,
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