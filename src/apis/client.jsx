import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.defaults.headers.common["Content-Type"] = "application/json";

const savedToken = localStorage.getItem("token");
if (savedToken) {
  setAuthToken(savedToken);
}

export default api;
