// expansionNetworkCategories.js

const expansionNetworkAttributes = {
    componentType: [
      { value: "sound_card", label: "Sound Card" },
      { value: "wired_network_adapter", label: "Wired Network Adapter" },
      { value: "wireless_network_adapter", label: "Wireless Network Adapter" },
    ],
    interfaceType: [
      { value: "pcie_x1", label: "PCIe x1" },
      { value: "pcie_x4", label: "PCIe x4" },
      { value: "usb", label: "USB" },
      { value: "pci", label: "PCI" },
    ],
    soundCardChannels: [
      { value: "2.0", label: "2.0 (Stereo)" },
      { value: "5.1", label: "5.1 Surround" },
      { value: "7.1", label: "7.1 Surround" },
    ],
    wiredNetworkSpeed: [
      { value: "100Mbps", label: "100 Mbps" },
      { value: "1Gbps", label: "1 Gbps" },
      { value: "2.5Gbps", label: "2.5 Gbps" },
      { value: "10Gbps", label: "10 Gbps" },
    ],
    wifiStandard: [
      { value: "WiFi_4", label: "WiFi 4 (802.11n)" },
      { value: "WiFi_5", label: "WiFi 5 (802.11ac)" },
      { value: "WiFi_6", label: "WiFi 6 (802.11ax)" },
      { value: "WiFi_6E", label: "WiFi 6E" },
    ],
  };
  
  const manufactureExpansionNetwork = [
    { value: "creative", label: "Creative" }, // For Sound Cards
    { value: "asus", label: "ASUS" },
    { value: "tp-link", label: "TP-Link" }, // For Network Adapters
    { value: "intel", label: "Intel" },
    { value: "realtek", label: "Realtek" },
    { value: "netgear", label: "Netgear" },
  ];
  
  export { expansionNetworkAttributes, manufactureExpansionNetwork };