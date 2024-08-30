import React from "react";
import axios from "axios";
import { set } from "react-hook-form";

interface User {
  _id: string;
  fullName: string;
  userEmail: string;
  telephone: string;
  address: string;
  rules: string;
}

const AllUsers = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [rules, setRules] = React.useState<string>("");
  const handleAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/auth");
      console.log(response.data);
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    handleAllUsers();
  }, []);

  const handleChangeRules = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    userId: string
  ) => {
    const updatedRules = {
      name: e.target.value,
      can: e.target.value === "admin" ? ["read", "write", "delete"] : ["read"],
    };

    console.log("Payload being sent:", { rules: updatedRules }); // Logging the payload

    try {
      await axios.put(`http://localhost:4000/auth/${userId}/rules`, {
        rules: updatedRules,
      });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, rules: e.target.value } : user
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white pt-20">
          All Users
        </h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Telephone
              </th>
              <th scope="col" className="px-6 py-3">
                address
              </th>
              <th scope="col" className="px-6 py-3">
                Rules
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
                <td className="px-6 py-4">
                  {" "}
                  <select
                    id="countries"
                    value={users.rules.name}
                    onChange={(e) => handleChangeRules(e, users._id)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
