export interface Bill {
  id?: number;
  uuid?: string;
  name: string;
  email: string;
  contactNumber: string;
  paymentMethod: string;
  totalAmount: number;
  productDetail: string;
  createdBy?: string;
  createdAt?: Date;
}

export interface Products {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  total: number;
}
