import { createMocks } from "node-mocks-http";
import handleWeather from "../pages/api/weather";

describe("/api/[weather]", () => {
  xtest("returns weather data for a given zip code", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        zipCode: "19026",
      },
    });

    await handleWeather(req);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        something: "something",
      }),
    );
  });
});
