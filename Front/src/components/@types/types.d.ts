import { ReactNode } from "react";

// FCC = Functional Component with children
// TS = Typescript definitions:
export type FCC = (props: { children: ReactNode }) => ReactNode;

export type RegisterType = {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;
};

export type LoginType = {
  email: string;
  password: string;
};

export type ProductType = {
  _id: string; // Changed from any to string
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  category: string;
  img?: string;
};

export type CategoryOption = {
  value: string;
  label: string;
};

export type ProductModalProps = {
  product: ProductType | null;
  isOpen: boolean;
  img?: string;
  closeModal: () => void;
};

export type ContactUsType = {
  name: string;
  email: string;
  phone: string;
  orderNumber: string;
  message: string;
};
