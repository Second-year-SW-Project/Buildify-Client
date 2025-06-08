// src/components/OrderTotal.jsx
import PropTypes from 'prop-types';

export default function OrderTotal({ 
  componentCost, 
  serviceCharge, 
  deliveryCharge, 
  deliveryMethod, 
  deliveryInfo, 
  finalTotal 
}) {
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(price);
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
        <button className="w-full max-w-[300px] py-3 rounded-md bg-purple-700 hover:bg-purple-800 text-white font-medium transition duration-200 transform hover:scale-105">
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
