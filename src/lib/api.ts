// import { Product } from "@/types";

const BASE_URL = "http://sedeeradmin.ddns.me:8066";
// GET PRODUCTS
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/get_website_products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ params: {} }),
    cache: "force-cache",
    next:{ revalidate: 60 }
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// -----LOGIN
export const login= async(username:string,password:string)=>{
  try{
const res=await fetch(`${BASE_URL}/token/authenticate`,{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({params:{username,password}}),
    cache: "force-cache",
})
return res.json();
}
catch(err){
  console.error('Login failed:',err);
}
}
// -----LOGOUT
export const logOut= async(username:string,password:string)=>{
try{const res=await fetch(`${BASE_URL}/token/delete`,{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({params:{username,password}}),
    cache: "force-cache",
})
return res.json();}
catch(err){
  console.error('Logout failed:',err);}
}
// -----create sale order
export const createSaleOrder=async(productId:any,productQty:any=1,warehouseId:any,userId:any,token:string)=>{
  
  const res=await fetch(`${BASE_URL}/create_sale_order`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':token
    },
    body:JSON.stringify({params:{ user_id:userId,
        warehouse_id:warehouseId,
        products: [{ product_id:productId, quantity:productQty }],}}),

      cache: "force-cache",
  })
  return res.json();
}
// ------UPDATE SALE ORDER
export const updateSaleOrder=async( productArray:any,saleOrderId:number,token:string)=>{
   const res=await fetch(`${BASE_URL}/update_sale_order`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':token
    },
    body:JSON.stringify({params: {
        sale_order_id: saleOrderId,
        products: productArray,
      },}),
      cache: "force-cache",
  })
  return res.json();
}
// -----GET Cart
export const getCart=async(saleOrderId:string,token:string)=>{
  const res=await fetch(`${BASE_URL}/get_sale_order`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':token
    },
    body:JSON.stringify({params:{sale_order_id:saleOrderId}}),
      cache: "force-cache",
  })
  return res.json();
}
