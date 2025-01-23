import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import config from "../../config";

// component
import StatisticsWidget1 from "../../Components/Dashboard/StatisticsWidget1";
import StatisticsWidget2 from "../../Components/Dashboard/StatisticsWidget2";
import RevenueChart from "./RevenueChart";

const Statistics = () => {
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

  return (
    <Row className="g-3">
      <Col lg={6} sm={12}>
        <Row className="g-3">
          <Col lg={6} sm={6}>
            <StatisticsWidget2
              variant="pink"
              title="Total Offices"
              trendValue="32%"
              trendIcon="mdi mdi-trending-up"
              stats={officeStats.totalOffices}
              subTitle="Revenue today"
              progress={77}
            />
          </Col>
          <Col lg={6} sm={6}>
            <StatisticsWidget2
              variant="pink"
              title="Pending Offices"
              stats={officeStats.pendingCount}
              subTitle="Review pending"
              progress={77}
            />
          </Col>
          <Col lg={6} sm={6}>
            <StatisticsWidget1
              title="Total Revenue"
              data={246}
              stats={officeStats.revenue.total}
              color={"#f05050"}
              subTitle="Revenue"
            />
          </Col>
          <Col lg={6} sm={6}>
            <StatisticsWidget2
              variant="success"
              title="Daily Revenue"
              trendValue="32%"
              trendIcon="mdi mdi-trending-up"
              stats={officeStats.revenue.daily}
              subTitle="Revenue today"
              progress={77}
            />
          </Col>
        </Row>
      </Col>

      <Col lg={6} sm={12}>
        <RevenueChart />
      </Col>

      <Col lg={3} sm={6}>
        <StatisticsWidget2
          variant="pink"
          title="Approved Offices"
          stats={officeStats.acceptedCount}
          subTitle="Approved offices"
          progress={77}
        />
      </Col>
      <Col lg={3} sm={6}>
        <StatisticsWidget2
          variant="pink"
          title="Declined Offices"
          stats={officeStats.rejectedCount}
          subTitle="Rejected offices"
          progress={77}
        />
      </Col>
    </Row>
  );
};

export default Statistics;
