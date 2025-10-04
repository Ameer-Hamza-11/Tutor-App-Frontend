import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchCities,
  fetchCountries,
  fetchGenders,
  fetchSubjects,
} from "../../apis/fetchApi";
import toast from "react-hot-toast";
import { editProfileApi } from "../../apis/settingApi";
import { getProfileByUserId } from "../../apis/jobApi";
import { Listbox } from "@headlessui/react";
import { ChevronDown, Check, X } from "lucide-react";

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
    Subject_Id: "",
    Subject_Ids: [],
    Documents: [],
    Degree: "",
    Institution: "",
    Start_Year: "",
    End_Year: "",
    Grade: "",
  });

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
  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  // Profile data
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile", user?.User_Id],
    queryFn: () => getProfileByUserId(user?.User_Id),
    enabled: !!user?.User_Id,
  });

  useEffect(() => {
    if (userProfile) {
      const currentSubjects =
        userProfile.usersubjects?.map((us) => us.Subject_Id) || [];
      setFormData((prev) => ({
        ...prev,
        First_Name: userProfile.First_Name || "",
        Last_Name: userProfile.Last_Name || "",
        Phone_Number: userProfile.Phone_Number || "",
        Date_Of_Birth: userProfile.userdetails?.Date_Of_Birth || "",
        Gender_Id: userProfile.userdetails?.Gender_Id || 1,
        Additional_Info: userProfile.userdetails?.Additional_Info || "",
        Description: userProfile.userdetails?.Description || "",
        AddressLine1: userProfile.userdetails?.address?.AddressLine1 || "",
        City_Id: userProfile.userdetails?.address?.City_Id || 1,
        Country_Id: userProfile.userdetails?.address?.Country_Id || 1,
        Postal_Code: userProfile.userdetails?.address?.Postal_Code || "",
        Subject_Ids: currentSubjects,
      }));
    }
  }, [userProfile]);

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files
        ? name === "Documents"
          ? Array.from(files)
          : files[0]
        : value,
    }));
  };

  // remove subject chip
  const toggleSubject = (id) => {
    setFormData((prev) => ({
      ...prev,
      Subject_Ids: prev.Subject_Ids.includes(id)
        ? prev.Subject_Ids.filter((sid) => sid !== id)
        : [...prev.Subject_Ids, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "Documents" && Array.isArray(value)) {
        value.forEach((file) => data.append("Documents", file));
      } else {
        data.append(key, value);
      }
    });
    mutation.mutate(data);
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
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
      />

      {/* Last Name */}
      <input
        type="text"
        name="Last_Name"
        value={formData.Last_Name}
        onChange={handleChange}
        placeholder="Last Name"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
      />

      {/* Phone Number */}
      <input
        type="text"
        name="Phone_Number"
        value={formData.Phone_Number}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
      />

      {/* Date of Birth */}
      <input
        type="date"
        name="Date_Of_Birth"
        value={formData.Date_Of_Birth}
        onChange={handleChange}
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
      />

      {/* Gender */}
      <div className="flex gap-2 flex-wrap">
        {genders.map((g) => (
          <button
            key={g.Gender_Id}
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, Gender_Id: g.Gender_Id }))
            }
            className={`px-3 py-1 rounded transition-all ${formData.Gender_Id === g.Gender_Id
                ? "bg-orange-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-orange-100"
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
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
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
        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.Country_Id} value={c.Country_Id}>
            {c.Country_Name}
          </option>
        ))}
      </select>

      {/* Subject Multi-select */}
      {user?.role === "Teacher" && (
        <div>
          <h2 className="text-base font-medium mb-2 text-orange-500">
            Select Subjects
          </h2>
          <Listbox
            value={formData.Subject_Ids}
            onChange={(vals) =>
              setFormData((prev) => ({
                ...prev,
                Subject_Ids: vals,
                Subject_Id: vals[0] ?? "",
              }))
            }
            multiple
          >
            <div className="relative">
              <Listbox.Button
                className={`w-full flex justify-between items-center p-3 rounded-lg 
                  bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-orange-400 cursor-pointer hover:border-orange-400`}
              >
                <span className="truncate text-left">
                  {formData.Subject_Ids?.length
                    ? `${formData.Subject_Ids.length} subject(s) selected`
                    : "-- Select Subjects --"}
                </span>
                <ChevronDown className="w-4 h-4 text-orange-500" />
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-[#2a273d] rounded-lg shadow-lg z-10 max-h-56 overflow-auto border border-gray-200 dark:border-gray-700">
                {subjects?.map((s) => (
                  <Listbox.Option
                    key={s.Subject_Id}
                    value={s.Subject_Id}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 flex items-center justify-between ${active
                        ? "bg-orange-500 text-white"
                        : "text-gray-700 dark:text-gray-200"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span>{s.Subject_Name}</span>
                        {selected && <Check className="w-4 h-4" />}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          {/* Documents (for teacher) */}
          {user?.role === "Teacher" && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                Upload Documents
              </label>
              <input
                type="file"
                name="Documents"
                multiple
                onChange={handleChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          {/* Education details (for teacher) */}
          {user?.role === "Teacher" && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                name="Degree"
                value={formData.Degree}
                onChange={handleChange}
                placeholder="Degree"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="Institution"
                value={formData.Institution}
                onChange={handleChange}
                placeholder="Institution"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="Start_Year"
                value={formData.Start_Year}
                onChange={handleChange}
                placeholder="Start Year"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="End_Year"
                value={formData.End_Year}
                onChange={handleChange}
                placeholder="End Year"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="Grade"
                value={formData.Grade}
                onChange={handleChange}
                placeholder="Grade"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 md:col-span-2"
              />
            </div>
          )}


          {/* Selected chips */}
          {formData.Subject_Ids?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.Subject_Ids.map((id) => {
                const subj = subjects?.find((s) => s.Subject_Id === id);
                if (!subj) return null;
                return (
                  <span
                    key={id}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                  >
                    {subj.Subject_Name}
                    <button
                      type="button"
                      onClick={() => toggleSubject(id)}
                      className="ml-1 hover:opacity-80"
                    >
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition"
      >
        {mutation.isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfileForm;
