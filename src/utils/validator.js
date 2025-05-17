const validator = require('validator');

exports.validateAdminInput = ({ email, password }) => {
  const errors = {};
  if (!validator.isEmail(email || '')) {
    errors.email = 'Invalid email';
  }
  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
