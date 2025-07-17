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
import { calculateDeliveryTotal, getServiceCharges, getDeliveryInfo, calculateServiceCharge } from '../../utils/locationData';

export default function ContinuePurchasePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState('Home Delivery');
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [serviceCharge, setServiceCharge] = useState(0);

  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // Get build data from navigation state
  const { buildData, selectedComponents, totalPrice } = location.state || {};

  // Debug logging
  console.log('ContinuePurchasePage - Raw data:', {
    buildData,
    selectedComponents,
    totalPrice,
    locationState: location.state
  });

  // Get service charges (deprecated - kept for backwards compatibility)
  const serviceCharges = getServiceCharges();

  // Calculate service charge based on number of components
  useEffect(() => {
    const calculateDynamicServiceCharge = async () => {
      if (selectedComponents && Array.isArray(selectedComponents)) {
        const componentCount = selectedComponents.length;
        const dynamicServiceCharge = await calculateServiceCharge(componentCount);
        setServiceCharge(dynamicServiceCharge);
      } else {
        setServiceCharge(0);
      }
    };

    calculateDynamicServiceCharge();
  }, [selectedComponents]);

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
  const finalTotal = totalPrice + serviceCharge + (deliveryMethod === 'Home Delivery' ? deliveryCharge : 0);

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
            buildName={buildData?.name || 'Custom Build'}
            components={(() => {
              // Try multiple data sources for components
              let components = [];
              
              console.log('Debug - selectedComponents:', selectedComponents);
              console.log('Debug - buildData:', buildData);
                
              // Option 1: selectedComponents (from navigation state) - should be array now
              if (selectedComponents && Array.isArray(selectedComponents)) {
                console.log('Using selectedComponents array:', selectedComponents);
                  components = selectedComponents.filter(comp => comp && comp.name);
              }
              // Option 2: selectedComponents as object (fallback)
              else if (selectedComponents && typeof selectedComponents === 'object' && !Array.isArray(selectedComponents)) {
                console.log('Converting selectedComponents object to array:', selectedComponents);
                components = Object.entries(selectedComponents).flatMap(([type, component]) => {
                  if (Array.isArray(component)) {
                    return component.map(item => ({
                      _id: item._id,
                      name: item.name,
                      type: type.toLowerCase() === 'case' ? 'casing' : item.type || type.toLowerCase(),
                      manufacturer: item.manufacturer,
                      price: typeof item.price === 'string' 
                        ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
                        : parseFloat(item.price) || 0,
                      image: item.image || (item.imgUrls && item.imgUrls[0]?.url) || '',
                      imgUrls: item.imgUrls || [],
                      specifications: item.specifications || {}
                    }));
                  } else if (component) {
                    return [{
                      _id: component._id,
                      name: component.name,
                      type: type.toLowerCase() === 'case' ? 'casing' : component.type || type.toLowerCase(),
                      manufacturer: component.manufacturer,
                      price: typeof component.price === 'string' 
                        ? parseFloat(component.price.replace(/[^0-9.]/g, '')) 
                        : parseFloat(component.price) || 0,
                      image: component.image || (component.imgUrls && component.imgUrls[0]?.url) || '',
                      imgUrls: component.imgUrls || [],
                      specifications: component.specifications || {}
                    }];
                  }
                  return [];
                }).filter(component => component && component.name);
              }
              
              // Option 3: buildData.components (from build data)
              if (components.length === 0 && buildData?.components) {
                console.log('Using buildData.components:', buildData.components);
                components = Array.isArray(buildData.components) ? 
                  buildData.components.filter(comp => comp && comp.name) : [];
              }
              
              console.log('Final components for OrderSummary:', components);
              return components;
            })()}
            totalPrice={(() => {
              // Try to get total price from multiple sources
              let total = 0;
              
              if (buildData?.totalCharge) {
                total = parseFloat(buildData.totalCharge);
              } else if (buildData?.componentsPrice) {
                total = parseFloat(buildData.componentsPrice);
              } else if (buildData?.totalPrice) {
                total = typeof buildData.totalPrice === 'string' 
                  ? parseFloat(buildData.totalPrice.replace(/[^0-9.]/g, '')) 
                  : parseFloat(buildData.totalPrice);
              } else if (components.length > 0) {
                // Calculate from components if no total is available
                total = components.reduce((sum, comp) => {
                  const price = typeof comp.price === 'string' 
                    ? parseFloat(comp.price.replace(/[^0-9.]/g, '')) 
                    : parseFloat(comp.price) || 0;
                  return sum + price;
                }, 0);
              }
              
              return total || 0;
            })()}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeliveryMethod onDeliveryMethodChange={handleDeliveryMethodChange} />
          {deliveryMethod === 'Home Delivery' ? (
            <AddressForm key={`${user?.province}-${user?.district}-${user?.address}`} />
          ) : (
            <StorePickup />
          )}
        </section>

        <OrderTotal 
          componentCost={totalPrice}
          serviceCharge={serviceCharge}
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
