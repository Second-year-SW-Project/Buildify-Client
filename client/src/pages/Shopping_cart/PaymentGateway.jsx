import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../redux/cartSlice";
import { Button, IconButton } from "@mui/material";
import { Add, Remove, Delete, Label } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../MoleculesComponents/User_navbar_and_footer/Navbar";
import Footer from "../../MoleculesComponents/User_navbar_and_footer/Footer";
import Swal from "sweetalert2"; 


import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { toast, Toaster } from "sonner";

const stripePromise = loadStripe(
  "pk_test_51RAt66QrMZYW3Chd7hWi12tUhngYuiEe7M1hBUpvJAHIIZq95xF9yo97ZQBuup7avOuiTojlhqxm3R0GbxAmNexx00e2V1MOzb"
); // Replace with your Stripe publishable key

const PaymentGateway = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const userId = localStorage.getItem("userId");
  const currentUserArray = users.filter((u) => u._id === userId);
  const currentUser = currentUserArray.length > 0 ? currentUserArray[0] : null;


  const handleCheckout = async (paymentMethodId, formData, setIsProcessing) => {
    try {
      const sanitizedCartItems = cartItems.map((item) => ({
        _id: item._id || item.id,
        product_image: item.imgUrls?.[0]?.url || item.image || null,
        name: item.name,
        category: item.type,
        quantity: item.quantity,
        price: item.price,
      }));
  
      const response = await fetch("http://localhost:8000/api/checkout/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: sanitizedCartItems,
          total: totalPrice,
          paymentMethodId,
          user: userId,
          customerEmail: formData.email,
          customerName: formData.name,
        }),
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        Swal.fire({
          title: "Payment Successful 🎉",
          text: "Thank you for your purchase!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          dispatch(clearCart());
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Payment Failed",
          text: data.message || "Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      Swal.fire({
        title: "Error",
        text: "Transaction Failed! Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div>
      <Toaster richColors position="top-right" />
      <Navbar />
      <div className="w-full max-w-5xl mx-auto mb-40 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-xl font-bold bg-black text-white py-3 rounded-md">
          PAYMENT GATEWAY
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 mt-5">Your cart is empty</p>
        ) : (
          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id || item.Id}
                className="flex items-center justify-between p-4 border rounded-md shadow-sm w-full"
              >
                <div className="flex items-center space-x-4 w-1/3 min-w-[250px]">
                  <img
                    src={item.imgUrls?.[0]?.url || item.image || "./graph1.png"}
                    alt={item.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <p className="text-gray-800 font-medium truncate w-full">
                    {item.name}
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-6 w-2/3">
                  <div className="flex items-center space-x-2 border px-3 py-1 rounded-md">
                    <span className="px-3 py-1 text-lg">{item.quantity}</span>
                  </div>

                  <p className="text-lg font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString()} LKR
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="text-2xl font-bold mb-14">
              Total: {totalPrice.toLocaleString()} LKR
            </h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm onCheckout={handleCheckout} />
            </Elements>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const CheckoutForm = ({ onCheckout }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          line1: formData.address,
        },
      },
    });

    if (error) {
      console.error("Payment Method Error:", error);
      toast.error("Payment failed. Please check your card details.");
      setIsProcessing(false);
    } else {
      onCheckout(paymentMethod.id, formData, setIsProcessing);
    }
  };

  const cardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Details
        </label>
        <CardElement options={cardElementOptions} className="border px-3 py-2 rounded-md" />
      </div>

      {isProcessing && (
        <div className="text-blue-600 font-semibold">Processing payment...</div>
      )}

      <button
        type="submit"
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentGateway;
