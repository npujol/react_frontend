import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from "@material-ui/icons/Edit";
import ReplyIcon from "@material-ui/icons/Reply";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ProfileTabs from "./ProfileTabs";
import Grid from "@material-ui/core/Grid";

import {
  fetchProfileStories,
  onFollow,
  onUnfollow,
  unloadProfile,
} from "../profile.thunk.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  card: {
    display: "flex",
    flexDirection: "row",
  },
  buttons: {
    marginLeft: "auto",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 100,
    marginTop: 50,
    marginBottom: 50,
  },

  avatar: {
    width: 250,
    height: 250,
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 12,
  },
}));

const CardButtons = (props) => {
  const profile = props.profile;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [followingColor, setFollowingColor] = useState(
    profile.following === "true" ? "secondary" : "default"
  );
  const [followingText, setFollowingText] = useState(
    profile.following === "true" ? "Unfollow" : "Follow"
  );

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
          <Link to="/settings">
            <IconButton
              to="/settings"
              edge="end"
              color="default"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </Link>
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

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const param = useParams();
  const username = param.username;

  const profile = useSelector((state) => state.profile.profile);
  const yoursStories = useSelector((state) => state.profile.yoursStories);
  const favoriteStories = useSelector((state) => state.profile.favoriteStories);

  useEffect(() => {
    dispatch(fetchProfileStories(username));

    return () => {
      dispatch(unloadProfile());
    };
  }, [username, dispatch]);

  const handleFollowing = (ev) => {
    ev.preventDefault();
    if (profile.following === "true") {
      dispatch(onUnfollow(username));
    } else {
      dispatch(onFollow(username));
    }
  };

  if (profile) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <Grid item xs={6}>
                  <Avatar
                    alt={profile.username}
                    src="https://picsum.photos/510/300?random"
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <Typography variant="h5" color="textPrimary" component="h5">
                      {profile.username}
                      <CardButtons
                        profile={profile}
                        handleFollowing={handleFollowing}
                      />
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {profile.bio}
                    </Typography>
                  </CardContent>
                </Grid>
              </Card>
            </Paper>
            <Paper className={classes.paper}>
              <ProfileTabs
                yoursStories={yoursStories}
                favoriteStories={favoriteStories}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  } else return null;
};

export default Profile;
