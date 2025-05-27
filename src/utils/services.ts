import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { createSaleOrder, getCart, updateSaleOrder } from "@/lib/api";
// ----------------------------------------------------------------------------------------

const warehouseId=1
 const getToken = ():any=> {
  if (typeof window !== "undefined") {
    const authStore = localStorage.getItem("auth-store");
    const res = authStore ? JSON.parse(authStore) : null;
    const state = res?.state;
    if (state&&state?.token&&state?.userId) {
      return [state.token,state.userId];
    } else {
      toast.error("Please login ");
      redirect("/signin");
      return null; }
  } else {
    console.error("Window is undefined");
    return null;
  }
};

 const getSaleOrderId = ():any=> {
  // 155172
  if (typeof window !== "undefined") {
    const saleOrderId= localStorage.getItem("saleOrderId");
    if (saleOrderId) {
      return saleOrderId;
    } else {
      console.log("Sale Order ID not found in localStorage");
      return 0;
    }
  } else {
    console.error("Window is undefined");
    return 0;  
  }
};

 const getLocalCart = ():any=> {
  // 155172
  if (typeof window !== "undefined") {
    const cart= localStorage.getItem("cart");
    const localCart=JSON.parse(cart||'[]');
    if (localCart) {
      return localCart;
    } else {
      console.error("error in getting remote cart");
      return null;
    }
  } else {
    console.error("Window is undefined");
    return null;
  }
};

const setLocalCart = (cart:any):any=> {
  getToken()
  if (typeof window !== "undefined") {
    localStorage.setItem("cart",JSON.stringify(cart));
  } else {
    console.error("Window is undefined");
    return null;  
  }
};
// ----------------------------------------------------------------------------------------

export const addToCart= async (item:any,qty:number=1)=>{
  // console.log(item,qty,"item in add to cart");
  const [token,userId] = getToken();
  const saleOrderId=getSaleOrderId()
  const localcart=getLocalCart()||[];
  const id= item.product_id;
  if (!token){
      toast.error("Please login to add items to the cart.");
      redirect("/signin");
    }
    console.log(saleOrderId,token,userId,id,"sale order id");
    if(saleOrderId!==0&&saleOrderId!==null&&saleOrderId!==undefined){
      try{
        console.log("adding to existing sale order1");
        // await getCartItems()
        const prevcart=localcart.filter((i:any)=>i.product_id!==item.product_id);
        const productArray = [...prevcart, { product_id: item.product_id, quantity: qty }];
        console.log(productArray,"product array");
        const res=await updateSaleOrder(productArray,saleOrderId,token);
        console.log(res," cart updated");
        if(res.result.message==="Sale Order updated successfully")
          toast.success("cart updated");
        else{
          toast.error("error in updating cart");
           }
      }catch(err){
      console.error(err);
      toast.error("error in updating cart");
      }
    }else{
      try {
        console.log("creating sale order",
          'id,qty,warehouseId,userId,token',id,qty,warehouseId,userId,token);
        
      const saleOrder= await createSaleOrder(id,qty,warehouseId,userId,token);
      localStorage.setItem("saleOrderId", saleOrder.result.sale_order_id||0);
      console.log('sale order created:',saleOrder);
      toast.success("sale order created");
          }
    catch(err){
      console.error('Failed to create sale order:',err);
      toast.error("some error occurred");
            }
    }
}

export const getCartItems=async()=>{
  const [token,userId] = getToken();
  const saleOrderId=getSaleOrderId()
  if (!token||!userId){
    toast.error("Please login to see the cart.");
    redirect("/signin");
    }
    if(saleOrderId!==0||saleOrderId!==null||saleOrderId!==undefined){
      const res= await getCart(saleOrderId,token);
      console.log(res,"cart items");
      if(res.result){
        const cartItems= res.result.sale_order.order_lines.map((item:any)=>({product_id:item.product_id,quantity:item.quantity||1}));
        setLocalCart(cartItems);
        console.log(cartItems,"cart items");
        return res.result.sale_order;}
      else{
        toast.error("error in getting cart items");
        return null;
    }}
  else{
return null
  }}


  export const removeFromCart=()=>{
  console.log('removed from cart');
}
export const clearCart=()=>{
  console.log('cleared cart');
}