"use client";
import "./globals.css";
import { useState } from "react";
import { getLatLong, getWeather } from "@/app/weather";
import ProgressBar from "@/app/ProgressBar/ProgressBar";

export default function Home() {
  const [zipCode, setZipCode] = useState("19083");
  const [locationData, setLocationData] = useState({
    longitude: 0,
    latitude: 0,
    displayName: "Null Island",
  });
  const [weatherData, setWeatherData] = useState({
    daily: [],
    sevenDay: [],
  });

  const updateWeather = async () => {
    const updatedLocationData = await getLatLong(zipCode);
    setLocationData(updatedLocationData);
    const newWeatherData = await getWeather(
      locationData.latitude,
      locationData.longitude,
    );

    setWeatherData(newWeatherData);
  };

  const minTemps = weatherData.sevenDay.map((d) => d.low);
  const minTemp = Math.min(...minTemps);
  const maxTemps = weatherData.sevenDay.map((d) => d.high);
  const maxTemp = Math.max(...maxTemps);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <h1 className="text-4xl">
        Seven Day Weather Forecast for {locationData.displayName}
      </h1>
      <div className="font-sans">
        <div className="flex flex-col gap-4">
          <div>
            <label>ZIP Code</label>
            <input
              className="w-1/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="zipCode"
              type="text"
              pattern="[0-9]{5}"
              placeholder="19083"
              value={zipCode}
              onChange={(e) => {
                console.log("zipCode", e.target.value);
                setZipCode(e.target.value);
              }}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => updateWeather()}
            >
              Fetch weather
            </button>
          </div>

          {weatherData.sevenDay.map((item, index) => {
            return (
              <div key={index} className="flex">
                <span
                  style={{ whiteSpace: "nowrap", width: "50px" }}
                >{`${daysOfWeek[item.date.getUTCDay()]} ${item.date.getUTCDate()}`}</span>
                <ProgressBar
                  scaleMin={minTemp}
                  scaleMax={maxTemp}
                  min={item.low}
                  max={item.high}
                  labelMin={item.low}
                  labelMax={item.high}
                />
              </div>
            );
          })}
        </div>
      </div>
      <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
    </>
  );
}
