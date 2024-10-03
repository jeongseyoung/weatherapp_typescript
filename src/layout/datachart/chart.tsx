import "./style.css";
import { Bar, Line, Scatter } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, ChartOptions, Colors } from "chart.js";
import { Main } from "interface/weatherData";
import { NONAME } from "dns";
//props: WeatherData
export default function TempChart({ main }: { main: Main }) {
  const { temp, dailytemp, humidity, day } = main;

  const t: number[] = [];
  dailytemp?.map((m: number) => t.push(m));

  // label 세팅
  const labels: string[] = [];
  day?.map((m: number) => labels.push(m + "시"));

  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "temperture",
        borderColor: "black",
        borderWidth: 2,
        borderJoinStyle: "bevel",
        data: dailytemp ? dailytemp.map((t: number) => t) : [],
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: Math.min(...t) - 5,
        max: Math.max(...t) + 5,
        ticks: {
          stepSize: 10,
          font: {
            size: 13,
            weight: 800,
          },
          callback: function (temp) {
            return temp + "℃";
          },
        },
      },
    },
  };

  return (
    <div className="graphBox">
      <Line data={data} options={options} />
    </div>
  );
}
