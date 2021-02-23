import StoryActions from "./StoryActions";
import { A } from "../../Modules/Story/Story/Story/node_modules/hookrouter";
import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

const StoryMeta = (props) => {
  const story = props.story;
  return (
    <CardHeader
      avatar={
        <Link to={`/@${story.owner.username}`}>
          <Avatar
            aria-label="recipe"
            src={
              story.owner.image
                ? story.owner.image
                : "https://picsum.photos/510/300?random"
            }
            alt={story.owner.username}
          ></Avatar>
        </Link>
      }
      action={<StoryActions canModify={props.canModify} story={story} />}
      title={story.title}
      subheader={new Date(story.createdAt).toDateString()}
    />
  );
};

export default StoryMeta;
