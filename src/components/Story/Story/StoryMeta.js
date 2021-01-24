import StoryActions from './StoryActions';
import { Link } from 'react-router-dom';
import React from 'react';

const StoryMeta = props => {
  const story = props.story;
  return (
    <div className="story-meta">
      <Link to={`/@${story.owner.username}`}>
        <img src={story.owner.image} alt={story.owner.username} />
      </Link>

      <div className="info">
        <Link to={`/@${story.owner.username}`} className="owner">
          {story.owner.username}
        </Link>
        <span className="date">
          {new Date(story.createdAt).toDateString()}
        </span>
      </div>

      <StoryActions canModify={props.canModify} story={story} />
    </div>
  );
};

export default StoryMeta;
