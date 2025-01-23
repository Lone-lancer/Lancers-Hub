import { Col, Row } from "react-bootstrap";

// hooks
import { usePageTitle } from "../../hooks";

// component
import Statistics from "./Statistics";
import SalesChart from "./SalesChart";
import StatisticsChart from "./StatisticsChart";
import RevenueChart from "./RevenueChart";
import Users from "./Users";
import Inbox from "./Inbox";
import Projects from "./Projects";

// dummy data
import { messages, projectDetails } from "./data";

const AdminDashboard = () => {
  // set pagetitle
  usePageTitle({
    title: "Dashboard",
    breadCrumbItems: [
      {
        path: "/dashboard",
        label: "Dashboard",
        active: true,
      },
    ],
  });

  return (
    <div className="bg-gray-100 grid gap-3 py-2">
      <Statistics />

      <Row className="grid">
        {/* <Col xl={4} md={6}>
          <SalesChart />
        </Col>
        <Col xl={4} md={6}>
          <StatisticsChart />
        </Col>
        */}
      </Row>
    </div>
  );
};

export default AdminDashboard;
