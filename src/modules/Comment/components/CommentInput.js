import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { addComment } from "../comment.thunk";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignContent: "center",

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "95%",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(2),
      width: "95%",
    },
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 12,
  },
}));

const validationSchema = yup.object({
  body: yup
    .string("Enter your comment")
    .max(250, "Comment should be of maximum 250 characters length")
    .required("Your comment is required"),
});
const CommentInput = (props) => {
  const classes = useStyles();
  const slug = props.slug;
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.errors);

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addComment(slug, values));
    },
  });

  useEffect(() => {
    if (errors) {
      alert(errors);
      formik.setErrors({ body: errors });
    }
  }, [errors]);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          Add a comment
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="body"
            name="body"
            label="Your comment"
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
      </CardContent>
    </Card>
  );
};

export default CommentInput;
