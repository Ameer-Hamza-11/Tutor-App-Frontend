import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { User, Calendar, CheckCircle, Clock, Hash, DollarSign, Briefcase } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { deleteJobRequestApi, getJobRequestByIdApi } from "../../apis/jobrequestsApi";
import PostDemoSchedules from "./PostDemoSchedules";

const JobRequestById = () => {
  const { id } = useParams();
  const { theme } = useOutletContext();
  const queryClient = useQueryClient();

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const handleScheduleClick = (requestId) => {
    setSelectedRequestId(requestId);
    setIsModalOpen(true);
  };

  if (isLoading)
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-indigo-600" : "text-indigo-400"}`}>
        Loading requests...
      </p>
    );
  if (isError)
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-red-600" : "text-red-400"}`}>
        Failed to load requests ❌
      </p>
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Job Requests (Job ID: {id})
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Tutors who applied for this job</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((req, index) => (
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
            {/* Job Info */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-500" /> {req.job?.Title}
              </h2>
              <p className="text-sm">{req.job?.Description}</p>
              <p className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-green-600" /> Fee: {req.job?.Fee} | Duration: {req.job?.Duration}
              </p>
            </div>

            {/* Tutor & Student Info */}
            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" /> Tutor: {req.tutor?.First_Name} {req.tutor?.Last_Name} ({req.tutor?.Email})
              </p>
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-500" /> Student: {req.job?.student?.First_Name} {req.job?.student?.Last_Name} ({req.job?.student?.Email})
              </p>
              <p className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-500" /> Request ID: {req.Request_Id}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />{" "}
                {new Date(req.Request_Date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />{" "}
                {new Date(req.Request_Date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-500" /> {req.status?.Description || "Unknown"}
              </p>
            </div>

            {/* Created/Updated info */}
            <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              Created: {new Date(req.createdAt).toLocaleString()} <br />
              Updated: {new Date(req.updatedAt).toLocaleString()}
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <button
                onClick={() => handleScheduleClick(req.Request_Id)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow-md transition ${
                  theme === "light"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Schedule
              </button>
              <button
                onClick={() => handleReject(req.Request_Id)}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold shadow-md transition ${
                  theme === "light"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                Reject
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
