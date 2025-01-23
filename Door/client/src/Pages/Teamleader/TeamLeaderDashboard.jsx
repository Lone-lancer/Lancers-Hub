import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import StatisticsWidget2 from "../../Components/Dashboard/StatisticsWidget2";
import config from "../../config";
const TeamLeaderDashboard = () => {
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    totalTeamLeaders: 0,
    totalTeamMembers: 0,
    tasks: {
      total: 0,
      ongoing: 0,
      pending: 0,
      completed: 0,
    },
  });

  useEffect(() => {
    const fetchTeamStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${config.API_URL}/api/manager/team-stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const stat_data = data.data;

        setTeamStats({
          totalMembers: stat_data.totalMembers || 0,
          totalTeamLeaders: stat_data.teamLeaderCount || 0,
          totalTeamMembers: stat_data.teamMemberCount || 0,
          tasks: {
            total: stat_data.tasks?.total || 0,
            ongoing: stat_data.tasks?.todo || 0,
            pending: stat_data.tasks?.inProgress || 0,
            completed: stat_data.tasks?.done || 0,
          },
        });
      } catch (error) {
        console.error("Error fetching team stats:", error);
        setTeamStats({
          totalMembers: 0,
          totalTeamLeaders: 0,
          totalTeamMembers: 0,
          tasks: {
            total: 0,
            ongoing: 0,
            pending: 0,
            completed: 0,
          },
        });
      }
    };

    fetchTeamStats();
  }, []);

  return (
    <div>
      <Row className="grid gap-y-5">
        {/* <Col xl={3} md={6}>
          <StatisticsWidget2
            variant="pink"
            title="Total Members"
            trendValue="32%"
            trendIcon="mdi mdi-trending-up"
            stats={teamStats.totalMembers}
            subTitle="Total team size"
            progress={77}
          />
        </Col>
        <Col xl={3} md={6}>
          <StatisticsWidget2
            variant="pink"
            title="Total Team Leaders"
            trendValue="32%"
            trendIcon="mdi mdi-trending-up"
            stats={teamStats.totalTeamLeaders}
            subTitle="Leadership strength"
            progress={77}
          />
        </Col> */}
        <Col xl={3} md={6}>
          <StatisticsWidget2
            variant="pink"
            title="Total TeamMembers"
            trendValue="32%"
            trendIcon="mdi mdi-trending-up"
            stats={teamStats.totalTeamMembers}
            subTitle="Team member strength"
            progress={77}
          />
        </Col>
        <Col xl={3} md={6}>
          <StatisticsWidget2
            variant="pink"
            title="Total Tasks"
            trendValue="32%"
            trendIcon="mdi mdi-trending-up"
            stats={teamStats.tasks.total}
            subTitle="All tasks"
            progress={77}
          />
        </Col>
        <Col xl={3} md={6}>
          <StatisticsWidget2
            variant="pink"
            title="Ongoing Tasks"
            trendValue="32%"
            trendIcon="mdi mdi-trending-up"
            stats={teamStats.tasks.ongoing}
            subTitle="Ongoing tasks"
            progress={77}
          />
        </Col>
        <Col xl={3} md={6}>
          <StatisticsWidget2
            variant="pink"
            title="Pending Tasks"
            trendValue="32%"
            trendIcon="mdi mdi-trending-up"
            stats={teamStats.tasks.pending}
            subTitle="Pending tasks"
            progress={77}
          />
        </Col>
        <Col xl={3} md={6}>
          <StatisticsWidget2
            variant="pink"
            title="Completed Tasks"
            trendValue="32%"
            trendIcon="mdi mdi-trending-up"
            stats={teamStats.tasks.completed}
            subTitle="Completed tasks"
            progress={77}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TeamLeaderDashboard;
