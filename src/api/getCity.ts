//import { key } from "key/apiKey";
import { openweatherkey } from "utils/keys/config";

export const getLatLon = async (city: string) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openweatherkey}`;
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
