import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadLeaderboard } from "../../actions/userActions.js";
import "./Leaderboard.css";

class Leaderboard extends Component {
  componentDidMount() {
    this.props.loadLeaderboard();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.video !== this.props.video) {
      this.props.loadLeaderboard();
    }
  }

  render() {
    return (
      <div className="pt-5 container leaderboard">
        <h3>Leaderboard</h3>
        <ul className="row center-block list-group shadow">
          {this.props.leaderboard.map((user, index) => (
            <li
              key={index}
              className="p-3 list-group-item d-flex justify-content-between align-items-center"
            >
              <svg
                width="60"
                height="60"
                data-jdenticon-value={user.username}
                className="rounded"
              />
              <Link to={"/u/" + user.username} className="profile-link">
                <h5>{user.username}</h5>
              </Link>
              <span className="badge badge-danger badge-pill">
                <i className="panel-icons fas fa-heart" /> &nbsp;
                <span className="h6"> {user.likesCount}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  loadLeaderboard: PropTypes.func.isRequired,
  leaderboard: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
  })),
  video: PropTypes.shape({}),
}

Leaderboard.defaultProps = {
  leaderboard: [],
  video: {},
}

const mapStateToProps = state => ({
  leaderboard: state.user.leaderboard,
  video: state.video
});

export default connect(
  mapStateToProps,
  { loadLeaderboard }
)(Leaderboard);
