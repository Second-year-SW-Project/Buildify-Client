// src/pages/ContinuePurchasePage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderSummary from '../../AtomicComponents/ForCustomBuild/OrderSummary';
import DeliveryMethod from '../../AtomicComponents/ForCustomBuild/DeliveryMethod';
import AddressForm from '../../AtomicComponents/ForCustomBuild/AddressForm';
import StorePickup from '../../AtomicComponents/ForCustomBuild/StorePickup';
import OrderTotal from '../../AtomicComponents/ForCustomBuild/OrderTotal';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import { toast } from 'sonner';

export default function ContinuePurchasePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState('Home Delivery');

  // Get build data from navigation state
  const { buildData, selectedComponents, totalPrice } = location.state || {};

  // Redirect if no build data
  React.useEffect(() => {
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

        <OrderTotal totalPrice={totalPrice} />
      </div>
      <Footer />
    </>
  );
}
