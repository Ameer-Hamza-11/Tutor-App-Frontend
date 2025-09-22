import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
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
      <p
        className={`text-center py-20 ${
          theme === "light" ? "text-orange-600" : "text-orange-400"
        }`}
      >
        Loading job requests...
      </p>
    );

  if (isError)
    return (
      <p
        className={`text-center py-20 ${
          theme === "light" ? "text-red-600" : "text-red-400"
        }`}
      >
        Failed to load job requests ❌
      </p>
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className={`text-3xl font-extrabold ${
            theme === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          Job Requests
        </h1>
        <p className={`text-gray-600 dark:text-gray-400`}>
          Manage and review student job requests
        </p>
      </div>

      {/* Table (Desktop & Tablet) */}
      <div className="overflow-x-auto rounded-2xl shadow-lg hidden sm:block">
        <table
          className={`min-w-full text-sm ${
            theme === "light" ? "bg-white" : "bg-gray-900"
          }`}
        >
          <thead
            className={`${
              theme === "light"
                ? "bg-orange-100 text-orange-800"
                : "bg-orange-900 text-orange-200"
            }`}
          >
            <tr>
              <th className="px-4 py-3 text-left">Job Title</th>
              <th className="px-4 py-3 text-left">Tutor</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Fee</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobRequests?.map((req, index) => (
              <motion.tr
                key={req.Request_Id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${
                  theme === "light"
                    ? "border-b border-gray-200 hover:bg-orange-50"
                    : "border-b border-gray-700 hover:bg-orange-900/30"
                }`}
              >
                <td className="px-4 py-3 font-medium">{req.job?.Title}</td>
                <td className="px-4 py-3">
                  {req.tutor?.First_Name} {req.tutor?.Last_Name}
                  <br />
                  <span className="text-xs text-gray-500">{req.tutor?.Email}</span>
                </td>
                <td className="px-4 py-3">
                  {req.job?.student?.First_Name} {req.job?.student?.Last_Name}
                  <br />
                  <span className="text-xs text-gray-500">
                    {req.job?.student?.Email}
                  </span>
                </td>
                <td className="px-4 py-3">Rs. {req.job?.Fee}</td>
                <td className="px-4 py-3">{req.job?.Duration}</td>
                <td className="px-4 py-3">
                  {new Date(req.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      req.status?.Description === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {req.status?.Description}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <NavLink
                    to={`/admin/request/${req.job?.Job_Id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-600 text-white hover:bg-orange-700 transition"
                  >
                    <Eye className="w-4 h-4" /> View
                  </NavLink>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards (Mobile) */}
      <div className="grid gap-4 sm:hidden">
        {jobRequests?.map((req, index) => (
          <motion.div
            key={req.Request_Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`p-4 rounded-2xl shadow-md border transition-colors ${
              theme === "light"
                ? "bg-white border-orange-200 hover:border-orange-400"
                : "bg-gray-900 border-orange-700 hover:border-orange-500"
            }`}
          >
            <h2 className="text-lg font-semibold mb-2">{req.job?.Title}</h2>
            <p className="text-sm">
              <span className="font-medium">Tutor:</span>{" "}
              {req.tutor?.First_Name} {req.tutor?.Last_Name}
            </p>
            <p className="text-sm">
              <span className="font-medium">Student:</span>{" "}
              {req.job?.student?.First_Name} {req.job?.student?.Last_Name}
            </p>
            <p className="text-sm">
              <span className="font-medium">Fee:</span> Rs. {req.job?.Fee}
            </p>
            <p className="text-sm">
              <span className="font-medium">Duration:</span> {req.job?.Duration}
            </p>
            <p className="text-sm">
              <span className="font-medium">Date:</span>{" "}
              {new Date(req.createdAt).toLocaleDateString("en-US")}
            </p>
            <p className="mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  req.status?.Description === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {req.status?.Description}
              </span>
            </p>
            <div className="mt-3">
              <NavLink
                to={`/admin/request/${req.job?.Job_Id}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                <Eye className="w-4 h-4" /> View
              </NavLink>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobRequests;
