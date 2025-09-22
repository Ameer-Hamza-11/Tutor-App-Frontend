import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCities, fetchCountries, fetchGenders } from "../../apis/fetchApi";
import toast from "react-hot-toast";
import { editProfileApi } from "../../apis/settingApi";

const EditProfileForm = () => {
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    UserId: user?.User_Id || "",
    First_Name: "",
    Last_Name: "",
    Phone_Number: "",
    Date_Of_Birth: "",
    Gender_Id: 1,
    Profile_Picture: "",
    Additional_Info: "",
    Description: "",
    AddressLine1: "",
    City_Id: 1,
    Country_Id: 1,
    Postal_Code: "",
  });

  // Queries for dropdowns
  const { data: genders = [] } = useQuery({
    queryKey: ["genders"],
    queryFn: fetchGenders,
  });

  const { data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  // Mutation for submit
  const mutation = useMutation({
    mutationFn: editProfileApi,
    onSuccess: (res) => {
      toast.success("Profile updated successfully!");
      console.log("✅ API Response:", res);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Handle inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
    >
      {/* First Name */}
      <input
        type="text"
        name="First_Name"
        value={formData.First_Name}
        onChange={handleChange}
        placeholder="First Name"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Last Name */}
      <input
        type="text"
        name="Last_Name"
        value={formData.Last_Name}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Phone Number */}
      <input
        type="text"
        name="Phone_Number"
        value={formData.Phone_Number}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Date of Birth */}
      <input
        type="date"
        name="Date_Of_Birth"
        value={formData.Date_Of_Birth}
        onChange={handleChange}
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Gender (Buttons) */}
      <div className="flex gap-2 flex-wrap">
        {genders.map((g) => (
          <button
            key={g.Gender_Id}
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, Gender_Id: g.Gender_Id }))
            }
            className={`px-3 py-1 rounded transition-all ${
              formData.Gender_Id === g.Gender_Id
                ? "bg-orange-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-orange-100 dark:hover:bg-gray-600"
            }`}
          >
            {g.Gender_Description}
          </button>
        ))}
      </div>

      {/* City */}
      <select
        name="City_Id"
        value={formData.City_Id}
        onChange={handleChange}
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c.City_Id} value={c.City_Id}>
            {c.City_Name}
          </option>
        ))}
      </select>

      {/* Country */}
      <select
        name="Country_Id"
        value={formData.Country_Id}
        onChange={handleChange}
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.Country_Id} value={c.Country_Id}>
            {c.Country_Name}
          </option>
        ))}
      </select>

      {/* Profile Picture */}
      <input
        type="file"
        name="Profile_Picture"
        onChange={handleChange}
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Additional Info */}
      <textarea
        name="Additional_Info"
        value={formData.Additional_Info}
        onChange={handleChange}
        placeholder="Additional Info"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Description */}
      <textarea
        name="Description"
        value={formData.Description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Address */}
      <input
        type="text"
        name="AddressLine1"
        value={formData.AddressLine1}
        onChange={handleChange}
        placeholder="Address"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Postal Code */}
      <input
        type="text"
        name="Postal_Code"
        value={formData.Postal_Code}
        onChange={handleChange}
        placeholder="Postal Code"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-all"
      >
        {mutation.isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfileForm;
