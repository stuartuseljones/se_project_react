import { useState, useCallback, useEffect } from "react";

const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 30,
    pattern: /^[a-zA-Z\s-']+$/,
    message: {
      required: "Name is required",
      minLength: "Name must be at least 2 characters long",
      maxLength: "Name must not exceed 30 characters",
      pattern:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    },
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: {
      required: "Email is required",
      pattern: "Please enter a valid email address",
    },
  },
  password: {
    required: true,
    minLength: 8,
    message: {
      required: "Password is required",
      minLength: "Password must be at least 8 characters long",
    },
  },
  avatarUrl: {
    required: true,
    isUrl: true,
    message: {
      required: "Avatar URL is required",
      isUrl: "Please enter a valid URL",
    },
  },
  imageUrl: {
    required: true,
    isUrl: true,
    message: {
      required: "Image URL is required",
      isUrl: "Please enter a valid URL",
    },
  },
  weather: {
    required: true,
    options: ["hot", "warm", "cold"],
    message: {
      required: "Please select a weather type",
      options: "Please select a valid weather type",
    },
  },
};

export function useFormWithValidation(defaultValues, requiredFields = []) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setValues(defaultValues);
    setErrors({});
    setIsSubmitted(false);
  }, [defaultValues]);

  const validateField = (name, value) => {
    // Check if field is required
    const rule = validationRules[name];
    if (!rule) return ""; // No validation rule defined

    // Check if field is required and empty
    if (rule.required && (!value || value.toString().trim() === "")) {
      return rule.message.required;
    }

    // Skip further validation if field is empty but not required
    if (!value || value.toString().trim() === "") {
      return "";
    }

    const trimmedValue = value.toString().trim();

    // Check minimum length
    if (rule.minLength && trimmedValue.length < rule.minLength) {
      return rule.message.minLength;
    }

    // Check maximum length
    if (rule.maxLength && trimmedValue.length > rule.maxLength) {
      return rule.message.maxLength;
    }

    // Check pattern (regex)
    if (rule.pattern && !rule.pattern.test(trimmedValue)) {
      return rule.message.pattern;
    }

    // Check URL validation
    if (rule.isUrl) {
      try {
        new URL(trimmedValue);
      } catch {
        return rule.message.isUrl;
      }
    }

    // Check options (for select/radio fields)
    if (rule.options && !rule.options.includes(trimmedValue)) {
      return rule.message.options;
    }

    return "";
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    // Always check validation for button state
    const fieldsToValidate =
      requiredFields.length > 0 ? requiredFields : Object.keys(newValues);
    const hasErrors = fieldsToValidate.some((key) =>
      validateField(key, newValues[key])
    );
    setIsValid(!hasErrors);

    // Only show errors after form submission
    if (isSubmitted) {
      const error = validateField(name, value);
      const newErrors = { ...errors, [name]: error };
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    setIsSubmitted(true);
    const newErrors = {};
    let formIsValid = true;

    // Get fields to validate (use requiredFields if provided, otherwise all values)
    const fieldsToValidate =
      requiredFields.length > 0 ? requiredFields : Object.keys(values);

    // Validate each field
    fieldsToValidate.forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        formIsValid = false;
        newErrors[fieldName] = error;
      }
    });

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
