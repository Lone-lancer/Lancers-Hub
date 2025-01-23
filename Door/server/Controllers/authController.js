const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
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
const { sendOtp } = require("../middleware/verification");

const JWT_SECRET = "your_secret_key"; // Move to environment variables
let otpStore = {};

const register = async (req, res, filePath) => {
  const {
    roomId,
    fullName,
    email,
    password,
    phoneNumber,
    address,
    jobTitle,
    department,
    dateOfBirth,
    highestDegree,
    institutionName,
    graduationYear,
  } = req.body;

  // Validate required fields
  if (!roomId) {
    return res.status(400).send({ message: "Room ID is required" });
  }

  const uid = uuidv4();

  try {
    // Check if room exists
    const officeQuery = query(
      collection(db, "offices"),
      where("roomId", "==", roomId)
    );
    const officeSnapshot = await getDocs(officeQuery);

    if (officeSnapshot.empty) {
      return res.status(404).send({ message: "Invalid Room ID" });
    }

    // Check if user exists
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const existingUserSnapshot = await getDocs(userQuery);

    if (!existingUserSnapshot.empty) {
      return res.status(400).send({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const officeData = officeSnapshot.docs[0].data();

    const usersRef = doc(db, "users", "user" + uid);
    const teamMembersRef = doc(db, "teamMembers", "team" + uid);
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Create user document
    await setDoc(usersRef, {
      fullName,
      email,
      password: hashedPassword,
      roomId: roomId,
      phoneNumber,
      address,
      jobTitle,
      department,
      dateOfBirth,
      highestDegree,
      institutionName,
      graduationYear,
      status: 0,
      verified: 0,
      otp,
      organizationName: officeData.organizationName,
      cv: filePath,
      createdAt: new Date(),
    });

    // Create team member document
    await setDoc(teamMembersRef, {
      fullName,
      email,
      roomId: roomId,
      phoneNumber,
      address,
      jobTitle,
      department,
      dateOfBirth,
      highestDegree,
      institutionName,
      graduationYear,
      status: 0,
      organizationName: officeData.organizationName,
      profileImage: filePath,
      createdAt: new Date(),
    });

    await sendOtp(email, otp);

    res.status(200).send({
      status: 200,
      message: "Team member registered successfully",
    });
  } catch (error) {
    console.error("Error registering team member:", error);
    res.status(500).send({ message: "Error registering team member" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials." });
    }

    if (user.verified == 0) {
      return res.status(200).send({
        status: 403,
        message: "Verify your email",
      });
    }
    if (user.status == 0) {
      return res.status(401).send({ message: "Your account is not activated" });
    }
    if (!user.role) {
      return res.status(401).send({
        message: "You don't have a role. Ask your manager.",
      });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { uid: user.id, email, role: user.role, roomId: user.roomId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { uid: user.id, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Save access and refresh tokens in the database
    await updateDoc(doc(db, "users", userDoc.id), {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    res.status(200).send({
      status: 200,
      message: "Login successful",
      token: accessToken,
      refreshToken: refreshToken,
      role: user.role,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send({ message: "Error logging in user" });
  }
};

const profile = async (req, res) => {
  try {
    const { email, role, roomId } = req.body;

    // Query Firebase for the user
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userData = userSnapshot.docs[0].data();

    // Return user data (excluding sensitive information)
    return res.json({
      success: true,
      user: {
        fullName: userData.fullName,
        email: userData.email,
        avatar: userData.avatar,
        organizationName: userData.organizationName,
        role: userData.role,
        roomId: userData.roomId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving user profile",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  profile,
};
