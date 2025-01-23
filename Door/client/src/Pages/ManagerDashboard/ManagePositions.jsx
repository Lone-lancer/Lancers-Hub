import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import config from "../../config";

const ManagePositions = () => {
  const [formData, setFormData] = useState({
    positionName: "",
    description: "",
  });

  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to get the token
  const getToken = () => {
    return localStorage.getItem("token"); // Adjust the key if your token is stored under a different name
  };

  // Fetch all positions from the backend
  const fetchPositions = async () => {
    try {
      const token = getToken();
      const response = await fetch(
        `${config.API_URL}/api/manager/positions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch positions");

      const data = await response.json();
      setPositions(data);
    } catch (error) {
      console.error("Error fetching positions:", error);
      toast.error("Failed to fetch positions.");
    }
  };

  useEffect(() => {
    fetchPositions(); // Fetch positions on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = getToken();
      const response = await fetch(
        `${config.API_URL}/api/manager/positions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        toast.success("Position added successfully!");
        setFormData({ positionName: "", description: "" }); // Reset the form
        fetchPositions(); // Refresh the list
      } else {
        toast.error("Failed to add the position.");
      }
    } catch (error) {
      console.error("Error adding position:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this position?"))
      return;

    try {
      const token = getToken();
      const response = await fetch(
        `${config.API_URL}/api/manager/positions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Position deleted successfully!");
        fetchPositions(); // Refresh the list
      } else {
        toast.error("Failed to delete the position.");
      }
    } catch (error) {
      console.error("Error deleting position:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Add Position
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="positionName"
              className="block text-sm font-medium text-gray-600"
            >
              Position Name
            </label>
            <input
              type="text"
              id="positionName"
              name="positionName"
              value={formData.positionName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter position name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter position description"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Adding..." : "Add Position"}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Positions</h2>
        {positions?.length === 0 ? (
          <p className="text-gray-600">No positions available.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {positions?.map((position) => (
              <li
                key={position.id}
                className="flex justify-between items-center py-4"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {position.positionName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {position.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(position.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManagePositions;
