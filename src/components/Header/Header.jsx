// Style Import
import "./Header.css";

// Asset Imports
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/avatar.svg";

// JSX Import
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Header({ handleAddClick, weatherData }) {
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
        {currentDate}, {weatherData.city} {weatherData.temp?.[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <ToggleSwitch />
      <button
        className="header__add-clothes-btn"
        onClick={handleAddClick}
        type="button"
      >
        + Add clothes
      </button>
      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__name">Stuart UselJones</p>
          <img className="header__avatar" src={avatar} alt="avatar image" />
        </div>
      </NavLink>
    </header>
  );
}
export default Header;
