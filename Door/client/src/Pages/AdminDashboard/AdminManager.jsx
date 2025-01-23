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
  TextField,
} from "@mui/material";
import { Check, Close, Edit } from "@mui/icons-material";
import DataTable from "react-data-table-component";

const AdminManager = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [offices, setOffices] = useState([]);
  const [openManagerModal, setOpenManagerModal] = useState(false);
  const [newManagerData, setNewManagerData] = useState({
    managerName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    startDate: "",
    employmentType: "full-time",
  });
  const [currentOfficeId, setCurrentOfficeId] = useState(null);

  const fetchOffices = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/offices");
      const data = await response.json();
      console.log(data.offices);
      const formattedOffices = data?.offices?.map((office) => ({
        id: office.id,
        office_id: office.roomId,
        organizationName: office.organizationName,
        buyerName: office.organizationName,
        managerId: office.managerId,
        managerName: office.managerName,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleManagerModalOpen = (office) => {
    setCurrentOfficeId(office.id);
    setOpenManagerModal(true);
  };

  const handleManagerModalClose = () => {
    setOpenManagerModal(false);
    setCurrentOfficeId(null);
    setNewManagerData({
      managerName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      startDate: "",
      employmentType: "full-time",
    });
  };

  const handleManagerChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/offices/${currentOfficeId}/manager`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newManagerData),
        }
      );
      if (response.ok) {
        fetchOffices();
        handleManagerModalClose();
      } else {
        console.error("Failed to update manager:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating manager:", error);
    }
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
      name: "Manager Name",
      selector: (row) => row.managerName,
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
            color="primary"
            startIcon={<Edit />}
            onClick={() => handleManagerModalOpen(row)}
          >
            Change Manager
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

      <Dialog
        open={openManagerModal}
        onClose={handleManagerModalClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Change Manager Information</DialogTitle>
        <form onSubmit={handleManagerChange}>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="New Manager Name"
                  value={newManagerData.managerName}
                  onChange={(e) =>
                    setNewManagerData((prev) => ({
                      ...prev,
                      managerName: e.target.value,
                    }))
                  }
                  required
                  fullWidth
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Email"
                  type="email"
                  value={newManagerData.email}
                  onChange={(e) =>
                    setNewManagerData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  value={newManagerData.phone}
                  onChange={(e) =>
                    setNewManagerData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  required
                  fullWidth
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Department"
                  value={newManagerData.department}
                  onChange={(e) =>
                    setNewManagerData((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                  required
                  fullWidth
                />
                <TextField
                  label="Position"
                  value={newManagerData.position}
                  onChange={(e) =>
                    setNewManagerData((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  required
                  fullWidth
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={newManagerData.startDate}
                  onChange={(e) =>
                    setNewManagerData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  fullWidth
                />
              </Box>

              <TextField
                select
                label="Employment Type"
                value={newManagerData.employmentType}
                onChange={(e) =>
                  setNewManagerData((prev) => ({
                    ...prev,
                    employmentType: e.target.value,
                  }))
                }
                SelectProps={{
                  native: true,
                }}
                required
                fullWidth
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleManagerModalClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Update Manager
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default AdminManager;
