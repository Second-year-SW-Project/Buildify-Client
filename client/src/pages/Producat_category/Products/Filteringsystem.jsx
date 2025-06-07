import React, { useState, useEffect } from 'react';

export default function Filteringsystem({
    categoryName,
    onFilterChange,
    availableManufacturersData = [],
    initialSelectedDisplayManufacturers = [],
    initialPriceRange = { min: '', max: '' },
    availableVramsData = [],
    initialSelectedVrams = [],
    availableinterfaceTypesData = [],
    initialSelectedinterfaceTypes = [],
    availableMemoryCapacitiesData = [],
    initialSelectedMemoryCapacities = [],
    availableMemoryTypesData = [],
    initialSelectedMemoryTypes = [],
    availableCoreCountsData = [],
    initialSelectedCoreCounts = [],
    availableThreadCountsData = [],
    initialSelectedThreadCounts = [],
    availableSocketTypesData = [],         // NEW PROP
    initialSelectedSocketTypes = [],   
    availableMotherboardChipsetsData = [], 
    initialSelectedMotherboardChipsets = [],    // NEW PROP
    availableWattageData = [],
    initialSelectedWattages = [],
    availableEfficiencyRatingsData = [],
    initialSelectedEfficiencyRatings = [],
    availableStorageCapacitiesData = [],
    initialSelectedStorageCapacities = [],
    availableStorageTypesData = [],
    initialSelectedStorageTypes = [],
    availableMotherboardSizesData = [],  // e.g. [{value: 'atx', display: 'ATX'}, ...]
    initialSelectedMotherboardSizes = [],
    availableMaxGpuLengthData = [],      // e.g. [{ value: '300mm', display: '300 mm' }, ...]
    initialSelectedMaxGpuLength = [],    // initially selected values array
    availableRamData = [],       // e.g. [{ value: '8gb', display: '8 GB' }, { value: '16gb', display: '16 GB' }]
    initialSelectedRam = [],     // initial selected values

    availableGraphicCardData = [],       // e.g. [{ value: 'integrated', display: 'Integrated' }, { value: 'gtx1650', display: 'GTX 1650' }]
    initialSelectedGraphicCard = [],     // initial selected values
    availableStorageData = [],        // e.g. [{ value: '256ssd', display: '256GB SSD' }, { value: '1tbhdd', display: '1TB HDD' }]
    initialSelectedStorage = [],      // initial selected storage values

    availableRamSizesData = [],         // e.g. [{ value: '8gb', display: '8GB' }, { value: '16gb', display: '16GB' }]
    initialSelectedRamSizes = [],       // e.g. ['8gb']

    availableComponentTypesData = [],         // e.g. [{ value: 'wifi_card', display: 'Wi-Fi Card' }, { value: 'ethernet_card', display: 'Ethernet Card' }]
    initialSelectedComponentTypes = [],       // e.g. ['wifi_card']


    availableDisplaySizesData = [],
    initialSelectedDisplaySizes = [],

    availablePanelTypesData = [],
    initialSelectedPanelTypes = [],

    availableRefreshRatesData = [],
    initialSelectedRefreshRates = [],











}) {
    const [selectedDisplayNames, setSelectedDisplayNames] = useState(initialSelectedDisplayManufacturers);
    const [priceRange, setPriceRange] = useState(initialPriceRange);
    const [selectedVrams, setSelectedVrams] = useState(initialSelectedVrams);
    const [selectedinterfaceTypes, setSelectedinterfaceTypes] = useState(initialSelectedinterfaceTypes);
    const [selectedMemoryCapacities, setSelectedMemoryCapacities] = useState(initialSelectedMemoryCapacities);
    const [selectedMemoryTypes, setSelectedMemoryTypes] = useState(initialSelectedMemoryTypes);
    const [selectedCoreCounts, setSelectedCoreCounts] = useState(initialSelectedCoreCounts);
    const [selectedThreadCounts, setSelectedThreadCounts] = useState(initialSelectedThreadCounts);
    const [selectedSocketTypes, setSelectedSocketTypes] = useState(initialSelectedSocketTypes);  // NEW STATE
    const [selectedMotherboardChipsets, setSelectedMotherboardChipsets] = useState(initialSelectedMotherboardChipsets);
    const [selectedWattages, setSelectedWattages] = useState(initialSelectedWattages);
    const [selectedEfficiencyRatings, setSelectedEfficiencyRatings] = useState(initialSelectedEfficiencyRatings);
    const [selectedStorageCapacities, setSelectedStorageCapacities] = useState(initialSelectedStorageCapacities);
    const [selectedStorageTypes, setSelectedStorageTypes] = useState(initialSelectedStorageTypes);
    const [selectedMotherboardSizes, setSelectedMotherboardSizes] = useState(initialSelectedMotherboardSizes);
    const [selectedMaxGpuLength, setSelectedMaxGpuLength] = useState(initialSelectedMaxGpuLength);
    const [selectedRam, setSelectedRam] = useState(initialSelectedRam);
    const [selectedGraphicCard, setSelectedGraphicCard] = useState(initialSelectedGraphicCard);
    const [selectedStorage, setSelectedStorage] = useState(initialSelectedStorage);
    const [selectedRamSizes, setSelectedRamSizes] = useState(initialSelectedRamSizes);
    const [selectedComponentTypes, setSelectedComponentTypes] = useState(initialSelectedComponentTypes);
    const [selectedDisplaySizes, setSelectedDisplaySizes] = useState(initialSelectedDisplaySizes);
    const [selectedPanelTypes, setSelectedPanelTypes] = useState(initialSelectedPanelTypes);
    const [selectedRefreshRates, setSelectedRefreshRates] = useState(initialSelectedRefreshRates);




















    useEffect(() => setSelectedDisplayNames(initialSelectedDisplayManufacturers), [initialSelectedDisplayManufacturers]);
    useEffect(() => setPriceRange(initialPriceRange), [initialPriceRange]);







    useEffect(() => {
    if (categoryName !== 'power') {
        setSelectedWattages([]);
    } else {
        setSelectedWattages(initialSelectedWattages);
    }
}, [initialSelectedWattages, categoryName]);

useEffect(() => {
  if (categoryName !== 'power') {
    setSelectedEfficiencyRatings([]);
  } else {
    setSelectedEfficiencyRatings(initialSelectedEfficiencyRatings);
  }
}, [initialSelectedEfficiencyRatings, categoryName]);


useEffect(() => {
  if (categoryName !== 'storage') {
    setSelectedStorageCapacities([]);
  } else {
    setSelectedStorageCapacities(initialSelectedStorageCapacities);
  }
}, [initialSelectedStorageCapacities, categoryName]);

useEffect(() => {
  if (categoryName !== 'storage') {
    setSelectedStorageTypes([]);
  } else {
    setSelectedStorageTypes(initialSelectedStorageTypes);
  }
}, [initialSelectedStorageTypes, categoryName]);


useEffect(() => {
  if (categoryName !== 'casing') {
    setSelectedMotherboardSizes([]);
  } else {
    setSelectedMotherboardSizes(initialSelectedMotherboardSizes);
  }
}, [initialSelectedMotherboardSizes, categoryName]);


useEffect(() => {
  if (categoryName !== 'casing') {
    setSelectedMaxGpuLength([]);
  } else {
    setSelectedMaxGpuLength(initialSelectedMaxGpuLength);
  }
}, [initialSelectedMaxGpuLength, categoryName]);


useEffect(() => {
  if (categoryName !== 'prebuild') {
    setSelectedRamSizes([]);
  } else {
    setSelectedRamSizes(initialSelectedRamSizes);
  }
}, [initialSelectedRamSizes, categoryName]);




useEffect(() => {
  if (categoryName !== 'expansion_network') {
    setSelectedComponentTypes([]);
  } else {
    setSelectedComponentTypes(initialSelectedComponentTypes);
  }
}, [initialSelectedComponentTypes, categoryName]);



useEffect(() => {
  if (categoryName !== 'monitor') {
    setSelectedDisplaySizes([]);
    setSelectedPanelTypes([]);
    setSelectedRefreshRates([]);
  } else {
    setSelectedDisplaySizes(initialSelectedDisplaySizes);
    setSelectedPanelTypes(initialSelectedPanelTypes);
    setSelectedRefreshRates(initialSelectedRefreshRates);
  }
}, [initialSelectedDisplaySizes, initialSelectedPanelTypes, initialSelectedRefreshRates, categoryName]);











    useEffect(() => {
        categoryName !== 'gpu' ? setSelectedVrams([]) : setSelectedVrams(initialSelectedVrams);
    }, [initialSelectedVrams, categoryName]);

    useEffect(() => {
        categoryName !== 'gpu' ? setSelectedinterfaceTypes([]) : setSelectedinterfaceTypes(initialSelectedinterfaceTypes);
    }, [initialSelectedinterfaceTypes, categoryName]);

    useEffect(() => {
        categoryName !== 'ram' ? setSelectedMemoryCapacities([]) : setSelectedMemoryCapacities(initialSelectedMemoryCapacities);
    }, [initialSelectedMemoryCapacities, categoryName]);

    useEffect(() => {
        categoryName !== 'ram' ? setSelectedMemoryTypes([]) : setSelectedMemoryTypes(initialSelectedMemoryTypes);
    }, [initialSelectedMemoryTypes, categoryName]);

    useEffect(() => {
        categoryName !== 'processor' ? setSelectedCoreCounts([]) : setSelectedCoreCounts(initialSelectedCoreCounts);
    }, [initialSelectedCoreCounts, categoryName]);

    useEffect(() => {
        categoryName !== 'processor' ? setSelectedThreadCounts([]) : setSelectedThreadCounts(initialSelectedThreadCounts);
    }, [initialSelectedThreadCounts, categoryName]);

    useEffect(() => {
    if (categoryName !== 'processor' && categoryName !== 'motherboard') {
        setSelectedSocketTypes([]);
    } else {
        setSelectedSocketTypes(initialSelectedSocketTypes);
    }
}, [initialSelectedSocketTypes, categoryName]);

useEffect(() => {
  if (categoryName !== 'laptop') {
    setSelectedRam([]);
  } else {
    setSelectedRam(initialSelectedRam);
  }
}, [initialSelectedRam, categoryName]);

useEffect(() => {
  if (categoryName !== 'laptop') {
    setSelectedGraphicCard([]);
  } else {
    setSelectedGraphicCard(initialSelectedGraphicCard);
  }
}, [initialSelectedGraphicCard, categoryName]);

useEffect(() => {
  if (categoryName !== 'laptop' && categoryName !== 'prebuild') {
    setSelectedStorage([]);
  } else {
    setSelectedStorage(initialSelectedStorage);
  }
}, [initialSelectedStorage, categoryName]);














    useEffect(() => {
      categoryName !== "motherboard"
        ? setSelectedMotherboardChipsets([])
        : setSelectedMotherboardChipsets(initialSelectedMotherboardChipsets);
    }, [initialSelectedMotherboardChipsets, categoryName]);














    const emitFilterChange = (overrides = {}) => {
        onFilterChange({
            manufacturers: selectedDisplayNames,
            priceRange,
            vrams: selectedVrams,
            interfaceTypes: selectedinterfaceTypes,
            memoryCapacities: selectedMemoryCapacities,
            memoryTypes: selectedMemoryTypes,
            coreCounts: selectedCoreCounts,
            threadCounts: selectedThreadCounts,
            socketTypes: selectedSocketTypes,
            motherboardChipsets:selectedMotherboardChipsets,  // NEW PROP EMITTED
            wattages: selectedWattages,
            efficiencyRatings: selectedEfficiencyRatings,
            storageCapacities: selectedStorageCapacities,
            storageTypes: selectedStorageTypes,
            supportedMotherboardSizes: selectedMotherboardSizes,
            maxGpuLengths: selectedMaxGpuLength,
            rams: selectedRam,
            graphicCards: selectedGraphicCard,
            storages: selectedStorage,
            ramSizes: selectedRamSizes,
            componentTypes: selectedComponentTypes,
            displaySizes: selectedDisplaySizes,
            panelTypes: selectedPanelTypes,
            refreshRates: selectedRefreshRates,





            ...overrides,
        });
    };









    const handleCheckboxChange = (value, selectedArray, setSelectedArray, key) => {
        const newArray = selectedArray.includes(value)
            ? selectedArray.filter(item => item !== value)
            : [...selectedArray, value];
        setSelectedArray(newArray);
        emitFilterChange({ [key]: newArray });
    };

    const handleManufacturerChange = (e) =>
        handleCheckboxChange(e.target.value, selectedDisplayNames, setSelectedDisplayNames, 'manufacturers');

    const handleVramChange = (e) =>
        handleCheckboxChange(Number(e.target.value), selectedVrams, setSelectedVrams, 'vrams');

    const handleinterfaceTypeChange = (e) =>
        handleCheckboxChange(e.target.value, selectedinterfaceTypes, setSelectedinterfaceTypes, 'interfaceTypes');

    const handleMemoryCapacityChange = (e) =>
        handleCheckboxChange(Number(e.target.value), selectedMemoryCapacities, setSelectedMemoryCapacities, 'memoryCapacities');

    const handleMemoryTypeChange = (e) =>
        handleCheckboxChange(e.target.value, selectedMemoryTypes, setSelectedMemoryTypes, 'memoryTypes');

    const handleCoreCountChange = (e) =>
        handleCheckboxChange(Number(e.target.value), selectedCoreCounts, setSelectedCoreCounts, 'coreCounts');

    const handleThreadCountChange = (e) =>
        handleCheckboxChange(Number(e.target.value), selectedThreadCounts, setSelectedThreadCounts, 'threadCounts');

    const handleSocketTypeChange = (e) =>    // NEW HANDLER
        handleCheckboxChange(e.target.value, selectedSocketTypes, setSelectedSocketTypes, 'socketTypes');

    const handleMotherboardChipsetChange = (e) =>
            handleCheckboxChange(e.target.value, selectedMotherboardChipsets, setSelectedMotherboardChipsets, 'motherboardChipsets');
    

    const handleWattageChange = (e) =>
            handleCheckboxChange(Number(e.target.value), selectedWattages, setSelectedWattages, 'wattages');


    const handleEfficiencyRatingChange = (e) =>
      handleCheckboxChange(e.target.value, selectedEfficiencyRatings, setSelectedEfficiencyRatings, 'efficiencyRatings');


    const handleStorageCapacityChange = (e) =>
      handleCheckboxChange(Number(e.target.value), selectedStorageCapacities, setSelectedStorageCapacities, 'storageCapacities');

    const handleStorageTypeChange = (e) =>
      handleCheckboxChange(e.target.value, selectedStorageTypes, setSelectedStorageTypes, 'storageTypes');


    const handleMotherboardSizeChange = (e) =>
      handleCheckboxChange(e.target.value, selectedMotherboardSizes, setSelectedMotherboardSizes, 'supportedMotherboardSizes');

      const handleMaxGpuLengthChange = (e) =>
        handleCheckboxChange(Number(e.target.value), selectedMaxGpuLength, setSelectedMaxGpuLength, 'maxGpuLengths');

      const handleRamChange = (e) =>
        handleCheckboxChange(Number(e.target.value), selectedRam, setSelectedRam, 'rams');

      const handleGraphicCardChange = (e) =>
        handleCheckboxChange(e.target.value, selectedGraphicCard, setSelectedGraphicCard, 'graphicCards');

      const handleStorageChange = (e) =>
        handleCheckboxChange(Number(e.target.value), selectedStorage, setSelectedStorage, 'storages');


      const handleRamSizeChange = (e) =>
        handleCheckboxChange(Number(e.target.value), selectedRamSizes, setSelectedRamSizes, 'ramSizes');


      const handleComponentTypeChange = (e) =>
        handleCheckboxChange(e.target.value, selectedComponentTypes, setSelectedComponentTypes, 'componentTypes');


      const handleDisplaySizeChange = (e) =>
        handleCheckboxChange(e.target.value, selectedDisplaySizes, setSelectedDisplaySizes, 'displaySizes');

      const handlePanelTypeChange = (e) =>
        handleCheckboxChange(e.target.value, selectedPanelTypes, setSelectedPanelTypes, 'panelTypes');

      const handleRefreshRateChange = (e) =>
        handleCheckboxChange(Number(e.target.value), selectedRefreshRates, setSelectedRefreshRates, 'refreshRates');

















    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const newPriceRange = { ...priceRange, [name]: value === '' ? '' : Number(value) };
        setPriceRange(newPriceRange);
        emitFilterChange({ priceRange: newPriceRange });
    };














    return (
      <div className="mx-2 my-3 w-[220px] p-4 rounded-xl shadow-lg border border-gray-200">
        {/* Manufacturers */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Brands</h3>
          {availableManufacturersData.length > 0 ? (
            availableManufacturersData.map((m) => (
              <div key={m.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={m.display}
                    checked={selectedDisplayNames.includes(m.display)}
                    onChange={handleManufacturerChange}
                    className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                  />
                  <span>{m.display.toUpperCase()}</span>
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No manufacturer filters available.</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Price Range</h3>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Min
              </label>
              <input
                type="number"
                name="min"
                id="minPrice"
                value={priceRange.min}
                onChange={handlePriceChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Max
              </label>
              <input
                type="number"
                name="max"
                id="maxPrice"
                value={priceRange.max}
                onChange={handlePriceChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* GPU filters */}
        {categoryName === "gpu" && availableVramsData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">VRAM</h3>
            {availableVramsData.map((v) => (
              <div key={v.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={v.value}
                    checked={selectedVrams.includes(v.value)}
                    onChange={handleVramChange}
                    className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                  />
                  <span>{v.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}
        {categoryName === "gpu" && availableinterfaceTypesData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Interface Type
            </h3>
            {availableinterfaceTypesData.map((t) => (
              <div key={t.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={t.value}
                    checked={selectedinterfaceTypes.includes(t.value)}
                    onChange={handleinterfaceTypeChange}
                    className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                  />
                  <span>{t.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {/* RAM filters */}
        {categoryName === "ram" && availableMemoryCapacitiesData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Memory Capacity
            </h3>
            {availableMemoryCapacitiesData.map((c) => (
              <div key={c.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={c.value}
                    checked={selectedMemoryCapacities.includes(c.value)}
                    onChange={handleMemoryCapacityChange}
                    className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                  />
                  <span>{c.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}
        {categoryName === "ram" && availableMemoryTypesData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Memory Type
            </h3>
            {availableMemoryTypesData.map((t) => (
              <div key={t.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={t.value}
                    checked={selectedMemoryTypes.includes(t.value)}
                    onChange={handleMemoryTypeChange}
                    className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                  />
                  <span>{t.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {/* Processor filters */}
        {categoryName === "processor" && availableCoreCountsData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Cores</h3>
            {availableCoreCountsData.map((c) => (
              <div key={c.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={c.value}
                    checked={selectedCoreCounts.includes(c.value)}
                    onChange={handleCoreCountChange}
                    className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                  />
                  <span>{c.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}
        {categoryName === "processor" &&
          availableThreadCountsData.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Threads</h3>
              {availableThreadCountsData.map((t) => (
                <div key={t.value} className="mb-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      value={t.value}
                      checked={selectedThreadCounts.includes(t.value)}
                      onChange={handleThreadCountChange}
                      className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                    />
                    <span>{t.display}</span>
                  </label>
                </div>
              ))}
            </div>
          )}

        {categoryName === "motherboard" &&
          availableMotherboardChipsetsData.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Chipset</h3>
              {availableMotherboardChipsetsData.map((chipset) => (
                <div key={chipset.value} className="mb-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      value={chipset.value}
                      checked={selectedMotherboardChipsets.includes(
                        chipset.value
                      )}
                      onChange={handleMotherboardChipsetChange}
                      className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                    />
                    <span>{chipset.display}</span>
                  </label>
                </div>
              ))}
            </div>
          )}




        {/* NEW: Socket Types for processor */}
        {["processor", "motherboard"].includes(categoryName) &&
          availableSocketTypesData.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Socket Type
              </h3>
              {availableSocketTypesData.map((s) => (
                <div key={s.value} className="mb-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      value={s.value}
                      checked={selectedSocketTypes.includes(s.value)}
                      onChange={handleSocketTypeChange}
                      className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                    />
                    <span>{s.display}</span>
                  </label>
                </div>
              ))}
            </div>
        )}



        {categoryName === 'power' && availableWattageData.length > 0 && (
    <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Wattage</h3>
        {availableWattageData.map((w) => (
            <div key={w.value} className="mb-3">
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        value={w.value}
                        checked={selectedWattages.includes(w.value)}
                        onChange={handleWattageChange}
                        className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                    />
                    <span>{w.display}</span>
                </label>
            </div>
        ))}
    </div>
        )}


        {categoryName === 'power' && availableEfficiencyRatingsData.length > 0 && (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800 mb-3">Efficiency Rating</h3>
    {availableEfficiencyRatingsData.map((rating) => (
      <div key={rating.value} className="mb-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            value={rating.value}
            checked={selectedEfficiencyRatings.includes(rating.value)}
            onChange={handleEfficiencyRatingChange}
            className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
          />
          <span>{rating.display}</span>
        </label>
      </div>
    ))}
  </div>
        )}

        {categoryName === 'storage' && availableStorageCapacitiesData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Storage Capacity</h3>
            {availableStorageCapacitiesData.map((cap) => (
              <div key={cap.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={cap.value}
                    checked={selectedStorageCapacities.includes(cap.value)}
                    onChange={handleStorageCapacityChange}
                    className="form-checkbox h-5 w-5 text-red-500 border-gray-300"
                  />
                  <span>{cap.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}


        {categoryName === 'storage' && availableStorageTypesData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Storage Type</h3>
            {availableStorageTypesData.map((type) => (
              <div key={type.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={type.value}
                    checked={selectedStorageTypes.includes(type.value)}
                    onChange={handleStorageTypeChange}
                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
                  />
                  <span>{type.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {categoryName === 'casing' && availableMotherboardSizesData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Supported Motherboard Sizes</h3>
            {availableMotherboardSizesData.map((size) => (
              <div key={size.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={size.value}
                    checked={selectedMotherboardSizes.includes(size.value)}
                    onChange={handleMotherboardSizeChange}
                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
                  />
                  <span>{size.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}


                {categoryName === 'casing' && availableMaxGpuLengthData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Max GPU Length</h3>
            {availableMaxGpuLengthData.map((length) => (
              <div key={length.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={length.value}
                    checked={selectedMaxGpuLength.includes(length.value)}
                    onChange={handleMaxGpuLengthChange}
                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
                  />
                  <span>{length.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}



      {categoryName === 'laptop' && availableRamData.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">RAM</h3>
          {availableRamData.map((ramOption) => (
            <div key={ramOption.value} className="mb-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  value={ramOption.value}
                  checked={selectedRam.includes(ramOption.value)}
                  onChange={handleRamChange}
                  className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
                />
                <span>{ramOption.display}</span>
              </label>
            </div>
          ))}
        </div>
      )}


            {categoryName === 'laptop' && availableGraphicCardData.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Graphic Card</h3>
          {availableGraphicCardData.map((gpu) => (
            <div key={gpu.value} className="mb-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  value={gpu.value}
                  checked={selectedGraphicCard.includes(gpu.value)}
                  onChange={handleGraphicCardChange}
                  className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
                />
                <span>{gpu.display}</span>
              </label>
            </div>
          ))}
        </div>
      )}

      {categoryName === 'prebuild' && availableRamSizesData.length > 0 && (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800 mb-3">RAM Size</h3>
    {availableRamSizesData.map((option) => (
      <div key={option.value} className="mb-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            value={option.value}
            checked={selectedRamSizes.includes(option.value)}
            onChange={handleRamSizeChange}
            className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
          />
          <span>{option.display}</span>
        </label>
      </div>
    ))}
  </div>
)}




              {["laptop", "prebuild"].includes(categoryName) && availableStorageData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Storage</h3>
            {availableStorageData.map((option) => (
              <div key={option.value} className="mb-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedStorage.includes(option.value)}
                    onChange={handleStorageChange}
                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
                  />
                  <span>{option.display}</span>
                </label>
              </div>
            ))}
          </div>
        )}


        {categoryName === 'expansion_network' && availableComponentTypesData.length > 0 && (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800 mb-3">Component Type</h3>
    {availableComponentTypesData.map((option) => (
      <div key={option.value} className="mb-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            value={option.value}
            checked={selectedComponentTypes.includes(option.value)}
            onChange={handleComponentTypeChange}
            className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
          />
          <span>{option.display}</span>
        </label>
      </div>
    ))}
  </div>
)}



{categoryName === 'monitor' && availableDisplaySizesData.length > 0 && (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800 mb-3">Display Size</h3>
    {availableDisplaySizesData.map((size) => (
      <div key={size.value} className="mb-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            value={size.value}
            checked={selectedDisplaySizes.includes(size.value)}
            onChange={handleDisplaySizeChange}
            className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
          />
          <span>{size.display}</span>
        </label>
      </div>
    ))}
  </div>
)}

{categoryName === 'monitor' && availablePanelTypesData.length > 0 && (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800 mb-3">Panel Type</h3>
    {availablePanelTypesData.map((panel) => (
      <div key={panel.value} className="mb-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            value={panel.value}
            checked={selectedPanelTypes.includes(panel.value)}
            onChange={handlePanelTypeChange}
            className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
          />
          <span>{panel.display}</span>
        </label>
      </div>
    ))}
  </div>
)}


{categoryName === 'monitor' && availableRefreshRatesData.length > 0 && (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800 mb-3">Refresh Rate</h3>
    {availableRefreshRatesData.map((rate) => (
      <div key={rate.value} className="mb-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            value={rate.value}
            checked={selectedRefreshRates.includes(rate.value)}
            onChange={handleRefreshRateChange}
            className="form-checkbox h-5 w-5 text-blue-500 border-gray-300"
          />
          <span>{rate.display}</span>
        </label>
      </div>
    ))}
  </div>
)}







        





      </div>
    );
}
