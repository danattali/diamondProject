import "./App.scss";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Management from "./Pages/admin/Management";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "../src/utils/axiosConfig";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminProduct from "./Pages/admin/AdminProduct";
import CartPage from "./Pages/Cart";
import UserProfile from "./Pages/UserPortal/UserProfile";
import PurchaseHistory from "./Pages/UserPortal/PurchaseHistory";
import PaymentMethod from "./Pages/UserPortal/PaymentMethod";
import PayCreditCard from "./Pages/PayCreditCard";
import BillingPage from "./Pages/BillingPage";
import AllUsers from "./Pages/admin/AllUsers";
import AllOrder from "./Pages/admin/Orders";

function App() {
  const handleSubmitOrder = async () => {
    try {
      console.log("Order submitted successfully");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  return (
    <>
      <Router>
        <div className="z-10">
          {" "}
          <Header />
        </div>
        <div className="z-10 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Register" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Products" element={<Product />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Admin/Management" element={<Management />} />
            <Route path="/Admin/Products" element={<AdminProduct />} />
            <Route path="/Admin/AllUsers" element={<AllUsers />} />
            <Route path="/Admin/AllOrder" element={<AllOrder />} />
            <Route path="/Checkout" element={<CartPage />} />
            <Route path="/UserPortal/UserProfile" element={<UserProfile />} />
            <Route
              path="/UserPortal/PurchaseHistory"
              element={<PurchaseHistory />}
            />
            <Route
              path="/PayCreditCard"
              element={<PayCreditCard onSubmitOrder={handleSubmitOrder} />}
            />{" "}
            <Route
              path="/UserPortal/PaymentMethod"
              element={<PaymentMethod />}
            />
            <Route path="/BillingPage" element={<BillingPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
