// src/pages/ContinuePurchasePage.jsx
import React, { useState } from 'react';
import OrderSummary from '../../AtomicComponents/ForCustomBuild/OrderSummary';
import DeliveryMethod from '../../AtomicComponents/ForCustomBuild/DeliveryMethod';
import AddressForm from '../../AtomicComponents/ForCustomBuild/AddressForm';
import StorePickup from '../../AtomicComponents/ForCustomBuild/StorePickup';
import OrderTotal from '../../AtomicComponents/ForCustomBuild/OrderTotal';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';

export default function ContinuePurchasePage() {
  const [deliveryMethod, setDeliveryMethod] = useState('Home Delivery');

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl font-bold text-purple-700">Continue your purchase</h1>

        <section>
          <h2 className="text-xl font-semibold text-purple-700 mb-3">Your Order</h2>
          <OrderSummary />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeliveryMethod onDeliveryMethodChange={handleDeliveryMethodChange} />
          {deliveryMethod === 'Home Delivery' ? <AddressForm /> : <StorePickup />}
        </section>

        <OrderTotal />
      </div>
      <Footer />
    </>
  );
}
