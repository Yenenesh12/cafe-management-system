export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  status: string;
  categoryId: number;
  categoryName?: string;
}
