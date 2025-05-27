"use client";

import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/24/outline";
// import Link from "next/link";
import { categories } from "@/data/mockData";
import SignupAndCart from "../ui/SignupAndCart";

export default function SecondaryNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-800 shadow-md sticky top-16 z-40">
      <div className="container">
        <div className="flex items-center justify-between h-12">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden justify-between w-full">
            <button
              type="button"
              className="text-gray-900 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div>
              <SignupAndCart />
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:space-x-8">
            {categories.map((category) => (
              <Menu key={category.id} as="div" className="relative">
                <Menu.Button className="text-gray-800 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium flex items-center ">
                  {category.name}
                  <ChevronDownIcon
                    className="ml-1 h-4 w-4"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute  mt-2 w-100 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
                    {/* <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {category.subcategories?.map((subcategory) => (
                          <div key={subcategory.id}>
                            <h3 className="text-sm font-medium text-gray-900">
                              <Link href={`/category/${subcategory.slug}`}>
                                {subcategory.name}
                              </Link>
                            </h3>
                            <ul className="mt-2 space-y-1">
                              {subcategory.subcategories?.map((item) => (
                                <li key={item.id}>
                                  <Link
                                    href={`/category/${item.slug}`}
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div> */}
                  </Menu.Items>
                </Transition>
              </Menu>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              <button
                className="text-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {category.name}
              </button>
              <div className="pl-4">
                {/* {category.subcategories?.map((subcategory) => (
                  <div key={subcategory.id} className="py-2">
                    <Link
                      href={`/category/${subcategory.slug}`}
                      className="text-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {subcategory.name}
                    </Link>
                    <div className="pl-4">
                      {subcategory.subcategories?.map((item) => (
                        <Link
                          key={item.id}
                          href={`/category/${item.slug}`}
                          className="text-gray-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
