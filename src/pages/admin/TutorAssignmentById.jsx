import React, { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, User, BookOpen, Mail, Phone, Clock, ArrowLeft } from "lucide-react";
import { getTutorAssignmentById } from "../../apis/jobrequestsApi";

const TutorAssignmentById = () => {
  const { id } = useParams();
  const { theme } = useOutletContext(); // Theme context
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const data = await getTutorAssignmentById(id);
        setAssignment(data[0]); // response ek array hai
      } catch (error) {
        console.error("Error fetching assignment:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!assignment) {
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-red-600" : "text-red-400"}`}>
        No assignment found ❌
      </p>
    );
  }

  return (
    <div className={`min-h-screen p-6 transition ${theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"}`}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className={`flex items-center gap-2 mb-4 px-4 py-2 rounded-lg font-medium shadow-md transition ${
          theme === "light"
            ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
            : "bg-gray-700 text-orange-300 hover:bg-gray-600"
        }`}
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6">Assignment Details</h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`rounded-2xl shadow-lg overflow-hidden transition ${
          theme === "light"
            ? "bg-white border border-orange-200 hover:shadow-xl"
            : "bg-gray-800 border border-gray-700 hover:shadow-orange-500/20"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen size={22} /> {assignment.job.Title}
          </h2>
          <p className="text-sm text-orange-100">{assignment.job.Description}</p>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Job Details</h3>
            <p className="flex items-center gap-2">
              <Clock size={18} /> Duration: {assignment.job.Duration}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays size={18} /> Frequency: {assignment.job.Frequency}
            </p>
            <p className="flex items-center gap-2">💰 Fee: Rs. {assignment.job.Fee}</p>
          </div>

          {/* Tutor Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Tutor Info</h3>
            <p className="flex items-center gap-2">
              <User size={18} /> {assignment.tutor.First_Name} {assignment.tutor.Last_Name}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} /> {assignment.tutor.Email}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} /> {assignment.tutor.Phone_Number}
            </p>
          </div>

          {/* Student Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Student Info</h3>
            <p className="flex items-center gap-2">
              <User size={18} /> {assignment.student.First_Name} {assignment.student.Last_Name}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} /> {assignment.student.Email}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} /> {assignment.student.Phone_Number}
            </p>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Assignment Status</h3>
            <p
              className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
                assignment.assignmentStatus.Status_Code === "ACTIVE"
                  ? "bg-green-500 text-white"
                  : "bg-red-400 text-white"
              }`}
            >
              {assignment.assignmentStatus.Description}
            </p>
            <p>Start: {new Date(assignment.Start_Date).toLocaleDateString()}</p>
            <p>End: {new Date(assignment.End_Date).toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TutorAssignmentById;
