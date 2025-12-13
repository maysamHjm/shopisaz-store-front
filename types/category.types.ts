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

export interface CategoryPageResponse {
  category: Category;
  parents: Category[];
  children: (Category & { childrenCount: number })[];
}
