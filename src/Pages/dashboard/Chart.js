import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import axios from "axios";
import { APIDATA } from "../../Constant";

const Charts = ({ selectedYear }) => {
  const [productStats, setProductStats] = useState([]);
  //use Effect for getting the stats for the chart
  useEffect(() => {
    const getActiveUsers = async () => {
      await axios
        .get(`${APIDATA}get/product/statistics`)
        .then((res) => setProductStats(res?.data.data))
        .catch((err) => console.log(err));
    };

    getActiveUsers();
  }, []);

  // filtering by year
  const newStats = productStats.filter(function (stat) {
    return stat.year === selectedYear;
  });

  const dataMonths = newStats?.map((newStat) => newStat?.month);

  const dataProduct = newStats?.map((newStat) => newStat?.product);

  //Apex chart attributes
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: dataMonths,
    },
    fill: {
      colors: "#76ba1b",
      opacity: 0.95,
      type: "solid",
    },
    dataLabels: {
      enabled: false,
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
      },
    },
  };

  const series = [
    {
      name: "Products",

      data: dataProduct,
    },
  ];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
