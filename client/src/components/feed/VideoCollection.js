import React, { Component } from "react";
import PropTypes from "prop-types";
import Video from "../common/Video";
import { connect } from "react-redux";
import { loadVideos } from "../../actions/videoActions.js";
import "./VideoCollection.css";

class VideoCollection extends Component {
  componentDidMount() {
    this.props.loadVideos();
  }

  render() {
    return (
      <div className="feed">
        {this.props.video.videoList.map((video, index) => (
          <Video video={video} key={index} />
        ))}
      </div>
    );
  }
}

VideoCollection.propTypes = {
  loadVideos: PropTypes.func.isRequired,
  video: PropTypes.shape({
    videoList: PropTypes.arrayOf(PropTypes.shape({})),
  }),
}

const mapStateToProps = state => ({
  video: state.video
});

export default connect(
  mapStateToProps,
  { loadVideos }
)(VideoCollection);
