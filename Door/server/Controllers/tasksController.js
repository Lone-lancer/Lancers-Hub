const {
  doc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  addDoc,
  db,
} = require("../firebasedb");

const getAllTasks = async (req, res) => {
  try {
    const { roomId } = req.body;
    const tasksSnapshot = await getDocs(
      collection(db, "rooms", roomId, "tasks")
    );
    const tasks = {
      todo: [],
      inProgress: [],
      done: [],
    };

    tasksSnapshot.forEach((doc) => {
      const task = { id: doc.id, ...doc.data() };
      tasks[task.status].push(task);
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { roomId, title, description, priority, deadline } = req.body;
    const newTask = {
      title,
      description,
      priority,
      deadline,
      assignee: null,
      status: "todo",
      createdAt: new Date(),
      roomId,
    };

    const docRef = await addDoc(
      collection(db, "rooms", roomId, "tasks"),
      newTask
    );
    res.status(201).json({ id: docRef.id, ...newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { roomId, status } = req.body;

    const taskRef = doc(db, "rooms", roomId, "tasks", taskId);
    await updateDoc(taskRef, { status });
    res.json({ message: "Task status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskAssignee = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { roomId, assignee } = req.body;

    const taskRef = doc(db, "rooms", roomId, "tasks", taskId);
    await updateDoc(taskRef, { assignee });
    res.json({ message: "Task assignee updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  updateTaskAssignee,
};
