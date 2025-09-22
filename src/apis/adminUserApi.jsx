import api from "./client";




export const editUserApi = async (data) => {
    try {
        const { data: res } = await api.patch("/api/auth/edit-user", data);
        return res;
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Edit user failed");
    }
}

export const deleteUserApi = async (data) => {
    try {
        const { data: res } = await api.delete("/api/auth/delete-user", { data });
        return res;
    } catch (error) {
        throw new Error(error?.response?.data?.message || "Delete user failed");
    }
}