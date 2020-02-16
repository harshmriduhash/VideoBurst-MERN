import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./SecondIcon.css";

import Trash from "./Trash.js";
import Like from "./Like.js";

class SecondIcon extends Component {
  render() {
    const { video, auth } = this.props;
    if (!Object.keys(video).length) return <React.Fragment />;

    // The uploader shouldn't be able to like their own videos,
    // so instead of a like, show an option to delete the video
    const userId = auth.isAuthenticated ? auth.user.id : null;

    const isLiked = Boolean(
      video.likes.filter(like => String(like) === String(userId)).length
    );

    const showTrashIcon = userId === video.user._id;

    return showTrashIcon ?
      <Trash video={video} /> :
      <Like video={video} isLiked={isLiked} />;
  }
}

SecondIcon.propTypes = {
  video: PropTypes.shape({
    likes: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
      _id: PropTypes.string,
    })
  }).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string
    })
  }),
}

SecondIcon.defaultProps = {
  auth: {
    isAuthenticated: false,
    id: undefined,
  },
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SecondIcon);
