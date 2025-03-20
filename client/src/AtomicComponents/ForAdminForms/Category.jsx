const main = [
    { value: "Necessary", label: "Custom Build Necessary" },
    { value: "Optional", label: "Custom Build Optional" },
    { value: "Common", label: "Individual Category" }
]

const subCategories = {
    Necessary: [
        { value: "ram", label: "Ram" },
        { value: "vga", label: "Graphic Cards" },
        { value: "processors", label: "Processors" },
        { value: "motherboard", label: "Motherboard" },
        { value: "storage", label: "Storages" },
        { value: "casing", label: "Casing" },
        { value: "power", label: "Power Supply" }
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

    ]
};

const manufacture = {
    processors: [
        { value: "intel", label: "Intel" },
        { value: "amd", label: "AMD" }
    ],
    cooling: [
        { value: "noctua", label: "Noctua" },
        { value: "corsair", label: "Corsair" },
        { value: "bequiet", label: "Be Quiet" },
        { value: "arctic", label: "Arctic" },
        { value: "coolerMaster", label: "Cooler Master" },
        { value: "nzxt", label: "NZXT" }
    ]
}

const socketTypes = {
    intel: [
        { value: "lga1200", label: "LGA 1200" },
        { value: "lga1151", label: "LGA 1151" },
        { value: "lga2066", label: "LGA 2066" },
        { value: "lga1700", label: "LGA 1700" }
    ],
    amd: [
        { value: "am4", label: "AM4" },
        { value: "tr4", label: "TR4" },
        { value: "am5", label: "AM5" },
        { value: "strx4", label: "sTRX4" },
        { value: "swrx8", label: "sWRX8" }
    ]
}
const supportedSocket = [
    { value: "lga1200", label: "LGA 1200" },
    { value: "lga1151", label: "LGA 1151" },
    { value: "lga2066", label: "LGA 2066" },
    { value: "lga1700", label: "LGA 1700" },
    { value: "am4", label: "AM4" },
    { value: "tr4", label: "TR4" },
    { value: "am5", label: "AM5" },
    { value: "strx4", label: "sTRX4" },
    { value: "swrx8", label: "sWRX8" }
]

const coolerType = [
    { value: "air", label: "Air" },
    { value: "liquid", label: "Liquid" }
]

export { main, subCategories, manufacture, socketTypes, supportedSocket, coolerType };
