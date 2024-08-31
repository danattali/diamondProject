import React, { FormEvent } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [orderNumber, setOrderNumber] = React.useState<string>("");
  const [message, setMessage] = React.useState("");

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_o3fc346",
        "template_btdlmcj",
        e.currentTarget,
        "YtbhJeVP4hc2LuR89"
      )
      .then(
        () => {
          alert("Email Sent Successfully");
        },
        (error: { text: string }) => {
          console.log(error.text);
        }
      );

    setName("");
    setEmail("");
    setPhone("");
    setOrderNumber("");
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 pt-20">Contact Us</h1>
      <p className="text-center">
        Please fill out the form below to contact us! We typically respond to
        inquiries within 24 hours and will be happy to assist!
      </p>

      <div className="flex justify-center">
        <div className="w-1/2 h-1 bg-blue-500 my-4"></div>
      </div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={sendEmail}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Name:{" "}
          </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Email:{" "}
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Phone:{" "}
          </label>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Order Number:{" "}
          </label>
          <input
            type="text"
            placeholder="Order Number"
            name="orderNumber"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setOrderNumber(e.target.value)}
            value={orderNumber}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold m-2">
            Message:{" "}
          </label>
          <textarea
            placeholder="Message"
            name="message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
