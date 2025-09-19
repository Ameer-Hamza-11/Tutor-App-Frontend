import api from "./client";


export const postJobRequestApi = async ({ Job_Id, Tutor_Id }) => {
    try {
        const { data } = await api.post("/api/jobrequests", { Job_Id, Tutor_Id });
        return data;
    } catch (error) {
        console.log("Error in postJobRequestApi:", error);
        throw error;
    }
}

export const getAllJobRequestApi = async () => {
    try {
        const { data } = await api.get("/api/jobrequests");
        return data;
    } catch (error) {
        console.log("Error in postJobRequestApi:", error);
        throw error;
    }
}

export const getJobRequestByIdApi = async (id) => {
    try {
        const { data } = await api.get(`/api/jobrequests/${id}`);
        return data;
    } catch (error) {
        console.log("Error in postJobRequestApi:", error);
        throw error;
    }
}

export const deleteJobRequestApi = async (id) => {
    try {
        const { data } = await api.delete(`/api/jobrequests/${id}`);
        return data;
    } catch (error) {
        console.log("Error in deleteJobRequestApi:", error);
        throw error;
    }
}

export const getAllDemoSchedules = async () => {
    try {
        const { data } = await api.get("/api/demoschedules/request");
        return data;

    } catch (error) {
    }
}


export const scheduleDemoApi = async (schedule) => {
    try {
        const { data } = await api.post("/api/demoschedules", schedule);
        return data;
    } catch (error) {
        console.log("Error in scheduleDemoApi:", error);
        throw error;
    }
}

export const getDemosBydemoIdApi = async (demoId) => {
    try {
        const { data } = await api.get(`/api/demoschedules/${demoId}`);
        return data;
    } catch (error) {
        console.log("Error in getDemosBydemoIdApi:", error);
        throw error;
    }
}


export const deleteDemosBydemoIdApi = async (demoId) => {
    try {
        const { data } = await api.delete(`/api/demoschedules/${demoId}`);
        return data;
    } catch (error) {
        console.log("Error in deleteDemosBydemoIdApi:", error);
        throw error;
    }
}

export const approveDemosBydemoIdApi = async (demoId, formData) => {
    try {
        const { data } = await api.post(`/api/demoschedules/${demoId}`, formData);
        return data;
    } catch (error) {
        console.log("Error in approveDemosBydemoIdApi:", error);
        throw error;
    }
}


export const getAllAssignedJobsApi = async () => {
    try {
        const { data } = await api.get("/api/tutorassignments");
        return data;

    } catch (error) {
        console.log("Error in getAllAssignedJobsApi:", error);
        throw error;

    }
}

export const getTutorAssignmentById = async (id) => {
    try {
        const { data } = await api.get(`/api/tutorassignments/${id}`);
        return data;

    } catch (error) {
        console.log("Error in getTutorAssignmentById:", error);
        throw error;

    }
}