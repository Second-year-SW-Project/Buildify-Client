import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";
import { Button, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

import Navbar from "../../MoleculesComponents/User_navbar_and_footer/Navbar";
import Footer from "../../MoleculesComponents/User_navbar_and_footer/Footer";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51RAt66QrMZYW3Chd7hWi12tUhngYuiEe7M1hBUpvJAHIIZq95xF9yo97ZQBuup7avOuiTojlhqxm3R0GbxAmNexx00e2V1MOzb"); // Replace with your Stripe test publishable key

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const totalPrice = useSelector((state) => state.cart.totalPrice) || 0;
  const dispatch = useDispatch();

  const handleCheckout = async (paymentMethodId) => {
    try {
      const sanitizedCartItems = cartItems.map((item) => ({
        _id: item._id || item.Id,
        name: item.name,
        category: item.type,
        quantity: item.quantity,
        price: item.price,
      }));

      console.log("Sending Checkout Request:", { items: sanitizedCartItems, total: totalPrice });

      const response = await fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: sanitizedCartItems, total: totalPrice, paymentMethodId }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok) {
        alert("Transaction Successful! 🎉");
      } else {
        alert(`Transaction Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Transaction Failed! Please try again.");
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="w-full max-w-7xl mx-auto mb-40 p-6 bg-white shadow-lg rounded-lg">
        {/* Title */}
        <h2 className="text-center text-xl font-bold bg-purple-700 text-white py-3 rounded-md">
          QUOTATION
        </h2>

        {/* Cart Items List */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 mt-5">Your cart is empty</p>
        ) : (
          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id || item.Id}
                className="flex items-center justify-between p-4 border rounded-md shadow-sm w-full"
              >
                {/* Product Image & Name */}
                <div className="flex items-center space-x-4 w-1/3 min-w-[250px]">
                  <img
                    src={item.imgUrls?.[0]?.url || "./graph1.png"}
                    alt={item.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <p className="text-gray-800 font-medium truncate w-full">{item.name}</p>
                </div>

                {/* Quantity Control + Price + Remove */}
                <div className="flex items-center justify-end space-x-6 w-2/3">
                  <div className="flex items-center space-x-2 border px-3 py-1 rounded-md">
                    <IconButton
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <span className="px-3 py-1 text-lg">{item.quantity}</span>
                    <IconButton onClick={() => dispatch(increaseQuantity(item._id))}>
                      <Add />
                    </IconButton>
                  </div>

                  <p className="text-lg font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString()} LKR
                  </p>

                  <IconButton onClick={() => dispatch(removeFromCart(item))} className="text-red-500">
                    <Delete />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="mt-6 text-right">
            <h3 className="text-2xl font-bold">
              Grand Total: {totalPrice.toLocaleString()} LKR
            </h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm onCheckout={handleCheckout} />
            </Elements>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

const CheckoutForm = ({ onCheckout }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Payment Method Error:", error);
      alert("Payment failed. Please try again.");
    } else {
      onCheckout(paymentMethod.id);
    }
  };

  const cardElementOptions = {
    hidePostalCode: true, // Hides the ZIP/postal code field
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
    <form onSubmit={handleSubmit}>
      <CardElement options={cardElementOptions} />
      <button
        type="submit"
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export default CartPage;