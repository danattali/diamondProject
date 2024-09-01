import React from "react";
import Select from "react-tailwindcss-select";
import { useDispatch } from "react-redux";
import { ProductType } from "../components/@types/types";
import ProductModal from "../components/Modal/ProductModal";
import { addItem } from "../redux/cartSlice";
import axios from "axios";
import { MdFavorite } from "react-icons/md";
import { addFavourite } from "../redux/favouriteSlice";

// Import the Option type from react-tailwindcss-select
import { Option } from "react-tailwindcss-select/dist/components/type";

const Product: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<Option | null>(
    {
      value: "all",
      label: "All Categories",
    }
  );

  const [selectProduct, setSelectProduct] = React.useState<ProductType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState<ProductType[]>([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Convert products to categories for Select options
  const categories: Option[] = [
    { value: "all", label: "All Categories" },
    ...Array.from(
      new Set((products || []).map((product) => product.category))
    ).map((category) => ({ value: category, label: category })),
  ];

  // Handle category change
  const handleCategoryChange = (value: Option | null) => {
    setSelectedCategory(value);
  };

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory?.value === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory?.value
        );

  // Open product modal
  const openModal = (product: ProductType) => {
    setSelectProduct(product);
    setIsModalOpen(true);
  };

  // Add product to cart
  const handleAddToCart = (product: ProductType) => {
    dispatch(addItem(product));
  };

  // Close product modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectProduct(null);
  };

  // Add product to favourites
  const handleAddToFavourite = (product: ProductType) => {
    dispatch(addFavourite(product));
  };

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
            id="category"
            className="mt-1"
            options={categories}
            onChange={handleCategoryChange}
            value={selectedCategory}
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
