import { handleServerResponse } from "./api";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(handleServerResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = {
    F: getWeatherType(result.temp.F, "F"),
    C: getWeatherType(result.temp.C, "C"),
  };
  return result;
};

const getWeatherType = (temperature, unit = "F") => {
  if (unit === "C") {
    if (temperature >= 30) {
      return "hot";
    } else if (temperature >= 19) {
      return "warm";
    } else {
      return "cold";
    }
  } else {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66) {
      return "warm";
    } else {
      return "cold";
    }
  }
};
