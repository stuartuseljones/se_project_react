import "./ModalWithForm.css";
import closeButton from "../../assets/close-button.png";
function ModalWithForm({
  name,
  children,
  title,
  buttonText,
  activeModal,
  onClose,
  isOpen,
}) {
  return (
    <div onClick={onClose} className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={closeButton}
            alt="close button"
          />
        </button>
        <form className="modal__form" name={name}>
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
