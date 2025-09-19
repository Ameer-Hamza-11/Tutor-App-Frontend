import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getJobApiById } from "../apis/jobApi";
import { postJobRequestApi } from "../apis/jobrequestsApi";
import { useTheme } from "../context/ThemeProvider";
import { useSelector } from "react-redux";

const defaultAvatar = "/images/default-avatar.png";

const FindJobById = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const queryClient = useQueryClient();

    const user = useSelector((state) => state.auth.user); // Logged-in user
    const [requestStatus, setRequestStatus] = useState("");

    const { data: job, isLoading, isError } = useQuery({
        queryKey: ["job", id],
        queryFn: () => getJobApiById(id),
    });

    // console.log( 'User data',user);
    const mutation = useMutation({
        mutationFn: () =>
            postJobRequestApi({ Job_Id: id, Tutor_Id: user?.User_Id }),
        onSuccess: () => {
            setRequestStatus("Request sent successfully ✅");
            queryClient.invalidateQueries(["job", id]);
        },
        onError: () => {
            setRequestStatus("Failed to send request ❌");
        },
    });

    const handleRequest = () => {
        if (!user) return alert("Please login to apply!");
        mutation.mutate();
    };

    if (isLoading)
        return <p className="text-center text-pink-400">Loading job...</p>;

    if (isError || !job)
        return <p className="text-center text-red-500">Job not found.</p>;

    const student = job.student;
    const details = student.userdetails?.[0];
    const profilePic = details?.Profile_Picture
        ? `${import.meta.env.VITE_BASE_URL}/uploads/picture/${details.Profile_Picture}`
        : defaultAvatar;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`max-w-3xl mx-auto p-6 rounded-xl border shadow-lg mt-8 ${theme === "light"
                ? "bg-white border-gray-200 text-gray-900"
                : "bg-[#1a172e] border-pink-400/20 text-gray-200"
                }`}
        >
            {/* Back Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg mb-6 shadow-md transition ${theme === "light"
                    ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
                    : "bg-pink-500/20 text-pink-300 hover:bg-pink-500/30"
                    }`}
            >
                <ArrowLeft size={18} />
                Back
            </motion.button>

            {/* Header */}
            <div className="flex items-center gap-4">
                <img
                    src={profilePic}
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-pink-400"
                />
                <div>
                    <h2
                        className={`text-2xl font-bold ${theme === "light" ? "text-pink-600" : "text-pink-400"
                            }`}
                    >
                        {job.Title}
                    </h2>
                    <p className="text-sm">{job.subject?.Subject_Name}</p>
                </div>
            </div>

            {/* Job Details */}
            <div className="mt-6 space-y-3">
                <p>
                    <span className="font-semibold">Description:</span> {job.Description}
                </p>
                <p>
                    <span className="font-semibold">Duration:</span> {job.Duration}
                </p>
                <p>
                    <span className="font-semibold">Fee:</span> {job.Fee} PKR
                </p>
                <p>
                    <span className="font-semibold">Frequency:</span> {job.Frequency}
                </p>
                <p>
                    <span className="font-semibold">Status:</span> {job.status?.Description}
                </p>
            </div>

            {/* Student Info */}
            <div className="mt-6 border-t pt-4 space-y-2">
                <h3 className="text-lg font-semibold mb-2">Student Info</h3>
                <p>
                    <span className="font-semibold">Name:</span> {student.First_Name}{" "}
                    {student.Last_Name}
                </p>
                <p>
                    <span className="font-semibold">Email:</span> {student.Email}
                </p>
                <p>
                    <span className="font-semibold">Phone:</span> {student.Phone_Number}
                </p>
            </div>

            {/* Apply / Request Button */}
            {(user?.role === "Teacher" || user?.role === "Admin") && (
                <div className="mt-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRequest}
                        disabled={mutation.isLoading}
                        className={`w-full px-4 py-2 rounded-lg font-semibold shadow-md transition ${theme === "light"
                            ? "bg-pink-600 text-white hover:bg-pink-700"
                            : "bg-pink-400 text-gray-900 hover:bg-pink-500"
                            }`}
                    >
                        {mutation.isLoading ? "Sending Request..." : "Apply / Request"}
                    </motion.button>
                    {requestStatus && (
                        <p
                            className={`mt-2 text-sm font-medium ${requestStatus.includes("❌") ? "text-red-500" : "text-green-500"
                                }`}
                        >
                            {requestStatus}
                        </p>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default FindJobById;
