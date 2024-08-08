import { ReactNode } from "react";

// FCC = Functional Component with children
// TS = Typescript definitions:
export type FCC = (props: { children: ReactNode }) => ReactNode;

export type RegisterType = {
    name: {
        first: string,
        middle: string,
        last: string
    },
    phone: string,
    email: string,
    password: string,
    image: {
        url: string,
        alt: string
    },
    address: {
        state: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number
    },
    isBusiness: boolean,
}

export type LoginType = {
    email: string;
    password: string;
};

export type ProductType = {
    _id: any;
    id: number,
    name: string,
    price: number,
    image: string,
    description: string,
    quantity: number,
    category: string,

}
export type categoryOption = {
    value: string,
    label: string
}
export type ProductModalProps = {
    product: ProductType | null,
    isOpen: boolean,
    closeModal: () => void
}
export type contactUsType = {
    name: string,
    email: string,
    phone: string,
    orderNumber: string,
    message: string
}