// import { Menu } from "@headlessui/react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
// import { Fragment } from "react";

import Link from "next/link";
const cartCount = 0; // Replace with actual cart count from your state management

const SignupAndCart = () => {
  return (
    <div className="flex items-center ">
      {/* Cart */}
      <Link
        href="/cart"
        className=" p-1 md:p-2 rounded-md px-3 hover:text-secondary hover:bg-white  relative flex space-x-2  items-center justify-center bg-secondary text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-1 border-secondary"
        aria-label="Shopping cart"
      >
        {" "}
        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
        <span className="text-sm md:text-lg ">Cart</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>

      {/* Sign In Dropdown */}
      <Menu as="div" className="ml-3 relative">
        <Link href="/signin" className="">
          <Menu.Button className=" flex items-center space-x-3 bg-gray-100 p-1 md:p-2 rounded-md px-2 md:px-3  text-primary hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="sr-only">Open user menu</span>
            <UserIcon className="h-6 w-6 " aria-hidden="true" />
            <span className="text-sm md:text-lg ">Sign in</span>
          </Menu.Button>
        </Link>
        {/* <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/signin"
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block px-4 py-2 text-sm text-gray-700`}
                >
                  Sign in
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/register"
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block px-4 py-2 text-sm text-gray-700`}
                >
                  Register
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition> */}
      </Menu>
    </div>
  );
};
export default SignupAndCart;
