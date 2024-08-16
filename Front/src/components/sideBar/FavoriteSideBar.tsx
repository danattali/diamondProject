import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}
const FavoriteSideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div
      className={`fixed top-0 z-10 right-0 w-64 bg-white h-full shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}
    >
      <button className="absolute top-0 right-0 m-4" onClick={onClose}>
        ×
      </button>
      <h2 className="p-4 border-b">Favourite</h2>
      <ul className="p-4">
        {cartItems.map((item) => (
          <li key={item.id} className="mb-4">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center">
       
      </div>
    </div>
  );
};

export default FavoriteSideBar;
