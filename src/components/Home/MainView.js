import StoryList from '../Story/StoryList';
import React from 'react';
import { StoriesApi } from "../../client";

import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const storiesApi = new StoriesApi();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


const GlobalFeedTab = props => {

  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick(
      'all',
      storiesApi.storiesFeedList,
      storiesApi.storiesFeedList({ offset: 0, limit: 10 })
    );
  };
  return (
    <Tab
      label=" Global Feed"
      {...a11yProps(0)}
      onClick={clickHandler}>
    </Tab>
  );
};


const YourFeedTab = props => {
  // console.log("now", props);

  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick(
        'feed',
        storiesApi.storiesList,
        storiesApi.storiesList({
          ownerUserUsername: props.currentUser.username,
          offset: 0,
          limit: 10
        })
      );

    }

    return (
      <Tab
        label="Your Feed"
        {...a11yProps(1)}
        onClick={clickHandler}>
      </Tab>
    );
  }
  return null;
};



const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <Tab
      label={props.tag}
      {...a11yProps(2)}>
    </Tab>
  );
};

const mapStateToProps = state => ({
  ...state.storyList,
  tags: state.home.tags,
  token: state.common.token,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  // console.log("MainView", props.storiesList);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <GlobalFeedTab
            tab={props.tab}
            onTabClick={props.onTabClick} />
          <YourFeedTab
            token={props.token}
            tab={props.tab}
            currentUser={props.currentUser}
            onTabClick={props.onTabClick} />
          <TagFilterTab tag={props.tag} />
        </Tabs>

        <StoryList
          pager={props.pager}
          stories={props.stories}
          loading={props.loading}
          storiesCount={props.storiesCount}
          currentPage={props.currentPage} />
      </AppBar>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
