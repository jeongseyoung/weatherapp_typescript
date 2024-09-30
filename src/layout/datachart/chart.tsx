import { WeatherData } from "interface";
import "./style.css";
import { useEffect } from "react";
import { Bar, Line, Scatter } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, ChartOptions, Colors } from "chart.js";
import { determineAxis } from "chart.js/dist/core/core.config";
//props: WeatherData
export default function Chart() {
  //const { name, coord, main, sys, weather, wind } = props;
  const temp = [18, 16, 17, 19, 22, 27, 25, 22];
  const labels = [
    "00시",
    "03시",
    "06시",
    "09시",
    "12시",
    "15시",
    "18시",
    "21시",
  ];
  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "기온",
        borderColor: "black",
        borderWidth: 2,
        borderJoinStyle: "bevel",
        data: temp.map((t) => t),
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
        min: 10,
        max: 30,
        ticks: {
          stepSize: 10,
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
