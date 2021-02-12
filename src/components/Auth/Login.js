import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { AuthApi } from "../../client";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../../constants/actionTypes';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 12,
    marginTop: 12,
    alignContent:"center"
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
  }
});


const authApi = new AuthApi();

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: authApi.authLoginCreate({ email: email, password: password }) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const WithMaterialUI = (props) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.handleSubmit(values.email, values.password)
    },
  });

  return (
    <Card className={classes.root} variant="outlined">
     <CardContent>
      <Typography 
      className={classes.title} 
      gutterBottom 
      variant="h5" 
      component="h2" >
        Sign In
      </Typography>
      <Grid container  
      justify="center"
      spacing={3}>

      <form onSubmit={formik.handleSubmit}>
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
        Sign in
        </Button>
      </form>
      </Grid>
      </CardContent>
        <Link  to="/register">
        <Typography className={classes.link} >Need an account?</Typography>
        </Link>
    </Card>
  );
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(email, password) {
    this.props.onSubmit(email, password);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
    <div>
     <WithMaterialUI handleSubmit={this.handleSubmit}></WithMaterialUI>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
