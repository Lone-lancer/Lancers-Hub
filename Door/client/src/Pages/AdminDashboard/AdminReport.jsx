import React from "react";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import config from "../../config";

const AdminReport = () => {
  const [reportData, setReportData] = useState({
    totalOffices: 0,
    pendingCount: 0,
    acceptedCount: 0,
    rejectedCount: 0,
    revenue: {
      total: 0,
      daily: 0,
      weekly: [],
    },
  });
  const [loading, setLoading] = useState(true);

  const fetchReportData = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/offices/stats`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const columns = [
    {
      name: "Metric",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Value",
      selector: (row) => row.value,
      sortable: true,
    },
  ];

  const tableData = [
    { name: "Total Offices", value: reportData.totalOffices },
    { name: "Pending Offices", value: reportData.pendingCount },
    { name: "Accepted Offices", value: reportData.acceptedCount },
    { name: "Rejected Offices", value: reportData.rejectedCount },
    { name: "Total Revenue", value: `$${reportData.revenue.total}` },
    { name: "Daily Revenue", value: `$${reportData.revenue.daily}` },
  ];

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [columns.map((col) => col.name)],
      body: tableData.map((row) => [row.name, row.value]),
    });
    doc.save("admin-report.pdf");
  };

  const exportCSV = () => {
    const headers = columns.map((col) => col.name).join(",");
    const csvData = tableData
      .map((row) => [row.name, row.value].join(","))
      .join("\n");

    const blob = new Blob([`${headers}\n${csvData}`], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "admin-report.csv");
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="header-title">Admin Report</h4>
          <div>
            <Button variant="primary" className="me-2" onClick={exportPDF}>
              Export PDF
            </Button>
            <Button variant="success" onClick={exportCSV}>
              Export CSV
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          highlightOnHover
          responsive
          striped
          progressPending={loading}
        />
      </Card.Body>
    </Card>
  );
};

export default AdminReport;
