import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  bio: yup.string("Enter your bio").required("Biography is required"),
});

const Biography = (props) => {
  const bioError = useSelector((state) => state.profile.bioError);
  const profile = props.profile;

  const formik = useFormik({
    initialValues: {
      bio: profile.bio,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.handleUpdateBio(values);
    },
  });

  useEffect(() => {
    if (bioError) {
      formik.setErrors({ bio: bioError });
    }
  }, [bioError, formik]);

  if (props.isEditing) {
    return (
      <Grid container justify="center">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="bio"
            name="bio"
            label="Biography"
            type="text"
            multiline
            rows={4}
            value={formik.values.bio}
            onChange={formik.handleChange}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />
          <IconButton color="default" type="submit">
            <CheckCircleOutlineIcon />
          </IconButton>
        </form>
      </Grid>
    );
  } else {
    return (
      <Typography variant="body2" color="textSecondary" component="p">
        {profile.bio}
      </Typography>
    );
  }
};

export default Biography;
