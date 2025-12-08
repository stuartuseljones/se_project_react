// Style Import
import "./Header.css";

// Asset Imports
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/avatar.svg";

// JSX Import
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser);
  const userInitial = currentUser?.name?.charAt(0).toUpperCase() || "?";
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="wtwr logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}{" "}
        {weatherData.temp?.[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            className="header__add-clothes-btn"
            onClick={handleAddClick}
            type="button"
          >
            + Add clothes
          </button>
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__name">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="avatar image"
                />
              ) : (
                <div className="header__avatar header__avatar_type_placeholder">
                  {userInitial}
                </div>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <>
          <button
            onClick={handleRegisterClick}
            className="header__signup-button"
          >
            Sign Up
          </button>

          <button onClick={handleLoginClick} className="header__login-button">
            Log In
          </button>
        </>
      )}
    </header>
  );
}
export default Header;
