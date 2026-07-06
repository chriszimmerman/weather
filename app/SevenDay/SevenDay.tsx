import ProgressBar from "@/app/ProgressBar/ProgressBar";

export default function SevenDay({ weatherData }) {
  const minTemps = weatherData.sevenDay.map((d) => d.low);
  const minTemp = Math.min(...minTemps);
  const maxTemps = weatherData.sevenDay.map((d) => d.high);
  const maxTemp = Math.max(...maxTemps);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      {weatherData.sevenDay.map((item, index) => {
        return (
          <div key={index} className="flex">
            <span
              style={{ whiteSpace: "nowrap", width: "50px" }}
            >{`${daysOfWeek[new Date(item.date).getUTCDay()]} ${new Date(item.date).getUTCDate()}`}</span>
            <ProgressBar
              scaleMin={minTemp}
              scaleMax={maxTemp}
              min={item.low}
              max={item.high}
            />
          </div>
        );
      })}
    </>
  );
}
