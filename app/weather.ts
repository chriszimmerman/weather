import { fetchWeatherApi } from "openmeteo";

export const getWeather = async (latitude, longitude) => {
  const params = {
    latitude: Number(latitude),
    longitude: Number(longitude),
    daily: ["temperature_2m_max", "temperature_2m_min"],
    temperature_unit: "fahrenheit",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  let response;
  return fetchWeatherApi(url, params).then((responses) => {
    console.log("fetch weather api", responses);
    response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const daily = response.daily()!;

    const weatherData = {
      daily: {
        time: Array.from(
          {
            length:
              (Number(daily.timeEnd()) - Number(daily.time())) /
              daily.interval(),
          },
          (_, i) =>
            new Date(
              (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
                1000,
            ),
        ),
        temperature_2m_max: daily.variables(0)!.valuesArray(),
        temperature_2m_min: daily.variables(1)!.valuesArray(),
      },
    };

    return {
      response,
      daily: weatherData.daily,
      sevenDay: zipDaysWithTemps(weatherData.daily),
    };
  });
};

export const getLatLong = async (zipCode: string) => {
  const url = `https://geocode.maps.co/search?postalcode=${zipCode}&country=United%2DStates&api_key=${process.env.GEOCODING_API_KEY}`;
  const response = await fetch(url);
  const result = await response.json();
  const location = result[0];
  return {
    longitude: location.lon,
    latitude: location.lat,
    displayName: location.display_name,
  };
};

const zipDaysWithTemps = (daily) => {
  const days = daily.time;
  const highs = daily.temperature_2m_max
    .values()
    .toArray()
    .map((v) => parseInt(v, 10));
  const lows = daily.temperature_2m_min
    .values()
    .toArray()
    .map((v) => parseInt(v, 10));

  const result = [];

  days.forEach((day, index) => {
    result.push({ date: days[index], high: highs[index], low: lows[index] });
  });

  return result;
};
