// types/category.types.ts

export interface Category {
  id: number;
  categoryName: string;
  categoryDescription: string | null;
  categoryImage: {
    id: number;
    fileName: string;
    altText: string | null;
  } | null;
}

export interface Product {
  id: string;
  productName: string;
  sellPrice: number;
  price: number;
  quantity: string;
  sku: string;
  hasVariants: boolean;
  variantCount: number;
  image: {
    id: number;
    url: string;
    altText: string | null;
  } | null; // only first image (thumbnail)
}

export interface CategoryPageResponse {
  category: Category;
  parents: Category[];
  children: (Category & { childrenCount: number })[];
  products: {
    items: Product[];
    total: number;
  };
}
