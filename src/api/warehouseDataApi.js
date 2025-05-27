import axios from 'axios';

const API_BASE_URL  = "https://kifionline.in"


export const fetchWarehouseData = async (warehouse) => {

    const response = await axios.post(`${API_BASE_URL}/get_home_page`,{
      params: {
        warehouse_id: warehouse,
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;

};