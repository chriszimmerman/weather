import { getWeather } from "@/app/weather";
import "./globals.css";
import ProgressBar from "@/app/ProgressBar/ProgressBar";

export default async function Home() {
  const weatherData = await getWeather();
  const minTemps = weatherData.sevenDay.map((d) => d.low);
  const minTemp = Math.min(...minTemps);
  const maxTemps = weatherData.sevenDay.map((d) => d.high);
  const maxTemp = Math.max(...maxTemps);

  return (
    <div className="font-sans">
      <div>
        <h2>Seven Day Weather Forecast</h2>

        <div className="flex flex-col gap-4">
          {weatherData.sevenDay.map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-4">
                <span
                  style={{ whiteSpace: "nowrap" }}
                >{`${new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(item.date)} ${item.date.getDate()}`}</span>
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
    </div>
  );
}
