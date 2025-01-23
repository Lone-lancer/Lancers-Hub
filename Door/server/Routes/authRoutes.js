const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { register, login, profile } = require("../controllers/authController");
const tokenParser = require("../utils/tokenParser");
const { verifyOtp } = require("../middleware/verification");
const {
  db,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} = require("../firebasedb");
const jwt = require("jsonwebtoken");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("profile"), (req, res) => {
  const filePath = req.file ? req.file.filename : null;
  register(req, res, filePath);
});
router.post("/login", login);
router.get("/profile", tokenParser, profile);
router.post("/verify/email", verifyOtp);
router.post("/validate/token", tokenParser, (req, res) => {
  res.status(200).json({ message: "Valid token" });
});
router.post("/refresh/token", async (req, res) => {
  const { refreshToken } = req.body; // Get refresh token from request body

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const email = decoded.email;
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(404).send({ message: "User not found." });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    const newAccessToken = jwt.sign(
      { uid: user.id, email, role: user.role, roomId: user.roomId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await updateDoc(doc(db, "users", userDoc.id), {
      accessToken: newAccessToken,
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
});

module.exports = router;
