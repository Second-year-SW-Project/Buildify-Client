import React, { useEffect, useState } from 'react';
import axios from "axios";
import Itemcard from '../../../components/ItemCard'; // Ensure path is correct
import { useSearchParams } from 'react-router-dom';
// ...existing code...


export default function Product_item_grid({ categoryName, currentFilters }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 6;

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();

                // 1. Add category filter
                if (categoryName) {
                    params.append('attribute', 'type'); // Assuming 'type' is backend field for category
                    params.append('value', categoryName);
                }

                // 2. Add manufacturer filter (currentFilters.manufacturers are lowercase values)
                if (currentFilters && currentFilters.manufacturers && currentFilters.manufacturers.length > 0) {
                    currentFilters.manufacturers.forEach(manufacturer => {
                        params.append('manufacturer', manufacturer);
                    });
                }

                // 3. Add Price Range Filter
                if (currentFilters && currentFilters.priceRange) {
                    const { min, max } = currentFilters.priceRange;
                    if (min !== '' && !isNaN(Number(min))) {
                        params.append('minPrice', Number(min));
                    }
                    if (max !== '' && !isNaN(Number(max))) {
                        params.append('maxPrice', Number(max));
                    }
                }

                ////for gpus
                if (currentFilters && currentFilters.vrams && currentFilters.vrams.length > 0) {
                    currentFilters.vrams.forEach(vramValue => {
                        params.append('vram', vramValue.toString()); // Send as string, backend will parse
                    });
                }

                if (currentFilters && currentFilters.interfaceTypes && currentFilters.interfaceTypes.length > 0) {
                    currentFilters.interfaceTypes.forEach(interfaceTypesValue => {
                        params.append('interfaceType', interfaceTypesValue); // Send as string, backend will parse
                    });
                }

                //for rams
                if (currentFilters && currentFilters.memoryCapacities && currentFilters.memoryCapacities.length > 0) {
                    currentFilters.memoryCapacities.forEach(memorycapacityValue => {
                        params.append('memoryCapacity', memorycapacityValue.toString()); // Send as string, backend will parse
                    });
                }


                if (currentFilters && currentFilters.memoryTypes && currentFilters.memoryTypes.length > 0) {
                    currentFilters.memoryTypes.forEach(memorycapacityValue => {
                        params.append('memoryType', memorycapacityValue.toString()); // Send as string, backend will parse
                    });
                }









                //for processors


                if (currentFilters && currentFilters.coreCounts && currentFilters.coreCounts.length > 0) {
                    currentFilters.coreCounts.forEach(memorycapac => {
                        params.append('coreCount', memorycapac.toString()); // Send as string, backend will parse
                    });
                }                


                if (currentFilters && currentFilters.threadCounts && currentFilters.threadCounts.length > 0) {
                    currentFilters.threadCounts.forEach(memorycapac => {
                        params.append('threadCount', memorycapac.toString()); // Send as string, backend will parse
                    });
                }  

                if (currentFilters && currentFilters.socketTypes && currentFilters.socketTypes.length > 0) {
                    currentFilters.socketTypes.forEach(memorycapac => {
                        params.append('socketType', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 



                //for motherboards
                if (currentFilters && currentFilters.motherboardChipsets && currentFilters.motherboardChipsets.length > 0) {
                    currentFilters.motherboardChipsets.forEach(memorycapac => {
                        params.append('motherboardChipset', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 
                
                


                //for powersupplys
                if (currentFilters && currentFilters.wattages && currentFilters.wattages.length > 0) {
                    currentFilters.wattages.forEach(memorycapac => {
                        params.append('wattage', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 
               
                if (currentFilters && currentFilters.efficiencyRatings && currentFilters.efficiencyRatings.length > 0) {
                    currentFilters.efficiencyRatings.forEach(memorycapac => {
                        params.append('efficiencyRating', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 




                //for storages
                if (currentFilters && currentFilters.storageCapacities && currentFilters.storageCapacities.length > 0) {
                    currentFilters.storageCapacities.forEach(memorycapac => {
                        params.append('storageCapacity', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 

                if (currentFilters && currentFilters.storageTypes && currentFilters.storageTypes.length > 0) {
                    currentFilters.storageTypes.forEach(memorycapac => {
                        params.append('storageType', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 


                //for casings
                if (currentFilters && currentFilters.supportedMotherboardSizes && currentFilters.supportedMotherboardSizes.length > 0) {
                    currentFilters.supportedMotherboardSizes.forEach(memorycapac => {
                        params.append('supportedMotherboardSizes', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 


                if (currentFilters && currentFilters.maxGpuLengths && currentFilters.maxGpuLengths.length > 0) {
                    currentFilters.maxGpuLengths.forEach(memoryc => {
                        params.append('maxGpuLength', memoryc.toString()); // Send as string, backend will parse
                    });
                } 



                //for laptops
                if (currentFilters && currentFilters.rams && currentFilters.rams.length > 0) {
                    currentFilters.rams.forEach(memorycapac => {
                        params.append('ram', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 

                if (currentFilters && currentFilters.graphicCards && currentFilters.graphicCards.length > 0) {
                    currentFilters.graphicCards.forEach(memorycapac => {
                        params.append('graphicCard', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 

                if (currentFilters && currentFilters.storages && currentFilters.storages.length > 0) {
                    currentFilters.storages.forEach(memorycapac => {
                        params.append('storage', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 



                //for prebuilds
                if (currentFilters && currentFilters.ramSizes && currentFilters.ramSizes.length > 0) {
                    currentFilters.ramSizes.forEach(memorycapac => {
                        params.append('ramSize', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 



                //for expansion networks
                if (currentFilters && currentFilters.componentTypes && currentFilters.componentTypes.length > 0) {
                    currentFilters.componentTypes.forEach(memorycapac => {
                        params.append('componentType', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 





                //for monitors
                if (currentFilters && currentFilters.displaySizes && currentFilters.displaySizes.length > 0) {
                    currentFilters.displaySizes.forEach(memorycapac => {
                        params.append('displaySize', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 

                if (currentFilters && currentFilters.panelTypes && currentFilters.panelTypes.length > 0) {
                    currentFilters.panelTypes.forEach(memorycapac => {
                        params.append('panelType', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 

                if (currentFilters && currentFilters.refreshRates && currentFilters.refreshRates.length > 0) {
                    currentFilters.refreshRates.forEach(memorycapac => {
                        params.append('refreshRate', memorycapac.toString()); // Send as string, backend will parse
                    });
                } 
















                const apiUrl = `http://localhost:8000/api/product/filter?${params.toString()}`;
                console.log("Fetching products with URL (Grid):", apiUrl);

                const response = await axios.get(apiUrl);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName, currentFilters]); // Re-fetch when categoryName or currentFilters change

    // Add this useEffect to reset page to 1 when filters or category change, but only if not already on page 1
    useEffect(() => {
        if (currentPage !== 1) {
            setSearchParams({ page: 1 });
        }
    }, [categoryName, currentFilters]);

    // if (loading) {
    //     return <div className="text-center py-10">Loading products...</div>;
    // }

      if (loading) {
        return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-6 mt-[250px]"></div>
      <p className="text-xl font-semibold">Loading search results...</p>
    </div>
  );
}

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle page change
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!products) return <div>Loading...</div>;

  return (
    <div>
        {products.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-y-10 gap-x-6 px-0 py-8">
        {currentProducts.map(product => (
          <Itemcard key={product._id} product={product} />
        ))}
      </div>
                  ) : (
                <div className="text-center py-10 text-gray-500">
                    No products found matching your criteria.
                </div>
            )}









      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 mt-[170px] mb-[40px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}