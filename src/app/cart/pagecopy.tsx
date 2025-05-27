"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { MockProduct, products } from "@/data/mockData";
import { Trash2 } from "lucide-react";
// import { Product } from "@/types";
import useCartStore from "@/stores/cartStore";
// import { CartItem } from "@/types";
// import { addToCart } from "@/utils/services";
// interface CartItem {
//   productId: string;
//   quantity: number;
// }

export default function CartPage() {
  const {
    cartItems: cartItemss,
    // addToCart,
    updateCart,
  } = useCartStore((state) => state);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  // const clearCart = useCartStore((state) => state.clearCart);

  console.log("cartItemss", cartItemss);
  const [cartItems, setCartItems] = useState(cartItemss);
  useEffect(() => {
    setCartItems(cartItemss);
  }, [cartItemss]);
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === +productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    // setCartItems((prev) => prev.filter((item) => item.id !== +productId));
    // setSelectedItems((prev) => prev.filter((id) => id !== productId));
    removeFromCart(+productId);
  };

  // const handleSelectAll = () => {
  //   if (selectedItems.length === cartItems.length) {
  //     setSelectedItems([]);
  //   } else {
  //     setSelectedItems(cartItems.map((item) => item.id.toString()));
  //   }
  // };

  // const subtotal = cartItems.reduce((total, item) => {
  //   const product = products.find((p) => p.id === +item.productId);
  //   return total + (product?.price || 0) * item.quantity;
  // }, 0);

  // const tax = subtotal * 0.1; // 10% tax
  // const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-secondary ">
        Your Cart
      </h1>

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Cart items */}
        <div className="lg:col-span-12">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cartItems.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">
                  Select all items
                </span>
              </div>
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-900"
                onClick={() => {
                  setCartItems((prev) =>
                    prev.filter(
                      (item) => !selectedItems.includes(item.id.toString())
                    )
                  );
                  setSelectedItems([]);
                }}
              >
                Remove selected
              </button>
            </div> */}

            <ul className="divide-y divide-gray-200">
              <li className="px-4 py-5 sm:px-6">
                <div className="flex items-center">
                  <input
                    type="text"
                    onChange={() => {}}
                    value={"Product Name"}
                    readOnly
                    className=" bg-none text-gray-700"
                  />
                  <div className="flex-1 min-w-0 ml-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-20 w-20">
                        {/* <Image
                          src={"/images/productPlaceholder.png"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-center object-cover rounded-2xl"
                        /> */}
                      </div>
                      {/* <div className="ml-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          <Link href={`/product/${product.id}`}>
                            {product.name}
                          </Link>
                        </h2>
                        <p className="text-sm text-gray-500 flex flex-col">
                          <span>Prdt No: 134768</span>
                          <span>Guarenteed usable unit: 1347</span>
                        </p>
                      </div> */}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {/* <button
                            type="button"
                            className="p-1 text-gray-400 hover:text-gray-500"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                          >
                            <span className="sr-only">Decrease quantity</span>-
                          </button> */}
                      <input
                        type="text"
                        min="1"
                        value={"Quantity"}
                        readOnly
                        onChange={() => {}}
                        className="text-sm font-base text-gray-700 outline-none focus:outline-none text-center"
                      />
                      {/* <button
                            type="button"
                            className="p-1 text-gray-400 hover:text-gray-500"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                          >
                            <span className="sr-only">Increase quantity</span>+
                          </button> */}
                      {/* <Trash2
                        onClick={() => handleRemoveItem(item.productId)}
                        className="h-6 w-6  cursor-pointer hover:text-red-600 ml-1"
                      /> */}
                    </div>
                    {/* <div className="text-right">
                      <p className="text-sm font-normal text-gray-700 outline-none focus:outline-none w-50 text-center">
                        ${(product.price * item.quantity).toFixed(2)}
                        Unit Price
                      </p>
                      <p className="text-sm text-gray-500">
                        ${product.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-normal text-gray-700 outline-none focus:outline-none ">
                        ${(product.price * item.quantity).toFixed(2)}
                        Sub Total
                      </p>
                      <p className="text-sm text-gray-500">
                        ${product.price.toFixed(2)} each
                      </p>
                    </div> */}

                    {/* <button
                          type="button"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          Remove
                        </button> */}
                  </div>
                </div>
              </li>
              {cartItems.map((item: any) => {
                // const product = products.find(
                //   (p: MockProduct) => p.id === item.productId
                // );
                // if (!product) return null;

                return (
                  <li key={item.product_id} className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                      {/* <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id.toString())}
                        onChange={() => {
                          setSelectedItems((prev) =>
                            prev.includes(item.id.toString())
                              ? prev.filter((id) => id !== item.id.toString())
                              : [...prev, item.id.toString()]
                          );
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      /> */}
                      <div className="flex-1 min-w-0 ml-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-20 w-20">
                            <Image
                              src={`${
                                item.image_url ||
                                "/images/productPlaceholder.png"
                              }`}
                              alt={item.product_name}
                              width={80}
                              height={80}
                              className="h-full w-full object-center object-cover rounded-2xl"
                            />
                          </div>
                          <div className="ml-4">
                            <h2 className="text-lg font-medium text-gray-900">
                              <Link href={`/product/${item.product_id}`}>
                                {item.product_name}
                              </Link>
                            </h2>
                            <p className="text-sm text-[#494949] flex flex-col">
                              <span>Prdt No: 134768</span>
                              <span>Guarenteed usable unit: 1347</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="p-1 text-gray-400 hover:text-gray-500"
                            onClick={() =>
                              handleQuantityChange(
                                item.product_id,
                                item.product_uom_qty - 1
                              )
                            }
                          >
                            <span className="sr-only">Decrease quantity</span>-
                          </button>
                          <span className="w-12 text-center py-1 border-gray-300 rounded-md shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            {item.product_uom_qty}
                          </span>
                          <button
                            type="button"
                            className="p-1 text-gray-400 hover:text-gray-500"
                            onClick={
                              () => updateCart(item, "add")
                              // () =>
                              // handleQuantityChange(
                              //   item.product_id,
                              //   item.product_uom_qty + 1
                              // )
                            }
                          >
                            <span className="sr-only">Increase quantity</span>+
                          </button>
                          <p className="px-2">EA</p>

                          <Trash2
                            onClick={() => handleRemoveItem(item.id.toString())}
                            className="h-6 w-6  cursor-pointer hover:text-red-600 ml-[5rem]"
                          />
                        </div>
                        {/* <div className="text-right">
                          <p className="text-lg font-normal text-[#494949]">
                            QR: {product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-normal text-gray-600">
                            QR:&nbsp;
                            {(product.price * item.quantity).toFixed(2)}
                          </p>
                          
                        </div> */}

                        {/* <button
                          type="button"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          Remove
                        </button> */}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-8 w-full justify-end flex items-end">
            <button
              type="button"
              className="mt-3 w- bg-secondary border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

        {/* Order summary */}
        {/* <div className="mt-8 lg:mt-0 lg:col-span-4">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-4">
               
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (10%)</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
              
              </div>
              <button
                type="button"
                className="mt-6 w-full bg-secondary/20 border border-transparent rounded-lg py-3 px-4 text-base font-semibold text-secondary  focus:outline-none focus:ring-2 focus:ring-offset-2  flex items-center justify-between"
              >
                <span>Total Payable </span>
                <span>${total.toFixed(2)}</span>
              </button>
              <button
                type="button"
                className="mt-3 w-full bg-secondary border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
