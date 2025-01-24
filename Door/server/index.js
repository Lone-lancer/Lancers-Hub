require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;

// Import routes
const paymentRoutes = require("./Routes/paymentRoutes");
const authRoutes = require("./Routes/authRoutes");
const officeRoutes = require("./Routes/officeRoutes");
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

// CORS configuration
app.use(
  cors({
    origin: "https://lancers-hub.vercel.app", // Allow requests from your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH" , "DELETE"],
    credentials: true,
  })
);

// Health check route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/manager", managerDashboardRoutes);
app.use("/api/tasks", tasksRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
