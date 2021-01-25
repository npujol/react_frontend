import StoryList from '../Story/StoryList';
import React from 'react';
import { StoriesApi } from "../../client";

import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

const storiesApi = new StoriesApi();

const YourFeedTab = props => {
  console.log("now", props);

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
      <li className="nav-item">
        <a href=""
          className={props.tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

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
    <li className="nav-item">
      <a
        href=""
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
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
  console.log("MainView", props.storiesList);
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            currentUser={props.currentUser}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </ul>
      </div>

      <StoryList
        pager={props.pager}
        stories={props.stories}
        loading={props.loading}
        storiesCount={props.storiesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
