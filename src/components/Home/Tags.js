import React from "react";
import { StoriesApi } from "../../client";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { useDispatch } from "react-redux";
import { CHANGE_TAB_REDIRECT } from "../../constants/actionTypes";

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

const Tags = (props) => {
  const classes = useStyles();
  const tags = props.tags;
  const dispatch = useDispatch();

  if (tags) {
    return (
      <div className={classes.root}>
        {tags.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            const payload = { route: `/tag/${tag.tag}` };
            dispatch({ type: CHANGE_TAB_REDIRECT, payload });
          };

          return (
            <Chip
              variant="outlined"
              size="small"
              label={tag.tag}
              key={tag.pk}
              onClick={handleClick}
            />
          );
        })}
      </div>
    );
  } else {
    return <div>Loading Tags...</div>;
  }
};

export default Tags;
