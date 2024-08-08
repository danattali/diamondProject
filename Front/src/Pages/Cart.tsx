import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ProductType } from '../components/@types/types';
import { useNavigate } from 'react-router-dom';
import { addItem, removeItem, updateQuantity } from '../redux/cartSlice';

const CartPage: React.FC = () => {
  const [subtotal, setSubtotal] = useState<number>(0);
  const [productItems, setProductItems] = useState<ProductType[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [totalPriceProduct, setTotalPriceProduct] = useState<number>(0);
  const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncreaseQuantity = (product: ProductType) => {
    dispatch(updateQuantity({ _id: product._id, quantity: product.quantity + 1 }));
  };
  const handleDecreaseQuantity = (product: ProductType) => {
    if(product.quantity > 1) {
    dispatch(updateQuantity({ _id: product._id, quantity: Math.max(1, product.quantity - 1) }));
    }else{
      dispatch(removeItem(product._id));
    }
  }

  const handleAddToCart = (product: ProductType) => {
    dispatch(addItem(product));
  };
  const handleRemoveFromCart = (product: ProductType) => {
    dispatch(removeItem(product._id));
  }


  useEffect(() => {
    if (cartItems.length === 0) {
      return;
    }
    if (productItems.length === 0) {
      setProductItems(cartItems);
    }
    setQuantities(cartItems.map(() => 1));
  }, [cartItems]);

  useEffect(() => {
    setSubtotal(calculateSubtotal());
  }, [quantities, productItems]);

  useEffect(() => {
    setProductItems(cartItems);
    setSubtotal(calculateSubtotal());
    setTotalPriceProduct(totalPrice);
  }
  , [cartItems,quantities, productItems]);


  const calculateSubtotal = () => {
    return productItems.reduce((total, item, index) => {
      return total + item.price * quantities[index];
    }, 0);
  };
const handleCalculateSingleProduct = (product: ProductType, quantity: number) => {
    return product.price * quantity;
  }

  const handleCheckout = () => {
    navigate('/BillingPage');
  };

  return (
    <>
      <section className="container mx-auto flex-grow max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        <section className="hidden h-[600px] w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 md:grid">
          {/* Desktop cart table */}
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
            <tbody className="">
              {productItems.map((x, index) => {
                return (
                  <tr className="h-[50px] border-b" key={index}>
                    <td className="">
                      <div className="flex">
                        <img
                          className="w-[90px]"
                          src={x.image}
                          alt="bedroom image"
                        />
                        <div className="ml-3 flex flex-col justify-center">
                          <p className="text-xl font-bold">{x.name}</p>
                          <p className="text-sm text-gray-400">Category: {x.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="mx-auto text-center ">${x.price}</td>
                    <td className="">
                      <div className="flex items-center justify-center">
                        <button
                          className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                          onClick={() => handleDecreaseQuantity(x)}
                        >
                          −
                        </button>
                        <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                          {x.quantity}
                        </div>
                        <button
                          className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                          onClick={() => handleIncreaseQuantity(x)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="mx-auto text-center ">${x.price * x.quantity}</td>
                    <td className="">
                      <FaTrashAlt
                        onClick={() => handleRemoveFromCart(x)}
                        className="m-0 h-5 w-5 cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        {/* Order summary */}
        <section className="mx-auto w-full px-4 md:max-w-[400px]">
          <div className="">
            <div className="border py-5 px-4 shadow-md">
              <p className="font-bold">ORDER SUMMARY</p>
              <div className="flex justify-between border-b py-5">
                <p>Subtotal</p>
                <p>${totalPriceProduct}</p>
              </div>
              <div className="flex justify-between border-b py-5">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between py-5">
                <p>Total</p>
                <p>${totalPriceProduct}</p>
              </div>
              <button className="w-full bg-violet-900 px-5 py-2 text-white rounded-md" onClick={handleCheckout}>
                Proceed to checkout
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default CartPage;
