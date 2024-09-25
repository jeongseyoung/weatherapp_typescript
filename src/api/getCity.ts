import { key } from "key/apiKey";

export const getLatLon = async (city: string) => {
  console.log(city, key);
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`;
  try {
    const result = await fetch(url).then((response) => response.json());
    if (result.length > 0) {
      const { lat, lon } = result[0];
      return { lat, lon };
    }
  } catch {
    console.log("getCity error");
  }
};
