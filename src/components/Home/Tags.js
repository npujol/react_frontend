import React from "react";
import { StoriesApi } from "../../client";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TAB, CHANGE_TAB_REDIRECT } from "../../constants/actionTypes";

const storiesApi = new StoriesApi();

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
            {
              /* props.onClickTag(
              tag,
              (page) =>
                storiesApi.storiesList({
                  offset: page,
                  limit: 10,
                  tagsTag: tag,
                }),
              storiesApi.storiesList({ offset: 0, limit: 10, tagsTag: tag })
            ); */
            }
            const payload = { route: `/tag/${tag.tag}` };
            dispatch({ type: CHANGE_TAB_REDIRECT, payload });
            {
              /* history.push(`/${tag.tag}`); */
            }
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
