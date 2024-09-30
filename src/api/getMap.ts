//import { windyAPIKey } from "key/apiKey";
import { windyAPIKey } from "../utils/keys/config";
import { getLatLon } from "./getCity";

export const getWindy = async (city: string) => {
  let cityLat: string = "";
  let cityLon: string = "";
  try {
    await getLatLon(city).then((result) => {
      if (result) {
        cityLat = result.lat;
        cityLon = result.lon;
      }
    });
  } catch {
    console.log("없는 도시");
  }
  console.log("windyAPIKey", windyAPIKey);
  const script = document.createElement("script");
  script.src = "https://api.windy.com/assets/map-forecast/libBoot.js";
  script.async = true;

  const script2 = document.createElement("script");
  script2.src = "https://unpkg.com/leaflet@1.4.0/dist/leaflet.js";
  script2.async = true;

  document.body.appendChild(script);
  document.body.appendChild(script2);

  const options = {
    key: windyAPIKey,
    //verbose: true,
    lat: cityLat,
    lon: cityLon,
    zoom: 5,
  };

  script.onload = () => {
    window.windyInit(options, (windyAPI) => {
      console.log("options", options);
      const { map, store } = windyAPI;
      //map.addLayer(windyAPI.overlay.clouds);

      store.set("overlay", "clouds");
      console.log("store", store);
      // const assets = ["rain", "clouds"];
      // for (let c of assets) store.set("overlay", c);

      // const overlays = ["rain", "wind", "temp", "clouds"];
      // let i = 0;
      // setInterval(() => {
      //   i = i === 3 ? 0 : i + 1;
      //   store.set("overlay", overlays[i]);
      // }, 800);
    });
  };
};
