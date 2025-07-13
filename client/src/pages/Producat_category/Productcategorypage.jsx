import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Filteringsystem from './Products/Filteringsystem';
import Product_item_grid from './Products/Product_item_grid';
import Categoryposter from './Products/Categoryposter';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';

// GPU-specific options
const GPU_VRAM_OPTIONS = [
    { display: '4 GB', value: 4 },
    { display: '6 GB', value: 6 },
    { display: '8 GB', value: 8 },
    { display: '12 GB', value: 12 },
    { display: '16 GB', value: 16 },
    { display: '20 GB', value: 20 },
    { display: '24 GB', value: 24 },
];

const GPU_PCI_OPTIONS = [
    { display: 'PCI-X4', value: 'pcie_4_0_x16' },
    { display: 'PCI-X5', value: 'pcie_5_0_x16' },
    { display: 'PCI-X6', value: 'pcie_5_0_x8' },
    { display: 'PCI-X8', value: 'pcie_5_0_x12' },
    { display: 'PCI-X16', value: 'pcie_5_0_x32' },
];

// RAM-specific options
const RAM_MEMORY_CAPACITY_OPTIONS = [
    { display: '4 GB', value: 4 },
    { display: '8 GB', value: 8 },
    { display: '16 GB', value: 16 },
    { display: '32 GB', value: 32 },
    { display: '64 GB', value: 64 },
];

const RAM_MEMORY_TYPE_OPTIONS = [
    { display: 'DDR3', value: 'ddr3' },
    { display: 'DDR4', value: 'ddr4' },
    { display: 'DDR5', value: 'ddr5' },
];

// Processor-specific options
const PROCESSOR_CORE_COUNT_OPTIONS = [
    { display: '4 Cores', value: 4 },
    { display: '6 Cores', value: 6 },
    { display: '8 Cores', value: 8 },
    { display: '12 Cores', value: 12 },
    { display: '16 Cores', value: 16 },
];

const PROCESSOR_THREAD_COUNT_OPTIONS = [
    { display: '4 Threads', value: 4 },
    { display: '8 Threads', value: 8 },
    { display: '12 Threads', value: 12 },
    { display: '16 Threads', value: 16 },
    { display: '24 Threads', value: 24 },
    { display: '32 Threads', value: 32 },
];

const PROCESSOR_SOCKET_TYPE_OPTIONS = [
    { display: 'LGA 1700', value: 'Lga1700' },
    { display: 'LGA 1200', value: 'Lga1200' },
    { display: 'AM4', value: 'am4' },
    { display: 'AM5', value: 'am5' },
];

// Motherboard-specific options
const MOTHERBOARD_CHIPSET_OPTIONS = [
    { display: 'B550', value: 'B550' },
    { display: 'B650', value: 'B650' },
    { display: 'X570', value: 'X570' },
    { display: 'Z690', value: 'Z690' },
    { display: 'Z790', value: 'Z790' },
    { display: 'Z890', value: 'Z890' },
    { display: 'H610', value: 'H610' },
];

// Power-specific options
const POWER_WATTAGE_OPTIONS = [
    { display: '500W', value: 500 },
    { display: '550W', value: 550 },
    { display: '650W', value: 650 },
    { display: '750W', value: 750 },
    { display: '850W', value: 850 },
    { display: '1000W', value: 1000 },
];

// Power efficiency ratings
const POWER_EFFICIENCY_RATINGS = [
    { display: '80+ White', value: '80_plus_white' },
    { display: '80+ Bronze', value: '80_plus_bronze' },
    { display: '80+ Silver', value: '80_plus_silver' },
    { display: '80+ Gold', value: '80_plus_gold' },
    { display: '80+ Platinum', value: '80_plus_platinum' },
    { display: '80+ Titanium', value: '80_plus_titanium' },
];



// Storage-specific options
const STORAGE_CAPACITY_OPTIONS = [
  { display: '128 GB', value: 128 },
  { display: '256 GB', value: 256 },
  { display: '512 GB', value: 512 },
  { display: '1 TB', value: 1000 },
  { display: '2 TB', value: 2000 },
];


// Storage type options
const STORAGE_TYPE_OPTIONS = [
  { display: 'HDD', value: 'sata_hdd' },
  { display: 'SSD', value: 'sata_ssd' },
  { display: 'NVME', value: 'nvme_m2' },
];


const MOTHERBOARD_SIZE_OPTIONS = [
  { display: 'ATX', value: 'atx' },
  { display: 'Micro-ATX', value: 'Micro_ATX' },
  { display: 'Mini-ITX', value: 'Mini_ITX' },
  { display: 'E-ATX', value: 'e_atx' },
];

const CASING_MAX_GPU_LENGTH_OPTIONS = [
  { display: '140 mm', value: 140 },
  { display: '320 mm', value: 320 },
  { display: '390 mm', value: 390 },
  { display: '410 mm', value: 410 },
  { display: '420 mm', value: 420 },
];

const LAPTOP_RAM_OPTIONS = [
  { display: '4 GB', value: 4 },
  { display: '8 GB', value: 8 },
  { display: '16 GB', value: 16 },
  { display: '32 GB', value: 32 },
  { display: '64 GB', value: 64 },
];


const LAPTOP_GRAPHIC_CARD_OPTIONS = [
  { display: 'INTEL Integrated', value: 'Intel_integrated' },
  { display: 'AMD Integrated', value: 'amd_integrated' },
{ display: 'NVIDIA RTX 3050', value: 'Nvidia_RTX_3050' },
  { display: 'NVIDIA RTX 3070', value: 'Nvidia_RTX_3070' },
  { display: 'NVIDIA RTX 4060', value: 'nvidia_rtx_4060' },
  { display: 'NVIDIA RTX 4080', value: 'nvidia_rtx_4080' },
  { display: 'AMD RX 7600', value: 'AMD_Radeon_rx_7600' },
];

const LAPTOP_STORAGE_OPTIONS = [
  { display: '256 GB SSD', value: 256 },
  { display: '512 GB SSD', value: 512 },
  { display: '1 TB HDD', value: 1024 },
  { display: '2 TB HDD', value: 2048 },
];


const PREBUILD_RAM_SIZE_OPTIONS = [
  { display: '8 GB', value: 8 },
  { display: '16 GB', value: 16 },
  { display: '32 GB', value: 32 },
  { display: '64 GB', value: 64 },
];

const EXPANSION_COMPONENT_TYPE_OPTIONS = [
  { display: 'Wi-Fi Card', value: 'wireless_network_adapter' },
  { display: 'Bluetooth Adapter', value: 'bluetooth_adapter' },
  { display: 'Ethernet Card', value: 'wired_network_adapter' },
  { display: 'Sound Card', value: 'sound_card' },
];


const MONITOR_DISPLAY_SIZE_OPTIONS = [
  { display: '21.5"', value: '21.5' },
  { display: '24"', value: '24' },
  { display: '27"', value: '27' },
  { display: '32"', value: '32' },
];

const MONITOR_PANEL_TYPE_OPTIONS = [
  { display: 'IPS', value: 'ips' },
  { display: 'VA', value: 'va' },
  { display: 'TN', value: 'tn' },
  { display: 'OLED', value: 'oled' },
];

const MONITOR_REFRESH_RATE_OPTIONS = [
  { display: '60 Hz', value: 60 },
  { display: '75 Hz', value: 75 },
  { display: '120 Hz', value: 120 },
  { display: '144 Hz', value: 144 },
  { display: '165 Hz', value: 165 },
  { display: '240 Hz', value: 240 },
];






















export default function Productcategorypage() {
    const { categoryName } = useParams();

    const [filters, setFilters] = useState({
        manufacturers: [],
        priceRange: { min: '', max: '' },
        vrams: [],
        memoryCapacities: [],
        memoryTypes: [],
        interfaceTypes: [],
        coreCounts: [],
        threadCounts: [],
        socketTypes: [],
        motherboardChipsets: [],
        wattages: [],
        efficiencyRatings: [],
        storageCapacities: [],
        storageTypes: [],
        supportedMotherboardSizes: [],
        maxGpuLengths: [],
        rams: [],
        graphicCards: [],
        storages: [],
        ramSizes: [],
         componentTypes: [],

        displaySizes: [],       
        panelTypes: [],         
        refreshRates: [],   






    });

    const [availableManufacturersForFilter, setAvailableManufacturersForFilter] = useState([]);
    const [availablePrebuildRamSizes, setAvailablePrebuildRamSizes] = useState([]);
    const [availableLaptopGraphicCards, setAvailableLaptopGraphicCards] = useState([]);
    const [availableMotherboardChipsets, setAvailableMotherboardChipsets] = useState([]);
    const [availablePowerWattages, setAvailablePowerWattages] = useState([]);
    const [availablePowerEfficiencyRatings, setAvailablePowerEfficiencyRatings] = useState([]);
    const [availableStorageCapacities, setAvailableStorageCapacities] = useState([]);
    const [availableStorageTypes, setAvailableStorageTypes] = useState([]);
    const [availableMaxGpuLengths, setAvailableMaxGpuLengths] = useState([]);
    const [availableMonitorDisplaySizes, setAvailableMonitorDisplaySizes] = useState([]);
    const [availableMonitorPanelTypes, setAvailableMonitorPanelTypes] = useState([]);
    const [availableMonitorRefreshRates, setAvailableMonitorRefreshRates] = useState([]);
    const [availableExpansionComponentTypes, setAvailableExpansionComponentTypes] = useState([]);

    const fetchCategoryManufacturers = async (category) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/product/manufacturers?category=${category}`);
            setAvailableManufacturersForFilter(response.data);
        } catch (error) {
            console.error('Error fetching manufacturers:', error);
            setAvailableManufacturersForFilter([]);
        }
    };

    const fetchPrebuildRamSizes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/prebuild-ram-sizes');
            setAvailablePrebuildRamSizes(response.data);
        } catch (error) {
            console.error('Error fetching prebuild RAM sizes:', error);
            setAvailablePrebuildRamSizes([]);
        }
    };

    const fetchLaptopGraphicCards = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/laptop-graphic-cards');
            setAvailableLaptopGraphicCards(response.data);
        } catch (error) {
            console.error('Error fetching laptop graphic cards:', error);
            setAvailableLaptopGraphicCards([]);
        }
    };

    const fetchMotherboardChipsets = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/motherboard-chipsets');
            setAvailableMotherboardChipsets(response.data);
        } catch (error) {
            console.error('Error fetching motherboard chipsets:', error);
            setAvailableMotherboardChipsets([]);
        }
    };

    const fetchPowerWattages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/power-wattages');
            setAvailablePowerWattages(response.data);
        } catch (error) {
            console.error('Error fetching power wattages:', error);
            setAvailablePowerWattages([]);
        }
    };

    const fetchPowerEfficiencyRatings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/power-efficiency-ratings');
            setAvailablePowerEfficiencyRatings(response.data);
        } catch (error) {
            console.error('Error fetching power efficiency ratings:', error);
            setAvailablePowerEfficiencyRatings([]);
        }
    };

    const fetchStorageCapacities = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/storage-capacities');
            setAvailableStorageCapacities(response.data);
        } catch (error) {
            console.error('Error fetching storage capacities:', error);
            setAvailableStorageCapacities([]);
        }
    };

    const fetchStorageTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/storage-types');
            setAvailableStorageTypes(response.data);
        } catch (error) {
            console.error('Error fetching storage types:', error);
            setAvailableStorageTypes([]);
        }
    };

    const fetchMaxGpuLengths = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/max-gpu-lengths');
            setAvailableMaxGpuLengths(response.data);
        } catch (error) {
            console.error('Error fetching max GPU lengths:', error);
            setAvailableMaxGpuLengths([]);
        }
    };

    const fetchMonitorDisplaySizes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/monitor-display-sizes');
            setAvailableMonitorDisplaySizes(response.data);
        } catch (error) {
            console.error('Error fetching monitor display sizes:', error);
            setAvailableMonitorDisplaySizes([]);
        }
    };

    const fetchMonitorPanelTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/monitor-panel-types');
            setAvailableMonitorPanelTypes(response.data);
        } catch (error) {
            console.error('Error fetching monitor panel types:', error);
            setAvailableMonitorPanelTypes([]);
        }
    };

    const fetchMonitorRefreshRates = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/monitor-refresh-rates');
            setAvailableMonitorRefreshRates(response.data);
        } catch (error) {
            console.error('Error fetching monitor refresh rates:', error);
            setAvailableMonitorRefreshRates([]);
        }
    };

    const fetchExpansionComponentTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/product/expansion-component-types');
            setAvailableExpansionComponentTypes(response.data);
        } catch (error) {
            console.error('Error fetching expansion component types:', error);
            setAvailableExpansionComponentTypes([]);
        }
    };

    const handleFilterChange = (changedFilters) => {
        console.log("Filters changed in Parent:", changedFilters);
        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };

            if (changedFilters.manufacturers !== undefined) {
                updatedFilters.manufacturers = changedFilters.manufacturers.map(displayName => {
                    const manu = availableManufacturersForFilter.find(m => m.display === displayName);
                    return manu ? manu.value : displayName;
                });
            }

            if (changedFilters.priceRange) {
                updatedFilters.priceRange = {
                    min: changedFilters.priceRange.min !== undefined ? changedFilters.priceRange.min : prevFilters.priceRange.min,
                    max: changedFilters.priceRange.max !== undefined ? changedFilters.priceRange.max : prevFilters.priceRange.max,
                };
            }

            if (changedFilters.vrams !== undefined) {
                updatedFilters.vrams = changedFilters.vrams;
            }

            if (changedFilters.memoryCapacities !== undefined) {
                updatedFilters.memoryCapacities = changedFilters.memoryCapacities;
            }

            if (changedFilters.memoryTypes !== undefined) {
                updatedFilters.memoryTypes = changedFilters.memoryTypes;
            }

            if (changedFilters.interfaceTypes !== undefined) {
                updatedFilters.interfaceTypes = changedFilters.interfaceTypes;
            }

            if (changedFilters.coreCounts !== undefined) {
                updatedFilters.coreCounts = changedFilters.coreCounts;
            }

            if (changedFilters.threadCounts !== undefined) {
                updatedFilters.threadCounts = changedFilters.threadCounts;
            }

            if (changedFilters.socketTypes !== undefined) {
                updatedFilters.socketTypes = changedFilters.socketTypes;
            }

            if (changedFilters.motherboardChipsets !== undefined) {
                updatedFilters.motherboardChipsets = changedFilters.motherboardChipsets;
            }
            if (changedFilters.wattages !== undefined) {
                    updatedFilters.wattages = changedFilters.wattages;
            }

            if (changedFilters.efficiencyRatings !== undefined) {
              updatedFilters.efficiencyRatings =
                changedFilters.efficiencyRatings;
            }
            
            if (changedFilters.storageCapacities !== undefined) {
                updatedFilters.storageCapacities = changedFilters.storageCapacities;
            }


            if (changedFilters.storageTypes !== undefined) {
                updatedFilters.storageTypes = changedFilters.storageTypes;
            }


            if (changedFilters.supportedMotherboardSizes !== undefined) {
                  updatedFilters.supportedMotherboardSizes = changedFilters.supportedMotherboardSizes;
            }

            if (changedFilters.maxGpuLengths !== undefined) {
                    updatedFilters.maxGpuLengths = changedFilters.maxGpuLengths;
            }


            if (changedFilters.rams !== undefined) {
                    updatedFilters.rams = changedFilters.rams;
            }



            if (changedFilters.graphicCards !== undefined) {
                    updatedFilters.graphicCards = changedFilters.graphicCards;
            }

            if (changedFilters.storages !== undefined) {
            updatedFilters.storages = changedFilters.storages;
            }

            if (changedFilters.ramSizes !== undefined) {
                    updatedFilters.ramSizes = changedFilters.ramSizes;
            }



            if (changedFilters.componentTypes !== undefined) {
                updatedFilters.componentTypes = changedFilters.componentTypes;
                }

                if (changedFilters.displaySizes !== undefined) {
                updatedFilters.displaySizes = changedFilters.displaySizes;
                }

                if (changedFilters.panelTypes !== undefined) {
                updatedFilters.panelTypes = changedFilters.panelTypes;
                }

                if (changedFilters.refreshRates !== undefined) {
                updatedFilters.refreshRates = changedFilters.refreshRates;
                }








            
            

















            console.log("Updated filters state with backend values:", updatedFilters);
            return updatedFilters;
        });
    };

    useEffect(() => {
        const newFilters = {
          manufacturers: [],
          priceRange: { min: "", max: "" },
          vrams: [],
          memoryCapacities: [],
          memoryTypes: [],
          interfaceTypes: [],
          coreCounts: [],
          threadCounts: [],
          socketTypes: [],
          motherboardChipsets: [],
          wattages: [],
          efficiencyRatings: [],
          storageCapacities: [],
          storageTypes: [],
          supportedMotherboardSizes: [],
          maxGpuLengths: [],
          rams: [],
          graphicCards: [],
          storages: [],
          ramSizes: [],
           componentTypes: [],
        displaySizes: [],       
        panelTypes: [],         
        refreshRates: [], 



        };
        setFilters(newFilters);

        if (categoryName) {
            fetchCategoryManufacturers(categoryName);
            if (categoryName === 'prebuild') {
                fetchPrebuildRamSizes();
                setAvailableLaptopGraphicCards([]);
                setAvailableMotherboardChipsets([]);
                setAvailablePowerWattages([]);
                setAvailablePowerEfficiencyRatings([]);
                setAvailableStorageCapacities([]);
                setAvailableStorageTypes([]);
                setAvailableMaxGpuLengths([]);
            } else if (categoryName === 'laptop') {
                fetchLaptopGraphicCards();
                setAvailablePrebuildRamSizes([]);
                setAvailableMotherboardChipsets([]);
                setAvailablePowerWattages([]);
                setAvailablePowerEfficiencyRatings([]);
                setAvailableStorageCapacities([]);
                setAvailableStorageTypes([]);
                setAvailableMaxGpuLengths([]);
            } else if (categoryName === 'motherboard') {
                fetchMotherboardChipsets();
                setAvailablePrebuildRamSizes([]);
                setAvailableLaptopGraphicCards([]);
                setAvailablePowerWattages([]);
                setAvailablePowerEfficiencyRatings([]);
                setAvailableStorageCapacities([]);
                setAvailableStorageTypes([]);
                setAvailableMaxGpuLengths([]);
            } else if (categoryName === 'power') {
                fetchPowerWattages();
                fetchPowerEfficiencyRatings();
                setAvailablePrebuildRamSizes([]);
                setAvailableLaptopGraphicCards([]);
                setAvailableMotherboardChipsets([]);
                setAvailableStorageCapacities([]);
                setAvailableStorageTypes([]);
                setAvailableMaxGpuLengths([]);
            } else if (categoryName === 'storage') {
                fetchStorageCapacities();
                fetchStorageTypes();
                setAvailablePrebuildRamSizes([]);
                setAvailableLaptopGraphicCards([]);
                setAvailableMotherboardChipsets([]);
                setAvailablePowerWattages([]);
                setAvailablePowerEfficiencyRatings([]);
                setAvailableMaxGpuLengths([]);
            } else if (categoryName === 'casing') {
                fetchMaxGpuLengths();
                setAvailablePrebuildRamSizes([]);
                setAvailableLaptopGraphicCards([]);
                setAvailableMotherboardChipsets([]);
                setAvailablePowerWattages([]);
                setAvailablePowerEfficiencyRatings([]);
                setAvailableStorageCapacities([]);
                setAvailableStorageTypes([]);
            } else if (categoryName === 'monitor') {
                fetchMonitorDisplaySizes();
                fetchMonitorPanelTypes();
                fetchMonitorRefreshRates();
                setAvailablePrebuildRamSizes([]);
                setAvailableLaptopGraphicCards([]);
                setAvailableMotherboardChipsets([]);
                setAvailablePowerWattages([]);
                setAvailablePowerEfficiencyRatings([]);
                setAvailableStorageCapacities([]);
                setAvailableStorageTypes([]);
                setAvailableMaxGpuLengths([]);
            } else if (categoryName === 'expansion_network') {
                fetchExpansionComponentTypes();
                setAvailablePrebuildRamSizes([]);
                setAvailableLaptopGraphicCards([]);
                setAvailableMotherboardChipsets([]);
                setAvailablePowerWattages([]);
                setAvailablePowerEfficiencyRatings([]);
                setAvailableStorageCapacities([]);
                setAvailableStorageTypes([]);
                setAvailableMaxGpuLengths([]);
                setAvailableMonitorDisplaySizes([]);
                setAvailableMonitorPanelTypes([]);
                setAvailableMonitorRefreshRates([]);
            } else {
                setAvailablePrebuildRamSizes([]);
                setAvailableLaptopGraphicCards([]);
                setAvailableMotherboardChipsets([]);
                setAvailablePowerWattages([]);
                setAvailablePowerEfficiencyRatings([]);
                setAvailableStorageCapacities([]);
                setAvailableStorageTypes([]);
                setAvailableMaxGpuLengths([]);
                setAvailableMonitorDisplaySizes([]);
                setAvailableMonitorPanelTypes([]);
                setAvailableMonitorRefreshRates([]);
                setAvailableExpansionComponentTypes([]);
            }
        } else {
            setAvailableManufacturersForFilter([]);
            setAvailablePrebuildRamSizes([]);
            setAvailableLaptopGraphicCards([]);
            setAvailableMotherboardChipsets([]);
            setAvailablePowerWattages([]);
            setAvailablePowerEfficiencyRatings([]);
            setAvailableStorageCapacities([]);
            setAvailableStorageTypes([]);
            setAvailableMaxGpuLengths([]);
            setAvailableMonitorDisplaySizes([]);
            setAvailableMonitorPanelTypes([]);
            setAvailableMonitorRefreshRates([]);
            setAvailableExpansionComponentTypes([]);
        }
    }, [categoryName]);

    const selectedDisplayManufacturers = filters.manufacturers.map(value => {
        const manu = availableManufacturersForFilter.find(m => m.value === value);
        return manu ? manu.display : value;
    });

    return (
        <div>
            <Navbar />
            <Categoryposter />
            <div className="flex  lg:flex-row gap-14">
                <div>
                    <Filteringsystem
                        categoryName={categoryName}
                        onFilterChange={handleFilterChange}
                        availableManufacturersData={availableManufacturersForFilter}
                        initialSelectedDisplayManufacturers={selectedDisplayManufacturers}
                        initialPriceRange={filters.priceRange}

                        // GPU-specific
                        availableVramsData={categoryName === 'gpu' ? GPU_VRAM_OPTIONS : []}
                        initialSelectedVrams={filters.vrams}
                        availableinterfaceTypesData={categoryName === 'gpu' ? GPU_PCI_OPTIONS : []}
                        initialSelectedinterfaceTypes={filters.interfaceTypes}

                        // RAM-specific
                        availableMemoryCapacitiesData={categoryName === 'ram' ? RAM_MEMORY_CAPACITY_OPTIONS : []}
                        initialSelectedMemoryCapacities={filters.memoryCapacities}
                        availableMemoryTypesData={categoryName === 'ram' ? RAM_MEMORY_TYPE_OPTIONS : []}
                        initialSelectedMemoryTypes={filters.memoryTypes}

                        // Processor-specific
                        availableCoreCountsData={categoryName === 'processor' ? PROCESSOR_CORE_COUNT_OPTIONS : []}
                        initialSelectedCoreCounts={filters.coreCounts}
                        availableThreadCountsData={categoryName === 'processor' ? PROCESSOR_THREAD_COUNT_OPTIONS : []}
                        initialSelectedThreadCounts={filters.threadCounts}


                        // availableSocketTypesData={categoryName === 'processor' ? PROCESSOR_SOCKET_TYPE_OPTIONS : []}
                        // initialSelectedSocketTypes={filters.socketTypes}
                        

                        //sockettype for both processor and motherboard
                        availableSocketTypesData={(categoryName === 'processor' || categoryName === 'motherboard') ? PROCESSOR_SOCKET_TYPE_OPTIONS : []}
                        initialSelectedSocketTypes={filters.socketTypes}

                        // Motherboard-specific
                        availableMotherboardChipsetsData={categoryName === 'motherboard' ? availableMotherboardChipsets : []}
                        initialSelectedMotherboardChipsets={filters.motherboardChipsets}

                        // Power-specific
                        availableWattageData={categoryName === 'power' ? availablePowerWattages : []}
                        initialSelectedWattages={filters.wattages}

                        availableEfficiencyRatingsData={categoryName === 'power' ? availablePowerEfficiencyRatings : []}
                        initialSelectedEfficiencyRatings={filters.efficiencyRatings}


                        // Storage-specific
                        availableStorageCapacitiesData={categoryName === 'storage' ? availableStorageCapacities : []}
                        initialSelectedStorageCapacities={filters.storageCapacities}


                        availableStorageTypesData={categoryName === 'storage' ? availableStorageTypes : []}
                        initialSelectedStorageTypes={filters.storageTypes}


                        //Casing specific
                        availableMotherboardSizesData={categoryName === 'casing' ? MOTHERBOARD_SIZE_OPTIONS : []}
                        initialSelectedMotherboardSizes={filters.supportedMotherboardSizes}
                        
                        availableMaxGpuLengthData={categoryName === 'casing' ? availableMaxGpuLengths : []}
                        initialSelectedMaxGpuLength={filters.maxGpuLengths}



                        //laptop specific
                        availableRamData={categoryName === 'laptop' ? LAPTOP_RAM_OPTIONS : []}
                        initialSelectedRam={filters.rams}

                        availableGraphicCardData={categoryName === 'laptop' ? availableLaptopGraphicCards : []}
                        initialSelectedGraphicCard={filters.graphicCards}


                        availableStorageData={(categoryName === 'laptop' || categoryName === 'prebuild') ? LAPTOP_STORAGE_OPTIONS : []}
                        initialSelectedStorage={filters.storages}              

                        
                        

                        
                        // Prebuild-specific
                        availableRamSizesData={categoryName === 'prebuild' ? availablePrebuildRamSizes : []}
                        initialSelectedRamSizes={filters.ramSizes}




                        // Expansion / Network-specific
                        availableComponentTypesData={categoryName === 'expansion_network' ? availableExpansionComponentTypes : []}
                        initialSelectedComponentTypes={filters.componentTypes}


                        // Monitor-specific
                        availableDisplaySizesData={categoryName === 'monitor' ? availableMonitorDisplaySizes : []}
                        initialSelectedDisplaySizes={filters.displaySizes}
                        availablePanelTypesData={categoryName === 'monitor' ? availableMonitorPanelTypes : []}
                        initialSelectedPanelTypes={filters.panelTypes}
                        availableRefreshRatesData={categoryName === 'monitor' ? availableMonitorRefreshRates : []}
                        initialSelectedRefreshRates={filters.refreshRates}


                    />



                </div>



                
                <div className="lg:w-3/4 xl:w-4/5">
                    <Product_item_grid categoryName={categoryName} currentFilters={filters} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
