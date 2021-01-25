import { Link } from 'react-router-dom';
import React from 'react';
import { StoriesApi } from "../../../client"
import { connect } from 'react-redux';
import { DELETE_STORY } from '../../../constants/actionTypes';

const storiesApi = new StoriesApi();

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_STORY, payload })
});

const StoryActions = props => {
  const story = props.story;
  const del = () => {
    props.onClickDelete(storiesApi.storiesDelete(story.slug))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${story.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Story
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Story
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(StoryActions);
