import axios from "axios";
import {
  createFirstSaleOrder,
  getRemoteCart,
  UpdateRemoteCart,
} from "./cartApi";
// const API_BASE_URL = "https://kifitest.zbeanztech.com";
// const API_BASE_URL = "http://97.74.86.77:8007";
const API_BASE_URL = "http://sedeeradmin.ddns.me:8066";

export const genarateOtp = async function (mobile) {
  const response = await axios.post(API_BASE_URL + "/generate/otp/", {
    params: {
      mobile: `${mobile}`,
    },
  });
  return response;
  // console.log("Response Headers:", response);
};

export const Login = async function (username, password) {
  try {
    const response = await axios.post(API_BASE_URL + "/verify/otp", {
      params: {
        username,
        password,
      },
    });
    console.log(response, "verifyOtp response");
    const userId = response?.data?.result?.data?.user;
    const [sale_order] = response?.data?.result?.data?.sale_orders;
    localStorage.setItem("saleOrderId", sale_order?.order_id);
    const sale_order_id = sale_order?.order_id;
    if (sale_order_id) {
      syncCart(sale_order_id);
    } else {
      const isCart = localStorage.getItem("cart");
      if (isCart === "undefined" || isCart === "null") {
        localStorage.setItem("cart", "[]");
      } else {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart.length > 0) {
          const addedToCartRes = createFirstSaleOrder(cart, userId);

          const saleOrderId = addedToCartRes.sale_order_id;
          console.log(addedToCartRes, "addToRemotCart");
          localStorage.setItem("saleOrderId", saleOrderId);
        }
      }
    }
    // console.log(sale_order, "Firstorder");
    // console.log(response, "---------user drafts-----------");

    return response?.data?.result;
  } catch (err) {
    console.log(err.message, "hieee");
    return;
  }
};

// ----------------------------------------------cart syncing on login-------------------
const syncCart = async (saleOrderId) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(saleOrderId, "saleOrderId");

  if (!Array.isArray(cart)) {
    console.error("Cart data is not in the correct format.");
    return;
  }
  const saleOrder = await getRemoteCart(saleOrderId);
  // console.log(saleOrder, "saleOrderIdddddddddd");

  const prevCart = saleOrder?.data?.result?.sale_order?.order_lines || [];

  const totalCart = [...cart, ...prevCart];
  // console.log("totalCart", totalCart);

  const cartWithoutDuplication = totalCart.filter(
    (item, index, self) =>
      index === self.findIndex((obj) => obj.product_id === item.product_id)
  );
  // console.log("cartWithoutDuplication", cartWithoutDuplication);

  const cartToUpdate = cartWithoutDuplication.map((obj) => {
    return { product_id: obj.product_id, quantity: obj.product_uom_qty };
  });
  console.log("cartToUpdate", cartToUpdate);

  try {
    await UpdateRemoteCart(saleOrderId, cartToUpdate);
    const newCart = await getRemoteCart(saleOrderId);
    const orderLines = newCart?.data?.result?.sale_order?.order_lines;
    localStorage.setItem("cart", JSON.stringify(orderLines));

    console.log("Cart synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing cart:", error);
  }
};
// -------------------------------------------------
// const syncCart = async (saleOrderId) => {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   console.log(saleOrderId, "saleOrderId during login");

//   if (!Array.isArray(cart)) {
//     console.error("Cart data is not in the correct format.");
//     return;
//   }

//   if (!saleOrderId) {
//     console.warn(
//       "saleOrderId not available during login. Syncing local cart only."
//     );
//     try {
//       const cartToUpdate = cart.map((obj) => {
//         return { product_id: obj.product_id, quantity: obj.product_uom_qty };
//       });
//       localStorage.setItem("cart", JSON.stringify(cartToUpdate));
//       console.log("Cart updated from local storage.");
//     } catch (error) {
//       console.error("Error updating cart from local storage:", error);
//     }
//     return;
//   }

//   try {
//     const saleOrder = await getRemoteCart(saleOrderId);
//     console.log(saleOrder, "Response from getRemoteCart");

//     const prevCart = saleOrder?.data?.result?.sale_order?.order_lines || [];
//     const totalCart = [...cart, ...prevCart];

//     const cartWithoutDuplication = totalCart.filter(
//       (item, index, self) =>
//         index === self.findIndex((obj) => obj.product_id === item.product_id)
//     );

//     const cartToUpdate = cartWithoutDuplication.map((obj) => {
//       return { product_id: obj.product_id, quantity: obj.product_uom_qty };
//     });

//     console.log("cartToUpdate", cartToUpdate);

//     await UpdateRemoteCart(saleOrderId, cartToUpdate);
//     const newCart = await getRemoteCart(saleOrderId);
//     const orderLines = newCart?.data?.result?.sale_order?.order_lines;
//     localStorage.setItem("cart", JSON.stringify(orderLines));

//     console.log("Cart synchronized successfully.");
//   } catch (error) {
//     console.error("Error synchronizing cart:", error);
//   }
// };
