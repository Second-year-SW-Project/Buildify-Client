import React from 'react'

export default function Itemspecs() {
  return (
    <div>
       <div>
        <div> 
        <div>

            <h2 className="pb-5 text-2xl font-semibold text-gray-900">
                   Intel® Core Ultra 9 Processor 285K

                   
                   
              </h2>
              

              <div className="mt-3 text-gray-700 space-y-3 ">
                  <p>
                    <span className="font-bold">Brand:</span> INTEL
                  </p>
                  <p>
                    <span className="font-bold">Cores:</span> 24
                  </p>
                  <p>
                    <span className="font-bold">Threads:</span> 24
                  </p>
                  <p>
                    <span className="font-bold">Cache:</span> 36MB
                  </p>
                  <p>
                    <span className="font-bold">Frequency:</span> Up to 5.7GHz
                  </p>
                  <p>
                    <span className="font-bold">Warranty:</span> 03 Years
                  </p>
              </div>

              <div className="mt-6">
                <p className="text-2xl font-bold text-gray-900">156,000 LKR</p>
              </div>

              <div className="mt-5">
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  In stock
                </span>
              </div>

              <div className="mt-4 flex items-center space-x-5">
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="w-21 h-9 border rounded-2xl text-center"
                />
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                  Add To Cart
                </button>
              </div> 
          </div>
        </div>
      </div>








    </div>
  )
}
