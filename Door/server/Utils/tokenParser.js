const jwt = require("jsonwebtoken");
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

const tokenParser = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    // Extract the token (remove 'Bearer ' from the string)
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userQuery = query(
      collection(db, "users"),
      where("email", "==", decoded.email)
    );
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(404).send({ message: "User not found." });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    // Compare the token with the stored access token
    if (user.accessToken !== token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Add the email, role, and roomId to the request object
    req.body.email = decoded.email;
    req.body.role = decoded.role;
    req.body.roomId = decoded.roomId;
    next();
  } catch (error) {
    console.error("Error in token parser middleware:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = tokenParser;
