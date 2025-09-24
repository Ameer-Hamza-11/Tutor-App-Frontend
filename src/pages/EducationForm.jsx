import React, { useState } from "react";

const EducationForm = ({ educationDetails, setEducationDetails }) => {
  const [currentEducation, setCurrentEducation] = useState({
    Degree: "",
    Institution: "",
    Start_Year: "",
    End_Year: "",
    Grade: "",
  });

  // handle input change
  const handleChange = (e) => {
    setCurrentEducation({
      ...currentEducation,
      [e.target.name]: e.target.value,
    });
  };

  // add education to list
  const handleAddEducation = () => {
    if (
      currentEducation.Degree &&
      currentEducation.Institution &&
      currentEducation.Start_Year &&
      currentEducation.End_Year
    ) {
      setEducationDetails((prev) => [...prev, currentEducation]);
      setCurrentEducation({
        Degree: "",
        Institution: "",
        Start_Year: "",
        End_Year: "",
        Grade: "",
      });
    } else {
      alert("Please fill required fields");
    }
  };

  // remove education from list
  const handleRemoveEducation = (index) => {
    setEducationDetails((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-orange-500">
        Education Details
      </h2>

      {/* Form Fields */}
      <div className="bg-white/90 dark:bg-[#1e1c2e]/90 rounded-xl shadow-lg p-4 sm:p-6 space-y-5 border border-gray-200 dark:border-orange-400/20">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            name="Degree"
            placeholder="Degree"
            value={currentEducation.Degree}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          />
          <input
            name="Institution"
            placeholder="Institution"
            value={currentEducation.Institution}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          />
          <input
            type="number"
            name="Start_Year"
            placeholder="Start Year"
            value={currentEducation.Start_Year}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          />
          <input
            type="number"
            name="End_Year"
            placeholder="End Year"
            value={currentEducation.End_Year}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          />
          <input
            name="Grade"
            placeholder="Grade"
            value={currentEducation.Grade}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border sm:col-span-2"
          />
        </div>

        <button
          type="button"
          onClick={handleAddEducation}
          className="mt-3 px-4 py-2 rounded-lg bg-orange-500 text-white shadow"
        >
          + Add Education
        </button>
      </div>

      {/* Education Table */}
      {educationDetails.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Added Education</h3>
          <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Degree</th>
                <th className="px-3 py-2 text-left">Institution</th>
                <th className="px-3 py-2 text-left">Years</th>
                <th className="px-3 py-2 text-left">Grade</th>
                <th className="px-3 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {educationDetails.map((edu, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-3 py-2">{edu.Degree}</td>
                  <td className="px-3 py-2">{edu.Institution}</td>
                  <td className="px-3 py-2">
                    {edu.Start_Year} - {edu.End_Year}
                  </td>
                  <td className="px-3 py-2">{edu.Grade}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(idx)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
