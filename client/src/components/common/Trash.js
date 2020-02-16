import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteVideo } from "../../actions/videoActions";

class Trash extends Component {
  onClick = e => {
    if (
      window.confirm(
        "Are you sure you want to delete this video? You will lose all the likes it got.\nThis cannot be undone."
      )
    ) {
      this.props.deleteVideo(
        this.props.video,
        this.props.videoState.nowPlaying
      );
    }
  };

  render() {
    return (
      <div className="col trash">
        <i className="panel-icons fas fa-trash" onClick={this.onClick} />
      </div>
    );
  }
}

Trash.propTypes = {
  deleteVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({}).isRequired,
  videoState: PropTypes.shape({
    nowPlaying: PropTypes.shape({}),
  }).isRequired,
}

const mapStateToProps = state => ({
  videoState: state.video
});

export default connect(
  mapStateToProps,
  { deleteVideo }
)(Trash);
