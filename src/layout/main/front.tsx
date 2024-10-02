import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./style.css";
import {
  getForecastData,
  getOneCallApiData,
  getWeatherData,
} from "api/getWeather";
import { getEmoji } from "api";
import { getWindy } from "api/getMap";
import { calEmoji } from "utils/calculateEmoji";
import { OneCallData, WeatherData } from "interface";
import TempChart from "layout/datachart/chart";
import { Main } from "interface/weatherData";
import { dailyData } from "utils/calculateDailyData";
export default function Front() {
  const [myStyle, setMyStyle] = useState<boolean>(false);
  const [tempGraphBox, setTempGraphBox] = useState<boolean>(true);
  const [city, setCity] = useState<string>("");
  const [graphData, setGraphData] = useState<Main>();
  // 날씨 데이터(json) 저장
  const [result, setResult] = useState<WeatherData>();
  const [ForecastResult, setForecastResult] = useState<any>("");
  // 화면에 보여줄 예보 데이터
  const [forecast, setForecast] = useState<number[][]>([]);
  // onecalldata
  const [oneCallData, setOneCallData] = useState<OneCallData>();

  const handleInputCity = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };
  const n = new Date();
  const [now, setNow] = useState<any>(n.toDateString());

  const [lat, setLat] = useState<number>();
  const [lon, setLon] = useState<number>();

  const getWeather = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const getData = await getWeatherData(city);
    const getForecast = await getForecastData(city);
    const getOneCall = await getOneCallApiData(city);

    if (getData && getForecast && getOneCall) {
      setResult(getData);
      setForecastResult(getForecast);
      setOneCallData(getOneCall);
    }
  };

  const [weatherData, setWeatherData] = useState({
    name: "",
    temp: 0,
    humidity: 0,
    description: "",
    id: 0,
    speed: "",
    sunriseDate: "",
    sunsetDate: "",
    dailyTemp: [0],
    // lat: undefined as number | undefined,
    // lon: undefined as number | undefined,
  });

  // 날씨 데이터
  useEffect(() => {
    if (result && ForecastResult) {
      console.log("result", result);
      console.log("ForecastResult", ForecastResult);

      const {
        name,
        main: { temp, humidity },
        coord: { lat, lon },
        weather: [{ description, id }],
        wind: { speed },
        sys: { sunrise, sunset },
      } = result;
      const { list } = ForecastResult;
      // 데일리 기온list
      const dailyTemp: number[] = [];
      const dailyDay: number[] = [];
      const n = [0, 3, 6, 9, 12, 15, 18, 21];
      for (let i = 0; i <= 47; i++) {
        if (n.includes(i)) {
          dailyTemp.push(
            Math.floor(Number(oneCallData?.hourly[i].temp) - 273.15)
          );
          dailyDay.push(
            new Date(Number(oneCallData?.hourly[i].dt) * 1000).getHours()
          );
        }
      }
      setGraphData({
        temp: Math.floor(temp),
        dailytemp: dailyTemp,
        humidity,
        day: dailyDay,
      });
      // 이모티콘ID 계산
      const tempForecast = calEmoji(list);
      setForecast(tempForecast);

      //일출, 일몰
      const rise = new Date(sunrise * 1000);
      const set = new Date(sunset * 1000);

      setWeatherData({
        name,
        temp: Math.floor(temp),
        humidity,
        description,
        id,
        speed: speed.toString(),
        sunriseDate: rise.toLocaleTimeString(),
        sunsetDate: set.toLocaleTimeString(),
        dailyTemp: dailyTemp,
      });
      setMyStyle(true);
      setLat(lat);
      setLon(lon);
    }
  }, [result]);

  // lat과 lon이 useState에 저장되는 시점에 windyMaps실행
  useEffect(() => {
    if (lat && lon) getWindy(city);
  }, [lat, lon]);

  return (
    <div>
      <form className="weatherForm" onSubmit={getWeather}>
        <input
          type="text"
          className="cityInput"
          value={city}
          placeholder="도시를 입력하세요"
          onChange={handleInputCity}
        />
        <button type="submit">확인</button>
      </form>

      <div className="card">
        {myStyle && (
          <>
            <p className="now">{now}</p>
            <h1 className="cityDisplay">{weatherData.name}</h1>
            <p className="tempDisplay">
              {Math.floor(Number(weatherData.temp) - 273.15)}℃
            </p>
            <p className="humidityDisplay">습도 : {weatherData.humidity}%</p>
            <p className="windDisplay">{weatherData.description}</p>
            <p className="descriptionDisplay">풍량 : {weatherData.speed} m/s</p>
            <p className="riseset">
              일출 : {weatherData.sunriseDate} / 일몰 : {weatherData.sunsetDate}
            </p>
            <p className="weatherEmoji">{getEmoji(weatherData.id)}</p>
            <div className="tempGraphBox">
              {graphData && <TempChart main={graphData} />}
            </div>
          </>
        )}
        {/* {tempGraphBox && (
          <div className="tempGraphBox">
            <TempChart />
          </div>
        )} */}
      </div>
      <div className="forecastBox">
        {forecast.map((m, i) => (
          <div className="box" key={i}>
            <div className="dateBox">
              <p className="forecastDate">{m[0]}</p>
            </div>
            <div className="tempBox">
              <p className="forecastMinMax">
                {m[1]}℃ ~ {m[2]}℃
              </p>
            </div>
            <div className="forecastMain">{m[3]}</div>
            <div className="forecastEmoji">{getEmoji(m[4])}</div>
          </div>
        ))}
      </div>
      <div className="windyBoxWrapper">
        <div className="windyLeftArrow">⬅️</div>
        <div id="windy"></div>
        <div className="windyRightArrow">➡️</div>
      </div>
    </div>
  );
}
