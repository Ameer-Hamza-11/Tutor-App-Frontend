import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { scheduleDemoApi } from "../../apis/jobrequestsApi";

const PostDemoSchedules = ({ isOpen, onClose, requestId, theme }) => {
  const [scheduledDate, setScheduledDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => scheduleDemoApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["jobRequestById", requestId]);
      onClose();
      setScheduledDate("");
      setErrorMsg("");
    },
    onError: (error) => {
      console.error("Error scheduling demo:", error);
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
        className={`w-full max-w-md rounded-xl p-6 ${
          theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-gray-100"
        } shadow-2xl`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Schedule Demo</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-sm font-medium">
            Select Date & Time
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              required
              className={`mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                theme === "light" ? "border-gray-300 bg-white text-gray-900" : "border-gray-700 bg-gray-800 text-gray-100"
              }`}
            />
          </label>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition ${
                theme === "light"
                  ? "bg-green-500 hover:bg-green-600 disabled:bg-green-300"
                  : "bg-green-600 hover:bg-green-700 disabled:bg-green-800"
              }`}
            >
              {mutation.isLoading ? "Scheduling..." : "Schedule"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition ${
                theme === "light" ? "bg-red-500 hover:bg-red-600" : "bg-red-600 hover:bg-red-700"
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
