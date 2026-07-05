"use client";
import "./globals.css";
import { useState } from "react";
import { getLatLong, getWeather } from "@/app/weather";
import SevenDay from "@/app/SevenDay/SevenDay";

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState({
    daily: [],
    sevenDay: [],
  });

  const enabledZipClasses =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  const disabledZipClasses =
    "bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  const validateZip = (zip: string) => {
    const zipCodeRegex = /^\d{5}$/;
    return zipCodeRegex.test(zip);
  };

  const updateWeather = async () => {
    const updatedLocationData = await getLatLong(zipCode);
    const newWeatherData = await getWeather(
      updatedLocationData.latitude,
      updatedLocationData.longitude,
    );

    setLocationData(updatedLocationData);
    setWeatherData(newWeatherData);
  };

  return (
    <>
      <div className="font-sans mx-2 md:w-1/2">
        <div className="flex justify-center items-center text-center mb-1">
          <h1 className="text-4xl">Seven Day Weather Forecast</h1>
        </div>
        {locationData && (
          <div className="flex justify-center items-center text-center mb-1">
            <h2 className="text-2xl">{locationData.displayName}</h2>
          </div>
        )}
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
            className={
              validateZip(zipCode) ? enabledZipClasses : disabledZipClasses
            }
            type="button"
            disabled={!validateZip(zipCode)}
            onClick={() => updateWeather()}
          >
            Fetch weather
          </button>

          {weatherData && <SevenDay weatherData={weatherData} />}
        </div>
        <div className="flex mt-2 justify-center">
          <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </div>
      </div>
    </>
  );
}
