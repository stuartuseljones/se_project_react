import "./WeatherCard.css";
import weatherCardCloudy from "../../assets/weathercard-cloudy.png";
function WeatherCard({ weatherData }) {
  return (
    <div className="weatherCard__container">
      <p className="weatherCard__temp">{weatherData.temp.F}&deg;</p>
      <img
        className="weatherCard__image"
        src={weatherCardCloudy}
        alt="weather background"
      />
    </div>
  );
}
export default WeatherCard;
