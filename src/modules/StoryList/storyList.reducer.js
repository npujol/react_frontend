import {
  SET_STORY_FAVORITED,
  SET_STORY_UNFAVORITED,
} from "../../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case SET_STORY_FAVORITED:
    case SET_STORY_UNFAVORITED:
      return {
        ...state,
        stories: state.stories.map((story) => {
          if (story.slug === action.payload.story.slug) {
            return {
              ...story,
              favorited: action.payload.story.favorited,
              favoritesCount: action.payload.story.favoritesCount,
            };
          }
          return story;
        }),
      };
    default:
      return state;
  }
};
