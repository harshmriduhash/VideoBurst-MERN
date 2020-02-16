const Validator = require("validator");

module.exports = function validateRegister(data) {
  const usrRange = {
    min: 3,
    max: 15
  };
  const pwdRange = {
    min: 6,
    max: 30
  };
  let errors = {};

  if (
    !Validator.isLength(data.username, { min: usrRange.min, max: usrRange.max })
  ) {
    errors.username = `Username must be between ${usrRange.min} and ${
      usrRange.max
    } characters`;
  }
  if (
    !Validator.isLength(data.password, { min: pwdRange.min, max: pwdRange.max })
  ) {
    errors.password = `Password must be between ${pwdRange.min} and ${
      pwdRange.max
    } characters`;
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please type your passwords again";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isInvalid: Boolean(Object.keys(errors).length)
  };
};
