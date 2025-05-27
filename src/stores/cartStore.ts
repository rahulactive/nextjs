import { CartItem } from '@/types';
import { addToCart, getCartItems } from '@/utils/services';
import toast from 'react-hot-toast';
// import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (item: any,qty:number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => void;
  updateCart: (item:any,op:any) => Promise<void>;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({  error: null });
        try {
          const res = await getCartItems()
          if(res?.order_lines?.length>0){
          set({ cartItems: res.order_lines });
          }
        }catch (err: unknown) {
          let message = 'Unknown error';
          if (err instanceof Error) {
            message = err.message;
          }
          set({ error: message });
        }
      },

      updateCart: async (item:any,op:any) => {
        const qty=op==="add"?++item.product_uom_qty:--item.product_uom_qty;
        console.log(qty,"qty",item.product_uom_qty);
        const prevItems = get().cartItems.map((i:any) => {
          if (i.product_id === item.product_id) {
            return { ...i, product_uom_qty: qty };
          }
          return i;
        });
        // filter((i:any)=>(i.product_id!==item.product_id));
        set({ cartItems: prevItems });
        // await addToCart(item,qty)
        // await get().fetchCart();

      },


      addToCart: async (item,qty) => {
        try {
        await addToCart(item,qty)
        await get().fetchCart();
        // console.log(res,"add to cart");
          // const existing = get().cartItems.find((i) => i.id === item.id);
          // if (existing) {
          //   set({
          //     cartItems: get().cartItems.map((i) =>
          //       i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          //     ),
          //   });
          // } else {
          //   set({
          //     cartItems: [...get().cartItems, { ...item, quantity: 1 }],
          //   });
          // }
        // }
        }catch (err: unknown) {
          let message = 'Unknown error';
        
          if (err instanceof Error) {
            message = err.message;
          }
     
          set({ error: message, isLoading: false });
        }
      },

      removeFromCart: async (id) => {
        try {
          // const res = await fetch(`/api/cart/${id}`, {
          //   method: 'DELETE',
          // });
          // if (!res.ok) throw new Error('Failed to remove from cart');

          set({
            cartItems: get().cartItems.filter((item) => item.id !== id),
          });
        } catch (err: unknown) {
          let message = 'Unknown error';
        
          if (err instanceof Error) {
            message = err.message;
            toast.error(message);
          }
          set({ error: message, isLoading: false });
        }
        
        toast.success('Item removed from cart');
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    { name: 'cart-storage' }
  )
);

export default useCartStore;
