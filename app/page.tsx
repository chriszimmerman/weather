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
      <div className="font-sans mx-2">
        <div className="flex justify-center">
          <h1 className="text-4xl">Seven Day Weather Forecast</h1>
        </div>
        <div className="flex justify-center items-center text-center">
          <h2 className="text-2xl">{locationData.displayName}</h2>
        </div>
        <div className="flex flex-col gap-4">
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="zipCode"
            type="text"
            pattern="[0-9]{5}"
            placeholder="Enter a five digit zip code"
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
        <div className="flex mt-2 justify-center">
          <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </div>
      </div>
    </>
  );
}
