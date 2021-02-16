import React from "react";
import { A } from "hookrouter";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { connect } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const LoggedOutView = (props) => {
  const classes = useStyles();

  if (!props.currentUser) {
    return (
      <ButtonGroup
        className={classes.buttons}
        size="large"
        color="primary"
        aria-label="large outlined primary button group"
      >
        <Button component={A} href="/login" variant="outlined" color="inherit">
          Login
        </Button>
        <Button
          component={A}
          href="/register"
          variant="outlined"
          color="inherit"
        >
          Register
        </Button>
      </ButtonGroup>
    );
  }
  return null;
};

const LoggedInView = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  if (props.currentUser) {
    return (
      <div className={classes.root}>
        <IconButton
          component={A}
          href="/"
          edge="start"
          color="inherit"
          aria-label="home"
        >
          <HomeIcon />
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          component={A}
          href={`/@${props.currentUser.username}`}
          aria-label="The final profile"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <IconButton
          onClick={props.onClickLogout}
          edge="start"
          color="inherit"
          aria-label="home"
        >
          <ExitToAppIcon />
        </IconButton>
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state) => ({
  ...state.common,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout() {
    this.props.onClickLogout();
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button disableElevation className="title" component={A} href="/">
              {this.props.appName.toLowerCase()}
            </Button>
            <hr />
            <LoggedOutView currentUser={this.props.currentUser} />
            <LoggedInView
              onClickLogout={this.onClickLogout}
              currentUser={this.props.currentUser}
              open={true}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
