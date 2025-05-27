"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/stores/cartStore";
// import { products, categories } from "@/data/mockData";
// import { useParams } from "next/navigation";

interface Filter {
  minPrice: number;
  maxPrice: number;
  suppliers: string[];
}
import { Category, Product } from "@/types";
// import { log } from "console";

export default function CategoriesPage({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filters] = useState<Filter>({
    minPrice: 0,
    maxPrice: 10000,
    suppliers: [],
  });
  // console.log(seacparam)
  // const searchParams = useParams();
  // console.log(searchParams, "searchParams");

  const addToCart = useCartStore((state) => state.addToCart);
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
                    {/* {category.subcategories && ( */}
                    {/* <div className="mt-2 space-y-2 pl-4">
                      {categories.map((cat) => (
                        <div key={cat.id}>
                          <button
                            type="button"
                            className={`text-sm ${
                              selectedCategory === cat.id
                                ? "text-indigo-600"
                                : "text-gray-500 hover:text-indigo-600"
                            }`}
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory === cat.id ? null : cat.id
                              )
                            }
                          >
                            {cat.name}
                          </button>
                        </div>
                      ))}
                    </div> */}
                    {/* // )} */}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Filters */}
          {/* <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="price-range"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price Range
                  </label>
                  <div className="mt-2 flex items-center space-x-4">
                    <input
                      type="number"
                      id="min-price"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          minPrice: parseFloat(e.target.value),
                        })
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      id="max-price"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          maxPrice: parseFloat(e.target.value),
                        })
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Product grid */}
        <div className="mt-6 lg:mt-0 lg:col-span-9">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.product_id}
                className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-4 aspect-h-3 min-h-50 overflow-hidden">
                  <Image
                    src={product.image_url || "/images/productPlaceholder.png"}
                    alt={product.product_name || "Product Image"}
                    width={400}
                    height={300}
                    className="w-full max-h-50 object-center object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 hover:text-primary h-20 overflow-ellipsis overflow-clip">
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
                    onClick={() => {
                      addToCart(
                        {
                          ...product,
                          // product_id: product.product_id,
                          // product_name: product.product_name,
                        },
                        1
                      );
                    }}
                    className="mt-4 w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary/80 cursor-pointer transition-colors"
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
