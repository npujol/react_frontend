import StoryMeta from "./StoryMeta";
import CommentContainer from "./CommentContainer";
import { A } from "../../../modules/Story/components/Story/node_modules/hookrouter";

import React from "react";
import { StoriesApi } from "../../../../client";
import { connect } from "react-redux";
import {
  STORY_PAGE_LOADED,
  STORY_PAGE_UNLOADED,
} from "../../../../constants/actionTypes";
import StoryActions from "./StoryActions";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, grey } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";

const storiesApi = new StoriesApi();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const StoryPreview = (props) => {
  const classes = useStyles();
  const story = props.story;

  return (
    <div>
      <Card className={classes.root}>
        <StoryMeta story={props.story} canModify={props.canModify} />

        <CardMedia
          className={classes.media}
          image={
            story.image
              ? "https://picsum.photos/510/300?random"
              : "https://picsum.photos/510/300?random"
          }
          title={story.title}
        ></CardMedia>

        <CardContent>
          <ul className="tag-list">
            {story.tags.map((tag, pk) => {
              return <Chip label={tag} variant="outlined" key={pk} />;
            })}
          </ul>
          <Typography>{story.description}</Typography>
          <Typography>{story.body}</Typography>
        </CardContent>
      </Card>
      <div className="row">
        <CommentContainer
          comments={props.comments || []}
          errors={props.errors}
          slug={props.slug}
          currentUser={props.currentUser}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.story,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: STORY_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: STORY_PAGE_UNLOADED }),
});

class Story extends React.Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        storiesApi.storiesRead(this.props.match.params.id),
        storiesApi.storiesCommentsList(this.props.match.params.id, {
          limit: 10,
          offset: 0,
        }),
      ])
    );
  }

  // componentWillUnmount() {
  //   this.props.onUnload();
  // }

  render() {
    if (!this.props.story) {
      return null;
    }

    // const markup = { __html: marked(this.props.story.body, { sanitize: true }) };
    const markup = { __html: this.props.story.body };

    const canModify =
      this.props.currentUser &&
      this.props.currentUser.username === this.props.story.owner.username;
    return (
      <StoryPreview
        story={this.props.story}
        canModify={canModify}
        markup={markup}
        comments={this.props.comments}
        errors={this.props.commentErrors}
        slug={this.props.match.params.id}
        currentUser={this.props.currentUser}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
