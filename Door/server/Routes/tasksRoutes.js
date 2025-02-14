const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTaskStatus,
  updateTaskAssignee,
} = require("../Controllers/tasksController");
const tokenParser = require("../Utils/tokenParser");

// Get all tasks
router.get("/", tokenParser, getAllTasks);

// Create new task
router.post("/", tokenParser, createTask);

// Update task status (for drag and drop)
router.patch("/:taskId/status", tokenParser, updateTaskStatus);

// Update task assignee
router.patch("/:taskId/assignee", tokenParser, updateTaskAssignee);

module.exports = router;
