//http://localhost:5000/api/products


import { useEffect, useState } from "react";
import axios from "axios";
import PCcardhome from "./Pccardhome";

export default function Home_part2() {
  const [pcs, setPcs] = useState([]);

  useEffect(() => {
    const fetchPCs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product/filter?attribute=type&value=prebuild'); // Axios fetch
        setPcs(response.data.slice(0, 8)); // Select only the first 8 items
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchPCs();
  }, []);

  return (
    <div className="w-full py-16 px-4">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center">Prebuilt Gaming PCs</h2>
      <p className="text-center text-gray-600 text-lg mb-8">
        We use the latest generation performance components and configurations to get you gaming fast.
      </p>

      {/* Cards with mapping*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {pcs.map((pc) => (
          <div key={pc._id} className="flex justify-center">
            <PCcardhome id={pc._id} product={pc} />
          </div>
        ))}
      </div>
    </div>
  );
}
