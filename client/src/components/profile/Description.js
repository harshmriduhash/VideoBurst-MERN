import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeDescription } from "../../actions/userActions.js";
import "./Description.css";

import DescriptionTitle from "./DescriptionTitle.js";
import DescriptionForm from "./DescriptionForm.js";
import Input from "../common/Input.js";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: {
        bio: false,
        social: false,
      },
      bio: "",
      social: {
        youtube: "",
        twitter: "",
        facebook: "",
        instagram: "",
        website: "",
      }
    };
  }

  static socialMap = [
    {
      name: 'youtube',
      description: 'Youtube profile',
    },
    {
      name: 'twitter',
      description: 'Twitter profile',
    },
    {
      name: 'facebook',
      description: 'Facebook profile',
    },
    {
      name: 'instagram',
      description: 'Instagram profile',
    },
    {
      name: 'website',
      description: 'a personal website',
      icon: 'globe',
    },
  ];

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.bio !== this.state.bio) {
      this.setState({ bio: nextProps.profile.bio });
    }
    if (nextProps.profile.social !== this.state.social) {
      this.setState({ social: nextProps.profile.social });
    }
  }

  onBioChange = e => this.setState({
    bio: e.target.value,
  });

  onSocialChange = e => this.setState({
    social: {
      ...this.state.social,
      [e.target.name]: e.target.value,
    }
  });

  toggleForm = field => this.setState({
    editing: {
      ...this.state.editing,
      [field]: !this.state.editing[field],
    }
  });

  onSubmit = field => e => {
    e.preventDefault();
    this.toggleForm(field);
    this.props.changeDescription({
      data: this.state[field],
      type: field,
    });
  };

  getIconClasses = (site) => {
    const { icon, name } = site;
    const fa = icon ? 'fas' : 'fab';
    return `fa-2x ${fa} fa-${icon || name}`;
  }


  /** Rendering functions */

  renderSocialInputFields = () => Description.socialMap
    .map(el => (
      <div className="d-inline-flex p-2 w-100" key={el.name}>
        <Input
          placeholder={`Link to ${el.description}`}
          value={this.state.social[el.name]}
          name={el.name}
          onChange={this.onSocialChange}
        />
        <div className="icon-div my-1">
          <i className={this.getIconClasses(el)} />
        </div>
      </div>
    ));

  renderSocialIcons = (social) => Description.socialMap
    .filter(el => social[el.name])
    .map(el => (
      <a
        key={el.name}
        className=" p-2"
        href={`https://${social[el.name].replace(/^https?:\/\//, '')}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className={this.getIconClasses(el)} />
      </a>
    ))

  render = () => {
    const { profile = {}, personal } = this.props;
    const { social = {}, username } = profile;
    const { editing, bio } = this.state;

    return (
      <React.Fragment>
        {/* bio */}
        <DescriptionTitle
          name="bio"
          title="About this user"
          isEditing={editing.bio}
          canEdit={personal}
          onClick={this.toggleForm}
        />
        {editing.bio ?
          <DescriptionForm onSubmit={this.onSubmit("bio")}>
            <textarea
              placeholder="Write something about you..."
              className="form-control w-100"
              name="bio"
              onChange={this.onBioChange}
              value={bio}
            />
          </DescriptionForm>
          :
          bio ?
            <span>
              {bio}
            </span>
            :
            <span className="font-italic">
              {username} doesn't have a bio
            </span>
        }

        {/* social */}
        <DescriptionTitle
          name="social"
          title="Social"
          isEditing={editing.social}
          canEdit={personal}
          onClick={this.toggleForm}
        />
        {editing.social ?
          <DescriptionForm onSubmit={this.onSubmit("social")}>
            {this.renderSocialInputFields()}
          </DescriptionForm>
          :
          Object.keys(social).length ?
            <div className="row social">
              {this.renderSocialIcons(social)}
            </div>
            :
            <span className="font-italic">
              {username} is not a social type
            </span>
        }
      </React.Fragment>
    );
  }
}

Description.propTypes = {
  changeDescription: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    bio: PropTypes.string,
    social: PropTypes.shape({}),
    username: PropTypes.string,
  }),
  personal: PropTypes.bool,
}

Description.defaultProps = {
  profile: {
    bio: '',
    social: {},
    username: '',
  },
  personal: false,
}


const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(
  mapStateToProps,
  { changeDescription }
)(Description);
