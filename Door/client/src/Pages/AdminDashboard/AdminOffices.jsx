import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Chip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import DataTable from "react-data-table-component";
import config from "../../config";

const AdminOffices = () => {
  const [offices, setOffices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentOfficeId, setCurrentOfficeId] = useState(null);
  const [actionType, setActionType] = useState("");

  const fetchOffices = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/offices`);
      const data = await response.json();
      console.log(data.offices);
      const formattedOffices = data?.offices?.map((office) => ({
        id: office.id,
        office_id: office.roomId,
        organizationName: office.organizationName,
        buyerName: office.organizationName,
        date: new Date(office.createdAt.seconds * 1000).toLocaleString(),
        status: office.status,
      }));
      setOffices(formattedOffices);
    } catch (error) {
      console.error("Error fetching offices:", error);
    }
  };
  useEffect(() => {
    fetchOffices();
  }, []);

  const handleApprove = async (officeId) => {
    if (!window.confirm("Are you sure you want to approve this office?"))
      return;

    try {
      const response = await fetch(
        `${config.API_URL}/api/offices/${officeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: 1 }), // Update status to 1 for approved
        }
      );
      if (response.ok) {
        console.log("Approved:", officeId);
        fetchOffices();
      } else {
        console.error("Failed to approve:", response.statusText);
      }
    } catch (error) {
      console.error("Error approving office:", error);
    }
  };

  const handleDecline = async (officeId) => {
    if (!window.confirm("Are you sure you want to decline this office?"))
      return;

    try {
      const response = await fetch(
        `${config.API_URL}/api/offices/${officeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: 2 }), // Update status to 2 for declined
        }
      );
      if (response.ok) {
        console.log("Declined:", officeId);
        fetchOffices();
      } else {
        console.error("Failed to decline:", response.statusText);
      }
    } catch (error) {
      console.error("Error declining office:", error);
    }
  };

  const handleOpenModal = (officeId, action) => {
    setCurrentOfficeId(officeId);
    setActionType(action);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentOfficeId(null);
    setActionType("");
  };

  const handleConfirmAction = async () => {
    if (actionType === "approve") {
      await handleApprove(currentOfficeId);
    } else if (actionType === "decline") {
      await handleDecline(currentOfficeId);
    }
    handleCloseModal();
  };

  const columns = [
    {
      name: "Office ID",
      selector: (row) => row.office_id,
      sortable: true,
    },
    {
      name: "Buyer Name",
      selector: (row) => row.buyerName,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <Chip
          label={
            row.status == "0"
              ? "Pending"
              : row.status == "1"
              ? "Approved"
              : "Rejected"
          }
          color={
            row.status == "1"
              ? "success"
              : row.status == "2"
              ? "error"
              : "warning"
          }
          size="small"
        />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            color="success"
            startIcon={<Check />}
            onClick={() => handleOpenModal(row.id, "approve")}
            disabled={row.status != "0"}
          >
            Approve
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            startIcon={<Close />}
            onClick={() => handleOpenModal(row.id, "decline")}
            disabled={row.status != "0"}
          >
            Decline
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Office Management
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <DataTable
          columns={columns}
          data={offices}
          pagination
          highlightOnHover
          responsive
          striped
        />
      </Paper>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {actionType === "approve" ? "Approve Office" : "Decline Office"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {actionType} this office?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary">
            {actionType === "approve" ? "Approve" : "Decline"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminOffices;
