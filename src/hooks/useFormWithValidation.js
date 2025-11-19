import { useState, useCallback } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    if (value === undefined || value === null || value === "") {
      return "This field is required";
    }

    switch (name) {
      case "name":
        if (value.length < 2) {
          return "Name must be at least 2 characters long";
        }
        if (value.length > 30) {
          return "Name must not exceed 30 characters";
        }
        break;
      case "imageUrl":
        try {
          new URL(value);
        } catch {
          return "Please enter a valid URL";
        }
        break;
      case "weather":
        if (!["hot", "warm", "cold"].includes(value)) {
          return "Please select a weather type";
        }
        break;
    }
    return "";
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    if (isSubmitted) {
      // Update error for the changed field
      const error = validateField(name, value);
      const newErrors = { ...errors, [name]: error };
      setErrors(newErrors);

      // Check if any field has an error
      const hasErrors = Object.keys(newValues).some((key) =>
        validateField(key, newValues[key])
      );
      setIsValid(!hasErrors);
    }
  };

  const validateForm = () => {
    setIsSubmitted(true);
    const newErrors = {};
    let formIsValid = true;

    // Check all required fields
    if (!values.name || values.name.trim() === "") {
      newErrors.name = "Name is required";
      formIsValid = false;
    }
    if (!values.imageUrl || values.imageUrl.trim() === "") {
      newErrors.imageUrl = "Image URL is required";
      formIsValid = false;
    }
    if (!values.weather || values.weather.trim() === "") {
      newErrors.weather = "Please select a weather type";
      formIsValid = false;
    }

    // If all required fields are filled, do detailed validation
    if (formIsValid) {
      Object.keys(values).forEach((name) => {
        const error = validateField(name, values[name]);
        if (error) {
          formIsValid = false;
          newErrors[name] = error;
        }
      });
    }

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const reset = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
    setIsSubmitted(false);
  }, [defaultValues]);

  return {
    values,
    handleChange,
    errors,
    isValid,
    reset,
    setValues,
    validateForm,
    isSubmitted,
  };
}
