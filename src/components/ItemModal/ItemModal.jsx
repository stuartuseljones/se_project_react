import "./ItemModal.css";
import close__button from "../../assets/close-button-gray.png";
function ItemModal({ activeModal, card, onClose, onCardClick }) {
  return (
    <div
      onClick={onClose}
      className={`modal ${activeModal === "preview" && "modal_opened"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__content modal__content_type_image"
      >
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={close__button}
            alt="close button"
          />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
