// src/components/OrderSummary.jsx
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function OrderSummary({ buildName, components, totalPrice }) {
  const navigate = useNavigate();
  // Find the case component - handle both 'Case' and 'casing' types
  const caseComponent = components.find(comp => 
    comp.type === 'Case' || 
    comp.type === 'casing' || 
    comp.type?.toLowerCase() === 'case' ||
    comp.type?.toLowerCase() === 'casing'
  );

  // Helper function to get image URL
  const getImageUrl = (component) => {
    if (component.image) return component.image;
    if (component.imgUrls && component.imgUrls.length > 0) {
      return component.imgUrls[0].url || component.imgUrls[0];
    }
    return '';
  };

  // Helper function to parse and format price
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    }
    return parseFloat(price) || 0;
  };

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
                src={getImageUrl(caseComponent)}
                alt="PC Case"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className={`w-full h-full bg-gray-100 flex items-center justify-center ${caseComponent && getImageUrl(caseComponent) ? 'hidden' : 'flex'}`}>
              <span className="text-2xl text-gray-400">PC</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{buildName}</h3>
            <p className="text-sm text-gray-500">{components.length} components</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-semibold text-xl text-gray-800">LKR {(parsePrice(totalPrice) || 0).toFixed(2)}</p>
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
                  src={getImageUrl(component)}
                  alt={component.name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAyMkM5IDIyIDQgMTkgNCAxNVM5IDggMTYgOFMyOCAxMSAyOCAxNVMyMyAyMiAxNiAyMloiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+Cg==';
                  }}
                />
                <span className="text-gray-600">{component.name}</span>
              </div>
              <span className="text-gray-800">LKR {(parsePrice(component.price) || 0).toFixed(2)}</span>
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
      price: PropTypes.number,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalPrice: PropTypes.number,
};
