import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";
import { Button, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import Swal from "sweetalert2";

import PaymentGateway from "./PaymentGateway";
import Navbar from "../../MoleculesComponents/User_navbar_and_footer/Navbar"
import Footer from "../../MoleculesComponents/User_navbar_and_footer/Footer"



const CartPage = () => {

    const [users, setUsers] = useState([]);  //this is for check the user has logged in or not
    const [loading, setLoading] = useState(true);


  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const navigate = useNavigate();

    useEffect(() => {
      const token  = localStorage.getItem("token");
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







  const handleClick = () => {
    if (!userId) {         
      //alert("Please log in to the site to continue the transaction.");  //checking the user has logged in
        // Redirect to login page
          // toast("Please log in to the site to continue the transaction.", {
          //   duration: 2000,
          //   style: {
          //     background: '#a036b2	',
          //     color: '#fff',
          //     fontSize: '16px',
          //     fontWeight: 'bold',
          //   },
          // });
         // navigate(`/login`); 

                 Swal.fire({
                   title: "",
                   text: "Please log in to the site to continue the transaction.",
                   icon: 'warning',
                   confirmButtonText: "OK",
                 }).then(() => {
                   
                   navigate("/adminpanel/auth/login");
                 });
    } else {
      navigate(`/paymentgateway`);   // Redirect to ItemPage
    }
  };

  return (

    <div className="flex flex-col min-h-screen">
      <div><Navbar /></div>
      <div className="w-full max-w-7xl mx-auto mb-40 p-6 bg-white shadow-lg rounded-lg flex-grow">
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
                  <img src={item.imgUrls?.[0]?.url || item.image || "./graph1.png"} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
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
        <div className="mt-9 text-right">
          <h3 className=" text-2xl font-bold mb-6">
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
      <div><Footer /></div>
    </div>
  );
};

export default CartPage;
