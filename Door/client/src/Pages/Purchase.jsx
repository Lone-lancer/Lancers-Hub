import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { toast } from "react-toastify";

import Adam from "../assets/images/Adam_login.png";
import Ash from "../assets/images/Ash_login.png";
import Lucy from "../assets/images/Lucy_login.png";
import Nancy from "../assets/images/Nancy_login.png";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Landing/Header";
import Footer from "../Components/Landing/Footer";

// Update the avatars array with the new images
const avatars = [
  { name: "Adam", img: Adam },
  { name: "Ash", img: Ash },
  { name: "Lucy", img: Lucy },
  { name: "Nancy", img: Nancy },
];

// Shuffle the avatars array
for (let i = avatars.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [avatars[i], avatars[j]] = [avatars[j], avatars[i]];
}

const Purchase = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
    phoneNumber: "",
    address: "",
    jobTitle: "",
    department: "",
    dateOfBirth: "",
    profile: null,
    highestDegree: "",
    institutionName: "",
    graduationYear: "",
  });
  const [avatarIndex, setAvatarIndex] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile: e.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Debugging: Log the values before submission
    console.log("Submitting form with values:", {
      ...formData,
      role: "manager",
      avatar: avatars[avatarIndex].name,
    });

    try {
      const response = await fetch("http://localhost:4000/api/payment/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          officeId: 1,
          amount: 2000,
          currency: "ETB",
          role: "manager",
          avatar: avatars[avatarIndex].name,
        }),
      });

      const data = await response.json();
      console.log("Payment response:", data);

      if (response.status === 200 && data.checkout_url) {
        setTimeout(() => {
          window.location.href = data.checkout_url;
        }, 100);
      } else {
        const errorMessage =
          data.message || "Failed to initiate payment. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        "Unable to process payment request. Please check your connection and try again."
      );
    }
  };

  return (
    <div>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center pt-[100px] justify-center h-screen bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl mb-4">Purchase Office</h1>
        <div className="flex mb-6 items-center">
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <TextField
                fullWidth
                label="Organization Name"
                variant="outlined"
                color="secondary"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                color="secondary"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                color="secondary"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                color="secondary"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                color="secondary"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                color="secondary"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                color="secondary"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Job Title"
                variant="outlined"
                color="secondary"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Department"
                variant="outlined"
                color="secondary"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Date of Birth"
                variant="outlined"
                color="secondary"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Highest Degree"
                variant="outlined"
                color="secondary"
                name="highestDegree"
                value={formData.highestDegree}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Institution Name"
                variant="outlined"
                color="secondary"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Graduation Year"
                variant="outlined"
                color="secondary"
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                required
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className="mt-4 transition duration-300"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Purchase;
