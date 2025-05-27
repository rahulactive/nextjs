export interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  parent_name: string;
  sequence: number;
  image_url: string;
}
export interface OdooConfig {
  url: string;
  db: string;
}
export interface LoginFormData {
  username: string;
  password: string;
}

export interface Product {
  id: number;
  product_id?: number;
  product_name?:string
  price_unit?: any;
  name?: string;
  default_code: string;
  barcode: string;
  image_url: string;
  description: string;
  price: number;
  unit: string;
  offer_price: string;
  website_sequence: number;
  website_categories: WebsiteCategory[];
}
interface WebsiteCategory {
  website_category_id: number;
  website_parent_category_id: number|null;
website_url: string;}
 
export interface CartItem extends Product {

  quantity: number;
 
}
