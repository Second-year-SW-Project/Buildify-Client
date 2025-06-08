// src/pages/ContinuePurchasePage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OrderSummary from '../../AtomicComponents/ForCustomBuild/OrderSummary';
import DeliveryMethod from '../../AtomicComponents/ForCustomBuild/DeliveryMethod';
import AddressForm from '../../AtomicComponents/ForCustomBuild/AddressForm';
import StorePickup from '../../AtomicComponents/ForCustomBuild/StorePickup';
import OrderTotal from '../../AtomicComponents/ForCustomBuild/OrderTotal';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import { toast } from 'sonner';
import { calculateDeliveryTotal, getServiceCharges, getDeliveryInfo } from '../../utils/locationData';

export default function ContinuePurchasePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState('Home Delivery');
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // Get build data from navigation state
  const { buildData, selectedComponents, totalPrice } = location.state || {};

  // Get service charges
  const serviceCharges = getServiceCharges();

  // Calculate delivery charges based on user's location
  useEffect(() => {
    if (user?.province && user?.district && deliveryMethod === 'Home Delivery') {
      const charge = calculateDeliveryTotal(user.province, user.district);
      const info = getDeliveryInfo(user.province, user.district);
      setDeliveryCharge(charge);
      setDeliveryInfo(info);
    } else {
      setDeliveryCharge(0);
      setDeliveryInfo(null);
      
      // Show notification if user hasn't set location and delivery method is Home Delivery
      if (deliveryMethod === 'Home Delivery' && (!user?.province || !user?.district)) {
        toast.warning("Please update your address in your profile to calculate delivery charges.", {
          duration: 4000,
          style: {
            background: '#f59e0b',
            color: '#fff',
            fontSize: '14px',
          },
        });
      }
    }
  }, [user?.province, user?.district, deliveryMethod]);

  // Calculate final total
  const finalTotal = totalPrice + serviceCharges.fixedServiceCharge + (deliveryMethod === 'Home Delivery' ? deliveryCharge : 0);

  // Redirect if no build data
  useEffect(() => {
    if (!buildData) {
      toast.error("No build data found. Please start over.", {
        duration: 3000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
      navigate('/chooseparts');
    }
  }, [buildData, navigate]);

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  if (!buildData) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl font-bold text-purple-700">Continue your purchase</h1>

        <section>
          <h2 className="text-xl font-semibold text-purple-700 mb-3">Your Order</h2>
          <OrderSummary 
            buildName={buildData.name}
            components={buildData.components}
            totalPrice={totalPrice}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeliveryMethod onDeliveryMethodChange={handleDeliveryMethodChange} />
          {deliveryMethod === 'Home Delivery' ? <AddressForm /> : <StorePickup />}
        </section>

        <OrderTotal 
          componentCost={totalPrice}
          serviceCharge={serviceCharges.fixedServiceCharge}
          deliveryCharge={deliveryMethod === 'Home Delivery' ? deliveryCharge : 0}
          deliveryMethod={deliveryMethod}
          deliveryInfo={deliveryInfo}
          finalTotal={finalTotal}
        />
      </div>
      <Footer />
    </>
  );
}
