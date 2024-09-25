import { key } from "key/apiKey";
import { getLatLon } from "./getCity";
//import { WeatherData } from "interface";

export const getWeatherData = async (city: string) => {
  let lat: string = "";
  let lon: string = "";
  try {
    //도시 정보 가져오기
    await getLatLon(city).then((result) => {
      if (result) {
        lat = result.lat;
        lon = result.lon;
      }
    });
    // 날씨 정보 가져오기
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    const result = await fetch(url).then((response) => response.json());
    return result;
  } catch {}
};
