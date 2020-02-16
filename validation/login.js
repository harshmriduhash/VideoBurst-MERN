const Validator = require("validator");

module.exports = function validateLogin(data) {
  let errors = {};

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isInvalid: Boolean(Object.keys(errors).length)
  };
};
