import React from "react";
import { motion } from "framer-motion";
import { Briefcase, User, Calendar, Clock, DollarSign, CheckCircle, Eye } from "lucide-react";
import { NavLink, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllJobRequestApi } from "../../apis/jobrequestsApi";

const JobRequests = () => {
  const { theme } = useOutletContext();

  const { data: jobRequests, isLoading, isError } = useQuery({
    queryKey: ["jobRequests"],
    queryFn: getAllJobRequestApi,
  });

  if (isLoading)
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-indigo-600" : "text-indigo-400"}`}>
        Loading job requests...
      </p>
    );

  if (isError)
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-red-600" : "text-red-400"}`}>
        Failed to load job requests ❌
      </p>
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Job Requests</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and review student job requests</p>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobRequests?.map((req, index) => (
          <motion.div
            key={req.Request_Id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`rounded-2xl shadow-xl p-6 border flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
              theme === "light"
                ? "bg-white border-gray-200 text-gray-800"
                : "bg-gray-900 border-gray-700 text-gray-300"
            }`}
          >
            {/* Job Title */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-500" /> {req.job?.Title}
              </h2>
              <p className="text-sm">{req.job?.Description}</p>
            </div>

            {/* Tutor & Student Info */}
            <div className="mt-4 space-y-2 text-sm">
              {/* Tutor */}
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" /> Tutor:{" "}
                {req.tutor?.First_Name} {req.tutor?.Last_Name} ({req.tutor?.Email})
              </p>
              {/* Student */}
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-500" /> Student:{" "}
                {req.job?.student?.First_Name} {req.job?.student?.Last_Name} ({req.job?.student?.Email})
              </p>
              {/* Date & Time */}
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />{" "}
                {new Date(req.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />{" "}
                {new Date(req.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
              </p>
              {/* Fee & Duration */}
              <p className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-700" /> Fee: {req.job?.Fee} | Duration: {req.job?.Duration}
              </p>
              {/* Status */}
              <p className="flex items-center gap-2">
                <CheckCircle
                  className={`w-4 h-4 ${
                    req.status?.Description === "Pending" ? "text-yellow-500" : "text-green-500"
                  }`}
                />{" "}
                {req.status?.Description}
              </p>
              <p className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                Request ID: {req.Request_Id} | Job ID: {req.job?.Job_Id}
              </p>
            </div>

            {/* Action Button */}
            <div className="mt-6 flex flex-wrap gap-3">
              <NavLink
                to={`/admin/request/${req.job?.Job_Id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition"
              >
                <Eye className="w-4 h-4" /> View Request
              </NavLink>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobRequests;
