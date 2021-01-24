import StoryMeta from './StoryMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import { StoriesApi } from "../../../client"
import { connect } from 'react-redux';
import marked from 'marked';
import { STORY_PAGE_LOADED, STORY_PAGE_UNLOADED } from '../../../constants/actionTypes';

const storiesApi = new StoriesApi();

const mapStateToProps = state => ({
  ...state.story,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: STORY_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: STORY_PAGE_UNLOADED })
});

class Story extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      storiesApi.storiesRead(this.props.match.params.id),
      storiesApi.storiesCommentsList(
        this.props.match.params.id,
        { limit: 10, offset: 0 }
      )
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.story) {
      return null;
    }

    // const markup = { __html: marked(this.props.story.body, { sanitize: true }) };
    const markup = { __html: this.props.story.body };

    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.story.owner.username;
    return (
      <div className="story-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.story.title}</h1>
            <StoryMeta
              story={this.props.story}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row story-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.story.tags.map((tag, pk) => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={pk}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="story-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
