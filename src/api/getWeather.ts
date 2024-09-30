//import { key } from "key/apiKey";
import { openweatherkey } from "utils/keys/config";
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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openweatherkey}`;
    const result = await fetch(url).then((response) => response.json());
    return result;
  } catch {
    console.log("날씨정보 불러오기 실패");
  }
};
export const getForecastData = async (city: string) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openweatherkey}&units=metric`;
  const result = await fetch(url).then((response) => response.json());
  return result;
};

//오늘 최소,최대 기온
// export const getOneCallApiData = async (city: string) => {
//   console.log("??", city);
//   const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`;
//   const result = await fetch(url).then((response) => response.json());
//   console.log(result);
//   return result;
// };
