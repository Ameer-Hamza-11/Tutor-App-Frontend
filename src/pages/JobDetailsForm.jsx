import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "../apis/fetchApi";

const JobDetailsForm = ({ setJob }) => {
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    Student_Id: user?.User_Id ?? null,
    Subject_Id: "",
    Title: "",
    Description: "",
    Duration: "",
    Fee: "",
    Frequency: "",
  });

  // Input update handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "Fee" ? Number(value) : value;
    const updatedForm = { ...formData, [name]: updatedValue };
    setFormData(updatedForm);
    setJob(updatedForm);
  };

  // Subject select
  const handleSubjectSelect = (subjectId) => {
    const updatedForm = { ...formData, Subject_Id: subjectId };
    setFormData(updatedForm);
    setJob(updatedForm);
  };

  const { data: subjects, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  if (isLoading) return <p className="text-orange-500">Loading subjects...</p>;
  if (error) return <p className="text-red-500">Failed to load subjects</p>;

  return (
    <form className="space-y-4 p-4 sm:p-6 bg-white dark:bg-[#1e1c2e] text-gray-900 dark:text-gray-200 rounded-xl shadow-lg border border-gray-200 dark:border-orange-400/20 transition">
      {/* Job Title */}
      <input
        type="text"
        name="Title"
        placeholder="Job Title"
        value={formData.Title}
        onChange={handleChange}
        className="border p-2 w-full rounded-md text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 
               focus:ring-2 focus:ring-orange-400 outline-none"
      />

      {/* Description */}
      <textarea
        name="Description"
        placeholder="Description"
        value={formData.Description}
        onChange={handleChange}
        className="border p-2 w-full rounded-md text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 
               focus:ring-2 focus:ring-orange-400 outline-none"
      />

      {/* Subjects Grid */}
      <div>
        <h2 className="text-base font-medium mb-2 text-orange-500">Select Subjects</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {subjects?.map((subj) => (
            <div
              key={subj.Subject_Id}
              onClick={() => handleSubjectSelect(subj.Subject_Id)}
              className={`cursor-pointer flex items-center justify-center 
              px-3 py-2 rounded-lg border text-xs sm:text-sm transition shadow-sm
              ${
                formData.Subject_Id === subj.Subject_Id
                  ? "bg-orange-500 text-white border-orange-400 shadow-md"
                  : "bg-gray-100 dark:bg-white/10 border-gray-300 dark:border-gray-700 hover:border-orange-400"
              }`}
            >
              <span>{subj.Subject_Name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Other Inputs */}
      <input
        type="text"
        name="Duration"
        placeholder="Duration"
        value={formData.Duration}
        onChange={handleChange}
        className="border p-2 w-full rounded-md text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 
               focus:ring-2 focus:ring-orange-400 outline-none"
      />
      <input
        type="number"
        name="Fee"
        placeholder="Fee"
        value={formData.Fee}
        onChange={handleChange}
        className="border p-2 w-full rounded-md text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 
               focus:ring-2 focus:ring-orange-400 outline-none"
      />
      <input
        type="text"
        name="Frequency"
        placeholder="Frequency (e.g. 2 days/week)"
        value={formData.Frequency}
        onChange={handleChange}
        className="border p-2 w-full rounded-md text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 
               focus:ring-2 focus:ring-orange-400 outline-none"
      />
    </form>
  );
};

export default JobDetailsForm;
