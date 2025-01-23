import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Col, Row, Dropdown } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import config from "../../config";
import { format } from "date-fns";

// Add at the top of your file
const API_URL = `${config.API_URL}/api`;

// Add these new constants after PRIORITIES
const PRIORITIES = {
  HIGH: {
    label: "High",
    color: "#dc3545", // Red
  },
  MEDIUM: {
    label: "Medium",
    color: "#ffc107", // Yellow
  },
  LOW: {
    label: "Low",
    color: "#28a745", // Green
  },
};

const columnStyles = {
  todo: { backgroundColor: "#e6f7ff" }, // Light blue
  inProgress: { backgroundColor: "#fff7e6" }, // Light orange
  done: { backgroundColor: "#f6ffed" }, // Light green
};

const columnTitles = {
  todo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};

const TeamLeaderTask = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    deadline: new Date().toISOString(),
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Add useEffect to fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add this useEffect after the existing useEffect for fetching tasks
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${API_URL}/manager/team-members`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        const activeMembers = data.data
          .filter((member) => member.status)
          .map((member) => ({
            id: member.id,
            name: member.name,
          }));
        setTeamMembers(activeMembers);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  // Add new useEffect to fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setCurrentUser(data.user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceList = tasks[result.source.droppableId];
    const taskToMove = sourceList[result.source.index];

    // Check if task is assigned to current user
    if (
      !taskToMove.assignee ||
      taskToMove.assignee.name !== currentUser?.fullName
    ) {
      // If not assigned to current user, don't allow the move
      return;
    }

    try {
      const [movedTask] = sourceList.splice(result.source.index, 1);
      const destinationList = tasks[result.destination.droppableId];
      destinationList.splice(result.destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [result.source.droppableId]: sourceList,
        [result.destination.droppableId]: destinationList,
      });

      await fetch(`${API_URL}/tasks/${movedTask.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: result.destination.droppableId }),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAssignUser = async (taskId, user) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}/assignee`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ assignee: user }),
      });

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        Object.keys(newTasks).forEach((status) => {
          newTasks[status] = newTasks[status].map((task) =>
            task.id === taskId ? { ...task, assignee: user } : task
          );
        });
        return newTasks;
      });
    } catch (error) {
      console.error("Error assigning user:", error);
    }
  };

  const handleCreateTask = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTask),
      });
      const createdTask = await response.json();

      setTasks((prev) => ({
        ...prev,
        todo: [...prev.todo, createdTask],
      }));

      setNewTask({
        title: "",
        description: "",
        priority: "MEDIUM",
        deadline: new Date().toISOString(),
      });
      setShowNewTaskModal(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const isDeadlineNear = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isDeadlinePassed = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="p-4">
      <Button
        variant="primary"
        className="mb-4"
        onClick={() => setShowNewTaskModal(true)}
      >
        Create New Task
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row className="g-4">
          {Object.entries(tasks).map(([status, taskList]) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <Col ref={provided.innerRef} {...provided.droppableProps}>
                  <Card className="shadow-sm">
                    <Card.Header style={columnStyles[status]} className="py-3">
                      <h9 className="m-0 fw-bold">{columnTitles[status]}</h9>
                    </Card.Header>
                    <Card.Body className="bg-light space-y-4">
                      {taskList.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
                            >
                              <div className="d-flex justify-content-between align-items-start">
                                <div onClick={() => handleTaskClick(task)}>
                                  <div className="d-flex align-items-center gap-2">
                                    <h6 className="font-medium text-md text-gray-800 mb-0">
                                      {task.title}
                                    </h6>
                                    <span
                                      className="badge"
                                      style={{
                                        backgroundColor:
                                          PRIORITIES[task.priority]?.color ||
                                          PRIORITIES.MEDIUM.color,
                                        color: "white",
                                        fontSize: "0.8em",
                                      }}
                                    >
                                      {PRIORITIES[task.priority]?.label ||
                                        PRIORITIES.MEDIUM.label}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {task.description}
                                  </p>
                                  <div className="mt-2">
                                    <span
                                      className={`badge ${
                                        isDeadlinePassed(task.deadline)
                                          ? "bg-danger"
                                          : isDeadlineNear(task.deadline)
                                          ? "bg-warning"
                                          : "bg-info"
                                      }`}
                                    >
                                      Due:{" "}
                                      {format(
                                        new Date(task.deadline),
                                        "MMM dd, yyyy"
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <Dropdown onClick={(e) => e.stopPropagation()}>
                                  <Dropdown.Toggle variant="light" size="sm">
                                    {task.assignee
                                      ? task.assignee.name
                                      : "Assign"}
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    {teamMembers.map((member) => (
                                      <Dropdown.Item
                                        key={member.id}
                                        onClick={() =>
                                          handleAssignUser(task.id, member)
                                        }
                                      >
                                        {member.name}
                                      </Dropdown.Item>
                                    ))}
                                    {task.assignee && (
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleAssignUser(task.id, null)
                                        }
                                        className="text-danger"
                                      >
                                        Unassign
                                      </Dropdown.Item>
                                    )}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Droppable>
          ))}
        </Row>
      </DragDropContext>

      {selectedTask && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTask.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedTask.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showNewTaskModal} onHide={() => setShowNewTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={3}
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, priority: e.target.value }))
              }
            >
              {Object.entries(PRIORITIES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Deadline</label>
            <input
              type="date"
              className="form-control"
              value={newTask.deadline.split("T")[0]}
              onChange={(e) =>
                setNewTask((prev) => ({
                  ...prev,
                  deadline: new Date(e.target.value).toISOString(),
                }))
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowNewTaskModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeamLeaderTask;
