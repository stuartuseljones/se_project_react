import "./WeatherCard.css";
import weatherCardCloudy from "../../assets/weathercard-cloudy.png";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <div className="weatherCard__container">
      <p className="weatherCard__temp">
        {weatherData.temp?.[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <img
        className="weatherCard__image"
        src={weatherCardCloudy}
        alt="weather background"
      />
    </div>
  );
}
export default WeatherCard;
