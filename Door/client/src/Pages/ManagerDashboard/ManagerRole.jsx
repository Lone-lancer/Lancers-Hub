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
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import config from "../../config";

const ManagerRole = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [teamMembers, setTeamMembers] = useState([]);

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
        status: member.status,
      }));
      setTeamMembers(formattedMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleRoleChange = async (memberId, newRole) => {
    try {
      const response = await fetch(
        `${config.API_URL}/api/manager/team-members/${memberId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user_role: newRole }),
        }
      );
      if (response.ok) {
        fetchTeamMembers();
      }
    } catch (error) {
      console.error("Error updating member role:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Manage Team Roles
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      {member.status ? (
                        <Select
                          size="small"
                          value={member.role}
                          onChange={(e) =>
                            handleRoleChange(member.id, e.target.value)
                          }
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="teammember">Member</MenuItem>
                          <MenuItem value="teamleader">Team Leader</MenuItem>
                        </Select>
                      ) : (
                        member.role
                      )}
                    </TableCell>
                    <TableCell>
                      {member.status ? "Active" : "Inactive"}
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
    </Box>
  );
};

export default ManagerRole;
