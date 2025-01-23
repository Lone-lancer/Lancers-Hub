const axios = require("axios");
const jwt = require("jsonwebtoken");
const { baseURL, frontendUrl } = require("../Utils/constant");
const {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  db,
  deleteDoc,
} = require("../firebasedb");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { sendOtp } = require("../middleware/verification");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CHAPA_AUTH}`,
  },
};

const JWT_SECRET = process.env.JWT_SECRET; // Ensure you have a secret for JWT

// Initial payment endpoint handler
exports.initializePayment = async (req, res) => {
  const {
    amount,
    email,
    firstName,
    lastName,
    officeId,
    currency,
    password,
    avatar,
    organizationName,
    role,
    phoneNumber,
    address,
    jobTitle,
    department,
    dateOfBirth,
    profile,
    highestDegree,
    institutionName,
    graduationYear,
  } = req.body;

  // Store registration data in a more persistent way
  const registrationData = {
    email,
    password,
    fullName: firstName + " " + lastName,
    avatar,
    organizationName,
    role,
    phoneNumber,
    address,
    jobTitle,
    department,
    dateOfBirth,
    profile,
    highestDegree,
    institutionName,
    graduationYear,
  };

  const CALLBACK_URL = `${baseURL}/api/payment/verify-payment/`;
  const RETURN_URL = `${baseURL}/api/payment/verify-payment/`;
  const TEXT_REF = "tx-myecommerce12345-" + Date.now();

  // Store the registration data in the database temporarily
  const tempDataRef = doc(db, "tempRegistrations", TEXT_REF);
  await setDoc(tempDataRef, registrationData);

  const data = {
    amount,
    currency,
    email,
    firstName,
    lastName,
    tx_ref: TEXT_REF,

    return_url: RETURN_URL + TEXT_REF + `?officeid=${officeId}`,
    officeId: officeId,
  };

  try {
    const response = await axios.post(process.env.CHAPA_URL, data, config);
    res.json({ checkout_url: response.data.data.checkout_url });
  } catch (err) {
    console.error(
      "Error initializing payment:",
      err.response ? err.response.data : err.message
    );
    res.status(500).send("Error initializing payment");
  }
};

// Verification endpoint handler
exports.verifyPayment = async (req, res) => {
  const TEXT_REF = req.params.id;
  const tempDataRef = doc(db, "tempRegistrations", TEXT_REF);

  try {
    const tempDataSnap = await getDoc(tempDataRef);
    if (!tempDataSnap.exists()) {
      return res.status(400).send({ message: "Registration data not found" });
    }

    const registrationData = tempDataSnap.data();
    const {
      email,
      password,
      fullName,
      avatar,
      organizationName,
      role,
      phoneNumber,
      address,
      jobTitle,
      department,
      dateOfBirth,
      profile,
      highestDegree,
      institutionName,
      graduationYear,
    } = registrationData;

    // First, verify the payment
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${TEXT_REF}`,
      config
    );

    const paymentData = response.data.data;

    // Check payment status first
    if (paymentData.status !== "success") {
      // Store failed transaction
      await setDoc(doc(db, "transactions", "txn-" + uuidv4()), {
        userId: uuidv4(),
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: "failed",
        paymentMethod: "chapa",
        transactionRef: TEXT_REF,
        createdAt: new Date(),
        metadata: paymentData,
      });

      // Clean up temp data even if payment failed
      await deleteDoc(tempDataRef);
      return res.redirect(`${frontendUrl}/payment/failed`);
    }

    // Check if the transaction has already been processed
    const existingTransactionSnap = await getDoc(
      doc(db, "transactions", TEXT_REF)
    );
    if (existingTransactionSnap.exists()) {
      return res.redirect(
        `${frontendUrl}/payment/success?token=${
          existingTransactionSnap.data().token
        }`
      );
    }

    // // Single user existence check
    console.log("Checking for existing user with email:", email);
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email.trim().toLowerCase())
    );

    const existingUserSnapshot = await getDocs(userQuery);

    if (!existingUserSnapshot.empty) {
      console.log("User exists with email:", email);
      await deleteDoc(tempDataRef);
      return res.redirect(`${frontendUrl}/payment/failed?error=user_exists`);
    }

    // Continue with user creation if user doesn't exist
    const uid = uuidv4();
    const RoomId = "room-" + uuidv4();
    const transactionId = "txn-" + uuidv4();

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const usersRef = doc(db, "users", uid);
    const officesRef = doc(db, "offices", uid);
    const managersRef = doc(db, "officeManagers", uid);
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Store user details in Firestore
    await setDoc(officesRef, {
      roomId: RoomId,
      status: 0,
      organizationName,
      managerId: uid,
      managerName: fullName,
      createdAt: new Date(),
    });

    await setDoc(usersRef, {
      fullName,
      email,
      password: hashedPassword,
      avatar,
      roomId: RoomId,
      status: 0,
      organizationName,
      role,
      createdAt: new Date(),
      phoneNumber,
      address,
      jobTitle,
      department,
      dateOfBirth,
      verified: 0,
      otp,
      profile,
      highestDegree,
      institutionName,
      graduationYear,
    });

    if (role == "manager") {
      await setDoc(managersRef, {
        fullName,
        email,
        avatar,
        roomId: RoomId,
        status: 0,
        organizationName,
        role,
        officeExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        phoneNumber,
        address,
        jobTitle,
        department,
        dateOfBirth,
        profile,
        highestDegree,
        institutionName,
        graduationYear,
      });
    }

    await sendOtp(email, otp);

    // Generate a JWT token for the registered user
    const token = jwt.sign({ uid, email, roomId: RoomId, role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    await setDoc(doc(db, "transactions", uid), {
      userId: uid,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: "success",
      paymentMethod: "chapa",
      transactionRef: TEXT_REF,
      createdAt: new Date(),
      metadata: paymentData,
      organizationName,
      RoomId,
      token, // Store the token for future reference
    });

    // Clean up temporary registration data
    await deleteDoc(tempDataRef);

    return res.redirect(`${frontendUrl}/payment/success?token=${token}`);
  } catch (err) {
    await deleteDoc(tempDataRef);
    console.error("Error in verification process:", err);
    return res.status(500).send("Error verifying payment");
  }
};

// Success endpoint handler
exports.paymentSuccess = (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { gigId, success, txRef } = decoded;

    // Redirect to the detail page with success parameter
    res.redirect(
      `${frontendUrl}/gig/detail/${gigId}?success=${success}&txRef=${txRef}`
    );
  } catch (err) {
    console.error("Invalid token", err);
    res.status(500).send("Invalid token");
  }
};
