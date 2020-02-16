import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./Navbar.css";

import SearchBar from "../feed/SearchBar";

class Navbar extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { auth } = this.props;
    return (
      <nav className="navbar navbar-fixed-top mb-4 navbar-expand-sm navbar-dark ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fab fa-youtube" />
            &nbsp; VideoBurst
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <SearchBar />
              </li>
              <li
                className="nav-item my-2"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              {auth.isAuthenticated ? (
                <React.Fragment>
                  <li
                    className="nav-item my-2"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                  >
                    <Link
                      to={"/u/" + auth.user.username}
                      className="nav-link my-profile"
                    >
                      <strong>{auth.user.username}</strong>
                    </Link>
                  </li>
                  <li
                    className="nav-item my-2 "
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    onClick={this.onLogout}
                  >
                    <div className="nav-link logout">Logout</div>
                  </li>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    <li
                      className="nav-item my-2"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                    </li>
                    <li
                      className="nav-item my-2"
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                    >
                      <Link className="nav-link" to="/login">
                        Log In
                    </Link>
                    </li>
                  </React.Fragment>
                )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.shape({
      username: PropTypes.string,
    })
  }),
}

Navbar.defaultProps = {
  auth: {
    isAuthenticated: false,
    user: {},
  },
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
