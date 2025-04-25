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
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-1/5">
                Component
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-2/5">
                Selection
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-1/5">
                Availability
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-1/5">
                Price
              </th>
              <th className="px-4 sm:px-6 py-3 text-left uppercase tracking-wider font-roboto font-bold text-sm leading-4 text-[#191B2A] w-1/5">
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
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A]">
                    {row.component}
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A]">
                    {!isNinthRow ? (
                      selectedData ? (
                        <div className="flex items-center">
                          <img
                            src={selectedData.image}
                            alt={selectedData.name}
                            className="w-[38px] h-[38px] mr-2"
                          />
                          <span className="break-words whitespace-normal">
                            {selectedData.name}
                          </span>
                        </div>
                      ) : (
                        <AddButton
                          text={`Choose ${row.component}`}
                          onClick={() => handleSelectComponent(row.component)}
                        />
                      )
                    ) : (
                      <div className="flex flex-col gap-2">
                        {expansionNetworkTypes.map(({ display, componentType }) => (
                          selectedComponents[componentType] ? (
                            <div key={componentType} className="flex items-center">
                              <img
                                src={selectedComponents[componentType].image}
                                alt={selectedComponents[componentType].name}
                                className="w-[38px] h-[38px] mr-2"
                              />
                              <span className="break-words whitespace-normal">
                                {selectedComponents[componentType].name}
                              </span>
                            </div>
                          ) : (
                            <div
                              key={componentType}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer"
                              onClick={() => handleClickableTextClick({ type: display, componentType })}
                            >
                              {display}
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A]">
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
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A]">
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
                  <td className="px-4 sm:px-6 py-4 font-roboto font-bold text-xs leading-4 text-[#191B2A]">
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