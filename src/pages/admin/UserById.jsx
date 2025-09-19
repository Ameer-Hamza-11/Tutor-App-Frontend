import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../apis/fetchApi";
import { motion } from "framer-motion";

const UserById = () => {
  const { User_Id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", User_Id],
    queryFn: () => fetchUserById(User_Id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-t-transparent border-indigo-500 rounded-full"
        />
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-center">Failed to load user details.</p>;
  }

  const user = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg bg-white dark:bg-gray-900"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {user.First_Name} {user.Last_Name}
      </h2>

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>Email:</strong> {user.Email}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>Phone:</strong> {user.Phone_Number}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>Status:</strong> {user.Status}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>Role:</strong>{" "}
        {user.userroles[0]?.Role_Id === 1
          ? "Admin"
          : user.userroles[0]?.Role_Id === 2
          ? "Teacher"
          : "Student"}
      </p>

      {/* Details from userdetails */}
      {user.userdetails?.[0] && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Additional Info
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {user.userdetails[0].Description} ({user.userdetails[0].gender?.Gender_Description})
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Address: {user.userdetails[0].address?.AddressLine1},{" "}
            {user.userdetails[0].address?.city?.City_Name},{" "}
            {user.userdetails[0].address?.country?.Country_Name}
          </p>
        </div>
      )}

      {/* Education */}
      {user.educationdetails?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Education
          </h3>
          {user.educationdetails.map((edu) => (
            <p key={edu.Education_Id} className="text-gray-700 dark:text-gray-300">
              {edu.Degree} from {edu.Institution} ({edu.Start_Year} - {edu.End_Year})
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default UserById;
