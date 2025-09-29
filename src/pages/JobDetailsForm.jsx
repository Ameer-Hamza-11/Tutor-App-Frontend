import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "../apis/fetchApi";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown, X } from "lucide-react";

const JobDetailsForm = ({ value, setJob, showErrors }) => {
  const user = useSelector((state) => state.auth.user);

  const initial = useMemo(() => ({
    Student_Id: user?.User_Id ?? null,
    Subject_Id: "", // backward-compat
    Subject_Ids: [], // new multi-select
    Title: "",
    Description: "",
    Duration: "",
    Fee: "",
    Frequency: "",
  }), [user?.User_Id]);

  const [formData, setFormData] = useState(value ?? initial);
  const [time, setTime] = useState({ start: "", end: "" });

  useEffect(() => {
    // Sync downwards if parent updates externally
    if (value) setFormData(value);
  }, [value]);

  useEffect(() => {
    if (value?.Duration && typeof value.Duration === 'string') {
      const parts = value.Duration.split('-').map((s) => s.trim());
      if (parts.length === 2) setTime({ start: parts[0], end: parts[1] });
    }
  }, [value?.Duration]);

  // Input update handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "Fee" ? Number(value) : value;
    const updatedForm = { ...formData, [name]: updatedValue };
    setFormData(updatedForm);
    setJob(updatedForm);
  };

  // Subject multi-select (checkbox style)
  const toggleSubject = (subjectId) => {
    const exists = formData.Subject_Ids.includes(subjectId);
    const updatedIds = exists
      ? formData.Subject_Ids.filter((id) => id !== subjectId)
      : [...formData.Subject_Ids, subjectId];
    const updatedForm = {
      ...formData,
      Subject_Ids: updatedIds,
      Subject_Id: updatedIds[0] ?? "", // keep first for backward-compat
    };
    setFormData(updatedForm);
    setJob(updatedForm);
  };

  const handleTimeChange = (name, value) => {
    const updated = { ...time, [name]: value };
    setTime(updated);
    const composed = updated.start && updated.end ? `${updated.start} - ${updated.end}` : "";
    const updatedForm = { ...formData, Duration: composed };
    setFormData(updatedForm);
    setJob(updatedForm);
  };

  const { data: subjects, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  if (isLoading) return (
    <p className="text-sm px-3 py-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-200/50 dark:border-orange-400/30">
      Loading subjects...
    </p>
  );
  if (error) return (
    <p className="text-sm px-3 py-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-300 border border-red-200/50 dark:border-red-400/30">
      Failed to load subjects
    </p>
  );

  return (
    <form className="space-y-4 p-4 sm:p-6 rounded-xl shadow-lg border transition 
      bg-white/90 dark:bg-[#1e1c2e]/90 text-gray-900 dark:text-gray-200 
      border-gray-200 dark:border-orange-400/20">
      {/* Job Title */}
      <input
        type="text"
        name="Title"
        placeholder="Job Title"
        value={formData.Title}
        onChange={handleChange}
        className={`border p-3 w-full rounded-lg text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500
               focus:ring-2 focus:ring-orange-400 outline-none ${showErrors && !formData.Title ? 'border-red-500 focus:ring-red-400' : ''}`}
      />

      {/* Description */}
      <textarea
        name="Description"
        placeholder="Description (Optional)"
        value={formData.Description}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500
               focus:ring-2 focus:ring-orange-400 outline-none"
      />

      {/* Subjects Multi-select Dropdown */}
      <div>
        <h2 className="text-base font-medium mb-2 text-orange-500">Select Subjects</h2>
        <Listbox value={formData.Subject_Ids} onChange={(vals) => {
          const updatedForm = { ...formData, Subject_Ids: vals, Subject_Id: vals[0] ?? "" };
          setFormData(updatedForm);
          setJob(updatedForm);
        }} multiple>
          <div className="relative">
            <Listbox.Button className={`w-full flex justify-between items-center p-3 rounded-lg 
              bg-gray-50 dark:bg-white/10 border border-gray-300 dark:border-gray-600 
              focus:ring-2 focus:ring-orange-400 cursor-pointer hover:border-orange-400 ${showErrors && (!formData.Subject_Ids || formData.Subject_Ids.length === 0) ? 'border-red-500 focus:ring-red-400' : ''}`}>
              <span className="truncate text-left">
                {formData.Subject_Ids?.length
                  ? `${formData.Subject_Ids.length} subject(s) selected`
                  : "-- Select Subjects --"}
              </span>
              <ChevronDown className="w-4 h-4 text-orange-500" />
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-[#2a273d] rounded-lg shadow-lg z-10 max-h-56 overflow-auto border border-gray-200 dark:border-gray-700">
              {subjects?.map((s) => (
                <Listbox.Option key={s.Subject_Id} value={s.Subject_Id}
                  className={({ active }) => `cursor-pointer px-4 py-2 flex items-center justify-between ${active ? 'bg-orange-500 text-white' : 'text-gray-700 dark:text-gray-200'}`}>
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
        {showErrors && (!formData.Subject_Ids || formData.Subject_Ids.length === 0) && (
          <p className="mt-2 text-xs text-red-500">At least one subject is required.</p>
        )}

        {/* Selected chips */}
        {formData.Subject_Ids?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.Subject_Ids.map((id) => {
              const subj = subjects?.find((s) => s.Subject_Id === id);
              if (!subj) return null;
              return (
                <span key={id} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300">
                  {subj.Subject_Name}
                  <button type="button" onClick={() => toggleSubject(id)} className="ml-1 hover:opacity-80">
                    <X size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Other Inputs */}
      <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">Duration (Optional)</label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="time"
            value={time.start}
            onChange={(e) => handleTimeChange('start', e.target.value)}
            className="border p-3 w-full rounded-lg text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <input
            type="time"
            value={time.end}
            onChange={(e) => handleTimeChange('end', e.target.value)}
            className="border p-3 w-full rounded-lg text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>
      </div>
      <input
        type="number"
        name="Fee"
        placeholder="Fee"
        value={formData.Fee}
        onChange={handleChange}
        className={`border p-3 w-full rounded-lg text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500
               focus:ring-2 focus:ring-orange-400 outline-none ${showErrors && !formData.Fee ? 'border-red-500 focus:ring-red-400' : ''}`}
      />
      <input
        type="text"
        name="Frequency"
        placeholder="Frequency (Optional - e.g. 2 days/week)"
        value={formData.Frequency}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg text-sm bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500
               focus:ring-2 focus:ring-orange-400 outline-none"
      />
    </form>
  );
};

export default JobDetailsForm;
