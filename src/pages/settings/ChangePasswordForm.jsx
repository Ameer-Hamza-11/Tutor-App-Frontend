import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changePasswordApi } from "../../apis/settingApi";
import { Eye, EyeOff } from "lucide-react";

const ChangePasswordForm = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const mutation = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => toast.success("Password updated successfully!"),
    onError: (err) => toast.error(err.message),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    mutation.mutate(form);
  };

  const toggle = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 space-y-5"
    >
      <p className="text-gray-600 dark:text-gray-400">
        Change your login credentials securely.
      </p>

      {/* Input Fields */}
      {[
        { label: "Current Password", name: "currentPassword", field: "current" },
        { label: "New Password", name: "newPassword", field: "new" },
        { label: "Confirm Password", name: "confirmPassword", field: "confirm" },
      ].map(({ label, name, field }) => (
        <div key={name} className="relative">
          <label className="block text-sm font-medium mb-1">{label}</label>
          <input
            type={show[field] ? "text" : "password"}
            name={name}
            value={form[name]}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <button
            type="button"
            onClick={() => toggle(field)}
            className="absolute right-3 top-9 text-gray-500 hover:text-orange-600"
          >
            {show[field] ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      ))}

      {/* Submit */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="px-5 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-all"
      >
        {mutation.isPending ? "Updating..." : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
