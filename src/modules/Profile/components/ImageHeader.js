import React, { useState } from "react";

import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 250,
    height: 250,
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 12,
  },
}));

export default function ImageHeader(props) {
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState(() =>
    props.profile.image
      ? props.profile.image
      : "https://picsum.photos/510/300?random"
  );
  const [filename, setFilename] = useState(() => null);

  function handleUploadClick(event) {
    var file = event.target.files[0];
    const reader = new FileReader(file);

    reader.onloadend = function (e) {
      setSelectedFile(reader.result);
    }.bind(this);
    setFilename(file);
  }

  function handleSaveImage(ev) {
    ev.preventDefault();
    if (filename) {
      props.handleUpdateImage(filename);
    }
  }

  if (props.isEditing) {
    return (
      <Grid container spacing={3} alignItems="center">
        <Avatar alt="image" src={selectedFile} className={classes.avatar} />
        <input
          accept="image/*"
          className={classes.input}
          id="image"
          multiple
          hidden
          type="file"
          onChange={handleUploadClick}
        />
        <label htmlFor="image">
          <Fab component="span" size="small">
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
        <IconButton color="default" onClick={handleSaveImage}>
          <CheckCircleOutlineIcon />
        </IconButton>
      </Grid>
    );
  } else {
    return (
      <Avatar alt="avatar" src={selectedFile} className={classes.avatar} />
    );
  }
}
