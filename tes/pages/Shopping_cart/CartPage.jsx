import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";
import { Button, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import PaymentGateway from "./PaymentGateway";
import Navbar from "../../MoleculesComponents/User_navbar_and_footer/Navbar"
import Footer from "../../MoleculesComponents/User_navbar_and_footer/Footer"




const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/paymentgateway`); // Redirect to ItemPage
  };


  return (

    <div>
      <div><Navbar></Navbar></div>
      <div className="w-full max-w-7xl  mx-auto mb-40 p-6 bg-white shadow-lg rounded-lg">
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
                key={item._id}
                className="flex items-center justify-between p-4 border rounded-md shadow-sm w-full"
              >
                {/* Product Image & Name */}
                <div className="flex items-center space-x-4 w-1/3 min-w-[250px]">
                  <img src={item.imgUrls?.[0]?.url} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                  <p className="text-gray-800 font-medium truncate w-full">{item.name}</p>
                </div>

                {/* Quantity Control + Price + Remove Button (Horizontally Aligned) */}
                <div className="flex items-center justify-end space-x-6 w-2/3">
                  {/* Quantity Control */}
                  <div className="flex items-center space-x-2 border px-3 py-1 rounded-md">
                    <IconButton
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      disabled={item.quantity <= 1}
                      className="border border-gray-300 rounded"
                    >
                      <Remove />
                    </IconButton>
                    <span className="px-3 py-1 text-lg">{item.quantity}</span>
                    <IconButton
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="border border-gray-300 rounded"
                    >
                      <Add />
                    </IconButton>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString()} LKR
                  </p>

                  {/* Remove Button */}
                  <IconButton
                    onClick={() => dispatch(removeFromCart(item))}
                    className="text-red-500"
                  >
                    <Delete />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grand Total & Checkout */}
        <div className="mt-6 text-right">
          <h3 className="text-2xl font-bold">
            Grand Total: {totalPrice.toLocaleString()} LKR
          </h3>
          <Button
            variant="contained"
            color="primary"
            className="mt-4 bg-purple-600"
            onClick={handleClick}
          >
            Checkout Now
          </Button>
        </div>
      </div>
      <div><Footer></Footer></div>
    </div>
  );
};

export default CartPage;
