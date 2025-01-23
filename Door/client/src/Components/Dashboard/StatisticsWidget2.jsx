import classNames from "classnames";

const StatisticsWidget2 = ({
  variant,
  title,
  trendValue,
  trendIcon,
  stats,
  subTitle,
  progress,
}) => {
  return (
    <div className="rounded-lg shadow-sm border-0 bg-white">
      <div className="p-4">
        {/* Dropdown menu - You'll need to implement a custom dropdown with Tailwind */}
        <div className="float-right">
          <button className="text-gray-500 hover:text-gray-700">
            <i className="mdi mdi-dots-vertical"></i>
          </button>
          {/* Implement dropdown menu items */}
        </div>

        {/* Title */}
        <h5 className="text-gray-500 mb-3">{title}</h5>

        {/* Content */}
        <div className="flex items-center">
          {/* Badge */}
          <span
            className={`inline-flex items-center px-3 py-1.5 text-sm rounded-full mr-3 ${
              variant === "success"
                ? "bg-green-100 text-green-800"
                : variant === "danger"
                ? "bg-red-100 text-red-800"
                : variant === "warning"
                ? "bg-yellow-100 text-yellow-800"
                : variant === "info"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {trendValue} <i className={classNames("ml-1", trendIcon)}></i>
          </span>

          {/* Stats and Subtitle */}
          <div className="text-right flex-grow">
            <h4 className="font-bold mb-1 text-md font-extralight">{stats}</h4>
            <p className="text-gray-500 mb-0 text-sm">{subTitle}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${
                variant === "success"
                  ? "bg-green-500"
                  : variant === "danger"
                  ? "bg-red-500"
                  : variant === "warning"
                  ? "bg-yellow-500"
                  : variant === "info"
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsWidget2;
