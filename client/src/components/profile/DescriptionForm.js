import React from "react";
import PropTypes from "prop-types";

const DescriptionForm = ({ onSubmit, children }) => (
  <div className="row desc-form-container input bg-light p-3 mb-2 border rounded shadow border-grey">
    <form
      className="form-group w-100"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <div className="form-group">
        {children}
      </div>
      <button
        className="btn btn-primary m-1 w-25 btn-block mt-4"
        type="submit"
      >
        <i className="fas fa-arrow-circle-right" />
      </button>
    </form>
  </div>
);
DescriptionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default DescriptionForm;
