import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getJobsApi } from "../apis/jobApi";
import { useTheme } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

const defaultAvatar = "../../public/images/default-avatar.png";

const FindJobs = () => {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { data: jobs = [], isLoading, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobsApi,
  });

  if (isLoading)
    return (
      <p
        className={`text-center animate-pulse ${
          theme === "light" ? "text-pink-600" : "text-pink-400"
        }`}
      >
        Loading jobs...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load jobs.</p>
    );

  const filteredJobs = jobs.filter(
    (job) =>
      job.Title.toLowerCase().includes(search.toLowerCase()) ||
      job.subject.Subject_Name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`p-6 space-y-6 min-h-screen transition-colors duration-300 ${
        theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-[#0e0c1c] text-gray-200"
      }`}
    >
      {/* Search */}
      <div
        className={`flex items-center rounded-xl px-4 py-2 w-full max-w-md mx-auto border transition shadow-md ${
          theme === "light"
            ? "bg-white border-gray-300 focus-within:shadow-pink-300"
            : "bg-[#1a172e] border-pink-400/40 focus-within:shadow-pink-500/30"
        }`}
      >
        <Search
          className={`mr-2 ${
            theme === "light" ? "text-pink-600" : "text-pink-400"
          }`}
        />
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`bg-transparent outline-none w-full ${
            theme === "light"
              ? "text-gray-800 placeholder-gray-500"
              : "text-white placeholder-gray-400"
          }`}
        />
      </div>

      {/* Jobs List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {filteredJobs.map((job) => {
          const student = job.student;
          const details = student.userdetails?.[0];
          const profilePic = details?.Profile_Picture
            ? `${import.meta.env.VITE_BASE_URL}/uploads/picture/${details.Profile_Picture}`
            : defaultAvatar;

          return (
            <motion.div
              key={job.Job_Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => navigate(`/app/find-jobs/${job.Job_Id}`)}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${
                theme === "light"
                  ? "bg-white border-gray-200 hover:shadow-md"
                  : "bg-[#1a172e] border-pink-400/20 hover:border-pink-400/40"
              }`}
            >
              {/* Profile Image */}
              <img
                src={profilePic}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover border-2 border-pink-400"
              />

              {/* Job Info */}
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    theme === "light" ? "text-pink-600" : "text-pink-400"
                  }`}
                >
                  {job.Title}
                </h3>
                <p
                  className={`text-sm ${
                    theme === "light" ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {job.Description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FindJobs;
