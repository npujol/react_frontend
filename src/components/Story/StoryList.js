import StoryPreview from './StoryPreview';
import ListPagination from '../Common/ListPagination';
import React from 'react';

const StoryList = props => {
  if (!props.stories) {
    return (
      <div className="story-preview">Loading...</div>
    );
  }

  if (props.stories.length === 0) {
    return (
      <div className="story-preview">
        No stories are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.stories.map(story => {
          return (
            <StoryPreview story={story} key={story.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        storiesCount={props.storiesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default StoryList;
