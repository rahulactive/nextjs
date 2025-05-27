"use client";
import { Product } from "@/types";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import useCartStore from "@/stores/cartStore";

export default function ProductOverview({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 ">
      {/* Product Image */}
      <div className=" space-y-4 rounded-lg p-4">
        <Image
          src={product.image_url || "/images/productPlaceholder.png"}
          alt={product.name || "Product Image"}
          width={300}
          height={300}
          className="object-contain w-full rounded-lg shadow-md "
        />
      </div>

      {/* Product Overview */}
      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-sm text-gray-600">
          {product.description || "No description available."}
        </p>
      </div>

      {/* Price & Actions */}
      <div className="space-y-4 border border-primary p-4 rounded-lg">
        {/* <p className="text-xl font-bold">QR{product.price}</p> */}
        <p className="text-sm">Packaging Unit: {product.unit}</p>
        <div className="w-70 text-sm pl-5 text-primary bg-gray-200 rounded-lg h-8 py-1">
          {" "}
          size 0.5 X 42mm
        </div>
        <div className="w-70 text-sm pl-5 bg-gray-200 rounded-lg h-8 py-1 ">
          Need a compatible adapter
        </div>

        <p
          className={` text-sm ${
            product.price > 2 ? "text-green-600" : "text-red-600"
          }`}
        >
          {" "}
          {product.price > 2 ? `In Stock ${product.price}` : "Out of Stock"}
        </p>
        <p className="text-sm">Expected Delivery: 5-7 Days</p>
        <div className="flex space-x-2">
          <p className="flex justify-between items-center">Qty:</p>
          <input
            type="number"
            defaultValue={1}
            className="w-20 text-center bg-gray-200 rounded-lg  py-1"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => addToCart(product, 1)}
            className="bg-secondary text-white px-4 py-2 rounded cursor-pointer flex items-center space-x-2 hover:bg-secondary/80"
          >
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            <p>Add to Cart</p>
          </button>
          <button className="border px-4 py-2 rounded cursor-pointer ">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
