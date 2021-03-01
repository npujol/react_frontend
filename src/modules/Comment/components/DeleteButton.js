import React from "react";
import { StoriesApi } from "../../../client";
import { connect } from "react-redux";
import { DELETE_COMMENT } from "../../../constants/actionTypes";

const storiesApi = new StoriesApi();

const mapDispatchToProps = (dispatch) => ({
  onClick: (payload, commentId) =>
    dispatch({ type: DELETE_COMMENT, payload, commentId }),
});

const DeleteButton = (props) => {
  const del = () => {
    const payload = storiesApi.storiesCommentsDelete(
      props.commentId,
      props.slug
    );
    props.onClick(payload, props.commentId);
  };

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }
  return null;
};

export default connect(() => ({}), mapDispatchToProps)(DeleteButton);
