import React from "react";
// import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const TagsEditor = (props) => {
  const classes = useStyles();
  const tags = props.tags;
  // const dispatch = useDispatch();

  if (tags) {
    return (
      <div className={classes.root}>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Enter tags"
            value={this.props.tagInput}
            onChange={this.changeTagInput}
            onKeyUp={this.watchForEnter}
          />

          <div className="tag-list">
            {(this.props.tagList || []).map((tag) => {
              return (
                <span className="tag-default tag-pill" key={tag}>
                  <i
                    className="ion-close-round"
                    onClick={this.removeTagHandler(tag)}
                  ></i>
                  {tag}
                </span>
              );
            })}
          </div>
        </fieldset>
        {tags.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            {
              /* const payload = { route: `/tag/${tag}` };
            dispatch(changeTabRedirect(payload)); */
            }
          };

          return (
            <Chip
              variant="outlined"
              size="small"
              label={tag}
              key={uuidv4()}
              onClick={handleClick}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <fieldset className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter tags"
          // value={props.tagInput}
          // onChange={changeTagInput}
          // onKeyUp={watchForEnter}
        />

        <div className="tag-list">
          {(props.tags || []).map((tag) => {
            return (
              <span className="tag-default tag-pill" key={tag}>
                <i
                  className="ion-close-round"
                  onClick={this.removeTagHandler(tag)}
                ></i>
                {tag}
              </span>
            );
          })}
        </div>
      </fieldset>
    );
  }
};

export default TagsEditor;
