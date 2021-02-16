import { Link } from "react-router-dom";

import React, { useEffect } from "react";
import { AuthApi, UsersApi } from "../../client";
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
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from "../../constants/actionTypes";

const authApi = new AuthApi();
const usersApi = new UsersApi();
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 12,
    marginTop: 12,
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  link: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 12,
    marginTop: 12,
  },
  item: {
    marginBottom: 12,
    marginTop: 12,
  },
});

// const mapStateToProps = (state) => ({ ...state.auth });

// const mapDispatchToProps = (dispatch) => ({
//   onChangeEmail: (value) =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
//   onChangePassword: (value) =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
//   onChangeUsername: (value) =>
//     dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
//   onSubmit: (username, email, password) => {
//     const payload = authApi.authRegistrationCreate({
//       email: email,
//       password: password,
//       username: username,
//     });
//     dispatch({ type: REGISTER, payload });
//   },
//   onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
// });

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
  // constructor() {
  //   super();
  //   this.changeEmail = (ev) => this.props.onChangeEmail(ev.target.value);
  //   this.changePassword = (ev) => this.props.onChangePassword(ev.target.value);
  //   this.changeUsername = (ev) => this.props.onChangeUsername(ev.target.value);
  //   this.submitForm = (username, email, password) => (ev) => {
  //     ev.preventDefault();
  //     this.props.onSubmit(username, email, password);
  //   };
  // }

  const classes = useStyles();
  const authState = useSelector((state) => ({ ...state.auth }));

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
  const dispatch = useDispatch();

  function handleSubmit(email, password) {
    dispatch({
      type: LOGIN,
      payload: authApi.authLoginCreate({ email: email, password: password }),
    });
  }

  function onUnload() {
    dispatch({ type: REGISTER_PAGE_UNLOADED });
  }

  useEffect(() => {
    onUnload();
  }, []);

  // const email = this.props.email;
  // const password = this.props.password;
  // const username = this.props.username;

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
              className={classes.item}
              fullWidth
              id="username"
              name="username"
              label="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              className={classes.item}
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              className={classes.item}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
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
