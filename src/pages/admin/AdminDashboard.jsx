import React from "react";
import { motion as Motion } from "framer-motion";
import { Users, ClipboardList, CalendarDays, DollarSign } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const AdminDashboard = () => {
  const { theme, users, jobrequests, demoschedules } = useOutletContext();

  const stats = [
    {
      id: 1,
      title: "Total Users",
      value: users?.data?.length || 0,
      icon: <Users className="w-6 h-6" />,
      light: "from-blue-500 to-blue-600 border-blue-400",
      dark: "from-blue-700 to-blue-900 border-blue-600",
    },
    {
      id: 2,
      title: "Job Requests",
      value: jobrequests?.length || 0,
      icon: <ClipboardList className="w-6 h-6" />,
      light: "from-red-500 to-red-600 border-red-400",
      dark: "from-red-700 to-red-900 border-red-600",
    },
    {
      id: 3,
      title: "Demo Schedules",
      value: demoschedules?.length || 0,
      icon: <CalendarDays className="w-6 h-6" />,
      light: "from-indigo-500 to-indigo-600 border-indigo-400",
      dark: "from-indigo-700 to-indigo-900 border-indigo-600",
    },
    {
      id: 4,
      title: "Revenue",
      value: "$12,500", // abhi static
      icon: <DollarSign className="w-6 h-6" />,
      light: "from-green-500 to-green-600 border-green-400",
      dark: "from-green-700 to-green-900 border-green-600",
    },
  ];

  const activities = [
    "✅ New user registered (John Doe)",
    "📌 5 new job requests posted",
    "📅 Demo scheduled with Teacher A",
    "💳 Payment received from Student B",
    "📝 Teacher profile updated",
    "⚡ Server maintenance completed",
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className={`"text-3xl font-extrabold text-gray-900 dark:text-white`}>
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of platform statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {stats?.map((item, index) => (
          <Motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${
              theme === "light" ? item.light : item.dark
            } rounded-2xl p-6 border shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-4`}
          >
            <div
              className={`p-4 rounded-xl shadow-lg ${
                theme === "light"
                  ? "bg-white text-gray-900"
                  : "bg-gray-900 text-white"
              }`}
            >
              {item.icon}
            </div>
            <div>
              <p
                className={`text-sm font-medium ${
                  theme === "light" ? "text-gray-800" : "text-gray-300"
                }`}
              >
                {item.title}
              </p>
              <h2
                className={`text-2xl font-bold ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                {item.value}
              </h2>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Recent Activities Grid */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Recent Activities
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`rounded-2xl shadow-md p-4 border transition-colors ${
                theme === "light"
                  ? "bg-white border-orange-200 text-gray-800 hover:border-orange-400"
                  : "bg-gray-900 border-orange-700 text-gray-300 hover:border-orange-500"
              }`}
            >
              {activity}
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
