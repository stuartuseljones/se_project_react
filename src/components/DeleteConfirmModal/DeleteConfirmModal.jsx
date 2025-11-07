import "./DeleteConfirmModal.css";
import closeButtonGray from "../../assets/close-button.png";
import { removeItem } from "../../utils/api";

const DeleteConfirmModal = ({ isOpen, card, onClose, deleteItemHandler }) => {
  const deleteItem = () => {
    deleteItemHandler(card._id);
  };
  return (
    <div onClick={onClose} className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div
        className="delete-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close-delete" type="button" onClick={onClose}>
          <img
            className="modal__close-icon-delete"
            src={closeButtonGray}
            alt="close button"
          />
        </button>
        <p className="delete-modal__caption">
          Are you sure you want to delete this item?
          <br /> This action is irreversible.
        </p>
        <button onClick={deleteItem} className="modal__delete-button-confirm">
          Yes, delete item
        </button>
        <button
          className="delete-modal__cancel"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default DeleteConfirmModal;
