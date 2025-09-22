import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDemosBydemoIdApi,
  deleteDemosBydemoIdApi,
  approveDemosBydemoIdApi,
} from "../../apis/jobrequestsApi";
import { useOutletContext } from "react-router-dom";
import { Calendar, Clock, User, Briefcase, ArrowLeft, X } from "lucide-react";

const DemoSchedulesById = () => {
  const { demoId } = useParams();
  const { theme, toggleTheme } = useOutletContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ Start_Date: "", End_Date: "" });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["demoScheduleByDemoId", demoId],
    queryFn: () => getDemosBydemoIdApi(demoId),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteDemosBydemoIdApi(id),
    onSuccess: () => navigate("/admin/demoschedules"),
  });

  const approveMutation = useMutation({
    mutationFn: (payload) => approveDemosBydemoIdApi(demoId, payload),
    onSuccess: () => {
      setShowModal(false);
      navigate("/admin/demoschedules");
    },
  });

  const handleReject = (demoId) => {
    if (window.confirm("Are you sure you want to reject this demo?")) {
      deleteMutation.mutate(demoId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    approveMutation.mutate(form);
  };

  if (isLoading)
    return <p className={`text-center py-20 ${theme === "light" ? "text-indigo-600" : "text-indigo-400"}`}>Loading demo details...</p>;

  if (isError)
    return <p className={`text-center py-20 ${theme === "light" ? "text-red-600" : "text-red-400"}`}>Error loading demo ❌</p>;

  if (!data)
    return <p className={`text-center py-20 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>No demo found</p>;

  const demo = data;
  const scheduled = new Date(demo.Scheduled_DateTime);

  return (
    <div className={`p-6 max-w-5xl mx-auto rounded-2xl shadow-xl transition ${theme === "light" ? "bg-white border border-gray-200 text-gray-900" : "bg-gray-900 border border-gray-700 text-gray-100"}`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 px-3 py-1 text-sm rounded-full font-medium shadow-md transition ${theme === "light" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : "bg-gray-800 text-gray-200 hover:bg-gray-700"}`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-2xl font-extrabold flex-1 text-center">
          Demo Schedule #{demo.Demo_Id}
        </h1>

        <button
          onClick={toggleTheme}
          className={`px-3 py-1 text-sm rounded-full font-medium shadow-md transition ${theme === "light" ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
        >
          {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
        </button>
      </div>

      {/* Table (desktop) / Cards (mobile) */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse hidden md:table">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="py-2 px-4 text-left">Job</th>
              <th className="py-2 px-4 text-left">Tutor</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Date & Time</th>
              {demo.status?.Status_Code === "COMPLETED" && <th className="py-2 px-4 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="py-2 px-4">{demo.jobrequest?.job?.Title}</td>
              <td className="py-2 px-4">{demo.jobrequest?.tutor?.First_Name} {demo.jobrequest?.tutor?.Last_Name}</td>
              <td className="py-2 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${demo.status?.Description === "Scheduled" ? "bg-green-500 text-white" : "bg-yellow-400 text-black"}`}>
                  {demo.status?.Description}
                </span>
              </td>
              <td className="py-2 px-4">{scheduled.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} <br/> {scheduled.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</td>
              {demo.status?.Status_Code === "COMPLETED" && (
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => setShowModal(true)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                  <button onClick={() => handleReject(demo.Demo_Id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                </td>
              )}
            </tr>
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className={`p-4 rounded-lg shadow-md ${theme === "light" ? "bg-gray-50" : "bg-gray-800"}`}>
            <p className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-indigo-500" /> Job: {demo.jobrequest?.job?.Title}</p>
            <p className="flex items-center gap-2"><User className="w-4 h-4 text-blue-500" /> Tutor: {demo.jobrequest?.tutor?.First_Name} {demo.jobrequest?.tutor?.Last_Name}</p>
            <p>
              <strong>Status:</strong> <span className={`px-3 py-1 rounded-full text-xs font-semibold ${demo.status?.Description === "Scheduled" ? "bg-green-500 text-white" : "bg-yellow-400 text-black"}`}>{demo.status?.Description}</span>
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-500" /> {scheduled.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500" /> {scheduled.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </p>
            {demo.status?.Status_Code === "COMPLETED" && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => setShowModal(true)} className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                <button onClick={() => handleReject(demo.Demo_Id)} className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className={`relative w-full max-w-md p-6 rounded-lg shadow-xl ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-gray-100"}`}>
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Approve Demo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Start Date</label>
                <input type="date" value={form.Start_Date} onChange={(e) => setForm({ ...form, Start_Date: e.target.value })} className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <div>
                <label className="block text-sm mb-1">End Date</label>
                <input type="date" value={form.End_Date} onChange={(e) => setForm({ ...form, End_Date: e.target.value })} className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <button type="submit" disabled={approveMutation.isLoading} className={`w-full py-2 rounded-md font-semibold transition ${theme === "light" ? "bg-green-500 text-white hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}>
                {approveMutation.isLoading ? "Approving..." : "Confirm Approve"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoSchedulesById;
