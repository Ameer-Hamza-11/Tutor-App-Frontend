import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateRoleApi } from "../../apis/settingApi";
import { useSelector } from "react-redux";

const ChangeRoleForm = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const roles = [
    { id: 2, name: "Teacher" },
    { id: 3, name: "Student" },
  ];

  // 🔹 Mutation hook
  const mutation = useMutation({
    mutationFn: updateRoleApi,
    onSuccess: (data) => {
      toast.success(data.message || "Role updated successfully ✅");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update role ❌");
    },
  });

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) return toast.error("Please select a role");
    if (!user?.User_Id) return toast.error("User not found in session");

    // 🔹 Ab exact backend ke keys bhej rahe hain
    mutation.mutate({
      UserId: user.User_Id, // backend UserId expect kar raha hai
      Role_Id: selectedRole,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <h3 className="text-lg font-semibold">Select Your Role</h3>

      <div className="flex gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => handleRoleChange(role.id)}
            className={`px-4 py-2 rounded-lg border transition-colors ${selectedRole === role.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
          >
            {role.name}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {mutation.isPending ? "Saving..." : "Save Role"}
      </button>
    </form>
  );
};

export default ChangeRoleForm;
