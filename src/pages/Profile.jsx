import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getProfileByUserId } from "../apis/jobApi";
import { setProfile } from "../../store/slices/authSlice";
import { useTheme } from "../context/ThemeProvider";
import {
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  User,
  Briefcase,
  UserCircle,
} from "lucide-react";

const defaultAvatar = "/images/default-avatar.png";

const Profile = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile", user?.User_Id],
    queryFn: () => getProfileByUserId(user?.User_Id),
    enabled: !!user?.User_Id,
  });

  useEffect(() => {
    if (profile) {
      dispatch(
        setProfile({
          user: profile,
          userDetails: profile.userdetails?.[0],
          address: profile.userdetails?.[0]?.address,
          education: profile.educationdetails,
        })
      );
    }
  }, [profile, dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full"
        />
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 font-semibold">
        ❌ Failed to load profile.
      </p>
    );

  const details = profile?.userdetails?.[0];
  const profilePic = details?.Profile_Picture
    ? `${import.meta.env.VITE_BASE_URL}/uploads/picture/${details.Profile_Picture}`
    : defaultAvatar;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`max-w-3xl mx-auto p-6 rounded-xl border shadow-lg mt-8 ${
        theme === "light"
          ? "bg-white border-gray-200 text-gray-900"
          : "bg-gray-800 border-gray-700 text-gray-200"
      }`}
    >
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-5 border-b pb-5">
        <img
          src={profilePic}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-orange-500 shadow-md"
        />
        <div className="text-center sm:text-left">
          <h2
            className={`text-2xl font-bold ${
              theme === "light" ? "text-orange-600" : "text-orange-400"
            }`}
          >
            {profile.First_Name} {profile.Last_Name}
          </h2>
          <p className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Mail size={16} className="text-orange-500" /> {profile.Email}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-6 space-y-10">
        {/* Personal Info */}
        <section>
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <UserCircle size={20} className="text-orange-500" />
            Personal Information
          </h3>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-orange-500" />
              <span className="font-semibold">Phone:</span>{" "}
              {profile.Phone_Number}
            </p>
            {details?.gender && (
              <p className="flex items-center gap-2">
                <User size={18} className="text-orange-500" />
                <span className="font-semibold">Gender:</span>{" "}
                {details.gender.Gender_Description}
              </p>
            )}
            {details?.address && (
              <p className="flex items-center gap-2">
                <MapPin size={18} className="text-orange-500" />
                <span className="font-semibold">Address:</span>{" "}
                {details.address.AddressLine1},{" "}
                {details.address.city?.City_Name},{" "}
                {details.address.country?.Country_Name}
              </p>
            )}
          </div>
        </section>

        {/* Education */}
        {profile.educationdetails?.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <GraduationCap size={20} className="text-orange-500" />
              Education
            </h3>
            <div className="space-y-3">
              {profile.educationdetails.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border shadow-sm ${
                    theme === "light"
                      ? "bg-gray-50 border-gray-200"
                      : "bg-gray-700 border-gray-600"
                  }`}
                >
                  <p className="font-semibold text-orange-500">{edu.Degree}</p>
                  <p className="text-sm">{edu.Institution}</p>
                  {edu.Year_Of_Completion && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Completed: {edu.Year_Of_Completion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional / About */}
        {details?.Description && (
          <section>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Briefcase size={20} className="text-orange-500" />
              Professional Information
            </h3>
            <p className="text-sm leading-relaxed">
              {details.Description}
            </p>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
