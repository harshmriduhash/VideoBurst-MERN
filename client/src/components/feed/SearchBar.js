import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addVideo, loadVideos } from "../../actions/videoActions";
import "./SearchBar.css";

import Input from "../common/Input";
import ErrorPopup from "../common/ErrorPopup";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      loading: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.video !== this.props.video ||
      nextProps.errors !== this.props.errors
    ) {
      this.setState({ loading: false });
    }
  }
  onChange = e => {
    this.setState({ input: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.loading) {
      this.setState({ loading: true });
      this.props.addVideo({ videoUrl: this.state.input });
    } else console.log("blocked");
  };

  render() {
    return (
      <div className="nav-link">
        <form
          className="form-inline"
          autoComplete="off"
          onSubmit={this.onSubmit}
        >
          {this.props.auth.isAuthenticated && (
            <div className="inner-row">
              <Input
                name="youtube-search"
                placeholder="Paste a YouTube link here"
                type="search"
                onChange={this.onChange}
                errors={this.props.errors.video}
                loading={this.state.loading}
              />
              <button className="btn btn-danger mx-1" type="submit">
                {this.state.loading ?
                  <i className="fas fa-copyright spin" /> :
                  <i className="fas fa-arrow-circle-right" />
                }
              </button>
            </div>
          )}
        </form>
        <ErrorPopup />
      </div>
    );
  }
}

SearchBar.propTypes = {
  addVideo: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    video: PropTypes.string,
  }).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }).isRequired,
  video: PropTypes.shape({}),
}

SearchBar.defaultProps = {
  video: {},
}

const mapStateToProps = state => ({
  video: state.video,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addVideo, loadVideos }
)(SearchBar);
