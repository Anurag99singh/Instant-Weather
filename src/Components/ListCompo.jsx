import React from "react";
function getWeatherIconAndLabel(code) {
  if (code === 0) return { icon: "☀️", label: "Clear sky" };
  if (code >= 1 && code <= 3) return { icon: "🌤️", label: "Mostly clear" };
  if (code === 45 || code === 48) return { icon: "🌫️", label: "Foggy" };
  if (code >= 51 && code <= 57)
    return { icon: "🌧️", label: "Light to moderate drizzle" };
  if (code >= 61 && code <= 67)
    return { icon: "🌧️", label: "Light to heavy rain" };
  if (code >= 71 && code <= 77)
    return { icon: "🌨️", label: "Light to heavy snow fall" };
  if (code >= 80 && code <= 82)
    return { icon: "⛅", label: "Scattered to heavy showers" };
  if (code === 95) return { icon: "⛈️", label: "Thunderstorm" };
  if (code >= 96 && code <= 99)
    return { icon: "🌩️", label: "Severe thunderstorm" };

  return { icon: "❓", label: "Unknown" };
}

function days(date) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var d = new Date(date);
  var dayName = days[d.getDay()];
  return dayName;
}
function ListCompo({
  index,
  maxTemp,
  minTemp,
  time,
  code,
  maxUnit,
  feelsLike,
}) {
  const { icon, label } = getWeatherIconAndLabel(code[index]);
  return (
    <>
      <li>
        <p className="weather-icon">{icon}</p>
        <p className="weather-label">{label}</p>
        <p>{days(time[index])}</p>
        <p>{`Max ${maxTemp[index]}${maxUnit} ||  Min ${minTemp[index]} ${maxUnit}`}</p>
        <span>Feels Like {feelsLike[index]}</span>
      </li>
    </>
  );
}

export default ListCompo;
