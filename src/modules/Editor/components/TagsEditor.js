import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
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
  input: {
    width: "25ch",
  },
}));

const TagsEditor = (props) => {
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
    if (inputTag !== "") {
      dispatch(addTag(inputTag));
      setInputTag("");
    }
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
      <Grid
        container
        direction="row"
        justify="center"
        spacing={2}
        alignItems="center"
      >
        <TextField
          className={classes.input}
          value={inputTag}
          onChange={handleChange}
          type="text"
          placeholder="Add tag..."
          error={props.touched && Boolean(props.errors)}
        />
        <IconButton color="default" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Paper>
  );
};
export default TagsEditor;
