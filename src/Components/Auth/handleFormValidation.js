import React, { useState, useEffect } from "react";

function HandleFormValidation(
  initialState,
  validate,
  authenticateUser,
  validateRegister
) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [makeRequest, setMakeRequest] = useState(false);

  useEffect(() => {
    if (makeRequest) {
      const NoErrors = Object.keys(errors).length === 0;
      if (NoErrors) {
        authenticateUser();
        setMakeRequest(false);
      }
    }
  }, [errors]);

  function handleChange(event) {
    event.persist();
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
    // console.log(e.target, e.target.value);
  }

  function handleBlur() {
    const validateErrors = validate(values);
    setErrors(validateErrors);
  }

  function handleRegisterFormBlue() {
    const registerErrors = validateRegister(values);
    setErrors(registerErrors);
    console.log(registerErrors);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const loginErrors = validate(values);
    setErrors(loginErrors);
    setMakeRequest(true);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    const registerErrors = validateRegister(values);

    setErrors(registerErrors);
    setMakeRequest(true);
  }
  return {
    handleChange,
    values,
    errors,
    handleBlur,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleRegisterFormBlue,
    setValues
  };
}

export default HandleFormValidation;
