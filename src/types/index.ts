export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

export interface CategoryGroup {
  id: string;
  categories: Category[];
}