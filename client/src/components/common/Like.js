import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { likeVideo } from "../../actions/videoActions";

class Like extends Component {
  onClick = () => {
    this.props.likeVideo(this.props.video, this.props.videoState.nowPlaying);
  };

  render() {
    const classes =
      "col panel-icon-like " + (this.props.isLiked ? "liked" : "");

    return (
      <div className={classes}>
        <i className="panel-icons fas fa-heart" onClick={this.onClick} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  videoState: state.video
});

Like.propTypes = {
  likeVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({}).isRequired,
  videoState: PropTypes.shape({
    nowPlaying: PropTypes.shape({}),
  }).isRequired,
}

export default connect(
  mapStateToProps,
  { likeVideo }
)(Like);
