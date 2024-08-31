import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProductType } from "../components/@types/types";
import { useNavigate } from "react-router-dom";
import { removeItem, updateQuantity } from "../redux/cartSlice";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const calculateSubtotal = () => {
      return cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    };

    setSubtotal(calculateSubtotal());
  }, [cartItems]);

  const handleIncreaseQuantity = (product: ProductType) => {
    dispatch(
      updateQuantity({ _id: product._id, quantity: product.quantity + 1 })
    );
  };

  const handleDecreaseQuantity = (product: ProductType) => {
    if (product.quantity > 1) {
      dispatch(
        updateQuantity({
          _id: product._id,
          quantity: product.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(product._id));
    }
  };

  const handleRemoveFromCart = (product: ProductType) => {
    dispatch(removeItem(product._id));
  };

  const handleCheckout = () => {
    navigate("/BillingPage");
  };

  return (
    <section className="container mx-auto flex-grow max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
      {/* Desktop cart table */}
      <section className="hidden h-[600px] w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 md:grid">
        <table className="table-fixed">
          <thead className="h-16 bg-neutral-100">
            <tr>
              <th>ITEM</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr className="h-[50px] border-b" key={index}>
                <td>
                  <div className="flex">
                    <img
                      className="w-[90px]"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="ml-3 flex flex-col justify-center">
                      <p className="text-xl font-bold">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        Category: {item.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="mx-auto text-center ">${item.price}</td>
                <td>
                  <div className="flex items-center justify-center">
                    <button
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      −
                    </button>
                    <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b">
                      {item.quantity}
                    </div>
                    <button
                      className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="mx-auto text-center ">
                  ${item.price * item.quantity}
                </td>
                <td>
                  <FaTrashAlt
                    onClick={() => handleRemoveFromCart(item)}
                    className="m-0 h-5 w-5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Order summary */}
      <section className="mx-auto w-full px-4 md:max-w-[400px]">
        <div className="border py-5 px-4 shadow-md">
          <p className="font-bold">ORDER SUMMARY</p>
          <div className="flex justify-between border-b py-5">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex justify-between border-b py-5">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between py-5">
            <p>Total</p>
            <p>${subtotal}</p>
          </div>
          <button
            className="w-full bg-violet-900 px-5 py-2 text-white rounded-md"
            onClick={handleCheckout}
          >
            Proceed to checkout
          </button>
        </div>
      </section>
    </section>
  );
};

export default CartPage;
