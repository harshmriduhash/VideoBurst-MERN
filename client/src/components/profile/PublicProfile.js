import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile, deleteUser } from "../../actions/userActions.js";
import "./Description.css";

import Video from "../common/Video.js";
import Description from "./Description.js";

class PublicProfile extends Component {
  componentDidMount() {
    const username = this.props.match.params.username;
    if (username) {
      this.props.getProfile(username, this.props.history);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.video !== this.props.video ||
      this.props.match !== nextProps.match
    ) {
      this.props.getProfile(
        nextProps.match.params.username,
        this.props.history
      );
    }
  }

  onDeleteUser = e => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete your account?\nThis cannot be undone."
      )
    ) {
      this.props.deleteUser(this.props.history);
    }
  };

  render() {
    const { profile } = this.props;
    const { isAuthenticated } = this.props.auth;
    const personal =
      isAuthenticated && profile.username === this.props.auth.user.username;
    return (
      <div className="profile container my-3">
        <div className="row">
          <svg
            width="120"
            height="120"
            data-jdenticon-value={profile.username}
            className="rounded shadow"
          />
          <div className="col my-1">
            <h1>{profile.username}</h1>
            <div className="my-1">Likes given: {profile.likesGiven}</div>
            <div className="my-1">Likes received: {profile.likesCount}</div>
          </div>
        </div>

        <Description personal={personal} />

        {personal && (
          <div className="container">
            <div className="row">
              <button
                type="button"
                className="btn btn-danger my-4"
                onClick={this.onDeleteUser}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}

        {profile.uploads && Boolean(profile.uploads.length) && (
          <React.Fragment>
            <h4 className="my-3">Uploads</h4>
            <div className="feed profile">
              {profile.uploads.map((video, index) => {
                return <Video key={index} video={video} />;
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

PublicProfile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  video: PropTypes.shape({}),
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      username: PropTypes.string,
    })
  }),
  profile: PropTypes.shape({
    username: PropTypes.string,
    likesGiven: PropTypes.number,
    likesCount: PropTypes.number,
  }),
}

PublicProfile.defaultProps = {
  leaderboard: [],
  video: {},
  profile: {
    username: '',
    likesGiven: 0,
    likesCount: 0,
  },
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.user.profile,
  video: state.video
});

export default connect(
  mapStateToProps,
  { getProfile, deleteUser }
)(PublicProfile);
