import axios from "axios";

const API_URL = "http://localhost:8000/auth";

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response?.data;
}

export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response?.data;
}

export const logoutUser = async () => {
  localStorage.removeItem("user");
  axios.get(`${API_URL}/logout`).then(res => {
    console.log(res);
  }).catch(err => console.log(err));
}



