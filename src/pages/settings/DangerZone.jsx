import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteAccountApi } from "../../apis/settingApi";
import { logout } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const DangerZone = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 🔹 Mutation hook
  const mutation = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: (data) => {
      toast.success(data.message || "Account deleted successfully ✅");
      dispatch(logout());
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete account ❌");
    },
  });

  const handleDelete = () => {
    if (!user?.User_Id) {
      return toast.error("User not found in session");
    }

    // Confirmation before delete
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete your account? This action cannot be undone!"
    );
    if (!confirmDelete) return;

    mutation.mutate({ UserId: user.User_Id });
  };

  return (
    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl shadow-md border border-red-300 dark:border-red-700">
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
        Account Deletation
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        Deleting your account is permanent and cannot be undone. Please proceed
        with caution.
      </p>

      <button
        onClick={handleDelete}
        disabled={mutation.isPending}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
      >
        {mutation.isPending ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
};

export default DangerZone;
