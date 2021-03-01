import {
  LOAD_HOME_PAGE,
  UNLOAD_HOME_PAGE,
  SET_STORY_FAVORITED,
  SET_STORY_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  CHANGE_TAB,
  LOAD_PROFILE_FAVORITES_PAGE,
  UNLOAD_PROFILE_FAVORITES_PAGE,
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
    case SET_PAGE:
      return {
        ...state,
        stories: action.payload.results,
        storiesCount: action.payload.count,
        currentPage: action.page,
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        tags:
          action.payload !== undefined
            ? action.payload.tags.results.map((obj) => obj.tag)
            : [],
        stories:
          action.payload !== undefined
            ? action.payload.stories.results.map((obj) => obj)
            : [],
        storiesCount:
          action.payload !== undefined ? action.payload.stories.count : 0,
        tag: action.tag,
        currentPage: 0,
      };
    case LOAD_HOME_PAGE:
      return {
        ...state,
        tags:
          action.payload !== undefined
            ? action.payload.tags.results.map((obj) => obj.tag)
            : [],
        stories:
          action.payload !== undefined
            ? action.payload.stories.results.map((obj) => obj)
            : [],
        storiesCount:
          action.payload !== undefined ? action.payload.stories.count : 0,
        currentPage: 0,
      };
    case UNLOAD_HOME_PAGE:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        tags:
          action.payload !== undefined
            ? action.payload.tags.results.map((obj) => obj.tag)
            : [],
        stories:
          action.payload !== undefined
            ? action.payload.stories.results.map((obj) => obj)
            : [],
        storiesCount:
          action.payload !== undefined ? action.payload.stories.count : 0,
        currentPage: 0,
        tag: null,
      };
    case LOAD_PROFILE_FAVORITES_PAGE:
      return {
        ...state,
        stories:
          action.payload !== undefined
            ? action.payload.stories.results.map((obj) => obj)
            : [],
        storiesCount:
          action.payload !== undefined ? action.payload.stories.count : 0,
        currentPage: 0,
      };
    case UNLOAD_PROFILE_FAVORITES_PAGE:
      return {};
    case UNLOAD_HOME_PAGE:
      return {};
    default:
      return state;
  }
};
