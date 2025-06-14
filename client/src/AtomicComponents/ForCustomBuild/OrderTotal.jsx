// src/components/OrderTotal.jsx
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'sonner';

export default function OrderTotal({ 
  componentCost, 
  serviceCharge, 
  deliveryCharge, 
  deliveryMethod, 
  deliveryInfo, 
  finalTotal 
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleProceedToPayment = () => {
    try {
      // Get build data from navigation state
      const { buildData, selectedComponents } = location.state || {};
      
      if (!buildData || !selectedComponents) {
        toast.error("Build data not found. Please start over.", {
          duration: 3000,
          style: {
            background: '#ff6b6b',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });
        return;
      }

      // Validate that buildData has an _id
      if (!buildData._id) {
        console.error('buildData is missing _id:', buildData);
        toast.error("Build ID is missing. Please start over from the build page.", {
          duration: 3000,
          style: {
            background: '#ff6b6b',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });
        return;
      }

      // Convert selectedComponents object to array format
      const componentsArray = Object.entries(selectedComponents).flatMap(([componentType, component]) => {
        // Handle array components (like Memory, Storage)
        if (Array.isArray(component)) {
          return component.map(item => ({
            _id: item._id || item.originalData?._id,
            name: item.name,
            type: item.type || item.originalData?.type || componentType.toLowerCase(),
            manufacturer: item.manufacturer || item.originalData?.manufacturer,
            price: typeof item.price === 'string' 
              ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
              : item.price || item.originalData?.price,
            quantity: 1,
            image: item.image || item.originalData?.imgUrls?.[0]?.url,
            imgUrls: item.imgUrls || item.originalData?.imgUrls,
            specifications: item.specifications || item.originalData?.specifications || {}
          }));
        } else if (component) {
          // Handle single components
          return [{
            _id: component._id || component.originalData?._id,
            name: component.name,
            type: component.type || component.originalData?.type || componentType.toLowerCase(),
            manufacturer: component.manufacturer || component.originalData?.manufacturer,
            price: typeof component.price === 'string' 
              ? parseFloat(component.price.replace(/[^0-9.]/g, '')) 
              : component.price || component.originalData?.price,
            quantity: 1,
            image: component.image || component.originalData?.imgUrls?.[0]?.url,
            imgUrls: component.imgUrls || component.originalData?.imgUrls,
            specifications: component.specifications || component.originalData?.specifications || {}
          }];
        }
        return [];
      });

      // Find the case component for the image
      const caseComponent = componentsArray.find(comp => 
        comp.type === 'casing' || comp.type === 'Case'
      );

      // Create custom build cart item
      const customBuildItem = {
        _id: `custom_build_${Date.now()}`, // Unique ID for custom build
        name: buildData.name,
        type: 'custom_build',
        price: finalTotal,
        image: caseComponent?.image || caseComponent?.imgUrls?.[0]?.url || '/default-case.png',
        quantity: 1,
        // Store build-specific data for later use
        buildData: {
          buildId: buildData._id,
          buildName: buildData.name,
          selectedComponents: componentsArray, // Use converted array
          deliveryMethod,
          deliveryInfo,
          pricingBreakdown: {
            componentsPrice: componentCost,
            serviceCharge,
            deliveryCharge
          }
        }
      };

      // Add to cart
      dispatch(addToCart(customBuildItem));
      
      toast.success(`Custom build "${buildData.name}" added to cart`, {
        duration: 2000,
        style: {
          background: '#a036b2',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });

      // Navigate to cart page
      navigate('/cartpage');
      
    } catch (error) {
      console.error('Error adding custom build to cart:', error);
      toast.error("Failed to add build to cart. Please try again.", {
        duration: 3000,
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      });
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3 shadow-sm">
      <h3 className="text-lg font-semibold text-purple-700 mb-4">Order Summary</h3>
      
      <div className="space-y-3 text-gray-800">
        <div className="flex justify-between">
          <span className="font-medium">Total component cost:</span>
          <span className="font-semibold">{formatPrice(componentCost)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Fixed service charge:</span>
          <span className="font-semibold">{formatPrice(serviceCharge)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Delivery charge:</span>
          <div className="text-right">
            {deliveryMethod === 'Home Delivery' ? (
              <>
                <span className="font-semibold">{formatPrice(deliveryCharge)}</span>
                {deliveryInfo && (
                  <div className="text-xs text-gray-500 mt-1">
                    to {deliveryInfo.district}, {deliveryInfo.province}
                  </div>
                )}
              </>
            ) : (
              <span className="font-semibold text-green-600">Free</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-3 border-t-2 border-purple-200">
        <span>Total:</span>
        <span className="text-purple-700">{formatPrice(finalTotal)}</span>
      </div>
      
      <div className="flex justify-center pt-4">
        <button 
          onClick={handleProceedToPayment}
          className="w-full max-w-[300px] py-3 rounded-md bg-purple-700 hover:bg-purple-800 text-white font-medium transition duration-200 transform hover:scale-105"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

OrderTotal.propTypes = {
  componentCost: PropTypes.number.isRequired,
  serviceCharge: PropTypes.number.isRequired,
  deliveryCharge: PropTypes.number.isRequired,
  deliveryMethod: PropTypes.string.isRequired,
  deliveryInfo: PropTypes.shape({
    charge: PropTypes.number,
    estimatedDays: PropTypes.number,
    province: PropTypes.string,
    district: PropTypes.string,
  }),
  finalTotal: PropTypes.number.isRequired,
};

