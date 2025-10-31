import "./ModalWithForm.css";
import close__button from "../../assets/close-button.png";
function ModalWithForm({ children, title, buttonText, activeModal, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`modal ${activeModal === "add-garment" && "modal_opened"}`}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={close__button}
            alt="close button"
          />
        </button>
        <form className="modal__form">
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
