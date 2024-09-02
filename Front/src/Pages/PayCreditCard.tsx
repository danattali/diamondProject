import React, { useState, ChangeEvent, FocusEvent } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface State {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: string;
}

interface PaymentFormProps {
  formData?: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  onSubmitOrder: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  onSubmitOrder,
}) => {
  const [state, setState] = useState<State>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>): void => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitOrder();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="py-4 px-6 bg-blue-500 text-white">
        <h1 className="text-2xl font-semibold">Payment Information</h1>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-center font-bold text-lg my-4">
          Total Price: ${totalPrice.toFixed(2)}
        </div>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus as Focused}
        />
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              type="tel"
              id="number"
              name="number"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              autoComplete="cc-number"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="expiry"
                className="block text-sm font-medium text-gray-700"
              >
                Expiry (MM/YY)
              </label>
              <input
                type="tel"
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                autoComplete="cc-exp"
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="cvc"
                className="block text-sm font-medium text-gray-700"
              >
                CVC
              </label>
              <input
                type="tel"
                id="cvc"
                name="cvc"
                placeholder="CVC"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                autoComplete="cc-csc"
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name on Card"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              autoComplete="cc-name"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
