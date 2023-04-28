import axios from "axios";

const API_URL = "/auth";

// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
}

export const logoutUser = async () => {
  localStorage.removeItem("user");
}



