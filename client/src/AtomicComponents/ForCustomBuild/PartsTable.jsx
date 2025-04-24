import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import AddButton from './AddButton';
import ComponentSelectionPopup from './ComponentSelectionPopup';

const rows = [
  { component: 'CPU' },
  { component: 'CPU Cooler' },
  { component: 'Motherboard' },
  { component: 'Memory' },
  { component: 'Storage' },
  { component: 'Video Card' },
  { component: 'Case' },
  { component: 'Power Supply' },
  { component: 'Expansion Cards/Networking' },
];

function PartsTable({ onComponentsChanged }) {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentComponentType, setCurrentComponentType] = useState(null);

  // Notify parent of component changes
  React.useEffect(() => {
    onComponentsChanged(selectedComponents);
  }, [selectedComponents, onComponentsChanged]);

  // Handle button click to show component selection popup
  const handleSelectComponent = (component) => {
    setCurrentComponentType(component);
    setShowPopup(true);
  };

  // Handle component selection from the popup
  const handleComponentSelected = (componentType, selectedData) => {
    const key = typeof componentType === 'object' ? componentType.componentType : componentType;
    setSelectedComponents((prev) => ({
      ...prev,
      [key]: selectedData,
    }));
  };

  // Handle click on the 9th row's clickable texts
  const handleClickableTextClick = ({ type, componentType }) => {
    console.log('handleClickableTextClick:', { type, componentType });
    setCurrentComponentType({ type, componentType });
    setShowPopup(true);
  };

  // Handle removing a component
  const handleRemoveComponent = (componentKey) => {
    setSelectedComponents((prev) => {
      const newComponents = { ...prev };
      delete newComponents[componentKey];
      return newComponents;
    });
  };

  // Expansion network component types
  const expansionNetworkTypes = [
    { display: 'Sound Cards', componentType: 'sound_card' },
    { display: 'Wired Network Adapters', componentType: 'wired_network_adapter' },
    { display: 'Wireless Network Adapters', componentType: 'wireless_network_adapter' },
  ];

  return (
    <>
      <div className="overflow-x-auto shadow-md opacity-100 rounded-none bg-white">
        <table className="min-w-full bg-white">
          <thead className="bg-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A]">
                Component
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A]">
                Selection
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A]">
                Availability
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A]">
                Price
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A]">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const isNinthRow = index === 8; // Check if it's the 9th row (index 8)
              const selectedData = selectedComponents[row.component];

              return (
                <tr key={row.component} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-roboto font-bold text-xs leading-4 text-[#191B2A]">
                    {row.component}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-roboto font-bold text-xs leading-4 text-[#191B2A]">
                    {!isNinthRow ? (
                      selectedData ? (
                        <div className="flex items-center">
                          <img
                            src={selectedData.image}
                            alt={selectedData.name}
                            className="w-[38px] h-[38px] mr-2"
                          />
                          {selectedData.name}
                        </div>
                      ) : (
                        <AddButton
                          text={`Choose ${row.component}`}
                          onClick={() => handleSelectComponent(row.component)}
                        />
                      )
                    ) : (
                      <div className="flex flex-col gap-2">
                        {/* Display selected expansion network components */}
                        {expansionNetworkTypes.map(({ componentType, display }) => {
                          const selectedExpansionData = selectedComponents[componentType];
                          return selectedExpansionData ? (
                            <div key={componentType} className="flex items-center">
                              <img
                                src={selectedExpansionData.image}
                                alt={selectedExpansionData.name}
                                className="w-[38px] h-[38px] mr-2"
                              />
                              {selectedExpansionData.name}
                            </div>
                          ) : null;
                        })}
                        {/* Display clickable links for unselected expansion network types */}
                        <div className="flex flex-wrap gap-2">
                          {expansionNetworkTypes.map(({ display, componentType }) => (
                            !selectedComponents[componentType] && (
                              <span
                                key={componentType}
                                onClick={() => handleClickableTextClick({ type: 'expansion_network', componentType })}
                                className="font-roboto font-bold text-xs leading-6 text-[#4D0AE6] opacity-100 rounded-none cursor-pointer mx-1"
                              >
                                {display}
                              </span>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-roboto font-bold text-xs leading-4 text-[#191B2A]">
                    {!isNinthRow ? (
                      selectedData ? selectedData.availability : '—'
                    ) : (
                      <div className="flex flex-col gap-2">
                        {expansionNetworkTypes.map(({ componentType }) => (
                          selectedComponents[componentType] ? (
                            <div key={componentType}>
                              {selectedComponents[componentType].availability}
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-roboto font-bold text-xs leading-4 text-[#191B2A]">
                    {!isNinthRow ? (
                      selectedData ? selectedData.price : '—'
                    ) : (
                      <div className="flex flex-col gap-2">
                        {expansionNetworkTypes.map(({ componentType }) => (
                          selectedComponents[componentType] ? (
                            <div key={componentType}>
                              {selectedComponents[componentType].price}
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-roboto font-bold text-xs leading-4 text-[#191B2A]">
                    {!isNinthRow ? (
                      selectedData && (
                        <button
                          onClick={() => handleRemoveComponent(row.component)}
                          className="text-gray-500 hover:text-red-700 focus:outline-none"
                        >
                          <ClearIcon className="w-5 h-5" />
                        </button>
                      )
                    ) : (
                      <div className="flex flex-col gap-2">
                        {expansionNetworkTypes.map(({ componentType }) => (
                          selectedComponents[componentType] ? (
                            <button
                              key={componentType}
                              onClick={() => handleRemoveComponent(componentType)}
                              className="text-gray-500 hover:text-red-700 focus:outline-none"
                            >
                              <ClearIcon className="w-5 h-5" />
                            </button>
                          ) : null
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Component Selection Popup */}
      {showPopup && (
        <ComponentSelectionPopup
          onClose={() => setShowPopup(false)}
          onComponentSelected={(selectedData) => {
            handleComponentSelected(currentComponentType, selectedData);
            setShowPopup(false);
          }}
          componentType={currentComponentType}
        />
      )}
    </>
  );
}

PartsTable.propTypes = {
  onComponentsChanged: PropTypes.func.isRequired,
};

export default PartsTable;