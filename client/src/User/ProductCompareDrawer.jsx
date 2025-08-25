import React from "react";

const keyMap = [
  ["type", "Type"],
  ["manufacturer", "Brand"],
  ["price", "Price"],
  ["socket_type", "Socket"],
  ["core_count", "Cores"],
  ["thread_count", "Threads"],
  ["base_clock", "Base Clock"],
  ["boost_clock", "Boost Clock"],
  ["tdp", "TDP"],
  ["memory_type", "Memory Type"],
  ["memory_speed", "Memory Speed"],
  ["memory_capacity", "Capacity"],
  ["interface_type", "Interface"],
  ["vram", "VRAM"],
  ["gpu_chipset", "GPU Chipset"],
  ["gpu_cores", "GPU Cores"],
  ["motherboard_chipset", "Chipset"],
  ["form_factor", "Form Factor"],
  ["ram_slots", "RAM Slots"],
  ["max_ram", "Max RAM"],
  ["storage_type", "Storage Type"],
  ["storage_capacity", "Storage Capacity"],
  ["wattage", "Wattage"],
  ["efficiency_rating", "Efficiency"],
  ["display_size", "Display Size"],
  ["resolution", "Resolution"],
  ["refresh_rate", "Refresh Rate"],
  ["panel_type", "Panel"],
];

const ProductCompareDrawer = ({ open, products = [], onClose }) => {
  if (!open) return null;
  const [p1, p2] = products;
  const price = (v) => (typeof v === "number" ? `LKR ${v.toLocaleString()}` : `${v ?? "N/A"}`);

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-[720px] bg-white shadow-xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Product Comparison</h2>
          <button onClick={onClose} className="px-3 py-1 rounded border">Close</button>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="font-medium text-gray-600">Attribute</div>
          <div className="font-medium text-gray-900">{p1?.name || "—"}</div>
          <div className="font-medium text-gray-900">{p2?.name || "—"}</div>

          <div className="text-gray-600">Price</div>
          <div>{price(p1?.price)}</div>
          <div>{price(p2?.price)}</div>

          {keyMap.map(([key, label]) => {
            const v1 = p1?.[key];
            const v2 = p2?.[key];
            if ((v1 === undefined || v1 === "") && (v2 === undefined || v2 === "")) return null;
            return (
              <React.Fragment key={key}>
                <div className="text-gray-600">{label}</div>
                <div>{`${v1 ?? "—"}`}</div>
                <div>{`${v2 ?? "—"}`}</div>
              </React.Fragment>
            );
          })}

          <div className="text-gray-600">Link</div>
          <div>
            {p1?._id && (
              <a href={`/itempage/${p1._id}`} className="text-purple-600 hover:underline">View Item</a>
            )}
          </div>
          <div>
            {p2?._id && (
              <a href={`/itempage/${p2._id}`} className="text-purple-600 hover:underline">View Item</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCompareDrawer;


