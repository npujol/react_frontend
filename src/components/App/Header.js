import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { connect } from 'react-redux';
import {
  LOGOUT
} from '../../constants/actionTypes';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const LoggedOutView = props => {
  const classes = useStyles();

  if (!props.currentUser) {
    return (
      <ButtonGroup className={classes.buttons} size="large" color="primary" aria-label="large outlined primary button group">
        <Link to="/login" >
          <Button to="/login" variant="outlined" color="inherit">Login</Button>
        </Link>
        <Link to="/login">
          <Button to="/register" variant="outlined" color="inherit">Register</Button>
        </Link>
      </ButtonGroup>
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
        <Link to="/">
          <IconButton to="/login" edge="start" color="inherit" aria-label="home">
            <HomeIcon />
          </IconButton>
        </Link>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <IconButton
            aria-label="account of current user"
            color="inherit"
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <AccountCircle />
          </IconButton> */}
          <Link to={`/@${props.currentUser.username}`}>

          <IconButton
            aria-label="The final profile"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          </Link>
          <IconButton 
          onClick={props.onClickLogout} 
          edge="start" 
          color="inherit" 
          aria-label="home">
            <ExitToAppIcon />
          </IconButton>
          {/* <Popper
          className={classes.paper}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem>
                        <Link to="/editor" >
                          New Post
                          </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/settings" >
                          Settings
                          </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={`/@${props.currentUser.username}`}
                          >
                          {props.currentUser.username}
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper> */}
      
      </div>
    );
  }
  return null;
};


const mapStateToProps = state => ({
  ...state.common,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
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
            <Link to="/" >
              <Button
                disableElevation
                className="title"
              >
                {this.props.appName.toLowerCase()}
              </Button>
            </Link>
            <hr />
            <LoggedOutView currentUser={this.props.currentUser} />
            <LoggedInView onClickLogout={this.onClickLogout} currentUser={this.props.currentUser} open={true} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
