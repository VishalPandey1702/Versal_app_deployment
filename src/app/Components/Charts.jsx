"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export function MessPieChart(props) {
  const MessData = {
    labels: Object.keys(props.MessData),
    datasets: [
      {
        label: "stars",
        data: Object.values(props.MessData),
        backgroundColor: [
          "rgba(255,111,38,0.6)",
          "rgba(122,45,215,0.6)",
          "rgba(255,52,118,0.6)",
          "rgba(253,185,80,0.6)",
        ],
        borderColor: [
          "rgba(255,111,38,1)",
          "rgba(122,45,215,1)",
          "rgba(255,52,118,1)",
          "rgba(253,185,80,1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={MessData} />;
}

export function LaundryPieChart(props) {
  const LaundryData = {
    labels: Object.keys(props.LaundryData),
    datasets: [
      {
        label: "stars",
        data: Object.values(props.LaundryData),
        backgroundColor: [
          "rgba(255,111,38,0.6)",
          "rgba(122,45,215,0.6)",
          "rgba(255,52,118,0.6)",
        ],
        borderColor: [
          "rgba(255,111,38,1)",
          "rgba(122,45,215,1)",
          "rgba(255,52,118,1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={LaundryData} />;
}

export function SweeperPieChart(props) {
  console.log(props);
  const SweeperData = {
    labels: Object.keys(props.Sweeper),
    datasets: [
      {
        label: "stars",
        data: Object.values(props.Sweeper),
        backgroundColor: [
          "rgba(255,111,38,0.6)",
          "rgba(122,45,215,0.6)",
          "rgba(255,52,118,0.6)",
        ],
        borderColor: [
          "rgba(255,111,38,1)",
          "rgba(122,45,215,1)",
          "rgba(255,52,118,1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={SweeperData} />;
}

export function InternetPieChart(props) {
  console.log(props);
  const SweeperData = {
    labels: Object.keys(props.Internet),
    datasets: [
      {
        label: "stars",
        data: Object.values(props.Internet),
        backgroundColor: [
          "rgba(255,111,38,0.6)",
          "rgba(122,45,215,0.6)",
          "rgba(255,52,118,0.6)",
        ],
        borderColor: [
          "rgba(255,111,38,1)",
          "rgba(122,45,215,1)",
          "rgba(255,52,118,1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={SweeperData} />;
}
