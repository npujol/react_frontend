import DeleteButton from "./DeleteButton";
import { A } from "hookrouter";
import React from "react";

const Comment = (props) => {
  const comment = props.comment;
  const show =
    props.currentUser && props.currentUser.username === comment.owner.username;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <A href={`/@${comment.owner.username}`} className="comment-owner">
          <img
            src={comment.owner.image}
            className="comment-owner-img"
            alt={comment.owner.username}
          />
        </A>
        &nbsp;
        <A href={`/@${comment.owner.username}`} className="comment-owner">
          {comment.owner.username}
        </A>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;
