import { Product } from "@/types";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="border- pt-6">
      <h2 className="text-lg font-semibold mb-2">
        Product Details & Specifications
      </h2>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">
        {product.description || "No additional specs available."}
      </p>
    </div>
  );
}
