import api from "./client";

export const editProfileApi = async (formData) => {
    try {
      const { data: res } = await api.post("/api/settings/edit-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Edit profile failed");
    }
  };
export const updateRoleApi = async (data) => {
    try {
        const { data: res } = await api.patch("/api/settings/update-role", data);
        return res;
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Update role failed");
    }
}


export const changePasswordApi = async (data) => {
    try {
        const { data: res } = await api.patch("/api/settings/change-password", data);
        return res;
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Change password failed");
    }
};


export const deleteAccountApi = async (data) => {
    try {
        const { data: res } = await api.delete("/api/settings/delete-account", { data });
        return res;
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Delete account failed");
    }
}
