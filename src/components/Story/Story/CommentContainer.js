import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { A } from "hookrouter";
import React from "react";

const CommentContainer = (props) => {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <list-errors errors={props.errors}></list-errors>
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser}
        />
      </div>
    );
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <A href="/login">Sign in</A>
          &nbsp;or&nbsp;
          <A href="/register">sign up</A>
          &nbsp;to add comments on this story.
        </p>

        <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser}
        />
      </div>
    );
  }
};

export default CommentContainer;
