"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { products, categories } from "@/data/mockData";
// import { useParams } from "next/navigation";
// import useAuthStore from "@/stores/authStore";
import useCartStore from "@/stores/cartStore";

interface Filter {
  minPrice: number;
  maxPrice: number;
  suppliers: string[];
}
import { Category, Product } from "@/types";
// import toast from "react-hot-toast";
// import { redirect } from "next/navigation";
// import { getCartItems } from "@/utils/services";
// import { addToCart } from "@/stores/cartStore";

export default function CategoriesPage({
  products,
  categories,
  id,
}: {
  products: Product[];
  categories: Category[];
  id: number;
}) {
  const { addToCart } = useCartStore((state) => state);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(id);
  const [filters] = useState<Filter>({
    minPrice: 0,
    maxPrice: 10000,
    suppliers: [],
  });

  const filteredProducts = products.filter((product) => {
    if (
      selectedCategory &&
      product.website_categories[0]?.website_category_id !== selectedCategory
    )
      return false;
    if (
      product.price_unit < filters.minPrice ||
      product.price_unit > filters.maxPrice
    )
      return false;

    return true;
  });
  // console.log(products, "products");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            </div>
            <div className="border-t border-gray-200">
              <nav className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <div key={category.id} className="py-4 px-4">
                    <button
                      type="button"
                      className={`text-sm font-medium ${
                        selectedCategory === category.id
                          ? "text-indigo-600"
                          : "text-gray-900 hover:text-indigo-600"
                      }`}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category.id ? null : category.id
                        )
                      }
                    >
                      {category.name}
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-6 lg:mt-0 lg:col-span-9">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.product_id}
                className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={product.image_url || "/images/productPlaceholder.png"}
                    alt={product.product_name || "product"}
                    width={400}
                    height={300}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 hover:text-primary">
                    <Link href={`/product/${product.product_id}`}>
                      {product.product_name}
                    </Link>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">
                    SKU: {product.sku}
                  </p> */}
                  <p
                    className={`mt-2 text-base font-medium ${
                      product.price_unit > 2 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {/* Stock: {product.price_unit.toFixed(2)} */}
                    {product.price_unit > 2
                      ? `In Stock ${product.price_unit}`
                      : "Out of Stock"}
                  </p>
                  <button
                    className="mt-4 w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary/80 cursor-pointer transition-colors"
                    onClick={() => addToCart(product, 1)}
                    // onClick={getCartItems}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
