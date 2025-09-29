import api from "./client";

export const editProfileApi = async (data) => {
    const payload = new FormData();

    payload.append("UserId", data.UserId);
    payload.append("First_Name", data.First_Name);
    payload.append("Last_Name", data.Last_Name);
    payload.append("Phone_Number", data.Phone_Number);
    payload.append("Date_Of_Birth", data.Date_Of_Birth);
    payload.append("Gender_Id", data.Gender_Id);
    payload.append("Additional_Info", data.Additional_Info);
    payload.append("Description", data.Description);
    payload.append("AddressLine1", data.AddressLine1);
    payload.append("City_Id", data.City_Id);
    payload.append("Country_Id", data.Country_Id);
    payload.append("Postal_Code", data.Postal_Code);
    payload.append("Subject_Id", data.Subject_Id);
    if (data.Subject_Ids && Array.isArray(data.Subject_Ids)) {
        payload.append("Subject_Ids", JSON.stringify(data.Subject_Ids));
    }

    if (data.Profile_Picture) {
        payload.append("Profile_Picture", data.Profile_Picture);
    }

    try {
        const { data: res } = await api.patch("/api/settings/edit-profile", payload, {
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
