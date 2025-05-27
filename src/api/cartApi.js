import axios from "axios";

// import { useAuthContext } from "../context/AuthContext";
// import { useWarehouseContext } from "../context/WarehouseContext";
// import AuthContext from "../context/AuthContext";
// const API_BASE_URL = "https://kifitest.zbeanztech.com";
// const API_BASE_URL = "http://97.74.86.77:8007";
export const API_BASE_URL = "https://kifionline.in";

// const user_id = 96;
// const UseAuthContext = useContext(AuthContext);

// const warehouse_id = 12;
export const createFirstSaleOrder = async function (cart, user_id) {
  const cartToAdd = cart?.map((el) => {
    return { product_id: el.product_id, quantity: el.product_uom_qty };
  });

  const warehouse_id =
    JSON.parse(localStorage.getItem("selectedWarehouse")) * 1;
  // console.log(cartToAdd, cart, user_id, warehouse_id, "createFirstSaleOrder");

  try {
    const response = await axios.post(`${API_BASE_URL}/create_sale_order`, {
      params: {
        user_id,
        warehouse_id,
        products: cartToAdd,
      },
    });
    console.log(response.data, "adding to cart");

    return response.data.result;
  } catch (err) {
    console.error("error in adding remote cart:", err);
  }
};
export const addToRemotCart = async function (product_id, quantity) {
  const user_id = localStorage.getItem("userId") * 1;
  const warehouse_id =
    JSON.parse(localStorage.getItem("selectedWarehouse")) * 1;
  console.log(warehouse_id, user_id, "addToRemotCartdata");

  try {
    const response = await axios.post(`${API_BASE_URL}/create_sale_order`, {
      params: {
        user_id,
        warehouse_id,
        products: [{ product_id, quantity }],
      },
    });
    console.log(response.data.result, "cart add response");
    const sale_order_id = response.data.result.sale_order_id;
    localStorage.setItem("saleOrderId", sale_order_id);

    return response.data.result;
  } catch (err) {
    console.error("error in adding remote cart:", err);
  }
};
// -----------------

export const getRemoteCart = async (sale_order_id) => {
  const response = await axios.post(`${API_BASE_URL}/get_sale_order`, {
    params: {
      sale_order_id,
    },
  });
  return response;
};

export const UpdateRemoteCart = async (saleOrderId, productArray) => {
  console.log(productArray, "product array from update cart");

  try {
    const response = await axios.post(`${API_BASE_URL}/update_sale_order`, {
      params: {
        sale_order_id: saleOrderId,
        products: productArray,
      },
    });
    console.log(response, "responseeee");
  } catch (err) {
    console.error("couldnt delete from cart", err);
  }
};

export const UpdateSaleOrderStatus = async (status) => {
  const saleOrderId = localStorage.getItem("saleOrderId") * 1;
  if (typeof saleOrderId !== "number") {
    return "wrong sale order id";
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/update_sale_order_status`,
      {
        params: {
          sale_order_id: saleOrderId,
          status: status,
        },
      }
    );
    console.log(response, "responsee from updating sale order staus");
    return response;
  } catch (err) {
    console.error("couldnt delete from cart", err);
  }
};
export const deleteRemoteCart = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/edit_cart`, {
      params: {
        order_id: 7224,
        product_id: 22,
      },
    });
    console.log(response, "responseeee");
  } catch (err) {
    console.error("couldnt delete from cart", err);
  }
};
