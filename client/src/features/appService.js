import axios from "axios";

const API_URL = "/admin/calendar";

export const addSomeEvent = async(event) => {
  const response = await axios.post(API_URL, event);
  console.log(response.data);
  return response.data;
}

export const getEventsForDate = async () => {

}