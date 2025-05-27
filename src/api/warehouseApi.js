import axios from 'axios';
const API_BASE_URL  = "https://kifionline.in"


export const fetchWarehouses = async () => {
  const response = await axios.post(`${API_BASE_URL}/get_warehouses`,{
    "params":{}
 });
  return response.data;
};