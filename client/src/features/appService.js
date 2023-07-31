import axios from "axios";

const API_URL = "/admin/calendar";

export const addSomeEvent = async(event, accessToken) => {
  const response = await axios.post(API_URL, event, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  console.log(response.data);
  return response.data;
}