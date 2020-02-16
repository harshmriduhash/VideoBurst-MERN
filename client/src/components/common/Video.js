import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { playVideo } from "../../actions/videoActions.js";
import { connect } from "react-redux";

import SecondIcon from "./SecondIcon";
import "./Video.css";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerVisible: false
    };
  }

  onClick = e => {
    this.props.playVideo(this.props.video);
  };

  render() {
    const { video } = this.props;

    return (
      <div className="video shadow">
        <div className="video-panel">
          <div className="m-2 mx-4">
            <div className="panel-title">{video.title}</div>
            <div className="panel-user user my-3">
              Uploaded by{" "}
              <Link to={"/u/" + video.user.username} className="profile-link">
                <strong>{video.user.username}</strong>
              </Link>
            </div>
            <div className="container">
              <div className="row my-9 text-center">
                <div className="col panel-icon-play">
                  <i
                    className="panel-icons fas fa-play"
                    onClick={this.onClick}
                  />
                </div>
                <SecondIcon video={video} />
              </div>
            </div>
          </div>
        </div>
        <div className="video-thumbnail">
          <img src={video.thumbnail} alt={video.title} />
        </div>
      </div>
    );
  }
}

Video.propTypes = {
  playVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
}

export default connect(
  null,
  { playVideo }
)(Video);
