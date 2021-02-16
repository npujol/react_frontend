import { Profile, mapStateToProps } from "./Profile";
import React from "react";
import { A } from "hookrouter";
import { connect } from "react-redux";
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import { ProfilesApi, StoriesApi } from "../../client";

const profilesApi = new ProfilesApi();
const storiesApi = new StoriesApi();

const mapDispatchToProps = (dispatch) => ({
  onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

class ProfileFavorites extends Profile {
  componentWillMount() {
    // console.log("ProfileFavorites", this.props.match.params.username);
    this.props.onLoad(
      (page) =>
        storiesApi.storiesList({
          favoritedByUserUsername: this.props.match.params.username,
          limit: 10,
          offset: page,
        }),
      Promise.all([
        profilesApi.profilesRead(this.props.match.params.username),
        storiesApi.storiesList({
          favoritedByUserUsername: this.props.match.params.username,
          limit: 10,
          offset: 0,
        }),
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <A className="nav-link" href={`/@${this.props.profile.username}`}>
            My Stories
          </A>
        </li>

        <li className="nav-item">
          <A
            className="nav-link active"
            href={`/@${this.props.profile.username}/favorites`}
          >
            Favorited Stories
          </A>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
