import React, { useEffect, useState } from "react";
import Header from "../Components/Landing/Header";
import Footer from "../Components/Landing/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (data.status === 403) {
        navigate("/verify-email");
        return;
      }

      const { token, role, refreshToken } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("refreshToken", refreshToken);
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "manager") {
        navigate("/manager/dashboard");
      } else if (role === "teamleader") {
        navigate("/teamleader/dashboard");
      } else if (role === "teammember") {
        navigate("/teammember/dashboard");
      }
      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error(error + "");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const { role } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "teamleader") {
        navigate("/teamleader/dashboard");
      } else if (role === "teammember") {
        navigate("/teammember/dashboard");
      } else if (role === "manager") {
        navigate("/manager/dashboard");
      }
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className=" p-8 rounded-lg shadow-lg w-96">
          <h1 className=" mb-6 text-center">Login</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium ">
                Email:
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border  rounded-md focus:outline-none focus:ring focus:ring-landingPageInputFocusColor"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium ">
                Password:
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border  rounded-md focus:outline-none focus:ring focus:ring-landingPageInputFocusColor"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-md hover:bg-landingPageButtonHoverColor transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
