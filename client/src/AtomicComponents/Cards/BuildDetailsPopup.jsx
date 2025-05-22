import React from "react";

const BuildDetailsPopup = ({ build, onClose }) => {
  if (!build) return null;
  const formattedDate = build.createdAt ? new Date(build.createdAt).toLocaleDateString() : "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-purple-700 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center mb-6">
          {build.image && (
            <img
              src={build.image}
              alt={build.name}
              className="w-40 h-40 object-contain rounded-lg mb-4"
            />
          )}
          <h2 className="text-3xl font-extrabold text-purple-800 mb-1 text-center">{build.name}</h2>
          <p className="text-base text-gray-500 mb-2">Created: {formattedDate}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Components Used:</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {Array.isArray(build.components) && build.components.length > 0 ? (
              build.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="flex items-center py-3 px-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <span className="w-36 min-w-32 text-right font-semibold text-gray-500 lowercase pr-4">
                    {comp.type}
                  </span>
                  <span className="flex-1 text-gray-900 font-medium break-words">
                    {comp.name}
                    {comp.quantity > 1 && (
                      <span className="ml-2 text-xs text-gray-500 font-normal">×{comp.quantity}</span>
                    )}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">No components listed.</div>
            )}
          </div>
        </div>
        {/* You can add more build details here if needed */}
      </div>
    </div>
  );
};

export default BuildDetailsPopup; 