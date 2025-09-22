import React from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAccountApi } from "../../apis/settingApi";

const DangerZone = () => {
  const mutation = useMutation({
    mutationFn: deleteAccountApi,
    onSuccess: () => toast.success("Account deleted permanently!"),
    onError: (err) => toast.error(err.message),
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      mutation.mutate();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-red-400/50 space-y-4">
      <p className="text-gray-600 dark:text-gray-400">
        Deleting your account is permanent and cannot be undone. Please proceed
        with caution.
      </p>

      <button
        onClick={handleDelete}
        disabled={mutation.isPending}
        className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-all"
      >
        {mutation.isPending ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
};

export default DangerZone;
