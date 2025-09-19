import api from "./client";






export const getJobsApi = async () => {
    try {
        const { data } = await api.get("/api/jobs");
        return data;
    } catch (error) {
        console.log("Error in getJobsApi:", error);
        throw error;
    }
}

export const getJobApiById = async (id) => {
    try {
        const { data } = await api.get(`/api/jobs/${id}`);
        return data;
    } catch (error) {
        console.log("Error in getJobsApi:", error);
        throw error;
    }
}

export const getProfileByUserId = async (userid) => {
    try {
        const { data } = await api.get(`/api/jobs/profile/${userid}`);
        return data;
    } catch (error) {
        console.log("Error in getJobsApi:", error);
        throw error;
    }
}


export const postJobApi = async ({ job, userDetails, address, educationDetails }) => {
    console.log("📤 Sending Payload to Backend:", { job, userDetails, address, educationDetails });

    const formData = new FormData();
    formData.append("job", JSON.stringify(job));
    formData.append("userDetails", JSON.stringify(userDetails));
    formData.append("address", JSON.stringify(address));

    educationDetails.forEach((edu, idx) =>
        formData.append(`educationDetails[${idx}]`, JSON.stringify(edu))
    );

    if (userDetails.Profile_Picture) {
        formData.append("Profile_Picture", userDetails.Profile_Picture);
    }

    try {
        const { data } = await api.post("/api/jobs", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
    } catch (error) {
        console.log("Error in postJobApi:", error);
        throw error;
    }
};
