import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./style.css";
import { getWeatherData } from "api/getWeather";
import { getEmoji } from "api";
export default function Front() {
  const [myStyle, setMyStyle] = useState<boolean>(false);

  const [city, setCity] = useState<string>("");

  // 날씨 데이터(json) 저장
  const [result, setResult] = useState<any>("");

  const handleInputCity = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const [name, setName] = useState<string>("");
  const [temp, setTemp] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [speed, setSpeed] = useState<string>("");

  const getWeather = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = await getWeatherData(city);
    console.log(getData);
    console.log(city);
    if (getData) {
      setResult(getData);
    }
  };

  // 날씨 데이터
  useEffect(() => {
    if (result) {
      const {
        name,
        main: { temp, humidity },
        weather: [{ description, id }],
        wind: { speed },
      } = result;

      setName(name);
      setTemp(temp);
      setHumidity(humidity);
      setDescription(description);
      setId(id);
      setSpeed(speed);
      setMyStyle(true);
    }
  }, [result]);

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
            <h1 className="cityDisplay">{name}</h1>
            <p className="tempDisplay">{Math.floor(Number(temp) - 273.15)}℃</p>
            <p className="humidityDisplay">습도 : {humidity}%</p>
            <p className="windDisplay">{description}</p>
            <p className="descriptionDisplay">풍량 : {speed} m/s</p>
            <p className="weatherEmoji">{getEmoji(id)}</p>
          </>
        )}
      </div>
    </div>
  );
}
