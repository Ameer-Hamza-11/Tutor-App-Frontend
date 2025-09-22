import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateRoleApi } from "../../apis/settingApi";

const ChangeRoleForm = () => {
  const [role, setRole] = useState("Student");

  const mutation = useMutation({
    mutationFn: updateRoleApi,
    onSuccess: () => toast.success("Role updated successfully!"),
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ role });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 space-y-4"
    >
      <p className="text-gray-600 dark:text-gray-400">
        Choose your role for the platform.
      </p>

      {/* Role Options */}
      <div className="flex gap-3 flex-wrap">
        {["Student", "Tutor"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`px-4 py-2 rounded-lg transition-all border ${
              role === r
                ? "bg-orange-600 text-white border-orange-600 shadow-md"
                : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-gray-700"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-5 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-all"
      >
        {mutation.isPending ? "Updating..." : "Save Role"}
      </button>
    </form>
  );
};

export default ChangeRoleForm;
