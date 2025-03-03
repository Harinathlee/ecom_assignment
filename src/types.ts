// products.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

export interface CartItem extends Product {
  quantity: number;
}
