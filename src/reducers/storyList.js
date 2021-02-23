import {
  SET_STORY_FAVORITED,
  SET_STORY_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  LOAD_HOME_PAGE,
  UNLOAD_HOME_PAGE,
  CHANGE_TAB,
  LOAD_PROFILE_PAGE,
  UNLOAD_PROFILE_PAGE,
  LOAD_PROFILE_FAVORITES_PAGE,
  UNLOAD_PROFILE_FAVORITES_PAGE,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  console.log("StoryList", action.payload);
  switch (action.type) {
    case SET_STORY_FAVORITED:
    case SET_STORY_UNFAVORITED:
      return {
        ...state,
        stories: state.stories.map((story) => {
          if (story.slug === action.payload.slug) {
            return {
              ...story,
              favorited: action.payload.favorited,
              favoritesCount: action.payload.favoritesCount,
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
        pager: action.pager,
        stories:
          action.payload !== undefined
            ? action.payload[1].results.map((obj) => obj)
            : [],
        storiesCount:
          action.payload !== undefined ? action.payload[1].count : 0,
        tab: 3,
        tag: action.tag,
        currentPage: 0,
      };
    case LOAD_HOME_PAGE:
      return {
        ...state,
        pager: action.pager,
        tags:
          action.payload !== undefined
            ? action.payload[0].results.map((obj) => obj.tag)
            : [],
        stories:
          action.payload !== undefined
            ? action.payload[1].results.map((obj) => obj)
            : [],
        storiesCount:
          action.payload !== undefined ? action.payload[1].count : 0,
        currentPage: 0,
      };
    case UNLOAD_HOME_PAGE:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        stories:
          action.payload !== undefined
            ? action.payload[1].results.map((obj) => obj)
            : [],
        storiesCount:
          action.payload !== undefined ? action.payload[1].count : 0,
        tab: action.tab,
        currentPage: 0,
        tag: null,
      };
    case LOAD_PROFILE_PAGE:
    case LOAD_PROFILE_FAVORITES_PAGE:
      return {
        ...state,
        pager: action.pager,
        stories:
          action.payload !== undefined
            ? action.payload[1].results.map((obj) => obj)
            : [],
        storiesCount:
          action.payload[1] !== undefined ? action.payload[1].count : 0,
        currentPage: 0,
      };
    case UNLOAD_PROFILE_PAGE:
    case UNLOAD_PROFILE_FAVORITES_PAGE:
      return {};
    default:
      return state;
  }
};
