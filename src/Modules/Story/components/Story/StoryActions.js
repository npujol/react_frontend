import { A } from "hookrouter";
import React from "react";
import { StoriesApi } from "../../../../client";
import { connect } from "react-redux";
import { DELETE_STORY } from "../../../../constants/actionTypes";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const storiesApi = new StoriesApi();

const mapDispatchToProps = (dispatch) => ({
  onClickDelete: (payload) => dispatch({ type: DELETE_STORY, payload }),
});

const StoryActions = (props) => {
  const story = props.story;
  const classes = useStyles();

  const del = () => {
    props.onClickDelete(storiesApi.storiesDelete(story.slug));
  };

  if (props.canModify) {
    return (
      <span>
        {/* <A
          href={`/editor/${story.slug}`}
          >
          <i className="ion-edit"></i> Edit Story
        </A> */}

        <button aria-label="delete" className={classes.margin} onClick={del}>
          <DeleteIcon fontSize="small" />
        </button>
      </span>
    );
  }

  return <span></span>;
};

export default connect(() => ({}), mapDispatchToProps)(StoryActions);
