const {
  db,
  collection,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
} = require("../firebasedb");

const getTeamStatsByRoom = async (req, res) => {
  console.log(req.body);
  const { userEmail, role, roomId } = req.body;

  if (!roomId) {
    return res.status(400).json({
      success: false,
      message: "Room ID is required",
    });
  }

  try {
    // Query users who belong to the specific room
    const usersQuery = query(
      collection(db, "users"),
      where("roomId", "==", roomId)
    );
    const usersSnapshot = await getDocs(usersQuery);

    // Get tasks data
    const tasksSnapshot = await getDocs(
      collection(db, "rooms", roomId, "tasks")
    );

    // Calculate task statistics
    const taskStats = {
      total: tasksSnapshot.docs.length,
      todo: 0,
      inProgress: 0,
      done: 0,
    };

    tasksSnapshot.docs.forEach((doc) => {
      const status = doc.data().status;
      taskStats[status]++;
    });

    const totalMembers = usersSnapshot.docs.length;
    let teamLeaderCount = 0;
    let teamMemberCount = 0;

    usersSnapshot.docs.forEach((doc) => {
      const role = doc.data().role;
      if (role === "teamleader") teamLeaderCount++;
      else if (role === "teammember") teamMemberCount++;
    });

    res.json({
      success: true,
      data: {
        roomId,
        totalMembers,
        teamLeaderCount,
        teamMemberCount,
        tasks: taskStats,
      },
      message: "Team statistics retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving team statistics:", error);
    res.status(500).send({
      message: "Error retrieving team statistics",
      roomId,
    });
  }
};

const getTeamMembersData = async (req, res) => {
  const { roomId, role } = req.body;

  const currentRole = role;
  if (!roomId) {
    return res.status(400).json({
      success: false,
      message: "Room ID is required",
    });
  }

  try {
    // Query users who belong to the specific room
    const usersQuery = query(
      collection(db, "users"),
      where("roomId", "==", roomId)
    );
    const usersSnapshot = await getDocs(usersQuery);

    // Filter the users to include only those with specific roles or an empty role
    const filteredUsers = usersSnapshot.docs.filter((doc) => {
      const role = doc.data().role;
      return (
        (role === "teammember" || role === "teamleader" || !role) &&
        role != currentRole
      );
    });

    // Map the user documents to a more friendly format
    const teamMembers = filteredUsers.map((doc) => {
      const userData = doc.data();
      return {
        id: doc.id,
        name: userData.fullName,
        email: userData.email,
        role: userData.role,
        cv: userData.cv,
        status: userData.status,
        createdAt: userData.createdAt,
      };
    });

    res.json({
      success: true,
      data: teamMembers,
      message: "Team members data retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving team members data:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving team members data",
      roomId,
    });
  }
};

const updateTeamMemberStatus = async (req, res) => {
  const { memberId } = req.params;
  const { status } = req.body;

  if (!memberId) {
    return res.status(400).json({
      success: false,
      message: "Member ID is required",
    });
  }

  try {
    const userRef = doc(db, "users", memberId);
    await updateDoc(userRef, { status });

    res.json({
      success: true,
      message: `Team member ${
        status ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (error) {
    console.error("Error updating team member status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating team member status",
    });
  }
};

const updateTeamMemberRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_role } = req.body;

    // Validate role
    if (!["teammember", "teamleader"].includes(user_role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Update user role in Firebase
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, { role: user_role });

    res.json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Error updating user role" });
  }
};

module.exports = {
  getTeamStatsByRoom,
  getTeamMembersData,
  updateTeamMemberStatus,
  updateTeamMemberRole,
};
