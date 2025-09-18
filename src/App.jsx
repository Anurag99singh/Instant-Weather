import React, { useEffect, useState } from "react";
import Cards from "./Components/Cards";

function App() {
  let [inputLocation, setInputLocation] = useState("");
  let [recievedLocationInformation, setRecievedLocationInformation] =
    useState("");
  let [recievedWeatherInfo, setRecievedInfo] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  let { name } = recievedLocationInformation;

  let [weatherdetails, unitDetails] = recievedWeatherInfo || [];

  let {
    temperature_2m_max: maxTemp,
    temperature_2m_min: minTemp,
    apparent_temperature_mean: feelsLike,
    time,
    weather_code,
  } = weatherdetails || {};

  let { temperature_2m_max: maxUnit } = unitDetails || {};
  // to get the input location and based on that set lat and lng to fethc the wether details
  useEffect(() => {
    const controller = new AbortController();

    async function fetchGeoData() {
      try {
        setIsLoading(true);
        if (inputLocation === "") {
          setRecievedLocationInformation("");
          setLatitude("");
          setLongitude("");
          return;
        }

        let rawData = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${inputLocation}&count=1`,
          { signal: controller.signal }
        );
        let data = await rawData.json();
        const location = data?.results.at(0);
        setRecievedLocationInformation(location);
        if (location) {
          setLatitude(location.latitude);
          setLongitude(location.longitude);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    document.title = "Instant-Weather";
    fetchGeoData();
    return () => {
      controller.abort();
    };
  }, [inputLocation]);
  //to fetch the weather details based on the lat lng given by the above use effect
  useEffect(() => {
    async function fetchWeatherData() {
      if (!latitude || !longitude) {
        setRecievedInfo("");
      }
      // console.log(latitude, longitude);
      let rawData = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_mean`
      );
      let data = await rawData.json();
      // console.log(data);
      let details = [data.daily, data.daily_units];
      setRecievedInfo(details);
    }
    fetchWeatherData();
  }, [latitude, longitude]);

  function success(pos) {
    let cur = pos.coords;
    setLatitude(cur.latitude);
    setLongitude(cur.longitude);
  }
  function handleClick() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(success);
    setInputLocation("");
  }
  return (
    <div className="container">
      <div>
        <h1>Instant-Weather</h1>
        <input
          type="text"
          placeholder="Enter the Location"
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
        />
        <button onClick={handleClick}> 📍 Detect My Location</button>
        <p className="para">
          {isLoading
            ? `Loading for location ${inputLocation}`
            : name
            ? `Weather of ${name}`
            : latitude && longitude
            ? `Weather of your location `
            : `Enter the Location`}
        </p>
        {maxTemp ? (
          <Cards
            maxTemp={maxTemp}
            minTemp={minTemp}
            time={time}
            code={weather_code}
            maxUnit={maxUnit}
            isLoading={isLoading}
            feelsLike={feelsLike}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
