import { expansionNetworkAttributes } from "./expansionNetworkCategories";

const main = [
  { value: "Necessary", label: "Custom Build Necessary" },
  { value: "Optional", label: "Custom Build Optional" },
  { value: "Common", label: "Individual Category" },
];

const StockType = [
  { value: "In Stock", label: "In Stock" },
  { value: "Out of Stock", label: "Out of Stock" },
  { value: "Low Stock", label: "Low Stock" },
];

const InvoiceStatus = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "partiallypaid", label: "Partially Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

const subCategories = {
  Necessary: [
    { value: "ram", label: "Ram" },
    { value: "gpu", label: "Graphic Card" },
    { value: "processor", label: "Processors" },
    { value: "motherboard", label: "Motherboard" },
    { value: "storage", label: "Storages" },
    { value: "casing", label: "Casing" },
    { value: "power", label: "Power Supply" },
  ],
  Optional: [
    { value: "cooling", label: "Cooling" },
    { value: "keyboard", label: "Keyboard" },
    { value: "mouse", label: "Mouse" },
    { value: "monitor", label: "Monitor" },
    { value: "ups", label: "UPS" },
    { value: "expansion_network", label: "Expansion & Networking" },
    { value: "gamepad", label: "Gamepad" },
  ],
  Common: [
    { value: "laptop", label: "Laptop" },
    { value: "prebuild", label: "Prebuilds" },
    { value: "accessories", label: "Steaming Accessories" },
    { value: "externals", label: "External Storage" },
    { value: "cables_and_connectors", label: "Cables & Connectors" },
  ],
};

const manufacture = {
  processor: [
    { value: "Intel", label: "Intel" },
    { value: "AMD", label: "AMD" },
  ],
  ram: [
    { value: "Corsair", label: "Corsair" },
    { value: "Team", label: "Team" },
    { value: "GSKILL", label: "GSKILL" },
    { value: "Hyperx", label: "HyperX" },
    { value: "ADATA", label: "ADATA" },
    { value: "Transcend", label: "Transcend" }
  ],
  motherboard: [
    { value: "Asus", label: "ASUS" },
    { value: "Gigabyte", label: "Gigabyte" },
    { value: "MSI", label: "MSI" },
    { value: "Colorful", label: "Colorful" },
  ],
  gpu: [
    // NVIDIA RTX 40 Series
    { value: "NVIDIA_RTX_4090", label: "NVIDIA GeForce RTX 4090" },
    { value: "NVIDIA_RTX_4080_Super", label: "NVIDIA GeForce RTX 4080 Super" },
    { value: "NVIDIA_RTX_4080", label: "NVIDIA GeForce RTX 4080" },
    { value: "NVIDIA_RTX_4070_Ti_Super", label: "NVIDIA GeForce RTX 4070 Ti Super" },
    { value: "NVIDIA_RTX_4070_Ti", label: "NVIDIA GeForce RTX 4070 Ti" },
    { value: "NVIDIA_RTX_4070_Super", label: "NVIDIA GeForce RTX 4070 Super" },
    { value: "NVIDIA_RTX_4070", label: "NVIDIA GeForce RTX 4070" },
    { value: "NVIDIA_RTX_4060_Ti", label: "NVIDIA GeForce RTX 4060 Ti" },
    { value: "NVIDIA_RTX_4060", label: "NVIDIA GeForce RTX 4060" },
    // NVIDIA RTX 30 Series
    { value: "NVIDIA_RTX_3090_Ti", label: "NVIDIA GeForce RTX 3090 Ti" },
    { value: "NVIDIA_RTX_3090", label: "NVIDIA GeForce RTX 3090" },
    { value: "NVIDIA_RTX_3080_Ti", label: "NVIDIA GeForce RTX 3080 Ti" },
    { value: "NVIDIA_RTX_3080", label: "NVIDIA GeForce RTX 3080" },
    { value: "NVIDIA_RTX_3070_Ti", label: "NVIDIA GeForce RTX 3070 Ti" },
    { value: "NVIDIA_RTX_3070", label: "NVIDIA GeForce RTX 3070" },
    { value: "NVIDIA_RTX_3060_Ti", label: "NVIDIA GeForce RTX 3060 Ti" },
    { value: "NVIDIA_RTX_3060", label: "NVIDIA GeForce RTX 3060" },
    // AMD RX 7000 Series
    { value: "AMD_RX_7900_XTX", label: "AMD Radeon RX 7900 XTX" },
    { value: "AMD_RX_7900_XT", label: "AMD Radeon RX 7900 XT" },
    { value: "AMD_RX_7800_XT", label: "AMD Radeon RX 7800 XT" },
    { value: "AMD_RX_7700_XT", label: "AMD Radeon RX 7700 XT" },
    { value: "AMD_RX_7600_XT", label: "AMD Radeon RX 7600 XT" },
    { value: "AMD_RX_7600", label: "AMD Radeon RX 7600" },
    // AMD RX 6000 Series
    { value: "AMD_RX_6950_XT", label: "AMD Radeon RX 6950 XT" },
    { value: "AMD_RX_6900_XT", label: "AMD Radeon RX 6900 XT" },
    { value: "AMD_RX_6800_XT", label: "AMD Radeon RX 6800 XT" },
    { value: "AMD_RX_6800", label: "AMD Radeon RX 6800" },
    { value: "AMD_RX_6750_XT", label: "AMD Radeon RX 6750 XT" },
    { value: "AMD_RX_6700_XT", label: "AMD Radeon RX 6700 XT" },
    { value: "AMD_RX_6650_XT", label: "AMD Radeon RX 6650 XT" },
    { value: "AMD_RX_6600_XT", label: "AMD Radeon RX 6600 XT" },
    { value: "AMD_RX_6600", label: "AMD Radeon RX 6600" }
  ],
  storage: [
    { value: "Samsung", label: "Samsung" },
    { value: "Seagate", label: "Seagate" },
    { value: "Corsair", label: "Corsair" },
    { value: "Team", label: "Team" },
    { value: "Western Digital", label: "Western Digital" },
    { value: "Toshiba", label: "Toshiba" },
    { value: "ADATA", label: "ADATA" },
    { value: "Kingston", label: "Kingston" },
  ],
  casing: [
    { value: "Asus", label: "ASUS" },
    { value: "Gigabyte", label: "Gigabyte" },
    { value: "MSI", label: "MSI" },
    { value: "Antec", label: "Antec" },
    { value: "Corsair", label: "Corsair" },
    { value: "NZXT", label: "NZXT" },
    { value: "Lian Li", label: "Lian Li" },
    { value: "Cooler Master", label: "Cooler Master" },
    { value: "Fractal Design", label: "Fractal Design" },
  ],
  power: [
    { value: "Asus", label: "ASUS" },
    { value: "Corsair", label: "Corsair" },
    { value: "Antec", label: "Antec" },
    { value: "EVGA", label: "EVGA" },
    { value: "ProLink", label: "ProLink" },
    { value: "Seasonic", label: "Seasonic" },
    { value: "Thermaltake", label: "Thermaltake" },
    { value: "Be Quiet", label: "Be Quiet" },
  ],
  cooling: [
    { value: "Noctua", label: "Noctua" },
    { value: "Corsair", label: "Corsair" },
    { value: "Bequiet", label: "Be Quiet" },
    { value: "Arctic", label: "Arctic" },
    { value: "Cooler Master", label: "Cooler Master" },
    { value: "NZXT", label: "NZXT" },
    { value: "ADATA", label: "Adata" },
    { value: "Lian Li", label: "Lian Li" },
    { value: "Antec", label: "Antec" },
  ],
  keyboard: [
    { value: "Logitech", label: "Logitech" },
    { value: "HyperX", label: "HyperX" },
    { value: "Corsair", label: "Corsair" },
    { value: "SteelSeries", label: "SteelSeries" },
    { value: "Razer", label: "Razer" },
    { value: "Asus", label: "ASUS" },
  ],
  mouse: [
    { value: "Asus", label: "ASUS" },
    { value: "MSI", label: "MSI" },
    { value: "Lenovo", label: "Lenovo" },
    { value: "HP", label: "HP" },
    { value: "Logitech", label: "Logitech" },
    { value: "Hyperx", label: "HyperX" },
    { value: "Corsair", label: "Corsair" },
    { value: "ADATA", label: "ADATA" },
    { value: "Fantec", label: "Fantech" },
    { value: "Steelseries", label: "SteelSeries" },
    { value: "Razer", label: "Razer" },
  ],
  monitor: [
    { value: "Asus", label: "ASUS" },
    { value: "MSI", label: "MSI" },
    { value: "Acer", label: "Acer" },
    { value: "Corsair", label: "Corsair" },
    { value: "Lenovo", label: "Lenovo" },
    { value: "Dell", label: "Dell" },
    { value: "HP", label: "HP" },
    { value: "LG", label: "LG" },
    { value: "Gigabyte", label: "Gigabyte" },
  ],
  ups: [
    { value: "APC", label: "APC" },
    { value: "Tripplite", label: "Tripplite" },
    { value: "Cyber Power Pc", label: "CyberPowerPC" },
  ],
  expansion_network: [
    { value: "Creative", label: "Creative" },
    { value: "Asus", label: "ASUS" },
    { value: "Tp-link", label: "TP-Link" },
    { value: "Intel", label: "Intel" },
    { value: "Realtek", label: "Realtek" },
    { value: "Netgear", label: "Netgear" },
  ],
  gamepad: [
    { value: "Logitech", label: "Logitech" },
    { value: "Microsoft", label: "Microsoft" },
    { value: "Sony", label: "Sony" },
    { value: "Razer", label: "Razer" },
  ],
  laptop: [
    { value: "Dell", label: "Dell" },
    { value: "Lenovo", label: "Lenovo" },
    { value: "HP", label: "HP" },
    { value: "Asus", label: "ASUS" },
    { value: "Acer", label: "Acer" },
    { value: "MSI", label: "MSI" },
    { value: "Gigabyte", label: "Gigabyte" },
  ],
  prebuild: [
    { value: "Dell", label: "Dell" },
    { value: "HP", label: "HP" },
    { value: "Asus", label: "ASUS" },
    { value: "MSI", label: "MSI" },
    { value: "Alienware", label: "Alienware" },
    { value: "Buildify", label: "Buildify" },
  ],
};

const socketTypes = {
  Intel: [
    { value: "Lga1200", label: "LGA 1200" },
    { value: "Lga1151", label: "LGA 1151" },
    { value: "Lga2066", label: "LGA 2066" },
    { value: "Lga1700", label: "LGA 1700" },
    { value: "Lga1851", label: "LGA 1851" },
  ],
  AMD: [
    { value: "AM4", label: "AM4" },
    { value: "TR4", label: "TR4" },
    { value: "AM5", label: "AM5" },
    { value: "sTRX4", label: "sTRX4" },
    { value: "sWRX8", label: "sWRX8" },
  ],
};

const cpuCores = [
  { value: "4", label: "4 Cores" },
  { value: "6", label: "6 Cores" },
  { value: "8", label: "8 Cores" },
  { value: "10", label: "10 Cores" },
  { value: "12", label: "12 Cores" },
  { value: "14", label: "14 Cores" },
  { value: "16", label: "16 Cores" },
  { value: "20", label: "20 Cores" },
  { value: "24", label: "24 Cores" },
];

const cpuThreads = [
  { value: "4", label: "4 Threads" },
  { value: "6", label: "6 Threads" },
  { value: "8", label: "8 Threads" },
  { value: "12", label: "12 Threads" },
  { value: "14", label: "14 Threads" },
  { value: "16", label: "16 Threads" },
  { value: "20", label: "20 Threads" },
  { value: "24", label: "24 Threads" },
  { value: "28", label: "28 Threads" },
  { value: "32", label: "32 Threads" },
  { value: "64", label: "64 Threads" },
];

const coolerAttributes = {

  supportedSocket: [
    { value: "Lga1200", label: "LGA 1200" },
    { value: "Lga1151", label: "LGA 1151" },
    { value: "Lga2066", label: "LGA 2066" },
    { value: "Lga1700", label: "LGA 1700" },
    { value: "Lga1851", label: "LGA 1851" },
    { value: "AM4", label: "AM4" },
    { value: "TR4", label: "TR4" },
    { value: "AM5", label: "AM5" },
    { value: "sTRX4", label: "sTRX4" },
    { value: "sWRX8", label: "sWRX8" },
  ],
  coolerType: [
    { value: "Air", label: "Air" },
    { value: "Liquid", label: "Liquid" },
  ],
};

const ramAttributes = {
  type: [
    { value: "DDR3", label: "DDR3" },
    { value: "DDR4", label: "DDR4" },
    { value: "DDR5", label: "DDR5" },
  ],
  speed: [
    { value: 2133, label: "2133 MHz" },
    { value: 2666, label: "2666 MHz" },
    { value: 3000, label: "3000 MHz" },
    { value: 3200, label: "3200 MHz" },
    { value: 3600, label: "3600 MHz" },
    { value: 4000, label: "4000 MHz" },
    { value: 4800, label: "4800 MHz" },
    { value: 5200, label: "5200 MHz" },
    { value: 5600, label: "5600 MHz" },
    { value: 6000, label: "6000 MHz" },
    { value: 6400, label: "6400 MHz" },
  ],
  size: [
    { value: 4, label: "4GB" },
    { value: 8, label: "8GB" },
    { value: 16, label: "16GB" },
    { value: 32, label: "32GB" },
    { value: 64, label: "64GB" },
    { value: 128, label: "128GB" },
  ],
};

const motherboardAttributes = {
  chipsets: [
    { value: "A520", label: "A520" },
    { value: "A620", label: "A620" },
    { value: "B450", label: "B450" },
    { value: "B550", label: "B550" },
    { value: "B650", label: "B650" },
    { value: "B760", label: "B760" },
    { value: "B840", label: "B840" },
    { value: "B850", label: "B850" },
    { value: "B860", label: "B860" },
    { value: "X570", label: "X570" },
    { value: "X670", label: "X670" },
    { value: "X870", label: "X870" },
    { value: "Z690", label: "Z690" },
    { value: "Z790", label: "Z790" },
    { value: "Z890", label: "Z890" },
    { value: "H510", label: "H510" },
    { value: "H610", label: "H610" },
    { value: "H670", label: "H670" },
  ],
  motherboardSocket: [
    { value: "Lga1200", label: "LGA 1200" },
    { value: "Lga1151", label: "LGA 1151" },
    { value: "Lga2066", label: "LGA 2066" },
    { value: "Lga1700", label: "LGA 1700" },
    { value: "Lga1851", label: "LGA 1851" },
    { value: "AM4", label: "AM4" },
    { value: "TR4", label: "TR4" },
    { value: "AM5", label: "AM5" },
    { value: "sTRX4", label: "sTRX4" },
    { value: "sWRX8", label: "sWRX8" },
  ],
  formFactor: [
    { value: "ATX", label: "ATX" },
    { value: "Micro_ATX", label: "Micro-ATX" },
    { value: "Mini_ITX", label: "Mini-ITX" },
    { value: "E_ATX", label: "E-ATX" },
    { value: "XL_ATX", label: "XL-ATX" },
  ],
  ramSlots: [
    { value: 2, label: "2 Slots" },
    { value: 4, label: "4 Slots" },
    { value: 8, label: "8 Slots" },
  ],
  maxRam: [
    { value: 32, label: "32GB" },
    { value: 64, label: "64GB" },
    { value: 128, label: "128GB" },
    { value: 256, label: "256GB" },
  ],
  memoryTypes: [
    { value: "DDR3", label: "DDR3" },
    { value: "DDR4", label: "DDR4" },
    { value: "DDR5", label: "DDR5" },
  ],
  pcieSlotType: [
    { value: "x16", label: "PCIe x16" },
    { value: "x8", label: "PCIe x8" },
    { value: "x4", label: "PCIe x4" },
    { value: "x1", label: "PCIe x1" },
  ],
  pcieVersion: [
    { value: "3.0", label: "3.0" },
    { value: "4.0", label: "4.0" },
    { value: "5.0", label: "5.0" },
  ],
  storageType: [
    { value: "M.2", label: "M.2" },
    { value: "SATA", label: "SATA" },
  ],
};

const storageAttributes = {
  storageTypes: [
    { value: "NVMe_M.2", label: "NVMe M.2" },
    { value: "SATA_SSD", label: "SATA SSD" },
    { value: "SATA_HDD", label: "SATA HDD" },
  ],
  storageCapacities: [
    { value: 256, label: "256GB" },
    { value: 512, label: "512GB" },
    { value: 1000, label: "1TB" },
    { value: 2000, label: "2TB" },
    { value: 4000, label: "4TB" },
    { value: 8000, label: "8TB" },
  ],
};

const gpuAttributes = {
  interfaceType: [
    { value: "pcie_5_0_x16", label: "PCIe 5.0 x16" },
    { value: "pcie_5_0_x8", label: "PCIe 5.0 x8" },
    { value: "pcie_4_0_x16", label: "PCIe 4.0 x16" },
    { value: "pcie_4_0_x8", label: "PCIe 4.0 x8" },
    { value: "pcie_3_0_x16", label: "PCIe 3.0 x16" },
    { value: "pcie_3_0_x8", label: "PCIe 3.0 x8" },

  ],
  powerConnectors: [
    { value: "6-pin", label: "6-pin" },
    { value: "8-pin", label: "8-pin" },
    { value: "6+8-pin", label: "6+8-pin" },
    { value: "2x8-pin", label: "2x8-pin" },
    { value: "12-pin", label: "12-pin" },
    { value: "16-pin", label: "16-pin (12VHPWR)" },
  ],
  gpuVram: [
    { value: 4, label: "4GB" },
    { value: 8, label: "8GB" },
    { value: 12, label: "12GB" },
    { value: 16, label: "16GB" },
    { value: 24, label: "24GB" },
    { value: 48, label: "48GB" },
  ],

  gpuChipset: [
    { value: "RTX_5090", label: "RTX 5090" },
    { value: "RTX_5080", label: "RTX 5080" },
    { value: "RTX_5070_Ti", label: "RTX 5070 Ti" },
    { value: "RTX_5070", label: "RTX 5070" },
    { value: "RTX_4090", label: "RTX 4090" },
    { value: "RTX_4080", label: "RTX 4080" },
    { value: "RTX_4070_Ti", label: "RTX 4070 Ti" },
    { value: "RTX_4070", label: "RTX 4070" },
    { value: "RTX_4060_Ti", label: "RTX 4060 Ti" },
    { value: "RTX_4060", label: "RTX 4060" },
    { value: "RTX_3090_Ti", label: "RTX 3090 Ti" },
    { value: "RTX_3090", label: "RTX 3090" },
    { value: "RTX_3080_Ti", label: "RTX 3080 Ti" },
    { value: "RTX_3080", label: "RTX 3080" },
    { value: "RTX_3070_Ti", label: "RTX 3070 Ti" },
    { value: "RTX_3070", label: "RTX 3070" },
    { value: "RTX_3060_Ti", label: "RTX 3060 Ti" },
    { value: "RTX_3060", label: "RTX 3060" },
    { value: "RX_7900_XTX", label: "RX 7900 XTX" },
    { value: "RX_7900_XT", label: "RX 7900 XT" },
    { value: "RX_7800_XT", label: "RX 7800 XT" },
    { value: "RX_7700_XT", label: "RX 7700 XT" },
    { value: "RX_7600_XT", label: "RX 7600 XT" },
    { value: "RX_7600", label: "RX 7600" },
    { value: "RX_6950_XT", label: "RX 6950 XT" },
    { value: "RX_6900_XT", label: "RX 6900 XT" },
    { value: "RX_6800_XT", label: "RX 6800 XT" },
    { value: "RX_6800", label: "RX 6800" },
    { value: "RX_6700_XT", label: "RX 6700 XT" },
    { value: "RX_6650_XT", label: "RX 6650 XT" },
    { value: "RX_6600_XT", label: "RX 6600 XT" },
    { value: "RX_6600", label: "RX 6600" },
    { value: "Arc_B580", label: "Arc B580" },
    { value: "Arc_B570", label: "Arc B570" },
    { value: "Arc_A770", label: "Arc A770" },
    { value: "Arc_A750", label: "Arc A750" },
    { value: "Arc_A580", label: "Arc A580" }
  ],
};

const casingAttributes = {
  formFactor: [
    { value: "Mid_Tower", label: "Mid Tower" },
    { value: "Full_Tower", label: "Full Tower" },
    { value: "Mini_Tower", label: "Mini Tower" },
    { value: "Cube", label: "Cube" },
    { value: "Open_Frame", label: "Open Frame" },
  ],
  supportedMotherboardSizes: [
    { value: "ATX", label: "ATX" },
    { value: "Micro_ATX", label: "Micro-ATX" },
    { value: "Mini_ITX", label: "Mini-ITX" },
    { value: "E_ATX", label: "E-ATX" },
    { value: "Xl_ATX", label: "XL-ATX" },
  ],
};

const powerAttributes = {
  wattage: [
    { value: 400, label: "400W" },
    { value: 500, label: "500W" },
    { value: 600, label: "600W" },
    { value: 650, label: "650W" },
    { value: 750, label: "750W" },
    { value: 850, label: "850W" },
    { value: 1000, label: "1000W" },
    { value: 1200, label: "1200W" },
  ],
  efficiencyRating: [
    { value: "80_plus_white", label: "80+ White" },
    { value: "80_plus_bronze", label: "80+ Bronze" },
    { value: "80_plus_silver", label: "80+ Silver" },
    { value: "80_plus_gold", label: "80+ Gold" },
    { value: "80_plus_platinum", label: "80+ Platinum" },
    { value: "80_plus_titanium", label: "80+ Titanium" },
  ],
  modularType: [
    { value: "Non_Modular", label: "Non-Modular" },
    { value: "Semi_Modular", label: "Semi-Modular" },
    { value: "Fully_Modular", label: "Fully Modular" },
  ],
};

const keyboardAttributes = {
  type: [
    { value: "Mechanical", label: "Mechanical" },
    { value: "Membrane", label: "Membrane" },
    { value: "Hybrid", label: "Hybrid" },
  ],
  connectivity: [
    { value: "Wired", label: "Wired" },
    { value: "Wireless", label: "Wireless" }
  ]
};

const mouseAttributes = {
  connectivity: [
    { value: "wired", label: "Wired" },
    { value: "wireless", label: "Wireless" }
  ]
};

const monitorAttributes = {
  displaySize: [
    { value: 19, label: "19 inches" },
    { value: 20, label: "20 inches" },
    { value: 22, label: "22 inches" },
    { value: 24, label: "24 inches" },
    { value: 27, label: "27 inches" },
    { value: 32, label: "32 inches" },
    { value: 34, label: "34 inches" },
    { value: 42, label: "42 inches" },
  ],
  resolution: [
    { value: "1280x720", label: "1280x720 (HD)" },
    { value: "1920x1080", label: "1920x1080 (Full HD)" },
    { value: "2560x1440", label: "2560x1440 (QHD)" },
    { value: "3840x2160", label: "3840x2160 (4K UHD)" },
    { value: "5120x1440", label: "5120x1440 (Super Ultra-Wide)" },
  ],
  refreshRate: [
    { value: 60, label: "60Hz" },
    { value: 75, label: "75Hz" },
    { value: 100, label: "100Hz" },
    { value: 120, label: "120Hz" },
    { value: 144, label: "144Hz" },
    { value: 160, label: "160Hz" },
    { value: 165, label: "165Hz" },
    { value: 170, label: "170Hz" },
    { value: 180, label: "180Hz" },
    { value: 240, label: "240Hz" },
    { value: 360, label: "360Hz" },
  ],
  panelType: [
    { value: "TN", label: "TN (Twisted Nematic)" },
    { value: "IPS", label: "IPS (In-Plane Switching)" },
    { value: "VA", label: "VA (Vertical Alignment)" },
    { value: "OLED", label: "OLED" },
  ],
  monitorType: [
    { value: "Gaming", label: "Gaming" },
    { value: "Professional", label: "Professional" },
    { value: "Office", label: "Office" },
    { value: "Portable", label: "Portable" },
  ],
};

const laptopAttributes = {
  displaySize: [
    { value: 13, label: "13 inches" },
    { value: 14, label: "14 inches" },
    { value: 15, label: "15.6 inches" },
    { value: 16, label: "16 inches" },
    { value: 17, label: "17 inches" },
  ],
  refreshRate: [
    { value: 60, label: "60Hz" },
    { value: 75, label: "75Hz" },
    { value: 120, label: "120Hz" },
    { value: 144, label: "144Hz" },
    { value: 165, label: "165Hz" },
  ],
  cpu: [
    { value: "Intel_core_i3", label: "Intel Core i3" },
    { value: "Intel_core_i5", label: "Intel Core i5" },
    { value: "Intel_core_i7", label: "Intel Core i7" },
    { value: "Intel_core_i9", label: "Intel Core i9" },
    { value: "AMD_Ryzen_5", label: "AMD Ryzen 5" },
    { value: "AMD_Ryzen_7", label: "AMD Ryzen 7" },
    { value: "amd_Ryzen_9", label: "AMD Ryzen 9" },
    { value: "Intel_Ultra_5", label: "Intel Ultra 5" },
    { value: "Intel_Ultra_7", label: "Intel Ultra 7" },
    { value: "Intel_Ultra_9", label: "Intel Ultra 9" },
  ],
  ram: [
    { value: 8, label: "8GB" },
    { value: 16, label: "16GB" },
    { value: 32, label: "32GB" },
    { value: 64, label: "64GB" },
  ],
  storage: [
    { value: 256, label: "256GB" },
    { value: 512, label: "512GB" },
    { value: 1024, label: "1TB" },
    { value: 2048, label: "2TB" },
  ],
  laptopType: [
    { value: "Gaming", label: "Gaming" },
    { value: "Professional", label: "Professional" },
    { value: "Personal", label: "Personal" },
  ],
  graphicCard: [
    { value: "Intel_Integrated", label: "Intel Integrated GPU" },
    { value: "AMD_Integrated", label: "AMD Integrated GPU" },
    { value: "NVIDIA_GTX_1650", label: "NVIDIA GTX 1650" },
    { value: "NVIDIA_GTX_1660", label: "NVIDIA GTX 1660" },
    { value: "NVIDIA_RTX_2050", label: "NVIDIA RTX 2050" },
    { value: "NVIDIA_RTX_3050", label: "NVIDIA RTX 3050" },
    { value: "NVIDIA_RTX_3070", label: "NVIDIA RTX 3070" },
    { value: "NVIDIA_RTX_4060", label: "NVIDIA RTX 4060" },
    { value: "NVIDIA_RTX_4070", label: "NVIDIA RTX 4070" },
    { value: "NVIDIA_RTX_4080", label: "NVIDIA RTX 4080" },
    { value: "NVIDIA_RTX_4090", label: "NVIDIA RTX 4090" },
    { value: "NVIDIA_RTX_5080", label: "NVIDIA RTX 5080" },
    { value: "AMD_RX_6900", label: "AMD Radeon RX 6900" },
    { value: "AMD_RX_7600", label: "AMD Radeon RX 7600" },
  ],
};

const desktopAttributes = {
  cpu: [
    // Intel 14th Gen
    { value: "Intel_Core_i9_14900K", label: "Intel Core i9-14900K" },
    { value: "Intel_Core_i7_14700K", label: "Intel Core i7-14700K" },
    { value: "Intel_Core_i5_14600K", label: "Intel Core i5-14600K" },
    // Intel 13th Gen
    { value: "Intel_Core_i9_13900KS", label: "Intel Core i9-13900KS" },
    { value: "Intel_Core_i9_13900K", label: "Intel Core i9-13900K" },
    { value: "Intel_Core_i7_13700K", label: "Intel Core i7-13700K" },
    { value: "Intel_Core_i5_13600K", label: "Intel Core i5-13600K" },
    { value: "Intel_Core_i5_13400", label: "Intel Core i5-13400" },
    // Intel 12th Gen
    { value: "Intel_Core_i9_12900KS", label: "Intel Core i9-12900KS" },
    { value: "Intel_Core_i9_12900K", label: "Intel Core i9-12900K" },
    { value: "Intel_Core_i7_12700K", label: "Intel Core i7-12700K" },
    { value: "Intel_Core_i5_12600K", label: "Intel Core i5-12600K" },
    // Intel Ultra Series
    { value: "Intel_Ultra_5", label: "Intel Ultra 5" },
    { value: "Intel_Ultra_7", label: "Intel Ultra 7" },
    { value: "Intel_Ultra_9", label: "Intel Ultra 9" },
    // AMD Ryzen 7000 Series
    { value: "AMD_Ryzen_9_7950X3D", label: "AMD Ryzen 9 7950X3D" },
    { value: "AMD_Ryzen_9_7950X", label: "AMD Ryzen 9 7950X" },
    { value: "AMD_Ryzen_7_7800X3D", label: "AMD Ryzen 7 7800X3D" },
    { value: "AMD_Ryzen_7_7700X", label: "AMD Ryzen 7 7700X" },
    { value: "AMD_Ryzen_5_7600X", label: "AMD Ryzen 5 7600X" },
    // AMD Ryzen 5000 Series
    { value: "AMD_Ryzen_9_5950X", label: "AMD Ryzen 9 5950X" },
    { value: "AMD_Ryzen_7_5800X3D", label: "AMD Ryzen 7 5800X3D" },
    { value: "AMD_Ryzen_7_5800X", label: "AMD Ryzen 7 5800X" },
    { value: "AMD_Ryzen_5_5600X", label: "AMD Ryzen 5 5600X" },
  ],
  gpu: [
    { value: "NVIDIA_RTX_4090", label: "NVIDIA GeForce RTX 4090" },
    { value: "NVIDIA_RTX_4080_Super", label: "NVIDIA GeForce RTX 4080 Super" },
    { value: "NVIDIA_RTX_4080", label: "NVIDIA GeForce RTX 4080" },
    { value: "NVIDIA_RTX_4070_Ti_Super", label: "NVIDIA GeForce RTX 4070 Ti Super" },
    { value: "NVIDIA_RTX_4070_Ti", label: "NVIDIA GeForce RTX 4070 Ti" },
    { value: "NVIDIA_RTX_4070_Super", label: "NVIDIA GeForce RTX 4070 Super" },
    { value: "NVIDIA_RTX_4070", label: "NVIDIA GeForce RTX 4070" },
    { value: "NVIDIA_RTX_4060_Ti", label: "NVIDIA GeForce RTX 4060 Ti" },
    { value: "NVIDIA_RTX_4060", label: "NVIDIA GeForce RTX 4060" },
    { value: "NVIDIA_RTX_3090_Ti", label: "NVIDIA GeForce RTX 3090 Ti" },
    { value: "NVIDIA_RTX_3090", label: "NVIDIA GeForce RTX 3090" },
    { value: "NVIDIA_RTX_3080_Ti", label: "NVIDIA GeForce RTX 3080 Ti" },
    { value: "NVIDIA_RTX_3080", label: "NVIDIA GeForce RTX 3080" },
    { value: "NVIDIA_RTX_3070_Ti", label: "NVIDIA GeForce RTX 3070 Ti" },
    { value: "NVIDIA_RTX_3070", label: "NVIDIA GeForce RTX 3070" },
    { value: "NVIDIA_RTX_3060_Ti", label: "NVIDIA GeForce RTX 3060 Ti" },
    { value: "NVIDIA_RTX_3060", label: "NVIDIA GeForce RTX 3060" },
    { value: "AMD_RX_7900_XTX", label: "AMD Radeon RX 7900 XTX" },
    { value: "AMD_RX_7900_XT", label: "AMD Radeon RX 7900 XT" },
    { value: "AMD_RX_7800_XT", label: "AMD Radeon RX 7800 XT" },
    { value: "AMD_RX_7700_XT", label: "AMD Radeon RX 7700 XT" },
    { value: "AMD_RX_7600_XT", label: "AMD Radeon RX 7600 XT" },
    { value: "AMD_RX_7600", label: "AMD Radeon RX 7600" },
    { value: "AMD_RX_6950_XT", label: "AMD Radeon RX 6950 XT" },
    { value: "AMD_RX_6900_XT", label: "AMD Radeon RX 6900 XT" },
    { value: "AMD_RX_6800_XT", label: "AMD Radeon RX 6800 XT" },
    { value: "AMD_RX_6800", label: "AMD Radeon RX 6800" },
    { value: "AMD_RX_6750_XT", label: "AMD Radeon RX 6750 XT" },
    { value: "AMD_RX_6700_XT", label: "AMD Radeon RX 6700 XT" },
    { value: "AMD_RX_6650_XT", label: "AMD Radeon RX 6650 XT" },
    { value: "AMD_RX_6600_XT", label: "AMD Radeon RX 6600 XT" },
    { value: "AMD_RX_6600", label: "AMD Radeon RX 6600" },
    { value: "Intel_Arc_A770", label: "Intel Arc A770" },
    { value: "Intel_Arc_A750", label: "Intel Arc A750" },
    { value: "Intel_Arc_A580", label: "Intel Arc A580" },
    { value: "Intel_Arc_A380", label: "Intel Arc A380" },
    { value: "Intel_Arc_A310", label: "Intel Arc A310" }
  ],
  ram: [
    { value: 8, label: "8GB" },
    { value: 16, label: "16GB" },
    { value: 32, label: "32GB" },
    { value: 64, label: "64GB" },
    { value: 128, label: "128GB" },
  ],
  storage: [
    { value: 256, label: "256GB" },
    { value: 512, label: "512GB" },
    { value: 1024, label: "1TB" },
    { value: 2048, label: "2TB" },
    { value: 4096, label: "4TB" },
  ],
  desktopType: [
    { value: "Gaming", label: "Gaming" },
    { value: "Professional", label: "Professional" },
    { value: "Personal", label: "Personal" },
    { value: "Workstation", label: "Workstation" },
  ],
};

export {
  main,
  StockType,
  subCategories,
  manufacture,
  socketTypes,
  cpuCores,
  cpuThreads,
  coolerAttributes,
  gpuAttributes,
  ramAttributes,
  motherboardAttributes,
  storageAttributes,
  casingAttributes,
  keyboardAttributes,
  mouseAttributes,
  monitorAttributes,
  laptopAttributes,
  desktopAttributes,
  InvoiceStatus,
  expansionNetworkAttributes,
  powerAttributes,
};
