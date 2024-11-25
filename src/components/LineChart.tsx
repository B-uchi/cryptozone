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
        fill: true, // Changed to true to add area fill
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Added transparency
        borderColor: "#0071bd",
        tension: 0.4, // Added curve smoothing
        pointRadius: 2, // Smaller points
        pointHoverRadius: 6, // Larger hover points
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        grid: {
          color: "rgba(225, 225, 225, 0.4)" // More subtle grid
        },
        ticks: {
          callback: (value) => `$${value}` // Added dollar sign
        }
      },
      x: { 
        reverse: true, 
        grid: {
          color: "rgba(225, 225, 225, 0.4)" // More subtle grid
        } 
      },
    },
    plugins: {
      legend: {
        display: false // Removed redundant legend
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y}` // Added dollar sign to tooltip
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index', // Better tooltip interaction
    },
  };

  return (
    <div className="mt-3">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6 dark:text-white">
        <h1 className="font-bold text-xl md:text-2xl">{coinName} Price Chart</h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <p className="font-bold text-sm md:text-md">
            <span className="text-gray-600 dark:text-gray-400">Change: </span>
            <span className={priceHistoryData?.change > 0 ? "text-green-500" : "text-red-500"}>
              {priceHistoryData?.change}%
            </span>
          </p>
          <p className="font-bold text-sm md:text-md">
            <span className="text-gray-600 dark:text-gray-400">Current Price: </span>
            <span>${millify(currentPrice)}</span>
          </p>
        </div>
      </div>
      <div className="w-full h-[400px]"> {/* Fixed height container */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
