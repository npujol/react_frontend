import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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

import { login, unloadLogin } from "../auth.thunk.js";

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
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const classes = useStyles();
  const errors = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(unloadLogin());
    };
  }, [dispatch]);

  useEffect(() => {
    if (errors !== undefined) {
      alert(errors);
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
          Sign In
        </Typography>
        <Grid container justify="center">
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" type="submit">
              Sign in
            </Button>
          </form>
        </Grid>
      </CardContent>
      <Link to="/register">
        <Typography className={classes.link}>Need an account?</Typography>
      </Link>
    </Card>
  );
};

export default Login;
