import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion as Motion } from "framer-motion";
import { Search } from "lucide-react";
import { getJobsApi } from "../apis/jobApi";
import { useTheme } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

const defaultAvatar = "../../public/images/default-avatar.png";

const FindJobs = () => {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: ({ pageParam = 1 }) => getJobsApi(pageParam, 10),
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
  });

  const jobs = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading)
    return (
      <p
        className={`text-center animate-pulse ${
          theme === "light" ? "text-orange-600" : "text-orange-400"
        }`}
      >
        Loading jobs...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load jobs.</p>
    );

  const filteredJobs = jobs.filter((job) => {
    const titleHit = job.Title.toLowerCase().includes(search.toLowerCase());
    const subjects = job.subjects || (job.subject ? [job.subject] : []);
    const subjHit = subjects.some((s) =>
      (s?.Subject_Name || "").toLowerCase().includes(search.toLowerCase())
    );
    return titleHit || subjHit;
  });

  return (
    <div
      className={`p-6 space-y-6 min-h-screen transition-colors duration-300 ${
        theme === "light"
          ? "bg-gray-50 text-gray-900"
          : "bg-gray-900 text-gray-200"
      }`}
    >
      {/* Search */}
      <div
        className={`flex items-center rounded-xl px-4 py-2 w-full max-w-md mx-auto border transition shadow-md ${
          theme === "light"
            ? "bg-white border-gray-300 focus-within:shadow-orange-200"
            : "bg-gray-800 border-gray-700 focus-within:shadow-orange-500/30"
        }`}
      >
        <Search
          className={`mr-2 ${
            theme === "light" ? "text-orange-600" : "text-orange-400"
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
            <Motion.div
              key={job.Job_Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => navigate(`/app/find-jobs/${job.Job_Id}`)}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition ${
                theme === "light"
                  ? "bg-white border-gray-200 hover:shadow-md"
                  : "bg-gray-800 border-gray-700 hover:border-orange-400/40"
              }`}
            >
              {/* Profile Image */}
              <img
                src={profilePic}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
              />

              {/* Job Info */}
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    theme === "light" ? "text-orange-600" : "text-orange-400"
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
                {/* Subjects */}
                <div className="mt-1 flex flex-wrap gap-2">
                  {(job.subjects || (job.subject ? [job.subject] : [])).map((s, i) => (
                    <span
                      key={`${s?.Subject_Id || i}`}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        theme === 'light'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-orange-500/20 text-orange-300'
                      }`}
                    >
                      {s?.Subject_Name}
                    </span>
                  ))}
                </div>
              </div>
            </Motion.div>
          );
        })}

        {/* Load More Button */}
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className={`mt-6 px-4 py-2 rounded-md text-white transition ${
            !hasNextPage
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : !hasNextPage
            ? "No more jobs"
            : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default FindJobs;
