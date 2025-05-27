import { getProducts } from '@/lib/api';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const useProductStore=create(
  persist((set)=>({
products:[],
categories:[],
isLoading:false,
error:null,
fetchData:async()=>{
  set({isLoading:true,error:null})
  try{
   const res=await getProducts()
    // console.log(res.result,'res');
    set({products:res.result.products,categories:res.result.categories,isLoading:false})
    console.log(res,'resssssss')
    
  }
  catch(error:any){
    set({error:error.message,isLoading:false})
  }
}
  }),{name:'productStore'})
)
export default useProductStore;