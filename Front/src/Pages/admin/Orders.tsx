import React from "react";
import axios from "axios";

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

const AllOrder = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(
          "https://diamondproject.onrender.com/orders/AllOrders"
        );
        const ordersWithUsers = await Promise.all(
          response.data.orders.map(async (order: Order) => {
            const userResponse = await axios.get(
              `https://diamondproject.onrender.com/auth/${order.user._id}` // Assuming order.user is the user's _id
            );
            return {
              ...order,
              user: userResponse.data.user,
              orderItems: order.orderItems.map((item) => item.name),
            };
          })
        );
        setOrders(ordersWithUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div
      className="relative overflow-x-auto min-h-screen"
      style={{ zIndex: "-1" }}
    >
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white pt-20">
          All Orders
        </h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Number
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Order Items
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
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.user.fullName}
                </td>
                <td className="px-6 py-4">{order.orderItems.join(", ")}</td>
                <td className="px-6 py-4">
                  {order.shippingAddress.address}, {order.shippingAddress.city}
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

export default AllOrder;
