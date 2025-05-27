import axios from "axios";
const API_BASE_URL = "https://kifionline.in";

export const addNewAddress = async (address) => {
  const user_id = localStorage.getItem("userId") * 1;
  console.log(address, "........");

  try {
    const response = await axios.post(`${API_BASE_URL}/add_address`, {
      params: {
        user_id,
        address1: address.street,
        address2: address.phone1,
        mobile: address.phone1,
        ...address,
      },
    });

    // console.log(response, "responseeee");
    return response;
  } catch (err) {
    console.error("couldnt delete from adding addresss:", err.message);
  }
};
export const getUserAddress = async () => {
  const user_id = localStorage.getItem("userId") * 1;
  // console.log(user_id, "user_id");

  try {
    const response = await axios.post(`${API_BASE_URL}/get_user_address`, {
      params: {
        user_id,
      },
    });
    // console.log(response, "responseeee user addressss");
    return response;
  } catch (err) {
    console.error("error from user address:", err.message);
  }
};

export const updateAddress = async (address) => {
  // const user_id = localStorage.getItem("userId") * 1;
  // console.log(address, "event");

  try {
    const response = await axios.post(`${API_BASE_URL}/update_address`, {
      params: {
        address_id: address?.id,
        default_address: true,
        name: address?.name,
        address1: address?.street,
        address2: "",
        city: address?.city,
        postcode: address.zip,
        email: address?.email,
        mobile: address?.phone1,
        landmark: address?.landmark,
      },
    });
    console.log(response, "responseeee");
    return response;
  } catch (err) {
    console.error("error from updating address:", err.message);
  }
};

export const deleteAddress = async (address_id) => {
  // const user_id = localStorage.getItem("userId") * 1;
  // console.log(address, "event");
  try {
    const response = await axios.post(`${API_BASE_URL}/delete_address`, {
      params: {
        address_id,
      },
    });
    console.log(response, "responseeee");
    return response;
  } catch (err) {
    console.error("error from deleting address:", err.message);
  }
};

export const changeDefaultAddress = async (address_id) => {
  // const user_id = localStorage.getItem("userId") * 1;
  // console.log(address, "event");
  try {
    const response = await axios.post(`${API_BASE_URL}/set_default_address`, {
      params: {
        address_id,
      },
    });
    console.log(response, "yreaa");
    return response;
  } catch (err) {
    console.error("error from deleting address:", err.message);
  }
};
