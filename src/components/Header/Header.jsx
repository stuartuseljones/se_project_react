import "./Header.css";
import logo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="wtwr logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        className="header__add-clothes-btn"
        onClick={handleAddClick}
        type="button"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__name">Stuart UselJones</p>
        <img className="header__avatar" src={avatar} alt="avatar image" />
      </div>
    </header>
  );
}
export default Header;
