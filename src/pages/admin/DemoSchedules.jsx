import React from "react";
import { motion } from "framer-motion";
import { User, Calendar, Clock, Briefcase, Eye, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext, NavLink, useNavigate } from "react-router-dom";
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
      <p className={`text-center py-20 ${theme === "light" ? "text-orange-600" : "text-orange-400"}`}>
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
    <div className="space-y-6 p-4 max-w-6xl mx-auto">


      {/* Header */}
      <div className="text-center">
        <h1 className={`${theme === "light" ? "text-3xl font-extrabold text-gray-900 " : "text-3xl font-extrabold text-gray-900 dark:text-white"}`}>Demo Schedules</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Scheduled demos with tutors</p>
      </div>

      {/* Desktop Table */}
      <div className={`hidden md:block overflow-x-auto rounded-2xl shadow-lg border ${theme === "light" ? "bg-white border-orange-200" : "bg-gray-900 border-gray-700"
        }`}>
        <table className="w-full table-auto text-sm">
          <thead className={`${theme === "light" ? "bg-orange-50 text-orange-800" : "bg-orange-800 text-orange-200"}`}>
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Tutor</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Job</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
              <th className="px-6 py-3 text-left font-semibold">Time</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <motion.tbody layout>
            {data?.map((demo, index) => {
              const scheduled = new Date(demo.Scheduled_DateTime);
              return (
                <motion.tr
                  key={demo.Demo_Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`${theme === "light" ? "border-t border-orange-200 hover:bg-orange-50" : "border-t border-gray-700 hover:bg-gray-800"}`}
                >
                  <td className="px-6 py-4">{demo.TutorFirstName} {demo.TutorLastName}</td>
                  <td className="px-6 py-4">{demo.TutorEmail}</td>
                  <td className="px-6 py-4">{demo.JobTitle}</td>
                  <td className="px-6 py-4">{scheduled.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="px-6 py-4">{scheduled.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${demo.DemoStatusDescription === "Scheduled" ? "bg-orange-500 text-white" : "bg-yellow-400 text-black"
                      }`}>{demo.DemoStatusDescription}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <NavLink
                      to={`/admin/demoSchedules/${demo.Demo_Id}`}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs shadow-md transition ${theme === "light" ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-orange-600 text-white hover:bg-orange-700"
                        }`}
                    >
                      <Eye className="w-4 h-4" /> View
                    </NavLink>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-6 md:hidden">
        {data?.map((demo, index) => {
          const scheduled = new Date(demo.Scheduled_DateTime);
          return (
            <motion.div
              key={demo.Demo_Id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl shadow-xl p-5 border flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${theme === "light" ? "bg-white border-orange-200" : "bg-gray-900 border-gray-700"
                }`}
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" /> {demo.TutorFirstName} {demo.TutorLastName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{demo.TutorEmail}</p>
                <p className="text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-orange-500" /> {demo.JobTitle}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" /> {scheduled.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" /> {scheduled.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold w-max ${demo.DemoStatusDescription === "Scheduled" ? "bg-orange-500 text-white" : "bg-yellow-400 text-black"
                  }`}>
                  {demo.DemoStatusDescription}
                </span>
              </div>
              <NavLink
                to={`/admin/demoSchedules/${demo.Demo_Id}`}
                className={`mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm shadow-md transition ${theme === "light" ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-orange-600 text-white hover:bg-orange-700"
                  }`}
              >
                <Eye className="w-4 h-4" /> View Details
              </NavLink>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DemoSchedules;
