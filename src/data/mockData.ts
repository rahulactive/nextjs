
interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  subcategories?: Category[];
}
interface Supplier {
  id: string;
  name: string;
  rating: number;
  location: string;
}
export const categories: Category[] = [
  {
    id: '1',
    name: 'Infusion/Injection',
    slug: 'electronics',
    parentId: null,
    subcategories: [
      {
        id: '1.1',
        name: 'Computers',
        slug: 'computers',
        parentId: '1',
        subcategories: [
          { id: '1.1.1', name: 'Laptops', slug: 'laptops', parentId: '1.1' },
          { id: '1.1.2', name: 'Desktops', slug: 'desktops', parentId: '1.1' },
        ],
      },
      {
        id: '1.2',
        name: 'Components',
        slug: 'components',
        parentId: '1',
        subcategories: [
          { id: '1.2.1', name: 'Processors', slug: 'processors', parentId: '1.2' },
          { id: '1.2.2', name: 'Memory', slug: 'memory', parentId: '1.2' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Industrial',
    slug: 'industrial',
    parentId: null,
    subcategories: [
      {
        id: '2.1',
        name: 'Tools',
        slug: 'tools',
        parentId: '2',
        subcategories: [
          { id: '2.1.1', name: 'Power Tools', slug: 'power-tools', parentId: '2.1' },
          { id: '2.1.2', name: 'Hand Tools', slug: 'hand-tools', parentId: '2.1' },
        ],
      },
    ],
  },
];

export const suppliers: Supplier[] = [
  {
    id: 's1',
    name: 'Tech Solutions Inc.',
    rating: 4.5,
    location: 'New York, USA',
  },
  {
    id: 's2',
    name: 'Industrial Supplies Co.',
    rating: 4.2,
    location: 'Chicago, USA',
  },
];
type BulkPricing = {
  minQuantity: number;
  price: number;
};

export type MockProduct = {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  supplierId: string;
  specifications: Record<string, string>;
  bulkPricing: BulkPricing[];
};


export const products: MockProduct[] = [
  {
    id: 'p1',
    name: 'Miraject Luer Cannulas 0.5 x 42 mm',
    sku: 'LAP-001',
    description: 'Professional laptop with high-end specifications',
    price: 1299.99,
    images: ['/images/laptop-1.jpg', '/images/laptop-2.jpg'],
    categoryId: '1.1.1',
    supplierId: 's1',
    specifications: {
      'Processor': 'Intel Core i9',
      'RAM': '32GB',
      'Storage': '1TB SSD',
    },
    bulkPricing: [
      { minQuantity: 5, price: 1199.99 },
      { minQuantity: 10, price: 1099.99 },
    ],
  },
  {
    id: 'p2',
    name: 'Sterican® Intramuscular Needles,21G (0.8 x 50 mm), green',
    sku: 'DRL-001',
    description: 'Professional grade drill set for industrial use',
    price: 299.99,
    images: ['/images/drill-1.jpg', '/images/drill-2.jpg'],
    categoryId: '2.1.1',
    supplierId: 's2',
    specifications: {
      'Power': '1200W',
      'Speed': '0-3000 RPM',
      'Chuck Size': '13mm',
    },
    bulkPricing: [
      { minQuantity: 3, price: 279.99 },
      { minQuantity: 5, price: 259.99 },
    ],
  },
]; 