import "./ModalWithForm.css";
import closeButton from "../../assets/close-button.png";
function ModalWithForm({
  name,
  children,
  title,
  buttonText,
  onClose,
  isOpen,
  onSubmit,
  isValid,
  secondaryButtonText,
  onSecondaryClick,
}) {
  return (
    <div onClick={onClose} className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        className="modal__content-form modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={closeButton}
            alt="close button"
          />
        </button>
        <form
          className="modal__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <div className="modal__button-container">
            <button
              className={`${
                !isValid ? "modal__submit_disabled" : "modal__submit"
              }`}
              disabled={!isValid}
              type="submit"
            >
              {buttonText}
            </button>
            {secondaryButtonText && onSecondaryClick && (
              <button
                className="modal__secondary-button"
                type="button"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
