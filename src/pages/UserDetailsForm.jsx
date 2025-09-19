import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useSelector } from "react-redux";
import { fetchGenders } from "../apis/fetchApi";
import { useQuery } from "@tanstack/react-query";

const UserDetailsForm = ({ setUserDetails }) => {
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    User_Id: user?.User_Id ?? null,
    Date_Of_Birth: "",
    Gender_Id: "",
    Additional_Info: "",
    Description: "",
    Profile_Picture: null,
  });

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    setUserDetails(updated);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updated = { ...form, Profile_Picture: file };
      setForm(updated);
      setUserDetails(updated);
    }
  };
  const handleGenderSelect = (genderId) => {
    const updated = { ...form, Gender_Id: genderId };
    setForm(updated);
    setUserDetails(updated);
  };
  const { data: genders, isLoading, error } = useQuery({
    queryKey: ["genders"],
    queryFn: fetchGenders,
  });
  if (isLoading) return <p className="text-white">Loading subjects...</p>;
  if (error) return <p className="text-red-400">Failed to load subjects</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white rounded-xl shadow-lg p-6 space-y-6"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-pink-400">
        User Details
      </h2>

      {/* Profile Picture Upload */}
      <div className="space-y-2">
        <label className="block text-sm text-gray-300">Profile Picture</label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-medium transition">
            <Upload size={18} />
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {form.Profile_Picture && (
            <img
              src={URL.createObjectURL(form.Profile_Picture)}
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover border-2 border-pink-400 shadow"
            />
          )}
        </div>
      </div>

      {/* DOB Input */}
      <input
        type="date"
        name="Date_Of_Birth"
        value={form.Date_Of_Birth}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
      />

      {/* Gender Buttons */}
      <div>
        <h2 className="text-base font-medium mb-2 text-pink-300">Select Gender</h2>
        {isLoading && <p className="text-gray-400">Loading genders...</p>}
        {error && <p className="text-red-400">Failed to load genders</p>}

        <div className="grid grid-cols-2 gap-3">
          {genders?.map((gender) => (
            <div
              key={gender.Gender_Id}
              onClick={() => handleGenderSelect(gender.Gender_Id)}
              className={`cursor-pointer flex items-center justify-center 
              p-3 rounded-lg border text-sm transition
              ${form.Gender_Id === gender.Gender_Id
                  ? "bg-pink-600 border-pink-400 shadow-md"
                  : "bg-white/10 border-gray-700 hover:border-pink-400"
                }`}
            >
              {gender.Gender_Description}
            </div>
          ))}
        </div>
      </div>

      {/* Other Inputs */}
      <input
        name="Additional_Info"
        placeholder="Additional Info"
        value={form.Additional_Info}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
      />

      <textarea
        name="Description"
        placeholder="Description"
        value={form.Description}
        onChange={handleChange}
        rows={4}
        className="w-full p-3 rounded-lg bg-white/10 border border-gray-600 focus:ring-2 focus:ring-pink-400 outline-none"
      />
    </motion.div>
  );
};

export default UserDetailsForm;
