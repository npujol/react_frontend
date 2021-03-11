import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ImageStoryHeader from "./ImageStoryHeader";
import TagsEditor from "./TagsEditor";

import { unloadEditor, createStory, loadNewStory } from "../editor.thunk";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "50%",
    marginBottom: 12,
    marginTop: 12,
    alignContent: "center",

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "100%",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(2),
      width: "100%",
    },
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  link: {
    textAlign: "center",
    marginBottom: 12,
    marginTop: 12,
  },
}));

const validationSchema = yup.object({
  title: yup
    .string("Enter the title")
    .max(50, "Title should be of maximum of 50 characters length")
    .required("Title is required"),
  description: yup
    .string("Enter the description")
    .max(250, "Description should be of maximum of 250 characters length")
    .required("description is required"),
  body: yup.string("Enter the body in markdown").required("body is required"),
});

const newStory = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const titleError = useSelector((state) => state.editor.titleError);
  const descriptionError = useSelector(
    (state) => state.editor.descriptionError
  );
  const tagList = useSelector((state) =>
    state.editor.tagList ? state.editor.tagList : []
  );
  const bodyError = useSelector((state) => state.editor.bodyError);
  const tagListError = useSelector((state) => state.editor.tagListError);
  const imageError = useSelector((state) => state.editor.imageError);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      body: "",
      tagList: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!tagList) {
        formik.setErrors({ tagList: tagListError });
      } else {
        dispatch(createStory(values, tagList));
      }
    },
  });

  useEffect(() => {
    dispatch(loadNewStory());
  }, []);

  useEffect(() => {
    if (titleError) {
      formik.setErrors({ title: titleError });
    }
  }, [titleError, formik]);

  useEffect(() => {
    if (descriptionError) {
      formik.setErrors({ description: descriptionError });
    }
  }, [descriptionError, formik]);

  useEffect(() => {
    if (imageError) {
      formik.setErrors({ image: imageError });
    }
  }, [imageError, formik]);

  useEffect(() => {
    if (bodyError) {
      formik.setErrors({ body: bodyError });
    }
  }, [bodyError, formik]);

  useEffect(() => {
    if (tagListError) {
      formik.setErrors({ tagList: tagListError });
    }
  }, [tagListError, formik]);

  return (
    <Card className={classes.root} variant="outlined">
      <ImageStoryHeader
        image={"https://picsum.photos/510/300?random"}
        isEditing={false}
      />
      <CardContent>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          Your story
        </Typography>
        <Grid container justify="center" spacing={3}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              type="text"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TagsEditor
              error={formik.errors.tagList}
              touched={formik.touched.tagList}
              tagList={formik.values.tagList}
            ></TagsEditor>
            <TextField
              id="body"
              name="body"
              label="Body"
              type="text"
              multiline
              rows={4}
              value={formik.values.body}
              onChange={formik.handleChange}
              error={formik.touched.body && Boolean(formik.errors.body)}
              helperText={formik.touched.body && formik.errors.body}
            />
            <Button color="primary" variant="contained" type="submit">
              Ok
            </Button>
          </form>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default newStory;