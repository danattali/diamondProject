import React from "react";
import axios from "axios";
import { get, set } from "react-hook-form";
import Cookies from "js-cookie";

interface User {
  _id: string;
  fullName: string;
  userEmail: string;
  telephone: string;
  address: string;
}
interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
interface OrderItems {
  name: string;
  price: number;
  quantity: number;
  image: string;
  product: string;
}
interface Order {
  _id: string;
  shippingAddress: ShippingAddress;
  orderNumber: string;
  orderDate: string;
  orderItems: OrderItems[];
  createdAt: string;
  user: User;
}

const PurchaseHistory = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [orderNumber, setOrderNumber] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const getUserId = Cookies.get("userId");
  React.useEffect(() => {
    if (getUserId) setUserId(getUserId);
  }, [getUserId]);
  React.useEffect(() => {
    const fetchOrderById = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:4000/orders/orderByUserId/${userId}`
          );
          console.log(response.data.orders);

          setOrders(response.data.orders);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchOrderById();
  }, [userId]);
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="relative overflow-x-auto min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white pt-20 ">
          Purchase History
        </h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Number
              </th>

              <th scope="col" className="px-6 py-3">
                Order items
              </th>
              <th scope="col" className="px-6 py-3">
                Shipping Address
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b dark:bg-gray-800 dark:border-gray-700`}
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover"
                      />
                      <span className="mx-2 font-semibold">{item.name}</span>
                      <span className="mx-2 font-semibold">
                        {item.quantity} x {item.price}$
                      </span>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                </td>
                <td className="px-6 py-4">
                  {formatDate(order.createdAt.split("T")[0])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistory;
