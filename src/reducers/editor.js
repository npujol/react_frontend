import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  STORY_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  // console.log("editorjs", action.payload)
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        storySlug: action.payload ? action.payload.slug : '',
        title: action.payload ? action.payload.title : '',
        description: action.payload ? action.payload.description : '',
        body: action.payload ? action.payload.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.tags : []
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    case STORY_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === STORY_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
