import React from "react";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import { changeTabRedirect } from "../home.thunk.js";

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
            const payload = { route: `/tag/${tag}` };
            dispatch(changeTabRedirect(payload));
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
    return <div>Loading Tags...</div>;
  }
};

export default Tags;
