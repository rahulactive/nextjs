// import { log } from "console";
import HomeClient from "./HomeClient";

import { getProducts } from "@/lib/api";

export default async function Page() {
  try {
    const res = await getProducts();
    const { categories } = res.result;

    return (
      <div>
        <HomeClient categories={categories} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error loading products. Please try again later.</div>;
  }
}
