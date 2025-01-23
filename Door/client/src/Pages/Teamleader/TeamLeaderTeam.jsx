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
  Chip,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Check, Close, Download } from "@mui/icons-material";
import config from "../../config";

const TeamLeaderTeam = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [teamMembers, setTeamMembers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [actionType, setActionType] = useState("");

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(
        `${config.API_URL}/api/manager/team-members`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      const formattedMembers = data?.data?.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        cv: member.cv,
        status: member.status,
        joinDate: new Date(member.createdAt.seconds * 1000).toLocaleString(),
      }));
      setTeamMembers(formattedMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleActivate = async (memberId) => {
    try {
      const response = await fetch(
        `${config.API_URL}/api/manager/team-members/${memberId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: true }),
        }
      );
      if (response.ok) {
        fetchTeamMembers();
      }
    } catch (error) {
      console.error("Error activating member:", error);
    }
  };

  const handleDeactivate = async (memberId) => {
    try {
      const response = await fetch(
        `${config.API_URL}/api/manager/team-members/${memberId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: false }),
        }
      );
      if (response.ok) {
        fetchTeamMembers();
      }
    } catch (error) {
      console.error("Error deactivating member:", error);
    }
  };

  const handleOpenModal = (memberId, action) => {
    setCurrentMemberId(memberId);
    setActionType(action);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentMemberId(null);
    setActionType("");
  };

  const handleConfirmAction = async () => {
    if (actionType === "activate") {
      await handleActivate(currentMemberId);
    } else if (actionType === "deactivate") {
      await handleDeactivate(currentMemberId);
    }
    handleCloseModal();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Team Members
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Cv</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>
                      <a
                        href={`${config.API_URL}/api/manager/download/${member.cv}`}
                        download={member.cv}
                        target="_blank"
                      >
                        <Download />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={member.status ? "Active" : "Inactive"}
                        color={member.status ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {!member.status ? (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<Check />}
                            onClick={() =>
                              handleOpenModal(member.id, "activate")
                            }
                          >
                            Activate
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            startIcon={<Close />}
                            onClick={() =>
                              handleOpenModal(member.id, "deactivate")
                            }
                          >
                            Deactivate
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={teamMembers?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {actionType === "activate" ? "Activate Member" : "Deactivate Member"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {actionType} this team member?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary">
            {actionType === "activate" ? "Activate" : "Deactivate"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamLeaderTeam;
