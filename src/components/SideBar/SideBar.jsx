import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ handleEditProfileClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__first-row">
          <img
            className="sidebar__avatar"
            src={currentUser?.avatar}
            alt="avatar image"
          />
          <p className="sidebar__name">{currentUser?.name}</p>
        </div>
        <button
          onClick={handleEditProfileClick}
          className="sidebar__edit-button"
        >
          Change profile data
        </button>
        <button onClick={handleLogout} className="sidebar__logout-button">
          Log out
        </button>
      </div>
    </aside>
  );
}
