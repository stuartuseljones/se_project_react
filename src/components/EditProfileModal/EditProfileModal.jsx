import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onSubmit, onClose }) => {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || "",
      avatarUrl: currentUser?.avatar || "",
    }),
    [currentUser?.name, currentUser?.avatar]
  );
  const {
    values,
    handleChange,
    errors,
    isValid,
    reset,
    validateForm,
    isSubmitted,
  } = useFormWithValidation(defaultValues, ["name", "avatarUrl"]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!validateForm()) return;
    onSubmit(values, reset);
  }

  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save changes"
      isValid={isValid}
    >
      <label className="modal__label" htmlFor="editprofile-name">
        Name *
        <input
          type="text"
          className={`modal__input ${
            isSubmitted && errors.name ? "modal__input_type_error" : ""
          }`}
          id="editprofile-name"
          name="name"
          placeholder="Name"
          value={values.name || currentUser?.name || ""}
          onChange={handleChange}
        />
        {isSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label className="modal__label" htmlFor="editprofile-avatarUrl">
        Avatar *
        <input
          type="url"
          className={`modal__input ${
            isSubmitted && errors.avatarUrl ? "modal__input_type_error" : ""
          }`}
          id="editprofile-avatarUrl"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl || currentUser?.avatar || ""}
          onChange={handleChange}
        />
        {isSubmitted && errors.avatarUrl && (
          <span className="modal__error">{errors.avatarUrl}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
