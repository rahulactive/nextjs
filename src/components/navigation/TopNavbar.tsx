"use client";

import { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import SignupAndCart from "../ui/SignupAndCart";
// import { getProducts } from "@/lib/api";
import { Product } from "@/types";
import useProductStore from "@/stores/productStore";
// import { products } from "@/data/mockData";
// import { products } from "@/data/mockData";
// interface Product {}
export default function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { products } = useProductStore() as { products: Product[] };

  // const {
  //   fetchData,
  //   loading,
  //   error,
  //   products: searchableProducts,
  // } = useProductStore();
  // const [products, setProducts] = useState<Product[]>([]);
  // useProductStore.getState().fetchData();
  // const { products } = useProductStore();
  // useEffect(() => {
  //   // const  fetchData= async()=>await
  //   // fetchData();
  //   setProducts(searchableProducts);
  // }, [setProducts, fetchData, searchableProducts]);
  // const [cartCount, setCartCount] = useState(0);
  // products;
  // console.log(getProducts());
  // useEffect(() => {
  //   const apifetch = async () => {
  //     const products = await getProducts().then((res) => res.result.products);
  //     // console.log(products, "products");
  //     // const products=await apifetch.result
  //     setProducts(products);
  //   };
  //   apifetch();
  // });
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered.slice(0, 5));
  }, [searchQuery, products]);
  // console.log(products, "products");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const clearSearch = () => {
  //   setSearchQuery("");
  //   setFilteredProducts([]);
  // };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 ">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Sedeer Logo"
                width={120}
                height={80}
                // className="h-8 w-8"
              />
            </Link>
          </div>

          {/* Search Bar */}
          {/* <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative flex items-center flex-grow-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search products..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div> */}
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div
              className="max-w-lg w-full lg:max-w-xs relative"
              ref={searchRef}
            >
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative flex items-center flex-grow-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-2 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search products..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => {
                      setSearchQuery("");
                      setFilteredProducts([]);
                      // Optional: Keep focus on input after clearing
                      document.getElementById("search")?.focus();
                    }}
                    aria-label="Clear search"
                  >
                    {/* <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" /> */}
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {isSearchFocused && filteredProducts.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm max-h-60">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchFocused(false);
                      }}
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* No results message */}
              {isSearchFocused &&
                searchQuery &&
                filteredProducts.length === 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No products found
                    </div>
                  </div>
                )}
            </div>
          </div>

          <ul className="justify-between items-center space-x-8 mx-10 hidden md:flex">
            <Link href={"/categories"}>All Product</Link>
            <li>Quick Order</li>
            <li>Support</li>
          </ul>

          {/* Right side buttons */}
          <div className="hidden md:flex">
            <SignupAndCart />
          </div>
        </div>
      </div>
    </nav>
  );
}
