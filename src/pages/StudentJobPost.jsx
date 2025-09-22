import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { postJobApi } from "../apis/jobApi";
import JobDetailsForm from "./JobDetailsForm";
import UserDetailsForm from "./UserDetailsForm";
import AddressForm from "./AddressForm";
import EducationForm from "./EducationForm";
import Loader from "../components/UI/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import toast from "react-hot-toast";

const steps = ["Job Details", "User Details", "Address", "Education"];

const StudentJobPost = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ using global theme

  // 🔹 States
  const [job, setJob] = useState({
    Student_Id: null,
    Subject_Id: "",
    Title: "",
    Description: "",
    Duration: "",
    Fee: "",
    Frequency: "",
  });

  const [userDetails, setUserDetails] = useState({
    User_Id: null,
    Date_Of_Birth: "",
    Gender_Id: "",
    Additional_Info: "",
    Description: "",
    Profile_Picture: null,
  });

  const [address, setAddress] = useState({
    AddressLine1: "",
    AddressLine2: "",
    City_Id: "",
    Country_Id: "",
    Postal_Code: "",
    Latitude: "",
    Longitude: "",
  });

  const [educationDetails, setEducationDetails] = useState([
    { Degree: "", Institution: "", Start_Year: "", End_Year: "", Grade: "" },
  ]);

  useEffect(() => {
    if (user?.User_Id) {
      setJob((prev) => ({ ...prev, Student_Id: user.User_Id }));
      setUserDetails((prev) => ({ ...prev, User_Id: user.User_Id }));
    }
  }, [user]);

  // 🔹 Navigation
  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // 🔹 Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: postJobApi,
    onSuccess: (data) => {
      toast.success("Job posted successfully!");
      navigate("/app");
      console.log("Response:", data);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!job.Student_Id) {
      alert("Student Id not found, please login again");
      return;
    }
    const payload = { job, userDetails, address, educationDetails };
    console.log("Final Payload:", payload);
    mutate(payload);
  };

  if (isPending) return <Loader />;
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.response?.data?.message || error.message}
      </div>
    );

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-300
        ${theme === "light" ? "bg-gray-50" : "bg-[#12101c]"}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-3xl rounded-2xl shadow-xl p-6 transition-colors duration-300
          ${theme === "light"
            ? "bg-white border border-gray-200 text-black"
            : "bg-[#1e1c2e] border border-gray-700 text-gray-200"
          }`}
      >
        {/* 🔹 Step Titles */}
        <div className="flex justify-between mb-6 text-sm sm:text-base font-medium">
          {steps.map((step, index) => (
            <span
              key={index}
              className={`transition-colors ${currentStep === index + 1
                  ? "text-orange-500 font-semibold"
                  : theme === "light"
                    ? "text-gray-500"
                    : "text-gray-400"
                }`}
            >
              {step}
            </span>
          ))}
        </div>

        {/* 🔹 Animated Forms */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {currentStep === 1 && <JobDetailsForm setJob={setJob} />}
          {currentStep === 2 && <UserDetailsForm setUserDetails={setUserDetails} />}
          {currentStep === 3 && <AddressForm setAddress={setAddress} />}
          {currentStep === 4 && (
            <EducationForm setEducationDetails={setEducationDetails} />
          )}
        </motion.div>

        {/* 🔹 Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
          <button
            onClick={() => navigate("/app")}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300"
          >
            Go Home
          </button>

          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className={`w-full sm:w-auto px-5 py-2 rounded-lg transition-colors duration-300
                ${theme === "light"
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-200"
                }`}
            >
              Back
            </button>
          )}

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-colors duration-300 shadow-md"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 shadow-md"
            >
              Submit
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentJobPost;
