import { fetchWeatherApi } from "openmeteo";

export const getWeather = async () => {
    const params = {
        latitude: 39.947056,
        longitude: -75.292130,
        hourly: "temperature_2m",
        daily: ["temperature_2m_max", "temperature_2m_min"],
        temperature_unit: "fahrenheit",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

// Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const hourly = response.hourly()!;
    const daily = response.daily()!;

    const weatherData = {
        hourly: {
            time: Array.from(
                { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
                (_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m: hourly.variables(0)!.valuesArray(),
        },
        daily: {
            time: Array.from(
                { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
                (_ , i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m_max: daily.variables(0)!.valuesArray(),
            temperature_2m_min: daily.variables(1)!.valuesArray(),
        },
    };

    const highsAndLows = zipDaysWithTemps(weatherData.daily)
    return {
        response,
        daily: weatherData.daily,
        hourly: weatherData.hourly,
        sevenDay: zipDaysWithTemps(weatherData.daily)
    }
}


const zipDaysWithTemps = (daily) => {
    const days = daily.time
    console.log(days)
    const highs = daily.temperature_2m_max.values().toArray().map((v) => parseInt(v, 10))
    const lows = daily.temperature_2m_min.values().toArray().map((v) => parseInt(v, 10))

    let result = []

    days.forEach((day, index) => {
        result.push({date: days[index], high: highs[index], low: lows[index]})
    })

    console.log(result)
    return result
}