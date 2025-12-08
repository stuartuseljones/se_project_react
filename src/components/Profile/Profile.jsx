import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleEditProfileClick,
  handleLogout,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter clothing items to show only current user's items
  const userClothingItems = clothingItems.filter((item) => {
    const userId = currentUser?._id || currentUser?.id;
    return item.owner === userId;
  });

  return (
    <section className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleLogout={handleLogout}
      />
      <ClothesSection
        userClothingItems={userClothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
