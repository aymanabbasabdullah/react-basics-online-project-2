import type { TProductNames } from "../types";

export interface IProduct {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IFormInput {
  id: string;
  name: TProductNames; //"title" | "description" | "imageURL" | "price";
  // name: keyof Pick<IProduct, "title" | "description" | "imageURL" | "price">;
  label: string;
  type: string;
}

export interface ICategory {
  id?: string | undefined;
  name: string;
  imageURL: string;
}
