import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getChartData, getCourses } from "../services/placementService";

const Statistics = (props) => {
  const { token, instituteId } = props;
  const [chartData, setChartData] = useState({});

  const options = {
    // responsive: true,
    maintainAspectRatio: false,

    title: {
      display: true,
      fontFamily: "'Roboto', sans-serif",
      fontColor: "#000",
      fontStyle: "500",
      text: "Percentage of students placed",
    },

    legend: {
      labels: {
        fontFamily: "'Roboto', sans-serif",
        fontColor: "#000",
        fontStyle: "500",
      },
    },

    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            beginAtZero: true,
            fontFamily: "'Roboto', sans-serif",
            fontColor: "#000",
            fontStyle: "500",
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            fontFamily: "'Roboto', sans-serif",
            fontColor: "#000",
            fontStyle: "500",
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  const dataset = [];

  function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    getCourses(token, instituteId).then((response) => {
      for (let dataObj of response.data) {
        populateChart(dataObj.name, getRandomColor());
      }
    });
  }, []);

  // useEffect(() => {
  const populateChart = (courseName, color) => {
    let dataOfChart = [];
    let labelData = [];

    getChartData(token, instituteId, courseName)
      .then((response) => {
        for (let dataObj of response.data) {
          let percentage =
            (dataObj.noPlacedStudents / dataObj.totalStudents) * 100;
          dataOfChart.push(Math.round(percentage));
          if (labelData.length < 5)
            labelData.push(dataObj.batch + "-" + dataObj.year);
        }
        dataset.push({
          label: courseName,
          data: dataOfChart,
          backgroundColor: color,
        });

        setChartData({
          labels: labelData,
          datasets: dataset,
        });
      })
      .catch((err) => {});
  };

  return <Bar data={chartData} options={options} />;
};

export default Statistics;
