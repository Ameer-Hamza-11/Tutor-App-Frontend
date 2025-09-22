import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { User, Mail, Phone, Shield, ArrowRight } from "lucide-react";
import { fetchUsers } from "../../apis/fetchApi";
import { useNavigate } from "react-router-dom";

const Users = ({ theme }) => {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page], // page change hote hi refetch hoga
    queryFn: () => fetchUsers(page, 10), 
    keepPreviousData: true, // purane data ko tab tak dikhata hai jab tak naya data aata hai
  });

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-t-transparent rounded-full"
          style={{ borderColor: theme === "light" ? "#4f46e5" : "#22d3ee" }}
        />
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-center">Failed to load users.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
        Users List
      </h2>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className={`${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user) => (
              <tr key={user.User_Id} className={`${theme === "light" ? "border-t border-gray-200" : "border-t border-gray-700"}`}>
                <td className="py-2 px-4">{user.First_Name} {user.Last_Name}</td>
                <td className="py-2 px-4">@{user.User_Name}</td>
                <td className="py-2 px-4">{user.Email}</td>
                <td className="py-2 px-4">{user.Phone_Number}</td>
                <td className="py-2 px-4">
                  {user.userroles[0]?.Role_Id === 1
                    ? "Admin"
                    : user.userroles[0]?.Role_Id === 2
                      ? "Teacher"
                      : "Student"}
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${user.Status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                      : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                      }`}
                  >
                    {user.Status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => navigate(`/admin/users/${user.User_Id}`)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md font-medium transition ${theme === "light" ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-teal-600 text-white hover:bg-teal-700"
                      }`}
                  >
                    View <ArrowRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-6 md:hidden">
        {data?.data?.map((user, index) => (
          <motion.div
            key={user.User_Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-xl shadow-lg p-5 border transition ${theme === "light"
              ? "bg-white border-gray-200 hover:shadow-xl"
              : "bg-gray-900 border-gray-700 hover:shadow-lg"
              }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <User
                size={36}
                className={`p-2 rounded-full ${theme === "light" ? "bg-indigo-100 text-indigo-600" : "bg-teal-700 text-teal-200"
                  }`}
              />
              <div>
                <h3 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  {user.First_Name} {user.Last_Name}
                </h3>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>@{user.User_Name}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2"><Mail size={16} /> {user.Email}</p>
              <p className="flex items-center gap-2"><Phone size={16} /> {user.Phone_Number}</p>
              <p className="flex items-center gap-2"><Shield size={16} /> Role: {user.userroles[0]?.Role_Id === 1 ? "Admin" : user.userroles[0]?.Role_Id === 2 ? "Teacher" : "Student"}</p>
              <p
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${user.Status === "Active"
                  ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                  }`}
              >
                {user.Status}
              </p>
            </div>

            <button
              onClick={() => navigate(`/admin/users/${user.User_Id}`)}
              className="mt-4 w-full px-4 py-2 text-sm font-medium rounded-lg transition
              bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-teal-600 dark:hover:bg-teal-700 flex items-center justify-center gap-1"
            >
              View Details <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {data?.currentPage} of {data?.totalPages}
        </span>

        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage((old) => old + 1)}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default Users;
