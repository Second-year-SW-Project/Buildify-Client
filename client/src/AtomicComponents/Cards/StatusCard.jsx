import React from "react";

function StatusCard({ Status }) {
    return (
        <div className="text-center w-100% text-gray-50 ml-3 mr-3 font-thin">
            {Status === "In Stock" && (
                <div className="bg-violet-600 p-1.5 rounded-2xl">{Status}</div>
            )}
            {Status === "Low Stock" && (
                <div className="bg-blue-500 p-1.5 rounded-2xl">{Status}</div>
            )}
            {Status === "Out of Stock" && (
                <div className="bg-rose-500 p-1.5 rounded-2xl">{Status}</div>
            )}
        </div>
    );
}
export default StatusCard
//product.quantity > 5 ? "In Stock" : product.quantity <= 5 && product.quantity > 0 ? "Low Stock" : "Out of Stock",


