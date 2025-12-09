import "./ItemCard.css";
import likeButton from "../../assets/like_button.png";
import likeButtonActive from "../../assets/like_button-liked.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const isLiked = item.likes.some(
    (id) => id === (currentUser?._id || currentUser?.id)
  );

  const handleLike = () => {
    onCardLike({ id: item._id || item.id, isLiked });
  };
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <img
            src={isLiked ? likeButtonActive : likeButton}
            className={itemLikeButtonClassName}
            onClick={handleLike}
          />
        )}
      </div>
      <img
        className="card__image"
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
