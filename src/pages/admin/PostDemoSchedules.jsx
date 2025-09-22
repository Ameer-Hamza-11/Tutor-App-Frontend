import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { scheduleDemoApi } from "../../apis/jobrequestsApi";
import toast from "react-hot-toast";

const PostDemoSchedules = ({ isOpen, onClose, requestId, theme }) => {
  const [scheduledDate, setScheduledDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => scheduleDemoApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobRequestById", requestId]);
      onClose();
      toast.success("Demo scheduled successfully");
      setScheduledDate("");
      setErrorMsg("");
    },
    onError: (error) => {
      console.error("Error scheduling demo:", error);
      toast.error(error.message || "Failed to schedule demo");
      setErrorMsg("Failed to schedule demo. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!scheduledDate) {
      setErrorMsg("Please select a date and time");
      return;
    }
    mutation.mutate({ Request_Id: requestId, Scheduled_DateTime: scheduledDate });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`w-full max-w-md rounded-xl p-6 shadow-2xl transition ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-gray-100"
          }`}
      >
        <h2 className={`text-2xl font-bold mb-4 text-center ${theme === "light" ? "text-orange-600" : "text-orange-400"}`}>
          Schedule Demo
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm font-medium">
            Select Date & Time
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              required
              className={`mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${theme === "light" ? "border-orange-300 bg-white text-gray-900" : "border-orange-600 bg-gray-800 text-white"
                }`}
            />
          </label>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition ${theme === "light"
                ? "bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300"
                : "bg-orange-400 hover:bg-orange-500 disabled:bg-orange-600"
                }`}
            >
              {mutation.isLoading ? "Scheduling..." : "Schedule"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition ${theme === "light" ? "bg-gray-400 hover:bg-gray-500" : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PostDemoSchedules;
