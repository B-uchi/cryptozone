import millify from "millify";
import * as React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

const LineChart: React.FC<any> = ({
  priceHistoryData,
  currentPrice,
  coinName,
}) => {
    const priceHistory = priceHistoryData?.history
  const coinPrice = [];
  const coinTimeStamp = [];

  Chart.register(CategoryScale, LinearScale);
  Chart.register(PointElement, LineElement);

  for (let i = 0; i < priceHistory.length; i++) {
    coinPrice.push(priceHistory[i].price);
    coinTimeStamp.push(
      new Date(priceHistory[i].timestamp * 1000).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "#0071bd",
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        grid:{
          color: "#e1e1e1"
        }
      },
      x: { reverse: true, grid:{
        color: "#e1e1e1"
      } },
    },
  };

  return (
    <div className="mt-3 ">
      <div className="flex justify-between dark:text-white">
        <h1 className="font-bold md:text-2xl">{coinName} Price Chart</h1>
        <div className="flex gap-5">
          <p className="font-bold text-sm md:text-md">Change: {priceHistoryData?.change}</p>
          <p className="font-bold text-sm md:text-md">Current Price: {millify(currentPrice)}</p>
        </div>
      </div>
      <Line data={data} options={options}  />
    </div>
  );
};

export default LineChart;
