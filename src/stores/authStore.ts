
import { login, logOut } from '@/lib/api';
// import { use } from 'react';
import toast from 'react-hot-toast';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
const useAuthStore=create(  persist((set)=>({
  token:null,
  userId:null,
  username:null,
  password:null,
  isAuthenticated:false,
  login:async(username:string,password:string)=>{
try{
const res=await login(username,password);
const result=await JSON.parse(res.result);

console.log(res,result,'result');
toast.success('Login successful');



set({
  token:result.data.token,
  userId:result.data.user_id,
  username,
  password,
  isAuthenticated: true,
})
}catch(err){
toast.error('Login failed');

  console.error('Login failed:',err);
}
  },
 logout:async(username:string,password:string)=>{
try{
await logOut(username,password);
// console.log(res,'result');
toast.success('Logout successful');


set({
  token:null,
  username:null,
  password:null,
  userId:null,
  isAuthenticated: false,
})
}catch(err){
toast.success('Logout failed');

  console.error('Logout failed:',err);
}
  }
}),{
      name: 'auth-store', // key in localStorage
      partialize: (state:any) => ({
        token: state.token,
        username: state.username,
        password: state.password,
        userId: state.userId,
        isAuthenticated: state.isAuthenticated,
      }),
    }))
  export default useAuthStore;
 