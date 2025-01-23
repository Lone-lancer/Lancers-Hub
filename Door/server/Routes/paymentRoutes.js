// routes/paymentRoutes.js
const express = require("express");
const {
  initializePayment,
  verifyPayment,
  paymentSuccess,
} = require("../Controllers/paymentController");
const router = express.Router();

router.post("/pay", initializePayment);
router.get("/verify-payment/:id", verifyPayment);
router.get("/success", paymentSuccess);

module.exports = router;
