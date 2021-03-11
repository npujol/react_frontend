import {
  LOAD_EDITOR_PAGE,
  UNLOAD_EDITOR_PAGE,
  ADD_TAG,
  REMOVE_TAG,
  SAVE_STORY_FAILED,
  LOAD_NEW_STORY_PAGE,
} from "../../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_EDITOR_PAGE:
      return {
        ...state,
        story: action.payload.story,
        bodyMarkdown: action.payload.bodyMarkdown.bodyMarkdown,
        tagList: action.payload.story.tags.filter((tag) => tag.tag),
      };
    case LOAD_NEW_STORY_PAGE:
      return {
        ...state,
        tagList: [],
      };
    case UNLOAD_EDITOR_PAGE:
      return {};
    case ADD_TAG:
      state.tagList.push(action.payload.inputTag);
      return {
        ...state,
        tagList: state.tagList.filter((v, i, a) => a.indexOf(v) === i),
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter((tag) => tag !== action.tag),
      };
    case SAVE_STORY_FAILED:
      return {
        ...state,
        inProgress: false,
        titleError: action.payload.errors.title,
        descriptionError: action.payload.errors.description,
        bodyError: action.payload.errors.body,
        tagListError: action.payload.errors.tags,
        imageError: action.payload.errors.image,
        bioError: action.payload.errors.bio,
      };
    default:
      return state;
  }
};
