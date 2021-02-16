import { A } from "hookrouter";
import { useSelector, useDispatch } from "react-redux";
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
        <Button
          variant="contained"
          color="secondary"
          component={A}
          href="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={A}
          href="/register"
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
  if (props.currentUser) {
    return (
      <div className={classes.root}>
        <Tooltip title="Home" placement="bottom">
          <div>
            <IconButton
              component={A}
              href="/"
              edge="start"
              color="default"
              aria-label="home"
            >
              <HomeIcon />
            </IconButton>
          </div>
        </Tooltip>

        <Tooltip title="Your profile" placement="bottom">
          <div>
            <IconButton
              component={A}
              href={`/@${props.currentUser.username}`}
              aria-label="The final profile"
              color="default"
            >
              <AccountCircle />
            </IconButton>
          </div>
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
  const commonState = useSelector((state) => state.common);
  const dispatch = useDispatch();

  function onClickLogout() {
    dispatch({ type: LOGOUT });
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button disableElevation className="title" component={A} href="/">
            {props.appName}
          </Button>
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
