export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Store {
  id: string;
  name: string;
  owner: string;
  isGateway: boolean;
  accountNumber: string;
  userId: string;
}

export interface Category {
  id: string;
  name: string;
  billboards: Billboard;
  isBillboard: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  quantity: number;
  description: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  isFeatured: boolean;
  isArchived: boolean;
  categories: Category;
  sizes: Size;
  colors: Color;
  images: Image[];
  isSize: boolean;
  isColor: boolean;
  isDimension: boolean;
  isWeight: boolean;
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Order {
  id: string;
  storeId: string;
  isPaid: boolean;
  confirm: string;
  phone: string;
  address: string;
  email: string;
  userId: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  buyQuantity: number;
}

declare global {
  interface Window {
    snap: {
      pay: (token: string, options: unknown) => void;
    };
  }
}
