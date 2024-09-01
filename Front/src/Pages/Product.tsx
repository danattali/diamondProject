import React, { useState, useEffect, useMemo } from "react";
import Select from "react-tailwindcss-select";
import { useDispatch } from "react-redux";
import { ProductType } from "../components/@types/types";
import ProductModal from "../components/Modal/ProductModal";
import { addItem } from "../redux/cartSlice";
import axios from "axios";
import { MdFavorite } from "react-icons/md";
import { addFavourite } from "../redux/favouriteSlice";
type Option = {
  value: string;
  label: string;
};
const Product: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [selectProduct, setSelectProduct] = useState<ProductType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://diamondproject.onrender.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const categories: Option[] = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      ...Array.from(new Set(products.map((product) => product.category))).map(
        (category) => ({ value: category, label: category })
      ),
    ],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      !selectedCategory || selectedCategory.value === "all"
        ? products
        : products.filter(
            (product) => product.category === selectedCategory.value
          ),
    [products, selectedCategory]
  );

  const handleCategoryChange = (option: Option | Option[] | null) => {
    if (Array.isArray(option)) {
      setSelectedCategory(option[0] || null);
    } else {
      setSelectedCategory(option);
    }
  };

  const openModal = (product: ProductType) => {
    setSelectProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: ProductType) => {
    dispatch(addItem(product));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectProduct(null);
  };

  const handleAddToFavourite = (product: ProductType) => {
    dispatch(addFavourite(product));
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mt-20">Products</h1>
        <p className="text-gray-500">Explore our wide range of products.</p>
      </div>
      <div className="mt-10">
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by category
          </label>
          <Select
            primaryColor="indigo"
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categories}
            isSearchable
            isClearable
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-end">
                <MdFavorite
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleAddToFavourite(product)}
                  aria-label={`Add ${product.name} to favorites`}
                />
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg mb-4 mx-auto"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-lg">${product.price}</p>
                <p className="text-gray-500">{product.description}</p>
              </div>
            </div>
            <div className="mt-auto flex justify-center space-x-3">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline-none whitespace-nowrap"
                onClick={() => openModal(product)}
              >
                View Detail
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline-none whitespace-nowrap"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectProduct && (
        <ProductModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          product={selectProduct}
        />
      )}
    </div>
  );
};

export default Product;
