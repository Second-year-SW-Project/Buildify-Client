import React from 'react';

export default function Itemspecs() {
  return (
    <div className="flex justify-end w-full ">
      <div className="w-full md:mr-[50px] lg:w-1/2 xl:w-4/5  md:p-6 lg:p-8  text-gray-900">
        <h2 className="pb-3 text-base md:text-lg lg:text-3xl font-semibold">
          Intel® Core Ultra 9 Processor 285K
        </h2>

        <div className="mt-2 space-y-4 text-xs md:text-sm lg:text-base">
          <p><span className="font-bold">Brand:</span> INTEL</p>
          <p><span className="font-bold">Cores:</span> 24</p>
          <p><span className="font-bold">Threads:</span> 24</p>
          <p><span className="font-bold">Cache:</span> 36MB</p>
          <p><span className="font-bold">Frequency:</span> Up to 5.7GHz</p>
          <p><span className="font-bold">Warranty:</span> 03 Years</p>
        </div>

        <div className="mt-8 text-lg md:text-xl lg:text-2xl font-bold">
          156,000 LKR
        </div>

        <div className="mt-5">
          <span className="inline-block bg-blue-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
            In stock
          </span>
        </div>

        <div className="mt-4 flex items-center space-x-3">
          <input
            type="number"
            defaultValue="1"
            min="1"
            className="w-12 md:w-14 lg:w-16 h-8 md:h-9 border rounded-lg text-center"
          />
          <button className="px-3 py-2 md:px-4 md:py-2 bg-black text-white text-xs md:text-sm font-medium rounded-lg hover:bg-gray-800 transition">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
