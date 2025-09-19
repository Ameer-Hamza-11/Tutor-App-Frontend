import api from "./client";


//? fetch all subjects
export const fetchSubjects = async () => {
    try {
        const { data } = await api.get("/api/fetchData/subjects");
        console.log("Fetched subjects:", data);

        return data;
    } catch (error) {
        console.log("Error in fetchSubjects:", error);
        throw error; // ❌ better throw so caller can handle the error
    }
}

//? fetch all Genders
export const fetchGenders = async () => {
    try {
        const { data } = await api.get("/api/fetchData/genders");
        console.log("Fetched genders:", data);

        return data;
    } catch (error) {
        console.log("Error in fetchGenders:", error);
        throw error;
    }
}


//? fetch all cities
export const fetchCities = async () => {
    try {
        const { data } = await api.get("/api/fetchData/cities");
        console.log("Fetched cities:", data);

        return data;
    } catch (error) {
        console.log("Error in fetchCities:", error);
        throw error;
    }
}
//? fetch all countries
export const fetchCountries = async () => {
    try {
        const { data } = await api.get("/api/fetchData/countries");
        console.log("Fetched countries:", data);

        return data;
    } catch (error) {
        console.log("Error in fetchCountries:", error);
        throw error;
    }
}


//? fetch all users
export const fetchUsers = async () => {
    try {
        const { data } = await api.get("/api/fetchData/users");
        console.log("Fetched users:", data);
        return data;
    } catch (error) {
        console.log("Error in fetchUsers:", error);
        throw error;
    }
}


//? fetch user by ID
export const fetchUserById = async (User_Id) => {
    try {
        const { data } = await api.get(`/api/fetchData/users/${User_Id}`);
        console.log("Fetched user by ID:", data);
        return data;
    } catch (error) {
        console.log("Error in fetchUserById:", error);
        throw error;
    }
}




