import { useState } from "react";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("specification");

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg border-2 border-gray-400">
      {/* Tab Headers (Centered) */}
      <div className="flex justify-center border-b-2 border-gray-300">
        <button
          className={`py-3 px-8 text-lg font-medium ${
            activeTab === "specification"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("specification")}
        >
          Specification
        </button>
        <button
          className={`py-3 px-8 text-lg font-medium ${
            activeTab === "review"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("review")}
        >
          Review
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8 text-gray-700">
        {activeTab === "specification" ? (
          <div>
            <h3 className="text-xl font-semibold mb-4">Exceptional Processing Power</h3>
            <p className="text-sm text-gray-600 mb-8">
              The new Intel Core Ultra 9 is designed for performance enthusiasts, featuring a remarkable 24 cores and 24 threads. This desktop processor is engineered to handle the most demanding tasks with ease, making it ideal for gaming, content creation, and professional applications.
            </p>

            <h3 className="text-xl font-semibold mb-4">Speed Meets Efficiency</h3>
            <p className="text-sm text-gray-600 mb-8">
              With a frequency of up to 5.7 GHz, the Intel Core Ultra 9 ensures that you experience lightning-fast speeds, enhancing productivity and entertainment alike. Its impressive performance is complemented by a large 36M cache, optimizing data retrieval for seamless multitasking.
            </p>

            <h3 className="text-xl font-semibold mb-4">Reliable Technology</h3>
            <p className="text-sm text-gray-600 mb-8">
              Intel’s latest innovation, the Ultra 9, is backed by cutting-edge technology that provides both power and stability. Whether you are a gamer or a professional, this desktop processor offers the reliability and efficiency needed to push your limits.
            </p>

            <p className="mt-6 text-sm text-gray-500">
              <span className="font-semibold">Categories:</span> Intel Processors, Processors
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
            <p className="mb-4">
              ⭐⭐⭐⭐⭐ - "Amazing processor, great for gaming and rendering!" -{" "}
              <span className="text-gray-500">John D.</span>
            </p>
            <p className="mb-4">
              ⭐⭐⭐⭐ - "Super fast, but a bit expensive." -{" "}
              <span className="text-gray-500">Alice W.</span>
            </p>
            <p className="mb-4">
              ⭐⭐⭐⭐⭐ - "Handles everything I throw at it!" -{" "}
              <span className="text-gray-500">Mark R.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
