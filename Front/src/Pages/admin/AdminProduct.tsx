import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  quantity: number;
}

const AdminProduct: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [error, setError] = useState<string | null>(null);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        "https://diamondproject.onrender.com/products"
      );
      setProducts(response.data.products);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching products:", error.message);
        setError("Failed to load products.");
      } else {
        console.error("Unexpected error:", error);
        setError("Failed to load products.");
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, [isOpenEdit]);

  useEffect(() => {
    if (idProduct) {
      getProductById();
    }
  }, [idProduct]);

  const toggleModal = () => setIsOpen(!isOpen);

  const toggleEditModal = (id: string) => {
    setIdProduct(id);
    setIsOpenEdit(!isOpenEdit);
  };

  const getProductById = async () => {
    try {
      const response = await axios.get(
        `https://diamondproject.onrender.com/products/${idProduct}`
      );
      setName(response.data.product.name);
      setPrice(response.data.product.price);
      setCategory(response.data.product.category);
      setImage(response.data.product.image);
      setDescription(response.data.product.description);
      setQuantity(response.data.product.quantity);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching product details:", error.message);
        setError("Failed to load product details.");
      } else {
        console.error("Unexpected error:", error);
        setError("Failed to load product details.");
      }
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsOpenEdit(false);
    setIdProduct("");
    setName("");
    setPrice("");
    setCategory("");
    setImage("");
    setDescription("");
    setQuantity(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://diamondproject.onrender.com/products", {
        name,
        price,
        category,
        image,
        description,
        quantity,
      });
      alert("Product added successfully");
      getProduct();
      setError(null); // Clear error after successful operation
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding product:", error.message);
        setError("Failed to add product.");
      } else {
        console.error("Unexpected error:", error);
        setError("Failed to add product.");
      }
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://diamondproject.onrender.com/products/${idProduct}`,
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
      setError(null); // Clear error after successful operation
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating product:", error.message);
        setError("Failed to update product.");
      } else {
        console.error("Unexpected error:", error);
        setError("Failed to update product.");
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`https://diamondproject.onrender.com/products/${id}`);
      alert("Product deleted successfully");
      getProduct();
      setError(null); // Clear error after successful operation
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting product:", error.message);
        setError("Failed to delete product.");
      } else {
        console.error("Unexpected error:", error);
        setError("Failed to delete product.");
      }
    }
  };

  return (
    <div>
      <div
        className="flex justify-center items-center bg-gray-200 h-full"
        style={{ zIndex: "-1" }}
      >
        <div className="flex justify-center">
          <div className="w-100 bg-white p-4 m-4">
            <h1 className="text-2xl font-bold">Admin Product</h1>
            <button
              onClick={toggleModal}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="button"
            >
              Add Product
            </button>

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                <strong className="font-bold">Error: </strong>
                <span>{error}</span>
              </div>
            )}

            {/* Product List */}
            <div className="mt-4">
              {products.map((product) => (
                <div key={product.id} className="border p-4 mb-4 bg-gray-50">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p>{product.price}</p>
                  <p>{product.category}</p>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover"
                  />
                  <p>{product.description}</p>
                  <p>Quantity: {product.quantity}</p>
                  <button
                    onClick={() => toggleEditModal(product.id)}
                    className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {(isOpen || isOpenEdit) && (
              <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
              >
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {isOpenEdit ? "Edit Product" : "Create New Product"}
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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
                    <form
                      onSubmit={isOpenEdit ? handleEdit : handleSubmit}
                      className="p-4 md:p-5"
                    >
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Product Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Product Name"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Price"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Category
                          </label>
                          <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Category"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="image"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Image URL
                          </label>
                          <input
                            type="text"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Image URL"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Description"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="quantity"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Quantity
                          </label>
                          <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value, 10))
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Quantity"
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            {isOpenEdit ? "Update" : "Submit"}
                          </button>
                          <button
                            type="button"
                            onClick={closeModal}
                            className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
