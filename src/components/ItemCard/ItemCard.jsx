import "./ItemCard.css";
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="cards__list">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        onClick={handleCardClick}
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
