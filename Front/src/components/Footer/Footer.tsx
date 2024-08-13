import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About Us</h2>
          <p className="text-gray-400">
            At Chic Charms, we offer timeless pieces crafted with love and
            precision. Discover the perfect jewelry to complement your style and
            celebrate life’s special moments.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="text-gray-400">
            <li>
              <a href="/Products" className="hover:text-gray-300">
                Products
              </a>
            </li>
            <li>
              <a href="/AboutUs" className="hover:text-gray-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/ContactUs" className="hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="text-gray-400">
            <i className="fas fa-envelope"></i> danattali242@gmail.com
          </p>
          <p className="text-gray-400">
            <i className="fas fa-phone"></i> +972-058-689-1012
          </p>
          <p className="text-gray-400">
            <i className="fas fa-map-marker-alt"></i> קדושי השואה 20, תל אביב
          </p>
        </div>
      </div>
      <div className="mt-8 text-center border-t border-gray-800 pt-6">
        <p className="text-gray-500">
          &copy; 2024 Chic Charms. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://www.facebook.com" className="hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com" className="hover:text-gray-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.twitter.com" className="hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
