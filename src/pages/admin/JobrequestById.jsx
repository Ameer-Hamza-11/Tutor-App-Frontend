import React, { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { User, Calendar, CheckCircle, Clock, DollarSign, Briefcase } from "lucide-react";

import { deleteJobRequestApi, getJobRequestByIdApi } from "../../apis/jobrequestsApi";
import PostDemoSchedules from "./PostDemoSchedules";

const JobRequestById = () => {
  const { id } = useParams();
  const { theme } = useOutletContext();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobRequestById", id],
    queryFn: () => getJobRequestByIdApi(id),
  });

  const deleteMutation = useMutation({
    mutationFn: (requestId) => deleteJobRequestApi(requestId),
    onSuccess: () => queryClient.invalidateQueries(["jobRequestById", id]),
  });

  const handleReject = (requestId) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      deleteMutation.mutate(requestId);
    }
  };

  const handleScheduleClick = (requestId) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };

  if (isLoading)
    return <p className={`text-center py-20 ${theme === "light" ? "text-indigo-600" : "text-indigo-400"}`}>Loading requests...</p>;

  if (isError)
    return <p className={`text-center py-20 ${theme === "light" ? "text-red-600" : "text-red-400"}`}>Failed to load requests ❌</p>;

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Job Requests</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Tutors who applied for Job #{id}</p>
      </div>

      {/* Desktop Table */}
      <div className={`hidden md:block overflow-x-auto rounded-2xl shadow-lg border ${
        theme === "light" ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
      }`}>
        <table className="w-full table-auto text-sm">
          <thead className={`${theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-800 text-gray-300"}`}>
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Job Title</th>
              <th className="px-6 py-3 text-left font-semibold">Tutor</th>
              <th className="px-6 py-3 text-left font-semibold">Student</th>
              <th className="px-6 py-3 text-left font-semibold">Fee</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
              <th className="px-6 py-3 text-left font-semibold">Time</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <motion.tbody layout>
            {data?.map((req, index) => (
              <motion.tr
                key={req.Request_Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`${theme === "light" ? "border-t border-gray-200 hover:bg-gray-50" : "border-t border-gray-700 hover:bg-gray-800"}`}
              >
                <td className="px-6 py-4">{req.job?.Title}</td>
                <td className="px-6 py-4">{req.tutor?.First_Name} {req.tutor?.Last_Name}</td>
                <td className="px-6 py-4">{req.job?.student?.First_Name} {req.job?.student?.Last_Name}</td>
                <td className="px-6 py-4">{req.job?.Fee}</td>
                <td className="px-6 py-4">{new Date(req.Request_Date).toLocaleDateString("en-US")}</td>
                <td className="px-6 py-4">{new Date(req.Request_Date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    req.status?.Description === "Pending" ? "bg-yellow-100 text-yellow-600" :
                    req.status?.Description === "Accepted" ? "bg-green-100 text-green-600" :
                    "bg-red-100 text-red-600"
                  }`}>{req.status?.Description || "Unknown"}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleScheduleClick(req.Request_Id)} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg font-semibold text-xs ${theme === "light" ? "bg-green-500 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}>
                      <Calendar className="w-4 h-4" /> Schedule
                    </button>
                    <button onClick={() => handleReject(req.Request_Id)} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg font-semibold text-xs ${theme === "light" ? "bg-red-500 text-white hover:bg-red-600" : "bg-red-600 text-white hover:bg-red-700"}`}>
                      <CheckCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {data?.map((req, index) => (
          <motion.div
            key={req.Request_Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`rounded-xl p-4 shadow-md flex flex-col gap-2 ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <Briefcase className="w-5 h-5" />
                <span className="text-sm font-semibold">{req.job?.Title}</span>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <User className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Tutor: {req.tutor?.First_Name} {req.tutor?.Last_Name}</span>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <User className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Student: {req.job?.student?.First_Name} {req.job?.student?.Last_Name}</span>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm">Fee: {req.job?.Fee}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-2">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <Calendar className="w-5 h-5 text-green-500" />
                <span className="text-sm">{new Date(req.Request_Date).toLocaleDateString("en-US")}</span>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-sm">{new Date(req.Request_Date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-1">
                <CheckCircle className="w-5 h-5 text-indigo-500" />
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  req.status?.Description === "Pending" ? "bg-yellow-100 text-yellow-600" :
                  req.status?.Description === "Accepted" ? "bg-green-100 text-green-600" :
                  "bg-red-100 text-red-600"
                }`}>{req.status?.Description || "Unknown"}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => handleScheduleClick(req.Request_Id)} className={`flex-1 flex flex-col items-center gap-1 px-3 py-2 rounded-lg font-semibold text-xs ${theme === "light" ? "bg-green-500 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}>
                <Calendar className="w-4 h-4" /> Schedule
              </button>
              <button onClick={() => handleReject(req.Request_Id)} className={`flex-1 flex flex-col items-center gap-1 px-3 py-2 rounded-lg font-semibold text-xs ${theme === "light" ? "bg-red-500 text-white hover:bg-red-600" : "bg-red-600 text-white hover:bg-red-700"}`}>
                <CheckCircle className="w-4 h-4" /> Reject
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <PostDemoSchedules
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        requestId={selectedRequestId}
        theme={theme}
      />
    </div>
  );
};

export default JobRequestById;
