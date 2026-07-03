import { getWeather } from "@/app/weather";
import "./globals.css";
import ProgressBar from "@/app/ProgressBar/ProgressBar";

export default async function Home() {
  const weatherData = await getWeather();
  const minTemps = weatherData.sevenDay.map((d) => d.low);
  const minTemp = Math.min(...minTemps);
  const maxTemps = weatherData.sevenDay.map((d) => d.high);
  const maxTemp = Math.max(...maxTemps);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <h1 className="text-4xl">Seven Day Weather Forecast</h1>
      <div className="font-sans">
        <div className="flex flex-col gap-4">
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
    </>
  );
}
