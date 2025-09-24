import React, { useEffect, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useSelector } from "react-redux";
import { fetchGenders } from "../apis/fetchApi";
import { useQuery } from "@tanstack/react-query";

const UserDetailsForm = ({ value, setUserDetails, showErrors }) => {
  const user = useSelector((state) => state.auth.user);

  const initial = useMemo(() => ({
    User_Id: user?.User_Id ?? null,
    Date_Of_Birth: "",
    Gender_Id: "",
    Additional_Info: "",
    Description: "",
    Profile_Picture: null,
  }), [user?.User_Id]);

  const [form, setForm] = useState(value ?? initial);

  useEffect(() => {
    if (value) setForm(value);
  }, [value]);

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

  if (isLoading) return <p className="text-orange-500">Loading genders...</p>;
  if (error) return <p className="text-red-500">Failed to load genders</p>;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/90 dark:bg-[#1e1c2e]/90 text-gray-900 dark:text-gray-200 
                 rounded-xl shadow-lg p-4 sm:p-6 space-y-5 border border-gray-200 dark:border-orange-400/20"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-orange-500">
        User Details
      </h2>

      {/* Profile Picture Upload */}
      <div className="space-y-2">
        <label className="block text-sm text-gray-600 dark:text-gray-300">
          Profile Picture
        </label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition">
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
              className="w-16 h-16 rounded-full object-cover border-2 border-orange-400 shadow"
            />
          )}
        </div>
      </div>

      {/* DOB Input */}
      <label className="block text-sm text-gray-600 dark:text-gray-300">Date of Birth</label>
      <input
        type="date"
        name="Date_Of_Birth"
        value={form.Date_Of_Birth}
        onChange={handleChange}
        className={`w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                   focus:ring-2 focus:ring-orange-400 outline-none ${showErrors && !form.Date_Of_Birth ? 'border-red-500 focus:ring-red-400' : ''}`}
      />

      {/* Gender Buttons */}
      <div>
        <h2 className="text-base font-medium mb-2 text-orange-500">Select Gender</h2>
        <div className="grid grid-cols-2 gap-3">
          {genders?.map((gender) => (
            <div
              key={gender.Gender_Id}
              onClick={() => handleGenderSelect(gender.Gender_Id)}
              className={`cursor-pointer flex items-center justify-center 
              p-3 rounded-lg border text-sm transition
              ${
                form.Gender_Id === gender.Gender_Id
                  ? "bg-orange-500 text-white border-orange-400 shadow-md"
                  : "bg-gray-100 dark:bg-white/10 border-gray-300 dark:border-gray-700 hover:border-orange-400"
              }`}
            >
              {gender.Gender_Description}
            </div>
          ))}
        </div>
        {showErrors && !form.Gender_Id && (
          <p className="mt-2 text-xs text-red-500">Gender is required.</p>
        )}
      </div>

      {/* Other Inputs */}
      <input
        name="Additional_Info"
        placeholder="Additional Info"
        value={form.Additional_Info}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                   focus:ring-2 focus:ring-orange-400 outline-none"
      />

      <textarea
        name="Description"
        placeholder="Description"
        value={form.Description}
        onChange={handleChange}
        rows={4}
        className="w-full p-3 rounded-lg bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                   focus:ring-2 focus:ring-orange-400 outline-none"
      />
    </Motion.div>
  );
};

export default UserDetailsForm;
