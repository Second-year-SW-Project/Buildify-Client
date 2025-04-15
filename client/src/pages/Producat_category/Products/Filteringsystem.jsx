import React, { useEffect, useState } from 'react';
import { Checkbox, Slider, FormControlLabel } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function Filteringsystem({ categoryName, setFilters, allProducts }) {
  const [brandFilters, setBrandFilters] = useState([]);
  const [capacityFilters, setCapacityFilters] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);




  useEffect(() => {
    if (allProducts.length > 0) {
      const prices = allProducts.map(p => parseFloat(p.price));
      const highest = Math.max(...prices);
      setMaxPrice(highest);
      setPriceRange([0, highest]);
    }
  }, [allProducts]);




  const handleBrandToggle = (brand) => {
    setBrandFilters(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };




  const handleCapacityToggle = (cap) => {
    setCapacityFilters(prev =>
      prev.includes(cap)
        ? prev.filter(c => c !== cap)
        : [...prev, cap]
    );
  };




  useEffect(() => {
    setFilters({
      brand: brandFilters,
      priceRange: priceRange,
      capacity: capacityFilters
    });
  }, [brandFilters, priceRange, capacityFilters, setFilters]);







  const renderCategorySpecificFilters = () => {            //........for category specific filters(not common ones)...........



    switch (categoryName.toLowerCase()) {


      case 'gpu':        //........for GPU category............

        return (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">GPU Capacity</h3>
            {['4', '8', '16', '32'].map(cap => (
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
            ))}
          </div>
        );




      case 'ram':    //........for RAM category............


        return (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">RAM Speed</h3>
            {/* Example filters for RAM */}
            {['2400MHz', '3200MHz', '3600MHz'].map(speed => (
              <FormControlLabel key={speed} control={<Checkbox />} label={speed} className="block" />
            ))}
          </div>
        );



      case 'processor':   //........for Processor category............


        return (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">Cores</h3>
            {/* Example filters for Processor */}
            {['4 Cores', '6 Cores', '8 Cores'].map(core => (
              <FormControlLabel key={core} control={<Checkbox />} label={core} className="block" />
            ))}
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
          <span className="ml-[52px] text-sm">{priceRange[1]} LKR</span>
        </div>
      </div>

      {/* Category Specific Filters */}
      {renderCategorySpecificFilters()}

      {/* Optional Filters (for future use) */}
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

      {/* Ratings */}
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
