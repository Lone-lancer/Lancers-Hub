import { Card, Dropdown } from "react-bootstrap";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import config from "../../config";

const RevenueChart = () => {
  const [officeStats, setOfficeStats] = useState({
    totalOffices: 0,
    pendingCount: 0,
    acceptedCount: 0,
    rejectedCount: 0,
    revenue: {},
  });

  const fetchOfficeStats = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/offices/stats`);
      const data = await response.json();
      setOfficeStats(data);
    } catch (error) {
      console.error("Error fetching office statistics:", error);
    }
  };

  useEffect(() => {
    fetchOfficeStats();
  }, []);

  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
      stacked: false,
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 3],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0, 1],
    },
    colors: ["#3cc469", "#188ae2"],
    xaxis: {
      categories:
        officeStats.revenue?.weekly?.map((w) => `Week ${w.week}`) || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#adb5bd",
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      min: 0,
      max:
        Math.max(
          ...(officeStats.revenue?.weekly?.map((w) => w.amount) || [0])
        ) * 1.2,
      labels: {
        style: {
          colors: "#adb5bd",
        },
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Weekly Revenue",
      type: "area",
      data: officeStats.revenue?.weekly?.map((w) => w.amount) || [],
    },
  ];

  return (
    <Card>
      <Card.Body>
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
            <i className="mdi mdi-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Anothther Action</Dropdown.Item>
            <Dropdown.Item>Something Else</Dropdown.Item>
            <Dropdown.Item>Separated link</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <h4 className="header-title mt-0">Total Revenue</h4>

        <div dir="ltr">
          <Chart
            options={options}
            series={series}
            type="line"
            height={268}
            className="apex-charts mt-2"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default RevenueChart;
