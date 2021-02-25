import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ProfileTabs from "./ProfileTabs";
import Biography from "./Biography";
import CardButtons from "./CardButtons";
import ImageHeader from "./ImageHeader";

import {
  fetchProfileStories,
  onFollow,
  onUnfollow,
  unloadProfile,
  saveBio,
  saveImage,
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
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const param = useParams();
  const username = param.username;

  const profile = useSelector((state) => state.profile.profile);
  const yoursStories = useSelector((state) => state.profile.yoursStories);
  const favoriteStories = useSelector((state) => state.profile.favoriteStories);
  const [isEditing, setIsEditing] = useState(() => false);

  useEffect(() => {
    dispatch(fetchProfileStories(username));

    return () => {
      dispatch(unloadProfile());
    };
  }, [username, dispatch]);

  function handleUpdateBio(values) {
    dispatch(saveBio(profile.username, values));
    setIsEditing(false);
  }
  function handleUpdateImage(image) {
    dispatch(saveImage(profile.username, image));
    setIsEditing(false);
  }

  function handleEditing(ev) {
    ev.preventDefault();
    setIsEditing(true);
  }

  function handleFollowing(ev) {
    ev.preventDefault();
    if (profile.following === "true") {
      dispatch(onUnfollow(username));
    } else {
      dispatch(onFollow(username));
    }
  }

  if (profile) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <Grid item xs={6}>
                  <ImageHeader
                    isEditing={isEditing}
                    profile={profile}
                    handleUpdateImage={handleUpdateImage}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <Typography variant="h5" color="textPrimary" component="h5">
                      {profile.username}
                      <CardButtons
                        profile={profile}
                        handleFollowing={handleFollowing}
                        handleEditing={handleEditing}
                      />
                    </Typography>
                    <Biography
                      isEditing={isEditing}
                      profile={profile}
                      handleUpdateBio={handleUpdateBio}
                    ></Biography>
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
