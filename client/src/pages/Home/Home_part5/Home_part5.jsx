import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const NewestReleases = () => {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/product/filter?');
        setReleases(res.data.slice(0, 6)); // Fetch only 6 products
      } catch (error) {
        console.error('Failed to fetch new releases:', error);
      }
    };

    fetchReleases();
  }, []);

  return (
    <section
      className="relative w-full bg-cover bg-center py-12 sm:py-16 md:py-20"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/ddstqdrhm/image/upload/v1745770799/1354074_1_ux1y8t.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Our Newest Releases
          </h2>
          <p className="text-gray-300 mt-3 text-base sm:text-lg">
            Unleash the full potential of your gaming rig with our newest PC components.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {releases.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-tr from-purple-600 to-blue-500 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
            >
              <img
                src={item?.imgUrls?.[0]?.url}
                alt={item.title}
                className="w-full h-40 sm:h-44 md:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white truncate">{item.title}</h3>
                <p className="text-gray-200 text-sm mt-1 line-clamp-2">{item.description}</p>
                <Link
                  to={`/itempage/${item._id}`}
                  className="inline-block mt-3 text-blue-100 text-sm hover:underline"
                >
                  { "Explore Now"} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewestReleases;
