import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { changePasswordApi } from "../../apis/settingApi";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons for show/hide

const ChangePasswordForm = () => {
  const user = useSelector((state) => state.auth.user);

  const [Old_Password, setOld_Password] = useState("");
  const [New_Password, setNew_Password] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Mutation hook
  const mutation = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully ✅");
      setOld_Password("");
      setNew_Password("");
      setConfirmPassword("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update password ❌");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Old_Password || !New_Password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (New_Password !== confirmPassword) {
      return toast.error("New password and confirm password must match");
    }

    if (!user?.User_Id) {
      return toast.error("User not found in session");
    }

    mutation.mutate({
      UserId: user.User_Id,
      Old_Password: Old_Password,
      New_Password: New_Password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <h3 className="text-lg font-semibold">Change Password</h3>

      {/* Old Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Old Password"
          value={Old_Password}
          onChange={(e) => setOld_Password(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* New Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={New_Password}
          onChange={(e) => setNew_Password(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {mutation.isPending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
