import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import EditIcon from "@material-ui/icons/Edit";
import ReplyIcon from "@material-ui/icons/Reply";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Card } from "@material-ui/core";

const CardButtons = (props) => {
  const profile = props.profile;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [followingColor, setFollowingColor] = useState(() => {
    profile.following === "true" ? "secondary" : "default";
  });
  const [followingText, setFollowingText] = useState(() => {
    profile.following === "true" ? "Unfollow" : "Follow";
  });

  useEffect(() => {
    const color = profile.following === "true" ? "secondary" : "default";
    const text = profile.following === "true" ? "Unfollow" : "Follow";
    setFollowingColor(color);
    setFollowingText(text);
  }, [profile]);

  const isCurrentUser =
    currentUser && props.profile.username === currentUser.username;
  if (currentUser) {
    if (isCurrentUser) {
      return (
        <Tooltip title="Edit profile" placement="bottom">
          <IconButton
            onClick={props.handleEditing}
            edge="end"
            color="default"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title={followingText} placement="bottom">
          <IconButton
            onClick={props.handleFollowing}
            edge="end"
            color={followingColor}
            aria-label="following"
          >
            <ReplyIcon />
          </IconButton>
        </Tooltip>
      );
    }
  } else {
    return null;
  }
};

export default CardButtons;
