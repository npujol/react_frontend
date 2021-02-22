import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import { logout } from "../../thunk/authThunk";

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
      margin: theme.spacing(2),
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
        <Link to="/login">
          <Button variant="contained" color="secondary" to="/login">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="contained" color="secondary" to="/register">
            Register
          </Button>
        </Link>
      </ButtonGroup>
    );
  }
  return null;
};

const LoggedInView = (props) => {
  const classes = useStyles();
  if (props.currentUser) {
    return (
      <div className={classes.root}>
        <Tooltip title="Home" placement="bottom">
          <Link to="/">
            <IconButton to="/" edge="start" color="default" aria-label="home">
              <HomeIcon />
            </IconButton>
          </Link>
        </Tooltip>

        <Tooltip title="Your profile" placement="bottom">
          <Link to={`/@${props.currentUser.username}`}>
            <IconButton aria-label="The final profile" color="default">
              <AccountCircle />
            </IconButton>
          </Link>
        </Tooltip>

        <Tooltip title="Your notifications" placement="bottom">
          <IconButton aria-label="show 17 new notifications" color="default">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Logout" placement="bottom">
          <IconButton
            onClick={props.onClickLogout}
            edge="end"
            color="default"
            aria-label="logout"
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
  return null;
};

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  function onClickLogout() {
    dispatch(logout());
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link to={"/"}>
            <Button to={"/"} className={classes.title}>
              {props.appName}
            </Button>
          </Link>
          <hr />
          <LoggedOutView currentUser={props.currentUser} />
          <LoggedInView
            onClickLogout={onClickLogout}
            currentUser={props.currentUser}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
