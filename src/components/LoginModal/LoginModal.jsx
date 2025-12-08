import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const defaultValues = { email: "", password: "" };

const LoginModal = ({ isOpen, onLogin, onRegisterClick, onClose }) => {
  const {
    values,
    handleChange,
    errors,
    reset,
    validateForm,
    isSubmitted,
    isValid,
  } = useFormWithValidation(defaultValues, ["email", "password"]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!validateForm()) return;
    onLogin(values, reset);
  }

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
      isValid={isValid}
      secondaryButtonText="or Sign Up"
      onSecondaryClick={onRegisterClick}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          type="email"
          className={`modal__input ${
            isSubmitted && errors.email ? "modal__input_type_error" : ""
          }`}
          id="login-email"
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
        Password
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
    </ModalWithForm>
  );
};

export default LoginModal;
