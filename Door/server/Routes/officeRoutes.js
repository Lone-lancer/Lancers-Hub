const express = require("express");
const router = express.Router();
const {
  getAllOffices,
  updateOfficeStatus,
  getOfficeStats,
  updateOfficeManager,
} = require("../controllers/officeController");

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

router.get("/", getAllOffices);
router.put("/:id", updateOfficeStatus);
router.get("/stats", getOfficeStats);
router.put("/:id/manager", updateOfficeManager);
router.get("/positions/:roomId", async (req, res) => {
  const roomId = req.params.roomId;

  console.log(roomId);
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
});

module.exports = router;
