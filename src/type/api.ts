export type UserRes = {
  _id: number;
  name: string;
  email: string;
  createAt: string;
  upDateAt: string;
};

export type ProductRes = {
  composition_maintenance: {
    title: string;
    composition: string[];
    entretien: string[];
  };
  sustainability_guarantee: {
    title: string;
    description: string;
    item: {
      logo: string;
      title: string;
      description: string;
    }[];
  };
  _id: number;
  name: string;
  price: string;
  image: string;
  type_bag: string;
  size: string[];
  color: {
    id: number;
    name: string;
    image_color: string[];
  }[];
  title: string;
  rate: string;
  sold: string;
  dimensions: string;
  weight: string;
  feature: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ProductOrderRes = {
  product_id: number;
  product_name: string;
  image: string;
  price: string;
  size: string;
  color: string;
  quantity: number;
};

export type Order = {
  _id: number,
  user_id: number;
  user_name: number;
  products?: ProductOrderRes[];
  address: string;
  phone: string;
  code: string;
  status: number
};
export type OrderRes = {
  message: string;
  data: Order;
};

export type OrderReq = {
  products: {
    product_id: number;
    size: string;
    color: string;
  }[];
  address: string;
  phone: string;
  code: string;
};
