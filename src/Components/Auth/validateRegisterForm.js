export default function validateRegisterForm(values) {
  let errors = {};

  if (!values.username) {
    errors.username = "Please enter username";
  }

  if (!values.password) {
    errors.password = "Please enter password";
  } else if (values.password.length < 5) {
    errors.password = "Password must be of 5 or more length";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password do not match";
  }

  return errors;
}
