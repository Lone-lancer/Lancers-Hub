// ... existing code ...
const nodemailer = require("nodemailer"); // Add nodemailer for sending emails
let otpStore = {}; // Temporary storage for OTPs
const {
  db,
  collection,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
} = require("../firebasedb");

// Function to send OTP
const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER, // Your email
      pass: process.env.NODEMAILER_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log(info);
};

// New verify route
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (email) {
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
    const id = userSnapshot.docs[0].id;
    const userRef = doc(db, "users", id);

    if (userData.otp == otp) {
      await updateDoc(userRef, { verified: 1 });
      return res.status(200).send({ message: "OTP verified successfully." });
    } else {
      return res.status(400).send({ message: "Invalid or expired OTP." });
    }
  } else {
    return res.status(400).send({ message: "Invalid or expired OTP." });
  }
};

const verifyUser = (req, res, next) => {
  const { email } = req.body;

  // Query Firebase for the user
  const userQuery = query(collection(db, "users"), where("email", "==", email));

  getDocs(userQuery)
    .then((userSnapshot) => {
      if (userSnapshot.empty) {
        return res.status(404).send({ message: "User not found." });
      }

      const userData = userSnapshot.docs[0].data();
      if (userData.verified !== 1) {
        // Check if user is verified
        return res.status(403).send({ message: "User is not verified." });
      }

      next(); // Proceed to the next middleware or route handler
    })
    .catch((error) => {
      console.error("Error verifying user:", error);
      res.status(500).send({ message: "Error verifying user" });
    });
};

// ... existing code ...

module.exports = {
  verifyUser, // Export the middleware
  verifyOtp,
  sendOtp,
};
