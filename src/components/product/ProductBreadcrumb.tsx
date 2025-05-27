"use client";
import { Product } from "@/types";
// import toast from "react-hot-toast";
// toast("helloworld");
export default function ProductBreadcrumb({ product }: { product: Product }) {
  return <p className="text-sm text-gray-500">&gt; {product.name}</p>;
}
