export default interface WeatherData {
  // name: string;
  // main: string;
  // weather: string[];
  // wind: string;
  name: string;
  main: any | null;
  coord: any | null;
  weather: any[] | null[];
  wind: any | null;
  sys: any | null;
}
