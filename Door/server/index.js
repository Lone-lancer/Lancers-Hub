const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;

// Import routes
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");
const officeRoutes = require("./routes/officeRoutes");
const managerDashboardRoutes = require("./Routes/managerDashboardRoute");
const tasksRoutes = require("./Routes/tasksRoutes");
// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(cors());

// Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/manager", managerDashboardRoutes);
app.use("/api/tasks", tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
