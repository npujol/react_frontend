import StoryActions from './StoryActions';
import { Link } from 'react-router-dom';
import React from 'react';

const StoryMeta = props => {
  const story = props.story;
  return (
    <div className="story-meta">
      <Link to={`/@${story.author.username}`}>
        <img src={story.author.image} alt={story.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${story.author.username}`} className="author">
          {story.author.username}
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
