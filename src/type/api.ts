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
  color: 
    {
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
