import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaTrashAlt } from "react-icons/fa";
import { removeFavourite } from "../../redux/favouriteSlice";
import { useDispatch } from "react-redux";
interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoriteSideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const favoriteItems = useSelector(
    (state: RootState) => state.favourite.items
  ); // Assuming you have a 'favorites' slice in your Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favouriteFromCookie = Cookies.get("favourite");
  

  const handleNavigateToProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  const handleRemoveFavourite = (productId: string) => {
    dispatch(removeFavourite(productId));
  };
  return (
    <div
      className={`fixed top-0 z-10 right-0 w-64 bg-white h-full shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <button className="absolute top-0 right-0 m-4" onClick={onClose}>
        ×
      </button>
      <h2 className="p-4 border-b">Favorites</h2>
      <ul className="p-4">
        {favoriteItems.map((item) => (
          <li key={item._id} className="mb-4">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button
              className="text-blue-500 underline"
              onClick={() => handleNavigateToProduct(item._id)}
            >
              View Product
            </button>
            <button
              className="text-red-500 underline"
              onClick={() => handleRemoveFavourite(item._id)}
            >
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteSideBar;
