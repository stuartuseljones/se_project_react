import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const defaultValues = { email: "", password: "", name: "", avatarUrl: "" };

const RegisterModal = ({ isOpen, onSignUp, onClose, onLoginClick }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    reset,
    validateForm,
    isSubmitted,
  } = useFormWithValidation(defaultValues, [
    "email",
    "password",
    "name",
    "avatarUrl",
  ]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!validateForm()) return;
    onSignUp(values, reset);
  }

  return (
    <ModalWithForm
      title="Register"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign Up"
      isValid={isValid}
      secondaryButtonText="or Log In"
      onSecondaryClick={onLoginClick}
    >
      <label className="modal__label" htmlFor="email">
        Email *
        <input
          type="email"
          className={`modal__input ${
            isSubmitted && errors.email ? "modal__input_type_error" : ""
          }`}
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {isSubmitted && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>
      <label className="modal__label" htmlFor="password">
        Password *
        <input
          type="password"
          className={`modal__input ${
            isSubmitted && errors.password ? "modal__input_type_error" : ""
          }`}
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {isSubmitted && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label className="modal__label" htmlFor="name">
        Name *
        <input
          type="text"
          className={`modal__input ${
            isSubmitted && errors.name ? "modal__input_type_error" : ""
          }`}
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {isSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label className="modal__label" htmlFor="avatarUrl">
        Avatar URL *
        <input
          type="url"
          className={`modal__input ${
            isSubmitted && errors.avatarUrl ? "modal__input_type_error" : ""
          }`}
          id="avatarUrl"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
        />
        {isSubmitted && errors.avatarUrl && (
          <span className="modal__error">{errors.avatarUrl}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
