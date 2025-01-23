const express = require("express");
const {
  getTeamStatsByRoom,
  getTeamMembersData,
  updateTeamMemberStatus,
  updateTeamMemberRole,
} = require("../Controllers/managerDashboardController");
const tokenParser = require("../utils/tokenParser");
const router = express.Router();
const {
  db,
  collection,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} = require("../firebasedb");
const path = require("path");

router.get("/team-stats", tokenParser, getTeamStatsByRoom);
router.get("/team-members", tokenParser, getTeamMembersData);
router.put("/team-members/:memberId", tokenParser, updateTeamMemberStatus);
router.put("/team-members/:id/role", tokenParser, updateTeamMemberRole);
router.get("/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../public/uploads", fileName);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

// Get all positions
router.get("/positions", tokenParser, async (req, res) => {
  const { roomId } = req.body;
  try {
    const usersQuery = query(
      collection(db, "positions"),
      where("roomId", "==", roomId)
    );
    const positionsSnapshot = await getDocs(usersQuery);

    const positions = positionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ message: "Failed to fetch positions." });
  }
});

// Add a new position
router.post("/positions", tokenParser, async (req, res) => {
  const { positionName, description, roomId } = req.body;

  if (!positionName || !description) {
    return res
      .status(400)
      .json({ message: "Position name and description are required." });
  }

  try {
    const newDoc = await addDoc(collection(db, "positions"), {
      roomId,
      positionName,
      description,
    });

    res.status(201).json({ id: newDoc.id, positionName, description });
  } catch (error) {
    console.error("Error adding position:", error);
    res.status(500).json({ message: "Failed to add position." });
  }
});

// Delete a position
router.delete("/positions/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Position ID is required." });
  }

  try {
    await deleteDoc(doc(db, "positions", id));
    res.status(200).json({ message: "Position deleted successfully." });
  } catch (error) {
    console.error("Error deleting position:", error);
    res.status(500).json({ message: "Failed to delete position." });
  }
});

module.exports = router;
