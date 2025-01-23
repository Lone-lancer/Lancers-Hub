import { Dropdown } from "react-bootstrap";
import Chart from "react-apexcharts";

const StatisticsWidget1 = ({
  title,
  data,
  color,
  stats,
  subTitle,
  progress,
}) => {
  const apexOpts = {
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "75%",
        },
        track: {
          background: color,
          opacity: 0.3,
          margin: 0,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            color: color,
            fontWeight: 700,
            fontSize: "14px",
            offsetY: 5,
            formatter: (val) => {
              return String(val);
            },
          },
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    colors: [color],
  };

  return (
    <div className="rounded-lg shadow-sm border-0 bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-gray-600 font-medium">{title}</h5>
          <Dropdown align="end">
            <Dropdown.Toggle
              as="button"
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <i className="mdi mdi-dots-vertical text-gray-400 hover:text-gray-600"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow-lg rounded-lg">
              <Dropdown.Item className="hover:bg-gray-50 py-2 px-4">
                Action
              </Dropdown.Item>
              <Dropdown.Item className="hover:bg-gray-50 py-2 px-4">
                Another Action
              </Dropdown.Item>
              <Dropdown.Item className="hover:bg-gray-50 py-2 px-4">
                Something Else
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="flex items-center space-x-4 justify-between">
          <div className="">
            <Chart
              options={apexOpts}
              series={[data]}
              type="radialBar"
              width={77}
              height={77}
              className="apex-charts mt-0"
            />
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-1">{stats}</h4>
            <p className="text-gray-500 text-sm">{subTitle}</p>
          </div>
        </div>

        {progress && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">{progress.label}</span>
              <span className="text-gray-600 font-medium">
                {progress.percentage}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${progress.percentage}%`,
                  backgroundColor: color,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsWidget1;
