import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { AuthApi } from "../../client";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import * as yup from "yup";
import { REGISTER, REGISTER_PAGE_UNLOADED } from "../../constants/actionTypes";

const authApi = new AuthApi();
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
  username: yup
    .string("Enter your username")
    .max(20, "Username should be of maximum of 20 characters length")
    .required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Register = () => {
  const classes = useStyles();
  const emailError = useSelector((state) => state.common.emailError);
  const usernameError = useSelector((state) => state.common.usernameError);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = authApi.authRegistrationCreate({
        email: values.email,
        password: values.password,
        username: values.username,
      });
      dispatch({ type: REGISTER, payload });
    },
  });

  useEffect(() => {
    dispatch({ type: REGISTER_PAGE_UNLOADED });
  }, [dispatch]);

  useEffect(() => {
    if (emailError !== undefined) {
      formik.setErrors({ email: emailError });
    }
  }, [emailError, formik]);

  useEffect(() => {
    if (usernameError !== undefined) {
      formik.setErrors({ username: usernameError });
    }
  }, [usernameError, formik]);

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
        <Grid container justify="center" spacing={3}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="username"
              name="username"
              label="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
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
              Create
            </Button>
          </form>
        </Grid>
      </CardContent>
      <Link to="/login">
        <Typography className={classes.link}>Have an account?</Typography>
      </Link>
    </Card>
  );
};

export default Register;
