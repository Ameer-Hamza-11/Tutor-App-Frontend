import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDemosBydemoIdApi,
  deleteDemosBydemoIdApi,
  approveDemosBydemoIdApi,
} from "../../apis/jobrequestsApi";
import { useOutletContext } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Briefcase,
  Hash,
  ArrowLeft,
  X,
} from "lucide-react";

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
  console.log(data);


  const deleteMutation = useMutation({
    mutationFn: (id) => deleteDemosBydemoIdApi(id),
    onSuccess: () => navigate("/admin/demoschedules"),
    onError: (error) => console.error("Error deleting demo:", error),
  });

  const approveMutation = useMutation({
    mutationFn: (payload) => approveDemosBydemoIdApi(demoId, payload),
    onSuccess: (data) => {
      console.log('Approve form', data);

      setShowModal(false);
      navigate("/admin/demoschedules");
    },
    onError: (error) => console.error("Error approving demo:", error),
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
    return (
      <p
        className={`text-center py-20 ${theme === "light" ? "text-indigo-600" : "text-indigo-400"
          }`}
      >
        Loading demo details...
      </p>
    );

  if (isError)
    return (
      <p
        className={`text-center py-20 ${theme === "light" ? "text-red-600" : "text-red-400"
          }`}
      >
        Error loading demo ❌
      </p>
    );

  if (!data)
    return (
      <p
        className={`text-center py-20 ${theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}
      >
        No demo found
      </p>
    );

  const demo = data;
  const scheduled = new Date(demo.Scheduled_DateTime);

  return (
    <div
      className={`p-6 max-w-3xl mx-auto rounded-2xl shadow-xl transition ${theme === "light"
        ? "bg-white border border-gray-200 text-gray-900"
        : "bg-gray-900 border border-gray-700 text-gray-100"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 px-3 py-1 text-sm rounded-full font-medium shadow-md transition ${theme === "light"
            ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
            : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-2xl font-extrabold">
          Demo Schedule #{demo.Demo_Id}
        </h1>

        <button
          onClick={toggleTheme}
          className={`px-3 py-1 text-sm rounded-full font-medium shadow-md transition ${theme === "light"
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
        >
          {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
        </button>
      </div>

      {/* Info Section */}
      <div className="space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-500" /> Request ID: {demo.Request_Id}
        </p>
        <p className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-500" /> Job:{" "}
          {demo.jobrequest?.job?.Title}
        </p>
        <p className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" /> Tutor:{" "}
          {demo.jobrequest?.tutor?.First_Name} {demo.jobrequest?.tutor?.Last_Name}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold w-max ${demo.status?.Description === "Scheduled"
              ? "bg-green-500 text-white"
              : "bg-yellow-400 text-black"
              }`}
          >
            {demo.status?.Description}
          </span>
        </p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-green-500">
            <Calendar className="w-4 h-4" />
            {scheduled.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1 text-indigo-500">
            <Clock className="w-4 h-4" />
            {scheduled.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Approve / Reject Buttons */}
      {demo.status?.Status_Code === "COMPLETED" && (
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setShowModal(true)}
            className={`flex-1 px-5 py-2.5 rounded-lg font-semibold shadow-md transition ${theme === "light"
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-green-600 text-white hover:bg-green-700"
              }`}
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(demo.Demo_Id)}
            className={`flex-1 px-5 py-2.5 rounded-lg font-semibold shadow-md transition ${theme === "light"
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-red-600 text-white hover:bg-red-700"
              }`}
          >
            Reject
          </button>
        </div>
      )}

      {/* Approve Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div
            className={`relative w-full max-w-md p-6 rounded-lg shadow-xl ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-800 text-gray-100"
              }`}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">Approve Demo</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Start Date</label>
                <input
                  type="date"
                  value={form.Start_Date}
                  onChange={(e) =>
                    setForm({ ...form, Start_Date: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">End Date</label>
                <input
                  type="date"
                  value={form.End_Date}
                  onChange={(e) =>
                    setForm({ ...form, End_Date: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={approveMutation.isLoading}
                className={`w-full py-2 rounded-md font-semibold transition ${theme === "light"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-green-600 text-white hover:bg-green-700"
                  }`}
              >
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
