import "./ItemModal.css";
import closeButton from "../../assets/close-button-gray.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  selectedCard,
  isOpen,
  card,
  onClose,
  handleDeleteButton,
}) {
  const currentUser = useContext(CurrentUserContext);
  
  // Use card prop (which comes from App.jsx) or fallback to selectedCard
  const item = card || selectedCard;
  
  // Safe check for ownership - handle both id and _id, and null cases
  const isOwn = currentUser && item && 
    ((item.owner === currentUser._id) || (item.owner === currentUser.id));
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
        <img src={item?.imageUrl} alt={item?.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{item?.name}</h2>
          {isOwn && (
            <button
              onClick={handleDeleteButton}
              className="modal__delete-button"
            >
              Delete item
            </button>
          )}
          <p className="modal__weather">Weather: {item?.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
