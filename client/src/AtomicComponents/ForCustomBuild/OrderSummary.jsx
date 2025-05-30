// src/components/OrderSummary.jsx
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function OrderSummary({ buildName, components, totalPrice }) {
  const navigate = useNavigate();
  // Find the case component
  const caseComponent = components.find(comp => comp.type === 'Case');

  const handleDelete = () => {
    // Show confirmation toast
    toast.error("Order cleared", {
      duration: 2000,
      style: {
        background: '#ff6b6b',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    });
    
    // Navigate back to choose parts page
    navigate('/chooseparts');
  };

  return (
    <div className="border rounded-lg p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            {caseComponent ? (
              <img
                src={caseComponent.image}
                alt="PC Case"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-2xl text-gray-400">PC</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{buildName}</h3>
            <p className="text-sm text-gray-500">{components.length} components</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-semibold text-xl text-gray-800">LKR {totalPrice.toFixed(2)}</p>
          <button 
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Clear order"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-800 mb-3">Components:</h4>
        <div className="space-y-2">
          {components.map((component, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <img
                  src={component.image}
                  alt={component.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-gray-600">{component.name}</span>
              </div>
              <span className="text-gray-800">LKR {component.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  buildName: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
};
