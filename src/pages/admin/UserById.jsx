import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserById } from "../../apis/fetchApi";
import { deleteUserApi, editUserApi } from "../../apis/adminUserApi";
import { motion } from "framer-motion";
import { User, Mail, Phone, Shield, Edit2, Trash2, X, MapPin, Calendar, Info } from "lucide-react";

const UserById = ({ theme }) => {
  const { User_Id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Phone_Number: "",
    Role_Id: 3,
  });

  // Fetch user
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", User_Id],
    queryFn: () => fetchUserById(User_Id),
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: () => deleteUserApi({ UserId: User_Id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/admin/users");
    },
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: editUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", User_Id]);
      setIsEditModalOpen(false);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-transparent rounded-full"
          style={{ borderColor: theme === "light" ? "#4f46e5" : "#22d3ee" }}
        />
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-center">Failed to load user details.</p>;
  }

  const user = data;
  const userDetail = user.userdetails[0];
  const education = user.educationdetails[0];

  const handleEditClick = () => {
    setEditForm({
      First_Name: user.First_Name,
      Last_Name: user.Last_Name,
      Email: user.Email,
      Phone_Number: user.Phone_Number,
      Role_Id: user.userroles[0]?.Role_Id,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ UserId: user.User_Id, ...editForm });
  };

  return (
    <>
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`max-w-5xl mx-auto p-6 rounded-3xl shadow-2xl border transition hover:shadow-indigo-500/30 ${theme === "light"
          ? "bg-white border-gray-200"
          : "bg-gray-900 border-gray-700 text-white"
          }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <User
              size={56}
              className={`p-3 rounded-full transition-all duration-300 ${theme === "light"
                ? "bg-indigo-100 text-indigo-600"
                : "bg-teal-700 text-teal-200"
                }`}
            />
            <div>
              <h2 className="text-3xl font-bold">{user.First_Name} {user.Last_Name}</h2>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                @{user.User_Name}
              </p>
              <p className="text-sm mt-1 flex items-center gap-1">
                <Calendar size={16} /> {userDetail?.Date_Of_Birth?.split("T")[0]} | {userDetail?.gender?.Gender_Description}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-md bg-indigo-600 text-white hover:bg-indigo-700 transition transform hover:scale-105"
            >
              <Edit2 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this user?")) deleteMutation.mutate();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-md bg-red-500 text-white hover:bg-red-600 transition transform hover:scale-105"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>

        {/* Contact & Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <p className="flex items-center gap-2"><Mail size={16} /> {user.Email}</p>
          <p className="flex items-center gap-2"><Phone size={16} /> {user.Phone_Number}</p>
          <p className="flex items-center gap-2"><Shield size={16} /> Role: {user.userroles[0]?.Role_Id === 1 ? "Admin" : user.userroles[0]?.Role_Id === 2 ? "Teacher" : "Student"}</p>
          <p className={`inline-block px-3 py-1 rounded-full text-xs font-bold  ${user.Status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{user.Status}</p>
          <p className="flex items-center gap-2 col-span-full"><MapPin size={16} /> {userDetail?.address?.AddressLine1}, {userDetail?.address?.city?.City_Name}, {userDetail?.address?.country?.Country_Name}, {userDetail?.address?.Postal_Code}</p>
          <p className="flex items-center gap-2 col-span-full"><Info size={16} /> {userDetail?.Description} | {userDetail?.Additional_Info}</p>
          {education && (
            <p className="flex items-center gap-2 col-span-full"><Info size={16} /> Education: {education.Degree} ({education.Start_Year} - {education.End_Year}) | {education.Institution} | Grade: {education.Grade}</p>
          )}
        </div>
      </motion.div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-lg p-6 rounded-2xl shadow-xl ${theme === "light" ? "bg-white" : "bg-gray-800 text-white"}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit User</h3>
              <button onClick={() => setIsEditModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input type="text" placeholder="First Name" value={editForm.First_Name} onChange={(e) => setEditForm({ ...editForm, First_Name: e.target.value })} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <input type="text" placeholder="Last Name" value={editForm.Last_Name} onChange={(e) => setEditForm({ ...editForm, Last_Name: e.target.value })} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <input type="email" placeholder="Email" value={editForm.Email} onChange={(e) => setEditForm({ ...editForm, Email: e.target.value })} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <input type="text" placeholder="Phone Number" value={editForm.Phone_Number} onChange={(e) => setEditForm({ ...editForm, Phone_Number: e.target.value })} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700" />
              <select value={editForm.Role_Id} onChange={(e) => setEditForm({ ...editForm, Role_Id: Number(e.target.value) })} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700">
                <option value={1}>Admin</option>
                <option value={2}>Teacher</option>
                <option value={3}>Student</option>
              </select>

              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-500 text-white">Cancel</button>
                <button type="submit" disabled={updateMutation.isPending} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">{updateMutation.isPending ? "Saving..." : "Save Changes"}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default UserById;
