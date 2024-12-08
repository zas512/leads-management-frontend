import axiosInstance from "../helpers/interceptor";

export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getLeads = async () => {
  try {
    const response = await axiosInstance.get("/leads/get");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getStats = async () => {
  try {
    const response = await axiosInstance.get("/leads/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addLead = async (leadData) => {
  try {
    const response = await axiosInstance.post("/leads/create", leadData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateLead = async (leadData) => {
  try {
    const response = await axiosInstance.put(`/leads/update`, leadData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteLead = async (leadId) => {
  try {
    const response = await axiosInstance.delete(`/leads/delete?_id=${leadId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
