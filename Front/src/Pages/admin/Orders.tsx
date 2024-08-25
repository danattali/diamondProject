import React from "react";
import axios from "axios";

interface User {
  _id: string;
  fullName: string;
  userEmail: string;
  telephone: string;
  address: string;
}
interface Order {
  _id: string;
  shippingAddress: string;
  orderNumber: string;
  orderDate: string;
  orderItems: string;
  createdAt: string;
}

const AllOrder = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/auth")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="relative overflow-x-auto min-h-screen">
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
            {users.map((users, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b dark:bg-gray-800 dark:border-gray-700`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {users.fullName}
                </th>
                <td className="px-6 py-4">{users.userEmail}</td>
                <td className="px-6 py-4">{users.telephone}</td>
                <td className="px-6 py-4">{users.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrder;
