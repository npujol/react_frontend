import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const LoggedOutView = props => {

  if (!props.currentUser) {
    return (
      <div>
        <Link to="/login" className="nav-link">
          <Button to="/login" variant="outlined" color="inherit">Login</Button>
        </Link>
        <Link to="/login" className="nav-link">
          <Button to="/register" variant="outlined" color="inherit">Register</Button>
        </Link>
      </div>
    );
  }
  return null;
};

const LoggedInView = props => {
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
    if (event.key === 'Tab') {
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
        <Link to="/" className="nav-link">
          <IconButton to="/login" edge="start" color="inherit" aria-label="home">
            <HomeIcon />
          </IconButton>
        </Link>
        <div>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="account of current user"
            color="inherit"
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <AccountCircle />
          </IconButton>

          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem>
                        <Link to="/editor" className="nav-link">
                          <i className="ion-compose"></i>&nbsp;New Post
                          </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/settings" className="nav-link">
                          <i className="ion-gear-a"></i>&nbsp;Settings
                          </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={`/@${props.currentUser.username}`}
                          className="nav-link">
                          <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
                          {props.currentUser.username}
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
  return null;
};


class Header extends React.Component {

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" className="nav-link">
              <Button
                disableElevation
                variant="h1"
                className="title"
              >
                {this.props.appName.toLowerCase()}
              </Button>
            </Link>
            <hr />
            <LoggedOutView currentUser={this.props.currentUser} />
            <LoggedInView currentUser={this.props.currentUser} open={true} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
