import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [placeholderProduct, setPlaceholderProduct] = useState({});

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(products);
  }, []);
  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      console.log(response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [isOpenEdit]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (idProduct) {
      getProductById();
    }
  }, [idProduct]);

  const toggleEditModal = (id: string) => {
    setIdProduct(id);

    setIsOpenEdit(!isOpenEdit);
  };
  const getProductById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/products/${idProduct}`
      );
      console.log(response.data);

      setName(response.data.product.name);
      setPrice(response.data.product.price);
      setCategory(response.data.product.category);
      setImage(response.data.product.image);
      setDescription(response.data.product.description);
      setQuantity(response.data.product.quantity);

      console.log(placeholderProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsOpenEdit(false);
    setIdProduct("");
    setName("");
    setPrice("");
    setCategory("");
    setImage("");
    setDescription("");
    setQuantity(0);
  };
  console.log(name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/products", {
        name,
        price,
        category,
        image,
        description,
        quantity,
      });
      alert("Product added successfully");
      getProduct();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/products/${idProduct}`,
        {
          name,
          price,
          category,
          image,
          description,
          quantity,
        }
      );
      alert("Product updated successfully");
      closeModal();
      getProduct();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/products/${id}`
      );
      alert("Product deleted successfully");
      console.log(response.data);
      getProduct();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <div
        className="
        flex
        justify-center
        items-center
        bg-gray-200
        h-full

      "
      >
        <div className="flex justify-center">
          <div className="w-100 bg-white p-4 m-4">
            <h1 className="text-2xl font-bold">Admin Product</h1>
            <>
              {/* Modal toggle button */}
              <button
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Add Product
              </button>

              {/* Main modal */}
              {isOpen && (
                <div
                  id="crud-modal"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                >
                  <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* Modal header */}
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Create New Product
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={toggleModal}
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>

                      {/* Modal body */}
                      <form onSubmit={handleSubmit} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                          <div className="col-span-2">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              onChange={(e) => setName(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Type product name"
                              required
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <label
                              htmlFor="price"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Price
                            </label>
                            <input
                              type="number"
                              name="price"
                              id="price"
                              onChange={(e) => setPrice(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="$2999"
                              required
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <label
                              htmlFor="category"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Category
                            </label>
                            <select
                              onChange={(e) => setCategory(e.target.value)}
                              id="category"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                              <option value="" selected>
                                Select category
                              </option>
                              <option value="necklace">Necklace</option>
                              <option value="earring">Earring</option>
                              <option value="bracelet">Bracelet</option>
                              <option value="ring">Ring</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="image"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              image
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              onChange={(e) => setImage(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="enter image url"
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="description"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Product Description
                            </label>
                            <textarea
                              id="description"
                              rows={4}
                              onChange={(e) => setDescription(e.target.value)}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Write product description here"
                            ></textarea>
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Quantity
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              id="quantity"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Type product quantity"
                              onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                              }
                              required
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <svg
                            className="me-1 -ms-1 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Add new product
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product: any) => (
                    <tr
                      key={product.id}
                      className="bg-gray-50 dark:bg-gray-700"
                    >
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">{product.image}</td>
                      <td className="px-6 py-4">{product.quantity}</td>
                      <td className="px-6 py-4">{product.price}</td>
                      <td className="px-6 py-4">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => toggleEditModal(product._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                        {isOpenEdit && (
                          <div
                            id="crud-modal"
                            tabIndex={-1}
                            aria-hidden="true"
                            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                          >
                            <div className="relative p-4 w-full max-w-md max-h-full">
                              {/* Modal content */}
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit Product
                                  </h3>
                                  <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={closeModal}
                                  >
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 14 14"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                      />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                  </button>
                                </div>

                                {/* Modal body */}
                                <form
                                  onSubmit={handleEdit}
                                  className="p-4 md:p-5"
                                >
                                  <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                      <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Name
                                      </label>
                                      <input
                                        type="text"
                                        value={name}
                                        name="name"
                                        id="name"
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required
                                      />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                      <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Price
                                      </label>
                                      <input
                                        value={price}
                                        type="number"
                                        name="price"
                                        id="price"
                                        onChange={(e) =>
                                          setPrice(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="$2999"
                                        required
                                      />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                      <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Category
                                      </label>
                                      <select
                                        onChange={(e) =>
                                          setCategory(e.target.value)
                                        }
                                        id="category"
                                        value={category}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      >
                                        <option value="" selected>
                                          Select category
                                        </option>
                                        <option value="necklace">
                                          Necklace
                                        </option>
                                        <option value="earring">Earring</option>
                                        <option value="bracelet">
                                          Bracelet
                                        </option>
                                        <option value="ring">Ring</option>
                                      </select>
                                    </div>
                                    <div className="col-span-2">
                                      <label
                                        htmlFor="image"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        image
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={image}
                                        onChange={(e) =>
                                          setImage(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="enter image url"
                                        required
                                      />
                                    </div>
                                    <div className="col-span-2">
                                      <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Product Description
                                      </label>
                                      <textarea
                                        id="description"
                                        rows={4}
                                        value={description}
                                        onChange={(e) =>
                                          setDescription(e.target.value)
                                        }
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write product description here"
                                      ></textarea>
                                    </div>
                                    <div className="col-span-2">
                                      <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Quantity
                                      </label>
                                      <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        value={quantity}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product quantity"
                                        onChange={(e) =>
                                          setQuantity(parseInt(e.target.value))
                                        }
                                        required
                                      />
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  >
                                    <svg
                                      className="me-1 -ms-1 w-5 h-5"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                    Edit product
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
