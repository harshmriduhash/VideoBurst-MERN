import React from "react";
import PropTypes from "prop-types";

const DescriptionTitle = ({
  name, title, canEdit, isEditing, onClick,
}) => (
    <h4 className="my-3">
      {title}
      {" "}
      {canEdit &&
        <i
          id={name}
          className={`fas text-primary edit mx-2 fa-${isEditing ? 'times' : 'edit'}`}
          style={{ cursor: "pointer" }}
          onClick={() => onClick(name)}
        />
      }
    </h4>
  );

DescriptionTitle.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  canEdit: PropTypes.bool,
  isEditing: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

DescriptionTitle.defaultProps = {
  title: '',
  canEdit: false,
  isEditing: false,
}

export default DescriptionTitle;
