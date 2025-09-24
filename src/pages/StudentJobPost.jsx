import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
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
    Subject_Id: "", // backward-compat
    Subject_Ids: [],
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

  const [showErrors, setShowErrors] = useState(false);

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      const requiredText = ["Title", "Description", "Duration", "Fee", "Frequency"];
      const okText = requiredText.every((k) => String(job?.[k] ?? "").trim() !== "");
      const okSubjects = Array.isArray(job.Subject_Ids) && job.Subject_Ids.length > 0;
      return okText && okSubjects;
    }
    if (currentStep === 2) {
      const required = ["Date_Of_Birth", "Gender_Id"];
      return required.every((k) => String(userDetails?.[k] ?? "").trim() !== "");
    }
    if (currentStep === 3) {
      const required = ["AddressLine1", "Country_Id", "City_Id", "Postal_Code"];
      return required.every((k) => String(address?.[k] ?? "").trim() !== "");
    }
    if (currentStep === 4) {
      const edu = educationDetails?.[0] || {};
      const required = ["Degree", "Institution", "Start_Year", "End_Year"];
      return required.every((k) => String(edu?.[k] ?? "").trim() !== "");
    }
    return true;
  };

  useEffect(() => {
    if (user?.User_Id) {
      setJob((prev) => ({ ...prev, Student_Id: user.User_Id }));
      setUserDetails((prev) => ({ ...prev, User_Id: user.User_Id }));
    }
  }, [user]);

  // 🔹 Navigation
  const handleNext = () => {
    const valid = validateCurrentStep();
    if (!valid) {
      setShowErrors(true);
      toast.error("Please complete required fields.");
      return;
    }
    setShowErrors(false);
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
      className={`min-h-screen flex items-start justify-center px-3 sm:px-4 py-6 sm:py-8 transition-colors duration-300
        ${theme === "light" ? "bg-gray-50" : "bg-[#0f0e17]"}`}
    >
      <Motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-3xl rounded-2xl shadow-xl p-4 sm:p-6 transition-colors duration-300
          ${theme === "light"
            ? "bg-white/95 backdrop-blur border border-gray-200 text-black"
            : "bg-[#1e1c2e]/90 backdrop-blur border border-gray-700 text-gray-200"
          }`}
      >
        {/* Title & Subtitle */}
        <div className="mb-4 sm:mb-6">
          <h1 className={`text-xl sm:text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Create Student Job Post</h1>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Fill out the steps below to publish your tutoring request.</p>
        </div>

        {/* 🔹 Step Titles */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6 text-xs sm:text-sm font-medium">
          {steps.map((step, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full border transition-colors ${currentStep === index + 1
                  ? (theme === 'light' ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-500 text-white border-orange-500')
                  : (theme === 'light' ? 'bg-gray-100 text-gray-700 border-gray-200' : 'bg-gray-800 text-gray-300 border-gray-700')
                }`}
            >
              {step}
            </span>
          ))}
        </div>

        {/* 🔹 Animated Forms */}
        <Motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {currentStep === 1 && <JobDetailsForm value={job} setJob={setJob} showErrors={showErrors} />}
          {currentStep === 2 && <UserDetailsForm value={userDetails} setUserDetails={setUserDetails} showErrors={showErrors} />}
          {currentStep === 3 && <AddressForm value={address} setAddress={setAddress} showErrors={showErrors} />}
          {currentStep === 4 && (
  <EducationForm
    educationDetails={educationDetails}
    setEducationDetails={setEducationDetails}
  />
)}
        </Motion.div>

        {/* 🔹 Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 gap-3 sm:gap-4">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className={`w-full sm:w-auto px-5 py-2 rounded-lg transition-colors duration-300 shadow-sm
                ${theme === "light"
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-100"
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
      </Motion.div>
    </div>
  );
};

export default StudentJobPost;
