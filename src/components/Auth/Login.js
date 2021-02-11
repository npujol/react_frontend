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

import {
  UPDATE_FIELD_AUTH,
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
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: authApi.authLoginCreate({ email: email, password: password }) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

const FormLogin = props => {
  const classes = useStyles();

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
      <form onSubmit={props.handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
        <TextField
          className={classes.item} 
            required
            id="filled-required"
            label="Required"
            defaultValue="email"
            variant="filled"
            value={props.email} 
            onChange={props.handleChangeEmail} 
          />
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
          <TextField
          className={classes.item} 
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          value={props.password} 
            onChange={props.handleChangePassword} 
          />
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          > 
        <Button
        className={classes.item} 
          variant="contained" 
          color="primary"
          type="submit"
          >
          Sign in
        </Button>
        </Grid>
      </form>
      </Grid>
      </CardContent>
        <Link  to="/register">
        <Typography className={classes.link} >Need an account?</Typography>
            
        </Link>
    </Card>
  );
}


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email:'', password:''}
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value, password: this.state.password});
  }
  
  handleChangePassword(event) {
    this.setState({email: this.state.email, password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.email, this.state.password);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
     <FormLogin 
     email={this.state.email} 
     password={this.state.password}
     handleSubmit={this.handleSubmit}
     handleChangeEmail={this.handleChangeEmail}
     handleChangePassword={this.handleChangePassword}></FormLogin>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
