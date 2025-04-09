const main = [
  { value: "Necessary", label: "Custom Build Necessary" },
  { value: "Optional", label: "Custom Build Optional" },
  { value: "Common", label: "Individual Category" },
];
const StockType = [
  { value: "InStock", label: "In Stock" },
  { value: "OutStock", label: "Out of Stock" },
  { value: "lowStock", label: "Low Stock" },
];

const subCategories = {
  Necessary: [
    { value: "ram", label: "Ram" },
    { value: "gpu", label: "Graphic Cards" },
    { value: "processors", label: "Processors" },
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
    { value: "expansion_network", label: "Expansion Card & Networking" },
    { value: "gamepad", label: "Gamepad" },
  ],
  Common: [
    { value: "laptop", label: "Laptop" },
    { value: "prebuilds", label: "Prebuilds" },
    { value: "accessories", label: "Steaming Accessories" },
    { value: "externals", label: "External Storage" },
    { value: "cables_connectors", label: "Cables & Connectors" },
  ],
};

const manufacture = {
  processors: [
    { value: "intel", label: "Intel" },
    { value: "amd", label: "AMD" },
  ],
  ram: [
    { value: "corsair", label: "Corsair" },
    { value: "team", label: "Team" },
    { value: "gskill", label: "GSKILL" },
    { value: "hyperx", label: "HyperX" },
    { value: "adata", label: "ADATA" },
  ],
  motherboard: [
    { value: "asus", label: "ASUS" },
    { value: "gigabyte", label: "Gigabyte" },
    { value: "msi", label: "MSI" },
  ],
  vga: [
    { value: "nvidia", label: "NVIDIA" },
    { value: "amd", label: "AMD" },
    { value: "msi", label: "MSI" },
    { value: "zotac", label: "Zotac" },
    { value: "corsair", label: "Corsair" },
    { value: "asus", label: "ASUS" },
  ],
  storage: [
    { value: "samsung", label: "Samsung" },
    { value: "seagate", label: "Seagate" },
    { value: "western_digital", label: "Western Digital" },
    { value: "toshiba", label: "Toshiba" },
    { value: "adata", label: "ADATA" },
    { value: "kingston", label: "Kingston" },
  ],
  casing: [],
  power: [],
  cooling: [
    { value: "noctua", label: "Noctua" },
    { value: "corsair", label: "Corsair" },
    { value: "bequiet", label: "Be Quiet" },
    { value: "arctic", label: "Arctic" },
    { value: "coolerMaster", label: "Cooler Master" },
    { value: "nzxt", label: "NZXT" },
    { value: "adata", label: "Adata" },
    { value: "lian_li", label: "Lian Li" },
    { value: "antec", label: "Antec" },
  ],
  keyboard: [
    { value: "logitech", label: "Logitech" },
    { value: "hyperx", label: "HyperX" },
    { value: "corsair", label: "Corsair" },
    { value: "steelseries", label: "SteelSeries" },
    { value: "razer", label: "Razer" },
    { value: "asus", label: "ASUS" },
  ],
  mouse: [
    { value: "logitech", label: "Logitech" },
    { value: "hyperx", label: "HyperX" },
    { value: "corsair", label: "Corsair" },
    { value: "steelseries", label: "SteelSeries" },
    { value: "razer", label: "Razer" },
    { value: "asus", label: "ASUS" },
  ],
  monitor: [
    { value: "asus", label: "ASUS" },
    { value: "acer", label: "Acer" },
    { value: "dell", label: "Dell" },
    { value: "hp", label: "HP" },
    { value: "lenovo", label: "Lenovo" },
  ],
  ups: [
    { value: "apc", label: "APC" },
    { value: "tripplite", label: "Tripplite" },
    { value: "cyberpowerpc", label: "CyberPowerPC" },
  ],
  expansion_network: [],
  gamepad: [],
  laptop: [
    { value: "dell", label: "Dell" },
    { value: "lenovo", label: "Lenovo" },
    { value: "hp", label: "HP" },
    { value: "asus", label: "ASUS" },
    { value: "acer", label: "Acer" },
    { value: "msi", label: "MSI" },
    { value: "hp", label: "HP" },
    { value: "gigabyte", label: "Gigabyte" },
  ],
  prebuilds: [],
};

const socketTypes = {
  intel: [
    { value: "lga1200", label: "LGA 1200" },
    { value: "lga1151", label: "LGA 1151" },
    { value: "lga2066", label: "LGA 2066" },
    { value: "lga1700", label: "LGA 1700" },
  ],
  amd: [
    { value: "am4", label: "AM4" },
    { value: "tr4", label: "TR4" },
    { value: "am5", label: "AM5" },
    { value: "strx4", label: "sTRX4" },
    { value: "swrx8", label: "sWRX8" },
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

const ramAttributes = {
  type: [
    { value: "ddr3", label: "DDR3" },
    { value: "ddr4", label: "DDR4" },
    { value: "ddr5", label: "DDR5" },
    { value: "lpddr4x", label: "LPDDR4X" },
    { value: "lpddr5", label: "LPDDR5" },
  ],
  speed: [
    { value: 2133, label: "2133 MHz" },
    { value: 2666, label: "2666 MHz" },
    { value: 3000, label: "3000 MHz" },
    { value: 3200, label: "3200 MHz" },
    { value: 3600, label: "3600 MHz" },
    { value: 4000, label: "4000 MHz" },
    { value: 4800, label: "4800 MHz" },
    { value: 5600, label: "5600 MHz" },
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
    { value: "B550", label: "B550" },
    { value: "B650", label: "B650" },
    { value: "B660", label: "B660" },
    { value: "B660M", label: "B660M" },
    { value: "X570", label: "X570" },
    { value: "X670", label: "X670" },
    { value: "X670E", label: "X670E" },
    { value: "X670_PRO", label: "X670 PRO" },
    { value: "Z690", label: "Z690" },
    { value: "Z790", label: "Z790" },
    { value: "H610", label: "H610" },
    { value: "H670", label: "H670" },
  ],
  motherboardSocket: [
    { value: "lga1200", label: "LGA 1200" },
    { value: "lga1151", label: "LGA 1151" },
    { value: "lga2066", label: "LGA 2066" },
    { value: "lga1700", label: "LGA 1700" },
    { value: "am4", label: "AM4" },
    { value: "tr4", label: "TR4" },
    { value: "am5", label: "AM5" },
    { value: "strx4", label: "sTRX4" },
    { value: "swrx8", label: "sWRX8" },
  ],
  formFactor: [
    { value: "atx", label: "ATX" },
    { value: "micro_atx", label: "Micro ATX" },
    { value: "mini_itx", label: "Mini ITX" },
    { value: "e_atx", label: "E-ATX" },
  ],
  ramSlots: [
    { value: "2", label: "2 Slots" },
    { value: "4", label: "4 Slots" },
    { value: "8", label: "8 Slots" },
  ],
  maxRam: [
    { value: "32", label: "32GB" },
    { value: "64", label: "64GB" },
    { value: "128", label: "128GB" },
    { value: "256", label: "256GB" },
  ],
  pcieSlotType: [],
  pcieVersion: [],
  storageType: [],
  expansionSlots: [],
  memoryTypes: [
    { value: "ddr3", label: "DDR3" },
    { value: "ddr4", label: "DDR4" },
    { value: "ddr5", label: "DDR5" },
  ],
};

const storageAttributes = {
  storageTypes: [
    { value: "nvme_m2", label: "NVMe M.2" },
    { value: "sata_ssd", label: "SATA SSD" },
    { value: "hdd", label: "HDD" },
    { value: "m2_sata", label: "M.2 SATA" },
    { value: "sas_hdd", label: "SAS HDD" },
    { value: "pata_hdd", label: "PATA HDD" },
  ],
  storageCapacities: [
    { value: "256", label: "256GB" },
    { value: "512", label: "512GB" },
    { value: "1000", label: "1TB" },
    { value: "2000", label: "2TB" },
    { value: "4000", label: "4TB" },
    { value: "8000", label: "8TB" },
  ],
};

const gpuAttributes = {
  interfaceType: [
    { value: "pcie_x16", label: "PCIe x16" },
    { value: "pcie_x8", label: "PCIe x8" },
    { value: "pcie_4_0", label: "PCIe 4.0" },
    { value: "pcie_5_0", label: "PCIe 5.0" },
    { value: "agp", label: "AGP" },
    { value: "pci", label: "PCI" },
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
    { value: "4", label: "4GB" },
    { value: "8", label: "8GB" },
    { value: "12", label: "12GB" },
    { value: "16", label: "16GB" },
    { value: "24", label: "24GB" },
    { value: "48", label: "48GB" },
  ],
};

const casingAttributes = {
  formFactor: [
    { value: "mid_tower", label: "Mid Tower" },
    { value: "full_tower", label: "Full Tower" },
    { value: "mini_tower", label: "Mini Tower" },
    { value: "cube", label: "Cube" },
    { value: "open_frame", label: "Open Frame" },
  ],
  supportedMotherboardSizes: [
    { value: "atx", label: "ATX" },
    { value: "micro_atx", label: "Micro-ATX" },
    { value: "mini_itx", label: "Mini-ITX" },
    { value: "e_atx", label: "E-ATX" },
    { value: "xl_atx", label: "XL-ATX" },
  ],
};

const keyboardAttributes = {
  manufacturer: [
    { value: "logitech", label: "Logitech" },
    { value: "razer", label: "Razer" },
    { value: "corsair", label: "Corsair" },
    { value: "steelseries", label: "SteelSeries" },
    { value: "coolermaster", label: "Cooler Master" },
  ],
  type: [
    { value: "mechanical", label: "Mechanical" },
    { value: "membrane", label: "Membrane" },
    { value: "hybrid", label: "Hybrid" },
  ],
};

const mouseAttributes = {
  type: [
    { value: "wired", label: "Wired" },
    { value: "wireless", label: "Wireless" },
    { value: "bluetooth", label: "Bluetooth" },
  ],
};

const coolerAttributes = {
  supportedSocket: [
    { value: "lga1200", label: "LGA 1200" },
    { value: "lga1151", label: "LGA 1151" },
    { value: "lga2066", label: "LGA 2066" },
    { value: "lga1700", label: "LGA 1700" },
    { value: "am4", label: "AM4" },
    { value: "tr4", label: "TR4" },
    { value: "am5", label: "AM5" },
    { value: "strx4", label: "sTRX4" },
    { value: "swrx8", label: "sWRX8" },
  ],
  coolerType: [
    { value: "air", label: "Air" },
    { value: "liquid", label: "Liquid" },
  ],
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
    { value: "1920x1080", label: "1920x1080 (Full HD)" },
    { value: "2560x1440", label: "2560x1440 (QHD)" },
    { value: "3840x2160", label: "3840x2160 (4K UHD)" },
    { value: "5120x1440", label: "5120x1440 (Super Ultra-Wide)" },
  ],
  refreshRate: [
    { value: 60, label: "60Hz" },
    { value: 75, label: "75Hz" },
    { value: 120, label: "120Hz" },
    { value: 144, label: "144Hz" },
    { value: 240, label: "240Hz" },
  ],
  panelType: [
    { value: "tn", label: "TN (Twisted Nematic)" },
    { value: "ips", label: "IPS (In-Plane Switching)" },
    { value: "va", label: "VA (Vertical Alignment)" },
    { value: "oled", label: "OLED" },
  ],
  monitorType: [
    { value: "gaming", label: "Gaming" },
    { value: "professional", label: "Professional" },
    { value: "office", label: "Office" },
    { value: "portable", label: "Portable" },
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
  resolution: [
    { value: "1920x1080", label: "1920x1080 (Full HD)" },
    { value: "2560x1600", label: "2560x1600 (WQXGA)" },
    { value: "2880x1800", label: "2880x1800 (2.8K)" },
    { value: "3840x2160", label: "3840x2160 (4K UHD)" },
  ],
  cpu: [
    { value: "intel_core_i3", label: "Intel Core i3" },
    { value: "intel_core_i5", label: "Intel Core i5" },
    { value: "intel_core_i7", label: "Intel Core i7" },
    { value: "intel_core_i9", label: "Intel Core i9" },
    { value: "amd_ryzen_5", label: "AMD Ryzen 5" },
    { value: "amd_ryzen_7", label: "AMD Ryzen 7" },
    { value: "amd_ryzen_9", label: "AMD Ryzen 9" },
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
    { value: "gaming", label: "Gaming" },
    { value: "professional", label: "Professional" },
    { value: "personal", label: "Personal" },
  ],
  graphicsCard: [
    { value: "intel_integrated", label: "Intel Integrated GPU" },
    { value: "amd_integrated", label: "AMD Integrated GPU" },
    { value: "nvidia_rtx_4060", label: "NVIDIA RTX 4060" },
    { value: "nvidia_rtx_4080", label: "NVIDIA RTX 4080" },
    { value: "amd_radeon_rx_7600", label: "AMD Radeon RX 7600" },
  ],
};

const desktopAttributes = {
  cpu: [
    { value: "intel_core_i7_11700f", label: "Intel Core i7-11700F" },
    { value: "intel_core_i5_13400", label: "Intel Core i5-13400" },
    { value: "intel_core_i9_13900k", label: "Intel Core i9-13900K" },
    { value: "amd_ryzen_5_7600x", label: "AMD Ryzen 5 7600X" },
    { value: "amd_ryzen_7_7800x3d", label: "AMD Ryzen 7 7800X3D" },
    { value: "amd_ryzen_9_7950x", label: "AMD Ryzen 9 7950X" },
  ],
  gpu: [
    { value: "nvidia_geforce_rtx_3080", label: "NVIDIA GeForce RTX 3080" },
    { value: "nvidia_geforce_rtx_4070", label: "NVIDIA GeForce RTX 4070" },
    { value: "nvidia_geforce_rtx_4090", label: "NVIDIA GeForce RTX 4090" },
    { value: "amd_radeon_rx_6800", label: "AMD Radeon RX 6800" },
    { value: "amd_radeon_rx_7900_xt", label: "AMD Radeon RX 7900 XT" },
    { value: "intel_arc_a770", label: "Intel Arc A770" },
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
    { value: "gaming", label: "Gaming" },
    { value: "professional", label: "Professional" },
    { value: "personal", label: "Personal" },
    { value: "workstation", label: "Workstation" },
  ],
};

// const allSubCategoryOptions = Object.values(subCategories).flatMap(options => options);

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
};
