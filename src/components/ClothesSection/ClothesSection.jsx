import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  userClothingItems,
  handleAddClick,
  handleCardClick,
  onCardLike,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
          type="button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userClothingItems.map((item) => {
          return (
            <ItemCard
              key={item.id ?? item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
