import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "../apis/fetchApi"




const JobDetailsForm = ({ setJob }) => {
  // const navigate = useNavigate();
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

  // input fields update
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "Fee" ? Number(value) : value;
    const updatedForm = { ...formData, [name]: updatedValue };
    setFormData(updatedForm);
    setJob(updatedForm);
  };

  const handleSubjectSelect = (subjectId) => {
    const updatedForm = { ...formData, Subject_Id: subjectId };
    setFormData(updatedForm);
    setJob(updatedForm);
  };
  const { data: subjects, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  if (isLoading) return <p className="text-white">Loading subjects...</p>;
  if (error) return <p className="text-red-400">Failed to load subjects</p>;

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 
             text-white rounded-xl shadow-lg sm:p-6"
    >
      {/* Job Title */}
      <input
        type="text"
        name="Title"
        placeholder="Job Title"
        value={formData.Title}
        onChange={handleChange}
        className="border p-2 w-full rounded-md text-sm bg-white/10 border-gray-600 
               focus:ring-2 focus:ring-pink-400 outline-none"
      />

      {/* Description */}
      <textarea
        name="Description"
        placeholder="Description"
        value={formData.Description}
        onChange={handleChange}
        className="border p-2 w-full rounded-md text-sm bg-white/10 border-gray-600 
               focus:ring-2 focus:ring-pink-400 outline-none"
      />

      {/* Subjects Grid */}
      <div>
        <h2 className="text-base font-medium mb-2 text-pink-300">Select Subjects</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {subjects?.map((subj) => (
            <div
              key={subj.Subject_Id}
              onClick={() => handleSubjectSelect(subj.Subject_Id)}
              className={`cursor-pointer flex flex-col items-center justify-center 
              p-3 rounded-lg border text-xs sm:text-sm transition
              ${formData.Subject_Id === subj.Subject_Id
                  ? "bg-pink-600 border-pink-400 shadow-md"
                  : "bg-white/10 border-gray-700 hover:border-pink-400"
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
        className="border p-2 w-full rounded-md text-sm bg-white/10 border-gray-600 
               focus:ring-2 focus:ring-pink-400 outline-none"
      />
      <input
        type="number"
        name="Fee"
        placeholder="Fee"
        value={formData.Fee}
        onChange={handleChange}
        className="border p-2 w-full rounded-md text-sm bg-white/10 border-gray-600 
               focus:ring-2 focus:ring-pink-400 outline-none"
      />
      <input
        type="text"
        name="Frequency"
        placeholder="Frequency (e.g. 2 days/week)"
        value={formData.Frequency}
        onChange={handleChange}
        className="border p-2 w-full rounded-md text-sm bg-white/10 border-gray-600 
               focus:ring-2 focus:ring-pink-400 outline-none"
      />

 
    </form>

  );
};

export default JobDetailsForm;
