import React, { useEffect, useState } from 'react';
import { Checkbox, Slider, FormControlLabel } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function Filteringsystem({ categoryName, setFilters, allProducts }) {


  const [brandFilters, setBrandFilters] = useState([]);
  const [capacityFilters, setCapacityFilters] = useState([]);
  const [memoryCapacityFilters, setMemoryCapacityFilters] = useState([]);
  const [speedFilters, setSpeedFilters] = useState([]);
  const [pciTypeFilters, setPciTypeFilters] = useState([]);
  const [coreCountFilters, setCoreCountFilters] = useState([]);
  const [threadCountFilters, setThreadCountFilters] = useState([]);
  const [chipsetFilters, setChipsetFilters] = useState([]);
  const [socketTypeFilters, setSocketTypeFilters] = useState([]);
  const [wattageFilters, setWattageFilters] = useState([]);
  const [efficiencyFilters, setEfficiencyFilters] = useState([]);
  const [storageCapacityFilters, setStorageCapacityFilters] = useState([]);
  const [storageTypeFilters, setStorageTypeFilters] = useState([]);
  const [supportedMotherboardFilters, setSupportedMotherboardFilters] = useState([]);
  const [laptopRamCapacityFilters, setLaptopRamCapacityFilters] = useState([]);
  const [laptopGraphicCardFilters, setLaptopGraphicCardFilters] = useState([]);
  const [laptopStorageFilters, setLaptopStorageFilters] = useState([]);
  const [prebuildRamCapacityFilters, setPrebuildRamCapacityFilters] = useState([]);
  const [prebuildGpuFilters, setPrebuildGpuFilters] = useState([]);
  const [prebuildStorageFilters, setPrebuildStorageFilters] = useState([]);









  







  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);


  //------ COMMON ------

  //price range,handlefunction(adaptive)
  useEffect(() => {
    if (allProducts.length > 0) {
      const prices = allProducts.map(p => parseFloat(p.price));
      const highest = Math.max(...prices);
      setMaxPrice(highest);
      setPriceRange([0, highest]);
    }
  }, [allProducts]);

  //brand,handlefunction(adaptive)
  const handleBrandToggle = (brand) => {
    setBrandFilters(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };



  //   ---------VGA CONDITIONS--------

  //vga capacity,handlefunction(adaptive)
  const handleCapacityToggle = (cap) => {
    setCapacityFilters(prev =>
      prev.includes(cap)
        ? prev.filter(c => c !== cap)
        : [...prev, cap]
    );
  };
    //vga pcitype
    const handlePciTypeToggle = (pciType) => {
      setPciTypeFilters(prev =>
        prev.includes(pciType)
          ? prev.filter(type => type !== pciType)
          : [...prev, pciType]
      );
    };




  //   ---------RAM CONDITIONS--------

  //ramsize
  const handleMemoryCapacityToggle = (memoryCapacity) => {
    setMemoryCapacityFilters(prev =>
      prev.includes(memoryCapacity)
        ? prev.filter(c => c !== memoryCapacity)
        : [...prev, memoryCapacity]
    );
  };

  //ramspeed
  const handleSpeedToggle = (speed) => {
    setSpeedFilters(prev =>
      prev.includes(speed)
        ? prev.filter(s => s !== speed)
        : [...prev, speed]
    );
  };
  





  //   ---------PROCCESSOR CONDITIONS--------

  //proccessor cores
  const handleCoreCountToggle = (coreCount) => {
  setCoreCountFilters(prev =>
    prev.includes(coreCount)
      ? prev.filter(count => count !== coreCount)
      : [...prev, coreCount]
  );
};


const handleThreadCountToggle = (threadCount) => {
  setThreadCountFilters(prev =>
    prev.includes(threadCount)
      ? prev.filter(count => count !== threadCount)
      : [...prev, threadCount]
  );
};




//-------- Motherboard conditons ------


//chipset
const handleChipsetToggle = (chipset) => {
  setChipsetFilters(prev =>
    prev.includes(chipset)
      ? prev.filter(item => item !== chipset)
      : [...prev, chipset]
  );
};

//socket type
const handleSocketTypeToggle = (socketType) => {
  setSocketTypeFilters(prev =>
    prev.includes(socketType)
      ? prev.filter(item => item !== socketType)
      : [...prev, socketType]
  );
};



//-------- for power supplies -------

//wattage
const handleWattageToggle = (wattage) => {
  setWattageFilters(prev =>
    prev.includes(wattage)
      ? prev.filter(item => item !== wattage)
      : [...prev, wattage]
  );
};

//efficiency

const handleEfficiencyToggle = (efficiency) => {
  setEfficiencyFilters(prev =>
    prev.includes(efficiency)
      ? prev.filter(item => item !== efficiency)
      : [...prev, efficiency]
  );
};



// ------ for storage ---------


//size
const handleStorageCapacityToggle = (capacity) => {
  setStorageCapacityFilters(prev =>
    prev.includes(capacity)
      ? prev.filter(item => item !== capacity)
      : [...prev, capacity]
  );
};

//type
const handleStorageTypeToggle = (type) => {
  setStorageTypeFilters(prev =>
    prev.includes(type)
      ? prev.filter(item => item !== type)
      : [...prev, type]
  );
};


// --------- for Casings ----------

const handleSupportedMotherboardToggle = (type) => {
  setSupportedMotherboardFilters(prev =>
    prev.includes(type)
      ? prev.filter(item => item !== type)
      : [...prev, type]
  );
};


// ----------FOR LAPTOPS-----------


//ram

const handleLaptopRamCapacityToggle = (capacity) => {
  setLaptopRamCapacityFilters(prev =>
    prev.includes(capacity)
      ? prev.filter(item => item !== capacity)
      : [...prev, capacity]
  );
};

//gpu
const handleLaptopGraphicCardToggle = (gpu) => {
  setLaptopGraphicCardFilters(prev =>
    prev.includes(gpu)
      ? prev.filter(item => item !== gpu)
      : [...prev, gpu]
  );
};

//storage
const handleLaptopStorageToggle = (storage) => {
  setLaptopStorageFilters(prev =>
    prev.includes(storage)
      ? prev.filter(item => item !== storage)
      : [...prev, storage]
  );
};

// ----------FOR PREBUILTS-----------


//ram

const handlePrebuildRamCapacityToggle = (capacity) => {
  setPrebuildRamCapacityFilters(prev =>
    prev.includes(capacity)
      ? prev.filter(item => item !== capacity)
      : [...prev, capacity]
  );
};

//gpu

const handlePrebuildGpuToggle = (gpu) => {
  setPrebuildGpuFilters(prev =>
    prev.includes(gpu)
      ? prev.filter(item => item !== gpu)
      : [...prev, gpu]
  );
};


//storage

const handlePrebuildStorageToggle = (storage) => {
  setPrebuildStorageFilters(prev =>
    prev.includes(storage)
      ? prev.filter(item => item !== storage)
      : [...prev, storage]
  );
};





















  //ALL conditions to product item grid file
  useEffect(() => {
    setFilters({
      brand: brandFilters,
      priceRange: priceRange,
      capacity: capacityFilters,               // -- vga capacity (vram)
      memoryCapacity: memoryCapacityFilters,    // -- RAM memory capacity
      memorySpeed: speedFilters,                 // -- RAM memory speed
      pciType: pciTypeFilters,                    //vga pcie type
      coreCount: coreCountFilters,                 //proccessor cores
      threadCount: threadCountFilters ,
      chipset: chipsetFilters,
      socketType: socketTypeFilters,
      wattage: wattageFilters,
      efficiency: efficiencyFilters,
      storageCapacity: storageCapacityFilters,
      storageType: storageTypeFilters,
      supportedMotherboard: supportedMotherboardFilters,
      laptopRamCapacity: laptopRamCapacityFilters,
      laptopGraphicCard: laptopGraphicCardFilters,
      laptopStorage: laptopStorageFilters,
      prebuildGpu: prebuildGpuFilters,
      prebuildStorage: prebuildStorageFilters











    });
  }, [brandFilters, priceRange, capacityFilters, memoryCapacityFilters, speedFilters, setFilters, pciTypeFilters,coreCountFilters,threadCountFilters,chipsetFilters,socketTypeFilters,wattageFilters,efficiencyFilters,storageCapacityFilters,storageTypeFilters,supportedMotherboardFilters,laptopRamCapacityFilters,laptopGraphicCardFilters,laptopStorageFilters,prebuildGpuFilters,prebuildStorageFilters]);
  









  const renderCategorySpecificFilters = () => {            //........for category specific filters(not common ones)...........


    switch (categoryName.toLowerCase()) {


      case 'gpu':        //........for GPU category............

        return (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">GPU Capacity</h3>
            {/* {['4', '8', '16', '32'].map(cap => (
              <FormControlLabel
                key={cap}
                control={
                  <Checkbox
                    checked={capacityFilters.includes(cap)}
                    onChange={() => handleCapacityToggle(cap)}
                  />
                }
                label={cap + 'GB'}
                className="grid gap-4"
              />
            ))} */}
            {Array.from(
              new Set(allProducts.map((p) => p.vram?.toUpperCase()))
            ).map((cap, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={capacityFilters.includes(cap)}
                    onChange={() => handleCapacityToggle(cap)}
                  />
                }
                label={cap + "GB"}
                className="grid gap-4"
              />
            ))}


                  {/* PCI Type Filter (NEW) */}
      <h3 className="text-md font-semibold mt-6 mb-2">PCI Type</h3>
      {Array.from(
        new Set(allProducts.map((p) => p.interfaceType?.toUpperCase()))
      ).map((pciType, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={pciTypeFilters.includes(pciType)}
              onChange={() => handlePciTypeToggle(pciType)}
            />
          }
          label={pciType}
          className="grid gap-4"
        />
      ))}
          </div>
        );




      case 'ram':    //........for RAM category............

      
  return (
    <div className="mt-5">
      {/* Memory Capacity Filter for RAM */}
      <h3 className="text-md font-semibold mb-2">Memory Capacity</h3>
      {Array.from(
        new Set(allProducts.map((p) => p.memoryCapacity?.toUpperCase()))
      ).map((memoryCapacity, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={memoryCapacityFilters.includes(memoryCapacity)}
              onChange={() => handleMemoryCapacityToggle(memoryCapacity)}
            />
          }
          label={memoryCapacity + "GB"}
          className="grid gap-4"
        />
      ))}

      {/* Memory Speed Filter */}
      <h3 className="text-md font-semibold mt-6 mb-2">Memory Speed</h3>
      {Array.from(
        new Set(allProducts.map((p) => p.memorySpeed?.toUpperCase()))
      ).map((speed, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={speedFilters.includes(speed)}
              onChange={() => handleSpeedToggle(speed)}
            />
          }
          label={speed + " MHZ"}
          className="grid gap-4"
        />
      ))}
    </div>
  );




      case 'processor':   //........for Processor category............


        return (
          <div className="mt-5">


                  {/* Core Count Filter (NEW) */}
      <h3 className="text-md font-semibold mb-2">Cores</h3>
      {Array.from(
        new Set(allProducts.map((p) => p.coreCount))
      ).map((coreCount, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={coreCountFilters.includes(coreCount)}
              onChange={() => handleCoreCountToggle(coreCount)}
            />
          }
          label={`${coreCount} Cores`}
          className="grid gap-4"
        />
      ))}

        {/* Threads Filter (NEW) */}
  <h3 className="text-md font-semibold mt-6 mb-2">Threads</h3>
  {Array.from(
    new Set(allProducts.map((p) => p.threadCount))
  ).map((threadCount, index) => (
    <FormControlLabel
      key={index}
      control={
        <Checkbox
          checked={threadCountFilters.includes(threadCount)}
          onChange={() => handleThreadCountToggle(threadCount)}
        />
      }
      label={`${threadCount} Threads`}
      className="grid gap-4"
    />
  ))}

          </div>
        );


        case 'motherboard':   //........for motherboard category............


        return (
          <div className="mt-5">
            {/* Chipset Filter */}
            <h3 className="text-md font-semibold mb-2">Chipset</h3>
            {Array.from(
              new Set(allProducts.map((p) => p.motherboardChipset))
            ).map((chipset, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={chipsetFilters.includes(chipset)}
                    onChange={() => handleChipsetToggle(chipset)}
                  />
                }
                label={chipset}
                className="grid gap-4"
              />
            ))}

            <div className="mt-5">
              {/* Socket Type Filter */}
              <h3 className="text-md font-semibold mb-2">Socket Type</h3>
              {Array.from(new Set(allProducts.map((p) => p.socketType))).map(
                (socketType, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={socketTypeFilters.includes(socketType)}
                        onChange={() => handleSocketTypeToggle(socketType)}
                      />
                    }
                    label={socketType}
                    className="grid gap-4"
                  />
                )
              )}
            </div>
          </div>
        );

        case 'power':   //........for Power category............


        return (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">Wattage</h3>
            {Array.from(new Set(allProducts.map((p) => p.wattage))).map(
              (wattage, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={wattageFilters.includes(wattage)}
                      onChange={() => handleWattageToggle(wattage)}
                    />
                  }
                  label={`${wattage}W`}
                  className="grid gap-4"
                />
              )
            )}

            <div className="mt-5">
              <h3 className="text-md font-semibold mb-2">Efficiency</h3>
              {Array.from(new Set(allProducts.map((p) => p.efficiencyRating))).map(
                (efficiency, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={efficiencyFilters.includes(efficiency)}
                        onChange={() => handleEfficiencyToggle(efficiency)}
                      />
                    }
                    label={efficiency}
                    className="grid gap-4"
                  />
                )
              )}
            </div>
          </div>
        );


        case 'storage':   //........for storage category............


        return (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">Storage Capacity</h3>
            {Array.from(new Set(allProducts.map((p) => p.storageCapacity))).map(
              (capacity, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={storageCapacityFilters.includes(capacity)}
                      onChange={() => handleStorageCapacityToggle(capacity)}
                    />
                  }
                  label={capacity + "GB"}
                  className="grid gap-4"
                />
              )
            )}

            <div className="mt-5">
              <h3 className="text-md font-semibold mb-2">Storage Type</h3>
              {Array.from(new Set(allProducts.map((p) => p.storageType))).map(
                (type, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={storageTypeFilters.includes(type)}
                        onChange={() => handleStorageTypeToggle(type)}
                      />
                    }
                    label={type}
                    className="grid gap-4"
                  />
                )
              )}
            </div>
          </div>
        );

        case 'casing':   //........for casing category............


        return (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">
              Supported Motherboard
            </h3>
            {Array.from(
              new Set(allProducts.map((p) => p.supportedMotherboardSizes))
            ).map((type, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={supportedMotherboardFilters.includes(type)}
                    onChange={() => handleSupportedMotherboardToggle(type)}
                  />
                }
                label={type}
                className="grid gap-4"
              />
            ))}
          </div>
        );

        case 'laptop':   //........for lapto category............


        return (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">RAM Capacity</h3>
            {Array.from(new Set(allProducts.map((p) => p.ram))).map(
              (capacity, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={laptopRamCapacityFilters.includes(capacity)}
                      onChange={() => handleLaptopRamCapacityToggle(capacity)}
                    />
                  }
                  label={capacity + "GB"}
                  className="grid gap-4"
                />
              )
            )}

            <div className="mt-5">
              <h3 className="text-md font-semibold mb-2">Graphic Card</h3>
              {Array.from(new Set(allProducts.map((p) => p.graphicCard))).map(
                (gpu, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={laptopGraphicCardFilters.includes(gpu)}
                        onChange={() => handleLaptopGraphicCardToggle(gpu)}
                      />
                    }
                    label={gpu
                      .replace(/nvidia_/i, '')
                      .replace(/geforce_/i, '')
                      .replace(/_/g, ' ')
                      .toUpperCase()}
                    className="grid gap-4 "
                  />
                   
                )
              )}
            </div>

            <div className="mt-5">
              <h3 className="text-md font-semibold mb-2">Storage</h3>
              {Array.from(new Set(allProducts.map((p) => p.storage))).map(
                (storage, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={laptopStorageFilters.includes(storage)}
                        onChange={() => handleLaptopStorageToggle(storage)}
                      />
                    }
                    label={storage}
                    className="grid gap-4"
                  />
                )
              )}
            </div>
          </div>
        );


        case 'prebuild':   //........for prebuilt category............


        return (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">RAM Capacity</h3>
            {Array.from(new Set(allProducts.map((p) => p.ram))).map(
              (capacity, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={prebuildRamCapacityFilters.includes(capacity)}
                      onChange={() => handlePrebuildRamCapacityToggle(capacity)}
                    />
                  }
                  label={capacity + "GB"}
                  className="grid gap-4"
                />
              )
            )}

            <div className="mt-5">
              <h3 className="text-md font-semibold mb-2">Graphic Card</h3>
              {Array.from(new Set(allProducts.map((p) => p.graphicCard))).map(
                (gpu, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={prebuildGpuFilters.includes(gpu)}
                        onChange={() => handlePrebuildGpuToggle(gpu)}
                      />
                    }
                    label={gpu
                      .replace(/nvidia_/i, '')
                      .replace(/geforce_/i, '')
                      .replace(/_/g, ' ')
                      .toUpperCase()}
                    className="grid gap-4 "
                  />
                )
              )}
            </div>

            <div className="mt-5">
              <h3 className="text-md font-semibold mb-2">
                Storage
              </h3>
              {Array.from(
                new Set(allProducts.map((p) => p.storage))
              ).map((storage, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={prebuildStorageFilters.includes(storage)}
                      onChange={() => handlePrebuildStorageToggle(storage)}
                    />
                  }
                  label={storage+" GB"}
                  className="grid gap-4"
                />
              ))}
            </div>
          </div>
        );



      default:
        return null;
    }
  };












  return (
    <div className=" mx-1 w-[220px]  p-4 rounded-xl shadow-lg border border-gray-200 ">



      {/* Brand Filter */}
      <div>
        <h3 className="text-md font-semibold mb-2">Brands</h3>
        {Array.from(
          new Set(allProducts.map((p) => p.manufacturer?.toUpperCase()))
        ).map((brand, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={brandFilters.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
              />
            }
            label={brand}
            className="grid gap-4"
          />
        ))}
      </div>




      {/* Price Range */}
      <div className="mt-6">
        <p className="font-semibold mb-4">
          Price Range:
        </p>

        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          min={0}
          max={maxPrice}
          valueLabelDisplay="auto"
          className="text-red-500"
        />

        <div className="justify-between mt-2">
          <span className="text-sm">{priceRange[0]}LKR</span>
          <span className="ml-[76px] text-sm">{priceRange[1]} LKR</span>
        </div>
      </div>




      {/* Category Specific Filters calling here */}


      {renderCategorySpecificFilters()}











      {/* Optional Filters (for future use) sale/instock/outofstock */}
      <div className="mt-5">
        <FormControlLabel
          control={<Checkbox />}
          label="On Sale"
          className="block"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="In Stock"
          className="block"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Featured"
          className="block"
        />
      </div>

      {/* Ratings filter */}
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Ratings</h3>
        {[5, 4, 3, 2, 1].map((stars) => (
          <FormControlLabel
            key={stars}
            control={<Checkbox />}
            label={
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={i < stars ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
            }
            className="block"
          />
        ))}
      </div>
    </div>
  );
}
