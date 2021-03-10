import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import TextField from "@material-ui/core/TextField";

import { addTag, removeTag } from "../editor.thunk";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const TagsEditor = () => {
  const classes = useStyles();
  const tagList = useSelector((state) =>
    state.editor.tagList ? state.editor.tagList : []
  );
  const [inputTag, setInputTag] = useState(() => "");
  const dispatch = useDispatch();
  const handleDelete = (tag) => () => {
    dispatch(removeTag(tag));
  };

  const handleAdd = () => {
    dispatch(addTag(inputTag));
    setInputTag("");
  };

  const handleChange = (ev) => {
    setInputTag(ev.target.value);
  };
  return (
    <Paper component="ul" className={classes.root}>
      {tagList.map((data) => {
        let icon;

        return (
          <li key={uuidv4()}>
            <Chip
              icon={icon}
              label={data}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}

      <TextField
        value={inputTag}
        onChange={handleChange}
        type="text"
        placeholder="Add tag..."
      />
      <Button color="primary" variant="contained" onClick={handleAdd}>
        ADD
      </Button>
    </Paper>
  );
};
export default TagsEditor;
