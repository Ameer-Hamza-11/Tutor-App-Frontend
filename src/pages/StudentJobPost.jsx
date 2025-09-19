import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, User, MapPin, BookOpen } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { postJobApi } from "../apis/jobApi";

import JobDetailsForm from "./JobDetailsForm";
import UserDetailsForm from "./UserDetailsForm";
import AddressForm from "./AddressForm";
import EducationForm from "./EducationForm";
import Loader from "../components/UI/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const steps = [
  { id: 1, title: "Job Details", icon: <ClipboardList size={20} /> },
  { id: 2, title: "User Details", icon: <User size={20} /> },
  { id: 3, title: "Address", icon: <MapPin size={20} /> },
  { id: 4, title: "Education", icon: <BookOpen size={20} /> },
];

const StudentJobPost = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

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

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: postJobApi,
    onSuccess: (data) => {
      alert("Job posted successfully!");
      navigate("/app");
      console.log("Response:", data);
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Something went wrong");
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#0e0c1c] transition-colors duration-300">
      <div className="w-full max-w-4xl rounded-2xl shadow-2xl p-8 bg-white dark:bg-[#1e1c2e] transition-colors duration-300">
        {/* Stepper */}
        <div className="flex flex-col sm:flex-row sm:justify-between mb-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative sm:flex-1">
              {index > 0 && (
                <>
                  <div
                    className={`sm:hidden absolute -top-6 left-1/2 w-0.5 h-6 transform -translate-x-1/2 ${
                      currentStep > index ? "bg-gradient-to-b from-pink-500 to-purple-600" : "bg-gray-400 dark:bg-gray-600"
                    }`}
                  />
                  <div
                    className={`hidden sm:block absolute top-5 left-0 w-full h-0.5 ${
                      currentStep > index ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-gray-400 dark:bg-gray-600"
                    }`}
                  />
                </>
              )}
              <div
                className={`p-4 rounded-full transition-transform ${
                  currentStep === step.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 scale-110"
                    : "bg-gray-200 dark:bg-[#2a2640]"
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`mt-2 text-sm sm:text-base font-medium ${
                  currentStep === step.id ? "text-pink-500 dark:text-pink-400" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Animated Forms */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {currentStep === 1 && <JobDetailsForm setJob={setJob} />}
          {currentStep === 2 && <UserDetailsForm setUserDetails={setUserDetails} />}
          {currentStep === 3 && <AddressForm setAddress={setAddress} />}
          {currentStep === 4 && <EducationForm setEducationDetails={setEducationDetails} />}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-10 gap-4">
          {/* Go Home */}
          <button
            onClick={() => navigate("/app")}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
          >
            Go Home
          </button>

          {/* Back */}
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              Back
            </button>
          )}

          {/* Next / Submit */}
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-8 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transition-colors duration-300 shadow-lg"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-8 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 shadow-lg"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentJobPost;
