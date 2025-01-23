import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import config from "../../config";

const ManagerReport = () => {
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

  // Fetch data using the same function as ManagerDashboard
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
      }
    };

    fetchTeamStats();
  }, []);

  // Convert stats to table data
  const tableData = [
    {
      id: 1,
      category: "Team Composition",
      metric: "Total Members",
      value: teamStats.totalMembers,
    },
    {
      id: 2,
      category: "Team Composition",
      metric: "Team Leaders",
      value: teamStats.totalTeamLeaders,
    },
    {
      id: 3,
      category: "Team Composition",
      metric: "Team Members",
      value: teamStats.totalTeamMembers,
    },
    {
      id: 4,
      category: "Task Status",
      metric: "Total Tasks",
      value: teamStats.tasks.total,
    },
    {
      id: 5,
      category: "Task Status",
      metric: "Ongoing Tasks",
      value: teamStats.tasks.ongoing,
    },
    {
      id: 6,
      category: "Task Status",
      metric: "Pending Tasks",
      value: teamStats.tasks.pending,
    },
    {
      id: 7,
      category: "Task Status",
      metric: "Completed Tasks",
      value: teamStats.tasks.completed,
    },
  ];

  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Metric",
      selector: (row) => row.metric,
      sortable: true,
    },
    {
      name: "Value",
      selector: (row) => row.value,
      sortable: true,
    },
  ];

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ["Category", "Metric", "Value"],
      ...tableData.map((row) => [row.category, row.metric, row.value]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "team_stats_report.csv";
    link.click();
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Category", "Metric", "Value"]],
      body: tableData.map((row) => [row.category, row.metric, row.value]),
    });
    doc.save("team_stats_report.pdf");
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Team Statistics Report</h2>
        <div>
          <Button variant="primary" className="me-2" onClick={exportToCSV}>
            Export CSV
          </Button>
          <Button variant="secondary" onClick={exportToPDF}>
            Export PDF
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default ManagerReport;
