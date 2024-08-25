import React from "react";
import axios from "axios";
import { get, set } from "react-hook-form";

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
  const getUserId = localStorage.getItem("_id");
  React.useEffect(() => {
    if (getUserId) setUserId(getUserId);
  }, [getUserId]);
  React.useEffect(() => {
    const fetchOrderById = async () => {
     

      try {
        const response = await axios.get(
          `http://localhost:4000/orders/getOrderByUserId/${userId}`
        );

        setOrders(response.data.orders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderById();
  }, [userId]);

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

                <td className="px-6 py-4">{order.orderItems.join(", ")}</td>
                <td className="px-6 py-4">
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                </td>
                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
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
