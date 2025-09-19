import React from "react";
import { motion } from "framer-motion";
import { User, Calendar, Clock, Hash, Briefcase, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useNavigate, NavLink } from "react-router-dom";
import { getAllDemoSchedules } from "../../apis/jobrequestsApi";

const DemoSchedules = () => {
  const { theme } = useOutletContext();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["demoSchedules"],
    queryFn: getAllDemoSchedules,
  });

  if (isLoading)
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-indigo-600" : "text-indigo-400"}`}>
        Loading demo schedules...
      </p>
    );

  if (isError)
    return (
      <p className={`text-center py-20 ${theme === "light" ? "text-red-600" : "text-red-400"}`}>
        Failed to load demo schedules ❌
      </p>
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Demo Schedules</h1>
        <p className="text-gray-600 dark:text-gray-400">Scheduled demos with tutors</p>
      </div>

      {/* Demo Schedules Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((demo, index) => {
          const tutor = demo.jobrequest?.tutor;
          const scheduled = new Date(demo.Scheduled_DateTime);

          return (
            <motion.div
              key={demo.Demo_Id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl shadow-xl p-6 border flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${theme === "light"
                ? "bg-white border-gray-200 text-gray-800"
                : "bg-gray-900 border-gray-700 text-gray-300"
                }`}
            >
              {/* Tutor Info */}
              <div className="space-y-1">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" /> {demo.TutorFirstName} {demo.TutorLastName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{demo.TutorEmail}</p>
              </div>

              {/* Job Info */}
              <div className="mt-3 space-y-1 text-sm">
                <p className="flex items-center gap-1">
                  <Hash className="w-4 h-4 text-gray-500" /> Request ID: {demo.Request_Id}
                </p>
                <p className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-indigo-500" /> Job: {demo.JobTitle}
                </p>
              </div>

              {/* Scheduled Date & Time */}
              <div className="mt-3 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-green-500">
                  <Calendar className="w-4 h-4" />
                  {scheduled.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
                <div className="flex items-center gap-1 text-indigo-500">
                  <Clock className="w-4 h-4" />
                  {scheduled.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              {/* Status & View Button */}
              <div className="mt-5 flex flex-col gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold w-max ${demo.DemoStatusDescription === "Scheduled"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-400 text-black"
                    }`}
                >
                  {demo.DemoStatusDescription}
                </span>
                {/* View Button */}
                <NavLink
                  to={`/admin/demoSchedules/${demo.Demo_Id}`}
                  className={`mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-md transition ${theme === "light"
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                >
                  <Eye className="w-4 h-4" /> View Details
                </NavLink>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DemoSchedules;
