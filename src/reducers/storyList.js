import {
  STORY_FAVORITED,
  STORY_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case STORY_FAVORITED:
    case STORY_UNFAVORITED:
      return {
        ...state,
        stories: state.stories.map(story => {
          if (story.slug === action.payload.story.slug) {
            return {
              ...story,
              favorited: action.payload.story.favorited,
              favoritesCount: action.payload.story.favoritesCount
            };
          }
          return story;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        stories: action.payload.results,
        storiesCount: action.payload.count,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        stories: action.payload.results,
        storiesCount: action.payload.count,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0].results.map((obj) => obj.tag),
        stories: action.payload[1].results.map((obj) => obj),
        storiesCount: action.payload[1].count,
        currentPage: 0,
        tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        stories: action.payload.results.map((obj) => obj),
        storiesCount: action.payload.count,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        stories: action.payload[1].results.map((obj) => obj),
        storiesCount: action.payload[1].count,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};