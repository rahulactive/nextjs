import { getProducts } from "@/lib/api";
import CategoriesPage from "./CategoryClient";

const page = async () => {
  const res = await getProducts();
  const result = await res.result;
  const products = await result.products;
  const categories = await result.categories;
  return (
    <div>
      <CategoriesPage products={products} categories={categories} />
    </div>
  );
};
export default page;
