import axios from 'axios';

const API_BASE = 'http://localhost:5000'; // Replace with actual API base

export const fetchGraphData = async () => {
  const response = await axios.get(`${API_BASE}/graph`);
  return response.data;
};

export const fetchDependencies = async (flow) => {
  const response = await axios.get(`${API_BASE}/dependencies?flow=${flow}`);
  return response.data;
};

export const fetchConfig = async (flow) => {
  const response = await axios.get(`${API_BASE}/configuration?flow=${flow}`);
  return response.data;
};

export const saveConfig = async (config) => {
  await axios.post(`${API_BASE}/configuration`, config);
};
