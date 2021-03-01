import React, { useState } from "react";

import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CardMedia from "@material-ui/core/CardMedia";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "30%", // 16:9
  },
  input: {
    alignItems: "center",
  },
}));

const ImageStoryHeader = (props) => {
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState(() => props.image);
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
      <div>
        <CardMedia
          className={classes.media}
          image={selectedFile}
          title="image"
        />

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
      </div>
    );
  } else {
    return (
      <CardMedia className={classes.media} image={selectedFile} title="image" />
    );
  }
};

export default ImageStoryHeader;
