import React from 'react';
import { Link } from 'react-router-dom';
import { StoriesApi } from "../../client"
import { connect } from 'react-redux';
import { STORY_FAVORITED, STORY_UNFAVORITED } from '../../constants/actionTypes';

const storiesApi = new StoriesApi();

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: STORY_FAVORITED,
    payload: storiesApi.storiesFavorite(slug, {})
  }),
  unfavorite: slug => dispatch({
    type: STORY_UNFAVORITED,
    payload: storiesApi.storiesUnfavorite(slug, {})
  })
});

const StoryPreview = props => {
  const story = props.story;
  const favoriteButtonClass = story.favorited == "false" ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (story.favorited == "true") {
      props.unfavorite(story.slug);
    } else {
      props.favorite(story.slug);
    }
  };

  return (
    <div className="story-preview">
      <div className="story-meta">
        <Link to={`/@${story.owner.username}`}>
          <img src={story.owner.image} alt={story.owner.username} />
        </Link>

        <div className="info">
          <Link className="owner" to={`/@${story.owner.username}`}>
            {story.owner.username}
          </Link>
          <span className="date">
            {new Date(story.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {story.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/story/${story.slug}`} className="preview-link">
        <h1>{story.title}</h1>
        <p>{story.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            story.tags.map((tag, pk) => {
              return (
                <li className="tag-default tag-pill tag-outline" key={pk}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(StoryPreview);
