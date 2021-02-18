import React from "react";
import { StoriesApi } from "../../client";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { Link, useHistory } from "react-router-dom";

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
  const history = useHistory();

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
            history.push(`/${tag}`);
          };

          return (
            <Link to={`/${tag}`}>
              <Chip
                variant="outlined"
                size="small"
                label={tag}
                key={tag}
                onClick={handleClick}
              />
            </Link>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading Tags...</div>;
  }
};

export default Tags;
