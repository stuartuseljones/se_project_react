import "./ItemModal.css";
import closeButton from "../../assets/close-button-gray.png";
function ItemModal({ isOpen, card, onClose, handleDeleteButton }) {
  return (
    <div onClick={onClose} className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__content modal__content_type_image"
      >
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={closeButton}
            alt="close button"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          {/* delete button to open deleteconfirm modal */}
          <button onClick={handleDeleteButton} className="modal__delete-button">
            Delete item
          </button>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
