import { OneCallData } from "interface";

export function dailyData(oneCallData: OneCallData | undefined) {
  if (!oneCallData || !oneCallData.hourly) {
    console.error("Invalid oneCallData provided.");
    return { dailyTemp: [], dailyDay: [] }; // Return empty arrays if invalid
  }
  // 데일리 기온list
  const dailyTemp: number[] = [];
  const dailyDay: number[] = [];
  const n = [0, 3, 6, 9, 12, 15, 18, 21];
  for (let i = 0; i <= 47; i++) {
    if (n.includes(i)) {
      dailyTemp.push(Math.floor(Number(oneCallData?.hourly[i].temp) - 273.15));
      dailyDay.push(
        new Date(Number(oneCallData?.hourly[i].dt) * 1000).getHours()
      );
    }
  }
  return { dailyTemp, dailyDay };
}
