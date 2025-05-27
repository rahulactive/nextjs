import { getProducts } from "@/lib/api";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductOverview from "@/components/product/ProductOverview";
import ProductDetails from "@/components/product/ProductDetails";
import { Product } from "@/types";
// import toast from "react-hot-toast";

// Define the props for the dynamic route
// interface ProductPageProps {
//   params: {
//     id: string;
//   };
// }

// Ensure the function is async and typed correctly
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getProducts();
  const products: Product[] = res.result?.products || [];

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-8 text-red-500">Product not found</div>;
  }

  return (
    <div className="container py-8 space-y-8">
      <ProductBreadcrumb product={product} />
      <ProductOverview product={product} />
      <ProductDetails product={product} />
    </div>
  );
}
// import { getProducts } from "@/lib/api";
// import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
// import ProductOverview from "@/components/product/ProductOverview";
// import ProductDetails from "@/components/product/ProductDetails";
// import { Product } from "@/types";

// // import { log } from "console";
// // import { log } from "console";

// // interface ProductPageProps {
// //   params: {
// //     id: string;
// //   };
// // }

// export default async function ProductPage({
//   params,
// }: {
//   params: {
//     id: string;
//   };
// }) {
//   // log(params, "param");
//   const id = params.id;
//   // const id = par.id;
//   // log(par, "-----------------", id, typeof id);
//   const res = await getProducts();
//   const products: Product[] = res.result?.products || [];

//   const product = products.find((p) => p.id === Number(id));

//   if (!product) {
//     return <div className="p-8 text-red-500">Product not found</div>;
//   }

//   if (!product) {
//     return <div className="p-8 text-red-500">Product not found</div>;
//   }
//   return (
//     <div className="container py-8 space-y-8">
//       <ProductBreadcrumb product={product} />
//       <ProductOverview product={product} />
//       <ProductDetails product={product} />
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Tab } from "@headlessui/react";
// import { products, suppliers } from "@/data/mockData";

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductPage({ params }: { params: { id: string } }) {
//   const product = products.find((p) => p.id === params.id);
//   const supplier = product
//     ? suppliers.find((s) => s.id === product.supplierId)
//     : null;
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);

//   if (!product || !supplier) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
//         {/* Image gallery */}
//         <div className="lg:max-w-lg lg:self-end">
//           <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
//             <Image
//               src={product.images[selectedImage]}
//               alt={product.name}
//               width={500}
//               height={500}
//               className="w-full h-full object-center object-cover"
//             />
//           </div>
//           <div className="mt-4 grid grid-cols-4 gap-4">
//             {product.images.map((image, index) => (
//               <button
//                 key={index}
//                 className={`rounded-lg overflow-hidden ${
//                   selectedImage === index ? "ring-2 ring-indigo-500" : ""
//                 }`}
//                 onClick={() => setSelectedImage(index)}
//               >
//                 <Image
//                   src={image}
//                   alt={`${product.name} - ${index + 1}`}
//                   width={100}
//                   height={100}
//                   className="w-full h-full object-center object-cover"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product info */}
//         <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
//           <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
//             {product.name}
//           </h1>
//           <p className="mt-2 text-sm text-gray-500">SKU: {product.sku}</p>

//           <div className="mt-6">
//             <h2 className="sr-only">Product information</h2>
//             <p className="text-3xl text-gray-900">
//               ${product.price.toFixed(2)}
//             </p>

//             {/* Bulk pricing */}
//             <div className="mt-4">
//               <h3 className="text-sm font-medium text-gray-900">
//                 Bulk Pricing
//               </h3>
//               <div className="mt-2">
//                 {product.bulkPricing.map((tier, index) => (
//                   <div key={index} className="flex justify-between text-sm">
//                     <span>{tier.minQuantity}+ units</span>
//                     <span>${tier.price.toFixed(2)} each</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity selector */}
//             <div className="mt-6">
//               <label
//                 htmlFor="quantity"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Quantity
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="number"
//                   name="quantity"
//                   id="quantity"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) =>
//                     setQuantity(Math.max(1, parseInt(e.target.value)))
//                   }
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <button
//               type="button"
//               className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Add to cart
//             </button>
//           </div>

//           {/* Tabs */}
//           <div className="mt-10">
//             <Tab.Group>
//               <Tab.List className="border-b border-gray-200">
//                 <Tab
//                   className={({ selected }) =>
//                     classNames(
//                       selected
//                         ? "border-indigo-500 text-indigo-600"
//                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
//                       "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
//                     )
//                   }
//                 >
//                   Description
//                 </Tab>
//                 <Tab
//                   className={({ selected }) =>
//                     classNames(
//                       selected
//                         ? "border-indigo-500 text-indigo-600"
//                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
//                       "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
//                     )
//                   }
//                 >
//                   Specifications
//                 </Tab>
//                 <Tab
//                   className={({ selected }) =>
//                     classNames(
//                       selected
//                         ? "border-indigo-500 text-indigo-600"
//                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
//                       "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
//                     )
//                   }
//                 >
//                   Supplier Info
//                 </Tab>
//               </Tab.List>
//               <Tab.Panels className="mt-4">
//                 <Tab.Panel>
//                   <p className="text-gray-500">{product.description}</p>
//                 </Tab.Panel>
//                 <Tab.Panel>
//                   <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
//                     {Object.entries(product.specifications).map(
//                       ([key, value]) => (
//                         <div key={key}>
//                           <dt className="text-sm font-medium text-gray-500">
//                             {key}
//                           </dt>
//                           <dd className="mt-1 text-sm text-gray-900">
//                             {value}
//                           </dd>
//                         </div>
//                       )
//                     )}
//                   </dl>
//                 </Tab.Panel>
//                 <Tab.Panel>
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900">
//                       {supplier.name}
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">
//                       Location: {supplier.location}
//                     </p>
//                     <p className="mt-1 text-sm text-gray-500">
//                       Rating: {supplier.rating.toFixed(1)}/5.0
//                     </p>
//                   </div>
//                 </Tab.Panel>
//               </Tab.Panels>
//             </Tab.Group>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
