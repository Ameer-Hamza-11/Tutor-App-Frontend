import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllAssignedJobsApi } from "../../apis/jobrequestsApi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Briefcase, ArrowRight, Clock } from "lucide-react";

const TutorAssignments = () => {
  const { theme } = useOutletContext();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tutorAssignments"],
    queryFn: getAllAssignedJobsApi,
  });

  if (isLoading)
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-orange-600" : "text-orange-400"}`}>
        Loading Tutor Assignments...
      </p>
    );

  if (isError)
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-red-600" : "text-red-400"}`}>
        Error loading assignments ❌
      </p>
    );

  if (!data || data.length === 0)
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
        No assignments found
      </p>
    );

  return (
    <div className={`min-h-screen p-6 transition ${theme === "light" ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-gray-100"}`}>
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6">Tutor Assignments</h1>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full border-collapse rounded-xl shadow-lg">
          <thead className={`${theme === "light" ? "bg-orange-50 text-orange-700" : "bg-gray-800 text-gray-300"}`}>
            <tr>
              <th className="py-2 px-4 text-left">Job</th>
              <th className="py-2 px-4 text-left">Tutor</th>
              <th className="py-2 px-4 text-left">Student</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Duration</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <motion.tbody layout>
            {data.map((assignment) => {
              const start = new Date(assignment.Start_Date);
              const end = new Date(assignment.End_Date);
              return (
                <motion.tr
                  key={assignment.Assignment_Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`border-t transition ${
                    theme === "light"
                      ? "border-orange-200 hover:bg-orange-50"
                      : "border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <td className="py-2 px-4">{assignment.job?.Title}</td>
                  <td className="py-2 px-4">{assignment.tutor?.First_Name} {assignment.tutor?.Last_Name}</td>
                  <td className="py-2 px-4">{assignment.student?.First_Name} {assignment.student?.Last_Name}</td>
                  <td className="py-2 px-4">{start.toLocaleDateString()} → {end.toLocaleDateString()}</td>
                  <td className="py-2 px-4">{assignment.job?.Duration}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        assignment.assignmentStatus?.Status_Code === "ACTIVE"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {assignment.assignmentStatus?.Description}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => navigate(`/admin/tutorAssignments/${assignment.Assignment_Id}`)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md font-medium transition ${
                        theme === "light"
                          ? "bg-orange-600 text-white hover:bg-orange-700"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      View <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-6 md:hidden mt-4">
        {data.map((assignment) => {
          const start = new Date(assignment.Start_Date);
          const end = new Date(assignment.End_Date);
          return (
            <motion.div
              key={assignment.Assignment_Id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-4 rounded-xl shadow-md border transition ${
                theme === "light"
                  ? "bg-orange-50 border-orange-200 hover:shadow-xl"
                  : "bg-gray-800 border-gray-700 hover:shadow-gray-600/40"
              }`}
            >
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-500" /> {assignment.job?.Title}
              </h2>
              <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">{assignment.job?.Description}</p>
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-500" /> Tutor: {assignment.tutor?.First_Name} {assignment.tutor?.Last_Name}
              </p>
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-green-500" /> Student: {assignment.student?.First_Name} {assignment.student?.Last_Name}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-500" /> {start.toLocaleDateString()} → {end.toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" /> Duration: {assignment.job?.Duration}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    assignment.assignmentStatus?.Status_Code === "ACTIVE"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {assignment.assignmentStatus?.Description}
                </span>
              </p>
              <button
                onClick={() => navigate(`/admin/tutorAssignments/${assignment.Assignment_Id}`)}
                className={`mt-3 flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg font-medium shadow-md transition ${
                  theme === "light"
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                View More <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorAssignments;
