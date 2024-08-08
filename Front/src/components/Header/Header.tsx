import React, { Fragment, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosCart } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import { Popover, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import SideBar from "../sideBar/SideBar";
import { clearCart } from "../../redux/cartSlice";
import { MdFavorite } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [login, setLogin] = useState("");
  const [userType, setUserType] = useState("");
  const [isPersonMenuOpen, setIsPersonMenuOpen] = useState(false); // New state for IoMdPerson menu

  const projectNumber = useSelector((state: RootState) =>
    state?.cart?.items?.reduce(
      (total: any, item: any) => total + item.quantity,
      0
    )
  );
  const dispatch = useDispatch();

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const typeUser = localStorage.getItem("userType");
  const ifLoggedIn = localStorage.getItem("login");

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("_id");
    localStorage.removeItem("state");
    dispatch(clearCart());
    setLogin("");
    alert("Logged out successfully");
    window.location.reload();
  };

  useEffect(() => {
    if (ifLoggedIn) {
      setLogin(ifLoggedIn);
    }
    if (typeUser) {
      setUserType(typeUser);
    }
  }, [ifLoggedIn]);

  const navLinksAdmin = [
    { href: "/admin/Management", label: "Admin" },
    { href: "/admin/products", label: "Products" },
    { href: "/users", label: "Users" },
    { href: "/orders", label: "Orders" },
    { href: "/", label: "Log Out", onClick: logout },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/AboutUs", label: "About Us" },
    { href: "/products", label: "Product" },
    { href: "/ContactUs", label: "Contact Us" },
  ];

  const userLink = [
    { href: "/SignIn", label: "Sign In" },
    { href: "/Register", label: "Register" },
  ];

  const loggedUser = [
    { href: "/UserPortal/UserProfile", label: "Profile" },
    { href: "/UserPortal/PurchaseHistory", label: "Purchase History" },
    { href: "/UserPortal/PaymentMethod", label: "Payment Methods" },
    { href: "/", label: "Log Out", onClick: logout },
  ];

  return (
    <>
      <header className="sm:px-8 px-4 py-2 z-10 w-full absolute bg-white">
        <nav className="flex justify-between items-center max-container">
          <a href="/" className="text-3xl font-bold">
            Chic Charms
          </a>
          <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-montserrat leading-normal text-lg text-slate-gray"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24 z-0">
            <form action="" className="relative mx-auto flex">
              <input
                type="search"
                className="text-xs peer cursor-pointer relative z-10 h-8 w-10 rounded-lg border bg-transparent pr-6 outline-none focus:rounded-r-none focus:w-full focus:cursor-text focus:border-taupeGray focus:px-3"
                placeholder="search..."
              />
              <button className="absolute top-0 right-0 bottom-0 my-auto h-8 w-10 px-3 bg-slate-300 rounded-lg peer-focus:relative peer-focus:rounded-l-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                >
                  <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                </svg>
              </button>
            </form>
            {/* person logo */}
            <Popover
              onMouseEnter={() => setIsPersonMenuOpen(true)}
              onMouseLeave={() => setIsPersonMenuOpen(false)}
            >
              <Popover.Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoMdPerson className="text-3xl cursor-pointer" />
              </Popover.Button>
              <Transition
                as={Fragment}
                show={isPersonMenuOpen} // Show based on isPersonMenuOpen state
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel className="absolute z-1 right-0 top-14 w-48 bg-slate-100 rounded-lg shadow-lg">
                  <ul className="flex flex-col items-center justify-center h-full z-10">
                    {login
                      ? userType === "admin"
                        ? navLinksAdmin.map((item) => (
                            <li key={item.label}>
                              <a
                                href={item.href}
                                className="font-montserrat leading-normal text-lg text-slate-gray"
                                onClick={item.onClick}
                              >
                                {item.label}
                              </a>
                            </li>
                          ))
                        : loggedUser.map((item) => (
                            <li key={item.label}>
                              <a
                                href={item.href}
                                className="font-montserrat leading-normal text-lg text-slate-gray"
                                onClick={item.onClick}
                              >
                                {item.label}
                              </a>
                            </li>
                          ))
                      : userLink.map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              className="font-montserrat leading-normal text-lg text-slate-gray"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                  </ul>
                </Popover.Panel>
              </Transition>
            </Popover>
            <div className="max-lg:block cursor-pointer">
              <MdFavorite className="text-3xl" />
            </div>
            {/* cart logo */}
            <div className="cart-container">
              <IoIosCart
                className="text-3xl cursor-pointer"
                onClick={toggleSideBar}
              />
              <span className="cart-count">{projectNumber}</span>
            </div>
          </div>

          <div
            className="hidden max-lg:block cursor-pointer"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <RxHamburgerMenu className="text-4xl" />
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div>
          <nav className="fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100">
            <div
              className="hidden max-lg:block fixed right-0 px-8 py-4 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <AiOutlineClose className="text-4xl" />
            </div>
            <ul className="lg:hidden flex flex-col items-center justify-center h-full">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-montserrat leading-normal text-lg text-slate-gray"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      <SideBar isOpen={isSideBarOpen} onClose={toggleSideBar} />
    </>
  );
};

export default Header;
