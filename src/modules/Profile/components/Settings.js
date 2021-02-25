import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProfilesApi } from "../../../client";
import {
  SAVE_SETTINGS,
  UNLOAD_SETTINGS_PAGE,
  LOGOUT,
} from "../../../constants/actionTypes";

import { useFormik, Field } from "formik";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { login, unloadLogin } from "../../Auth/auth.thunk.js";

const profilesApi = new ProfilesApi();

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

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
    };

    this.updateState = (field) => (ev) => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (ev) => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || "",
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(
        Object.assign({}, this.state, {
          image: nextProps.currentUser.image || "",
          username: nextProps.currentUser.username,
          bio: nextProps.currentUser.bio,
          email: nextProps.currentUser.email,
        })
      );
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={this.state.image}
              onChange={this.updateState("image")}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.updateState("username")}
            />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={this.state.bio}
              onChange={this.updateState("bio")}
            ></textarea>
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateState("email")}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={this.state.password}
              onChange={this.updateState("password")}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.state.inProgress}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.settings,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (user) =>
    dispatch({
      type: SAVE_SETTINGS,
      payload: profilesApi.profilesUpdate(user.username, user),
    }),
  onUnload: () => dispatch({ type: UNLOAD_SETTINGS_PAGE }),
});

const Settings = () => {
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
    if (errors) {
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

export default Settings;
