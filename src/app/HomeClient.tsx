"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import { products } from "@/data/mockData";
import { Category } from "@/types";
// import { getToken } from "@/utils/services";
// import useAuthStore from "@/stores/authStore";
import useCartStore from "@/stores/cartStore";

const heroSlides = [
  {
    id: 1,
    title: "Bulk Order Discounts",
    description: "Save up to 20% on bulk orders",
    image: "/images/hero-1.jpg",
    link: "/categories",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest products",
    image: "/images/hero-2.png",
    link: "/new-arrivals",
  },
];
interface HomeProps {
  categories: Category[];
}
export default function Home({ categories }: HomeProps) {
  const { fetchCart } = useCartStore((state) => state);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // login("admin", "admin");
    // getToken();
    fetchCart();
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [fetchCart]);

  return (
    <div className="min-h-screen ">
      {/* Hero Slider */}
      <div className="relative h-[200px] md:h-[500px] mt-5 md:mt-10 overflow-hidden container rounded-lg">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/50" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 hidden items-center justify-center text-center ">
              <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl text-white mb-8">{slide.description}</p>
                <Link
                  href={slide.link}
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            Popular Product Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-6">
            {categories.map((cat: Category, i) => {
              if (i < 8)
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    className="group  rounded-lg  p-2  transition-shadow"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-full border-1 border-primary bg-white p-4 py-7">
                      <Image
                        src={cat.image_url}
                        alt={cat.name}
                        width={150}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-sm font-medium text-gray-900 group-hover:text-primary text-center">
                      {cat.name}
                    </h3>
                  </Link>
                );
            })}
            <Link
              href={`/categories`}
              className="group  rounded-lg   transition-shadow hover:text-white"
            >
              <div className="aspect-w-1 aspect-h-1  overflow-hidden rounded-full border-1 border-primary bg-primary hover:bg-white w-[150px] h-[150px] px-10 text-center flex items-center justify-center">
                <h3 className="m text-sm font-medium text-white group-hover:text-primary text-center  hover:bg-white">
                  Browse All Categories
                </h3>
              </div>
              {/* <h3 className="mt-6 text-sm font-medium text-white group-hover:text-primary text-center"></h3> */}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {/* <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.sku}</p>
                  <p className="mt-2 text-lg font-medium text-indigo-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
