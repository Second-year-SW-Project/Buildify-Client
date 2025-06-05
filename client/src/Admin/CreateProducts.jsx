import React, { useState, useEffect, useRef } from 'react';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import { Typography } from '@mui/material';
import theme from '../AtomicComponents/theme';
import { InputField } from '../AtomicComponents/Inputs/Input';
import ImageSelector from '../MoleculesComponents/Admin_components/ImageSelector';
import { Required } from '../AtomicComponents/Typographics/TextStyles';
import FullScreenLoader from '../AtomicComponents/FullScreenLoader';
import {
    main,
    manufacture,
    socketTypes,
    subCategories,
    coolerAttributes,
    cpuCores,
    cpuThreads,
    gpuAttributes,
    ramAttributes,
    motherboardAttributes,
    storageAttributes,
    casingAttributes,
    mouseAttributes,
    keyboardAttributes,
    monitorAttributes,
    laptopAttributes,
    desktopAttributes,
    expansionNetworkAttributes,
    powerAttributes,
} from '../AtomicComponents/ForAdminForms/Category';
import { PrimaryButton } from '../AtomicComponents/Buttons/Buttons';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';

const CreateProducts = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { id } = useParams(); //Get the product ID from the URL parameters
    const isEditMode = !!id; //Check if the ID exists to determine if it's edit mode
    const navigate = useNavigate(); //Get the navigation function

    //Set up a ref for the image selector component
    const imageSelectorRef = useRef();

    //Set up state for form submission
    const [formValidation, setformValidation] = useState(false);

    //Set initial state for selected categories and options
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedManufacture, setSelectedManufacture] = useState('');
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [manufactureOptions, setManufactureOptions] = useState([]);
    const [socketTypeOptions, setSocketTypeOptions] = useState([]);

    //Set loading state for the form submission
    const [loading, setLoading] = useState(false);

    const handleMainCategoryChange = (value) => {
        setSelectedMainCategory(value);
        setSubCategoryOptions(subCategories[value] || []);
        setSelectedSubCategory('');
        setManufactureOptions([]);
        setProduct((prev) => ({ ...prev, quantity: '' }));
    };

    const handleSubCategoryChange = (value) => {
        setSelectedSubCategory(value);
        setManufactureOptions(manufacture[value] || []);
        setSelectedManufacture('');
        setProduct((prev) => ({ ...prev, quantity: '' }));
    };

    const handleManufactureChange = (value) => {
        setSelectedManufacture(value);
        setSocketTypeOptions(socketTypes[value] || []);
        setProduct((prev) => ({ ...prev, socketType: '' }));
    };

    //coolerAttributes
    const coolerSupportedSockets = coolerAttributes.supportedSocket;
    const coolerTypes = coolerAttributes.coolerType;
    const coolerMaxTdp = coolerAttributes.maxTdp;
    //ramAttributes
    const ramTypeOptions = ramAttributes.type;
    const ramSpeedOptions = ramAttributes.speed;
    const ramSizeOptions = ramAttributes.size;
    //motherboardAttributes
    const motherboardChipsets = motherboardAttributes.chipsets;
    const motherboardSocket = motherboardAttributes.motherboardSocket;
    const motherboardFormFactors = motherboardAttributes.formFactor;
    const motherboardRamSlots = motherboardAttributes.ramSlots;
    const motherboardMaxRam = motherboardAttributes.maxRam;
    const motherboardMemoryTypes = motherboardAttributes.memoryTypes;
    const motherboardPcieSlotType = motherboardAttributes.pcieSlotType;
    const motherboardPcieVersion = motherboardAttributes.pcieVersion;
    const motherboardStorageTypes = motherboardAttributes.storageType;
    //gpuAttributes
    const gpuInterfaceTypes = gpuAttributes.interfaceType;
    const gpuPowerConnectors = gpuAttributes.powerConnectors;
    const gpuVramOptions = gpuAttributes.gpuVram;
    const gpuSeriesOptions = gpuAttributes.gpuSeries;
    const gpuChipsetOptions = gpuAttributes.gpuChipset;
    const gpuCores = gpuAttributes.gpuCores;
    //storageAttributes
    const storageTypes = storageAttributes.storageTypes;
    const storageCapacities = storageAttributes.storageCapacities;
    //casingAttributes
    const casingFormFactors = casingAttributes.formFactor;
    const casingSupportedMotherboardSizes = casingAttributes.supportedMotherboardSizes;
    //keyboardAttributes
    const keyboardTypeOptions = keyboardAttributes.type;
    const keyboardConnectivityOptions = keyboardAttributes.connectivity;
    //mouseAttributes
    const mouseConnectivityOptions = mouseAttributes.connectivity;
    //monitorAttributes
    const displaySizeOptions = monitorAttributes.displaySize;
    const resolutionOptions = monitorAttributes.resolution;
    const refreshRateOptions = monitorAttributes.refreshRate;
    const panelTypeOptions = monitorAttributes.panelType;
    const monitorTypeOptions = monitorAttributes.monitorType;
    //laptopAttributes
    const laptopDisplaySizeOptions = laptopAttributes.displaySize;
    const laptopRefreshRateOptions = laptopAttributes.refreshRate;
    const laptopCpuOptions = laptopAttributes.cpu;
    const laptopRamOptions = laptopAttributes.ram;
    const laptopStorageOptions = laptopAttributes.storage;
    const laptopTypeOptions = laptopAttributes.laptopType;
    const laptopGraphicCardOptions = laptopAttributes.graphicCard;
    //desktopAttributes
    const desktopCpuOptions = desktopAttributes.cpu;
    const desktopGpuOptions = desktopAttributes.gpu;
    const desktopRamOptions = desktopAttributes.ram;
    const desktopStorageOptions = desktopAttributes.storage;
    const desktopTypeOptions = desktopAttributes.desktopType;
    //expansionNetworkAttributes
    const expansionComponentTypes = expansionNetworkAttributes.componentType;
    const expansionInterfaceTypes = expansionNetworkAttributes.interfaceType;
    const soundCardChannels = expansionNetworkAttributes.soundCardChannels;
    const wiredNetworkSpeeds = expansionNetworkAttributes.wiredNetworkSpeed;
    const wifiStandards = expansionNetworkAttributes.wifiStandard;
    //power supply attributes
    const powerWattageOptions = powerAttributes.wattage;
    const powerEfficiencyOptions = powerAttributes.efficiencyRating;
    const powerModularTypeOptions = powerAttributes.modularType;

    const initialProductState = {
        type: '',
        name: '',
        description: '',
        imgUrls: [],
        manufacturer: '',
        quantity: '',
        price: '',
        // CPU (for processors and prebuilds)
        socketType: '',
        coreCount: '',
        threadCount: '',
        baseClock: '',
        boostClock: '',
        integratedGraphics: false,
        includesCooler: false,
        tdp: '',
        // Cooler
        coolerType: '',
        supportedSocket: '',
        maxTdp: '',
        height: '',
        // Motherboard
        motherboardChipset: '',
        formFactor: '',
        ramSlots: '',
        maxRam: '',
        supportedMemoryTypes: '',
        pcieSlots: [],
        storageInterfaces: [],
        // RAM
        memoryType: '',
        memorySpeed: '',
        memoryCapacity: '',
        // Storage
        storageType: '',
        storageCapacity: '',
        // GPU
        interfaceType: '',
        length: '',
        powerConnectors: '',
        vram: '',
        gpuChipset: '',
        gpuCores: '',
        // Case
        supportedMotherboardSizes: '',
        maxGpuLength: '',
        maxCoolerHeight: '',
        // Power Supply
        wattage: '',
        efficiencyRating: '',
        modularType: '',
        // Keyboard
        keyboardType: '',
        connectivity: '',
        // Mouse
        mouseType: '',
        // Laptops
        displaySize: '',
        refreshRate: '',
        laptopType: '',
        cpu: '',
        ram: '',
        storage: '',
        graphicCard: '',
        // Monitor
        resolution: '',
        panelType: '',
        monitorType: '',
        // Prebuilds
        cpuCores: '',
        cpuThreads: '',
        cpuBaseClock: '',
        cpuBoostClock: '',
        gpuSeries: '',
        gpuVram: '',
        gpuBoostClock: '',
        prebuildGpuCores: '',
        ramSize: '',
        ramSpeed: '',
        ramType: '',
        desktopType: '',
        // Expansion Network
        componentType: '',
        soundCardChannels: '',
        wiredNetworkSpeed: '',
        wifiStandard: '',
        networkSpeed: '',
    };

    //Set initialstate for product data
    const [product, setProduct] = useState(initialProductState);

    //hold selected images
    const [selectedImages, setSelectedImages] = useState([]);

    //Fetch product data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const res = await axios.get(`${backendUrl}/api/product/${id}`);
                    if (res.data.Success) {

                        const fetchedProduct = res.data;

                        const { _id, ...productFields } = fetchedProduct;

                        setProduct({
                            ...initialProductState,
                            ...productFields,
                            imgUrls: productFields.imgUrls || [],

                        });
                        setSelectedImages(productFields.imgUrls || []);

                        //Get main category for Edit mode
                        let foundMainCategory = null;

                        for (const [key, categoryList] of Object.entries(subCategories)) {
                            if (categoryList.some((item) => item.value === productFields.type)) {
                                foundMainCategory = key; // "Necessary", "Optional", or "Common"
                                break;
                            }
                        }

                        //Map category
                        const mainCategoryLabelMap = {
                            Necessary: 'Necessary',
                            Optional: 'Optional',
                            Common: 'Common',
                        };
                        //Set main category label
                        const mainCategoryLabel = mainCategoryLabelMap[foundMainCategory];
                        if (mainCategoryLabel) {
                            setSelectedMainCategory(mainCategoryLabel);
                            setSubCategoryOptions(subCategories[mainCategoryLabel] || []);
                        }
                        //Set manufacture based on subcategory
                        setSelectedSubCategory(productFields.type);
                        setManufactureOptions(manufacture[productFields.type] || []);

                        //Set socket type based on manufacture
                        setSelectedManufacture(productFields.manufacturer);
                        setSocketTypeOptions(socketTypes[productFields.manufacturer] || []);

                    } else {
                        toast.error('Failed to load product');
                        navigate('/adminpanel/products/manageproduct');
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                    toast.error('Failed to load product data');
                    navigate('/adminpanel/products/manageproduct');
                }
            };
            fetchProduct();

        } else {
            // Reset all form states
            setProduct(initialProductState);
            setSelectedImages([]);
            setSelectedMainCategory('');
            setSelectedSubCategory('');
            setSelectedManufacture('');
            setSubCategoryOptions([]);
            setManufactureOptions([]);
            setSocketTypeOptions([]);
            setformValidation(false);

            // Reset image selector if it exists
            if (imageSelectorRef.current) {
                imageSelectorRef.current.deleteAllImages();
            }
        }
    }, [id, , isEditMode, navigate]);

    //Update product state when selected subcategory or manufacture changes
    useEffect(() => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            type: selectedSubCategory,
            manufacturer: selectedManufacture,
        }));
    }, [selectedSubCategory, selectedManufacture]);

    //Handle input changes for checkboxs
    const handleInputChange = (field, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [field]: typeof prevProduct[field] === 'boolean' ? Boolean(value) : value,
        }));
    };

    //Handle array changes for multi-select fields
    const handleArrayChange = (field, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [field]: Array.isArray(value) ? value : [value],
        }));
    };

    // Validate required fields based on product type and component type
    // Different product types have different required fields
    const validateRequiredFields = (product, isEditMode = false, shouldThrow = false) => {
        // Define base required fields for all products
        const baseRequiredFields = [
            'name', 'price', 'description', 'imgUrls', 'type', 'manufacturer', 'quantity'
        ];
        // Define unique fields for each type
        const uniqueFieldsByType = {
            processor: ['socketType', 'tdp', 'coreCount', 'threadCount', 'baseClock', 'boostClock'],
            ram: ['ramType', 'ramSpeed', 'ramSize'],
            gpu: ['gpuChipset', 'gpuVram', 'gpuCores', 'interfaceType'],
            motherboard: ['motherboardChipset', 'socketType', 'formFactor', 'ramSlots', 'maxRam', 'supportedMemoryTypes', 'pcieSlots', 'pcieVersion', 'storageInterfaces'],
            storage: ['storageType', 'storageCapacity'],
            casing: ['formFactor', 'supportedMotherboardSizes', 'maxGpuLength', 'maxCoolerHeight'],
            power: ['wattage', 'efficiencyRating', 'modularType'],
            cooling: ['coolerType', 'supportedSocket', 'maxTdp', 'height'],
            keyboard: ['keyboardType', 'connectivity'],
            mouse: ['connectivity'],
            monitor: ['displaySize', 'resolution', 'refreshRate', 'panelType', 'monitorType'],
            laptop: ['laptopType', 'cpu', 'ram', 'storage', 'graphicCard', 'displaySize', 'refreshRate'],
            prebuild: ['cpu', 'cpuCores', 'cpuThreads', 'cpuBaseClock', 'cpuBoostClock', 'graphicCard', 'gpuSeries', 'gpuVram', 'gpuBoostClock', 'prebuildGpuCores', 'ramSize', 'ramSpeed', 'ramType', 'storage', 'desktopType'],
            expansion_network: ['interfaceType', 'componentType'],
            gamepad: ['connectivity'],
            accessories: [],
            externals: [],
            cables_and_connectors: []
        };
        // Expansion network special fields
        let requiredFields = [...baseRequiredFields, ...(uniqueFieldsByType[product.type] || [])];
        if (product.type === 'expansion_network') {
            if (product.componentType === 'sound_card') {
                requiredFields.push('soundCardChannels');
            } else if (product.componentType === 'wired_network_adapter') {
                requiredFields.push('wiredNetworkSpeed');
            } else if (product.componentType === 'wireless_network_adapter') {
                requiredFields.push('wifiStandard');
            }
        }
        const missingFields = requiredFields.filter((field) => {
            if (field === 'imgUrls' && isEditMode) return false;
            if (field === 'imgUrls') return !product.imgUrls || product.imgUrls.length === 0;
            if ({
                'supportedMemoryTypes': true,
                'pcieSlots': true,
                'storageInterfaces': true,
                'supportedMotherboardSizes': true,
                'powerConnectors': true
            }[field]) {
                return !product[field] || product[field].length === 0;
            }
            return product[field] === null || product[field] === '' || product[field] === undefined;
        });
        if (missingFields.length > 0) {
            if (shouldThrow) {
                toast.error(`Please fill in all required fields: ${missingFields.join(', ')}.`);
            }
            return false;
        }
        return true;
    };

    // Update the cancel button handler
    const handleCancel = () => {
        navigate('/adminpanel/products/manageproduct');
    };

    //Handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            //Check the validation of required fields
            const isValid = validateRequiredFields(product, isEditMode, true);

            //If validation fails, set the submitted flag and stop
            if (!isValid) {
                setformValidation(true);
                return;
            } else {
                setformValidation(false);
            }


            const formData = new FormData();

            // Only append new image files, not URLs
            selectedImages.forEach((image, index) => {
                if (typeof image !== 'string') {
                    formData.append(`image${index + 1}`, image);
                }
            });

            // Append existing image URLs if in edit mode
            if (selectedImages.some((img) => typeof img === 'string')) {
                formData.append('existingImgUrls', JSON.stringify(selectedImages.filter((img) => typeof img === 'string')));
            }

            //Remove processor-specific fields if not a processor(For Checkboxes)
            if (product.type === 'Processor') {
                product.integratedGraphics = product.integratedGraphics ?? false;
                product.includesCooler = product.includesCooler ?? false;
            } else {
                delete product.integratedGraphics;
                delete product.includesCooler;
            }


            //Exclude _id from product payload
            formData.append('product', JSON.stringify(product));

            const endpoint = isEditMode
                ? `${backendUrl}/api/product/${id}`
                : `${backendUrl}/api/product/add`;

            const response = isEditMode
                ? await axios.put(endpoint, formData)
                : await axios.post(endpoint, formData);

            if (response.data.Success) {
                toast.success(isEditMode ? 'Product updated successfully' : 'Product created successfully');
                console.log("sent product=============", response.data);//Debugging

                if (!isEditMode) {

                    setProduct({ ...initialProductState }); //Reset the form state after successful creation                 
                    setSelectedImages([]); //Reset selected images 
                    //Delete all images
                    if (imageSelectorRef.current) {
                        imageSelectorRef.current.deleteAllImages();
                    }
                    //Reset selected categories
                    setSelectedMainCategory('');
                    setSelectedSubCategory('');
                    setSelectedManufacture('');
                } else {
                    navigate('/adminpanel/products/manageproduct');
                }

            } else {
                toast.error(isEditMode ? 'Error in updating' : 'Error creating product. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/*Set Screen Loader*/}
            <FullScreenLoader open={loading} message={isEditMode ? 'Updating...' : 'Creating...'} />

            {/*Set the title and breadcrumbs*/}
            <div className="mt-3 mb-5 ml-6 mr-6">
                <div>
                    <PageTitle value={isEditMode ? 'Edit Product' : 'Create New Product'} />
                </div>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Products', href: '/adminpanel/products/manageproduct' },
                        { label: isEditMode ? 'Edit Product' : 'Create Product' },
                    ]}
                />
            </div>

            <div>
                <form onSubmit={onSubmitHandler}>
                    <div className="grid-flow-* gap-20 pl-3 pr-3 grid gap-y-4 mb-4">
                        <div className="Details border-2 border-gray-100 rounded-lg pt-4 pb-4">
                            <div className="DetailsHeader ml-3 mr-3 h-fit mb-4">
                                <Typography variant="h5" fontWeight="bold">
                                    Details
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    style={{ color: theme.palette.black700.main }}
                                >
                                    Title, Content, Image
                                </Typography>
                            </div>
                            <hr />
                            <div className="DetailsBody ml-3 mr-3">
                                <div className="formTitle1 mt-2 mb-4">
                                    <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px', display: "flex" }}>
                                        <Required></Required>Title
                                    </Typography>

                                    <InputField
                                        onChange={(value) => handleInputChange('name', value)}
                                        value={product.name}
                                        type="text"
                                        label="Product Name"
                                        width="100%"
                                        showRequiredHelper={formValidation}
                                    />
                                </div>
                                <div className="formTitle2 mt-4 mb-4">
                                    <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px', display: "flex" }}>
                                        <Required></Required>Content
                                    </Typography>
                                    <InputField
                                        onChange={(value) => handleInputChange('description', value)}
                                        value={product.description}
                                        type="text"
                                        label="Description"
                                        width="100%"
                                        rows={12}
                                        showRequiredHelper={formValidation}
                                    />
                                </div>
                                <div className="formTitle3 mt-4 mb-4">
                                    <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px', display: "flex" }}>
                                        {!isEditMode && (<Required></Required>)}Images
                                    </Typography>
                                    <ImageSelector
                                        ref={imageSelectorRef}
                                        onImagesSelect={(images) => {
                                            setSelectedImages(images);
                                            setProduct((prevProduct) => ({
                                                ...prevProduct,
                                                imgUrls: images,
                                            }));
                                        }}
                                        initialImages={isEditMode ? selectedImages : []}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="Properties border-2 border-gray-100 rounded-lg drop-shadow-2xl pt-4 pb-4">
                            <div className="PropertiesHeader ml-3 mr-3 h-fit mb-4">
                                <Typography variant="h5" fontWeight="bold">
                                    Properties
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    style={{ color: theme.palette.black700.main }}
                                >
                                    Basic Propoties and Attributes
                                </Typography>
                            </div>
                            <hr />
                            <div className="PropertiesBody ml-3 mr-3">
                                <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px', marginTop: "6px", display: "flex" }}>
                                    <Required></Required>Product Propoties
                                </Typography>
                                <div className="formProperty1 grid gap-4 grid-cols-4 flex flex-row mt-4 mb-4">
                                    <div>
                                        <InputField
                                            type="select"
                                            label="Main Category"
                                            options={main}
                                            value={selectedMainCategory}
                                            onChange={handleMainCategoryChange}
                                            width="100%"
                                            disabled={isEditMode}
                                            showRequiredHelper={formValidation}
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type="select"
                                            label="Sub Category"
                                            options={subCategoryOptions}
                                            value={selectedSubCategory}
                                            onChange={handleSubCategoryChange}
                                            disabled={!selectedMainCategory || isEditMode}
                                            width="100%"
                                            showRequiredHelper={formValidation}
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type="select"
                                            label="Manufacturer"
                                            width="100%"
                                            options={manufactureOptions}
                                            value={selectedManufacture}
                                            onChange={handleManufactureChange}
                                            disabled={!selectedSubCategory}
                                            showRequiredHelper={formValidation}
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            // key={`quantity-${product.type}`} // Force re-render on type change
                                            type="number"
                                            label="Quantity"
                                            width="100%"
                                            value={product.quantity || ''}
                                            onChange={(value) => handleInputChange('quantity', value)}
                                            showRequiredHelper={formValidation}
                                        />
                                    </div>
                                </div>
                                {selectedSubCategory === 'processor' && (
                                    <div className="cpuProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subCpuProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Socket Type"
                                                    width="100%"
                                                    options={socketTypeOptions}
                                                    disabled={!product.manufacturer}
                                                    value={product.socketType}
                                                    onChange={(value) => handleInputChange('socketType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Cores"
                                                    options={cpuCores}
                                                    width="100%"
                                                    value={product.coreCount}
                                                    onChange={(value) => handleInputChange('coreCount', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Threads"
                                                    options={cpuThreads}
                                                    width="100%"
                                                    value={product.threadCount}
                                                    onChange={(value) => handleInputChange('threadCount', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="GHz"
                                                    label="Base Clock"
                                                    width="100%"
                                                    value={product.baseClock}
                                                    onChange={(value) => handleInputChange('baseClock', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="GHz"
                                                    label="Boost Clock"
                                                    width="100%"
                                                    value={product.boostClock}
                                                    onChange={(value) => handleInputChange('boostClock', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                        <div className='subCpuProperty2 grid gap-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type='checkbox'
                                                    label="Integrated Graphics"
                                                    width='100%'
                                                    value={product.integratedGraphics}
                                                    onChange={(value) => handleInputChange('integratedGraphics', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='checkbox'
                                                    label="Includes Cooler"
                                                    width='100%'
                                                    value={product.includesCooler}
                                                    onChange={(value) => handleInputChange('includesCooler', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'motherboard' && (
                                    <div className="motherboardProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subMotherboardProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Chipset"
                                                    options={motherboardChipsets}
                                                    value={product.motherboardChipset}
                                                    onChange={(value) => handleInputChange('motherboardChipset', value)}
                                                    width="100%"
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Socket Type"
                                                    options={motherboardSocket}
                                                    value={product.socketType}
                                                    onChange={(value) => handleInputChange('socketType', value)}
                                                    width="100%"
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Form Factor"
                                                    options={motherboardFormFactors}
                                                    value={product.formFactor}
                                                    onChange={(value) => handleInputChange('formFactor', value)}
                                                    width="100%"
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="RAM Slots"
                                                    options={motherboardRamSlots}
                                                    value={product.ramSlots}
                                                    onChange={(value) => handleInputChange('ramSlots', value)}
                                                    width="100%"
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Max RAM"
                                                    options={motherboardMaxRam}
                                                    value={product.maxRam}
                                                    onChange={(value) => handleInputChange('maxRam', value)}
                                                    width="100%"
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Supported Memory Type"
                                                    options={motherboardMemoryTypes}
                                                    value={product.supportedMemoryTypes}
                                                    onChange={(value) => handleInputChange('supportedMemoryTypes', value)}
                                                    width="100%"
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                        <div className="subMotherboardProperty2 grid gap-y-2 gap-x-4 grid-cols-2 flex flex-row">
                                            <div>
                                                <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px' }}>
                                                    PCIe Slots
                                                </Typography>
                                                {product.pcieSlots.map((slot, index) => (
                                                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                                        <InputField
                                                            type="select"
                                                            label={`Slot ${index + 1} Type`}
                                                            options={motherboardPcieSlotType}
                                                            value={slot.type}
                                                            onChange={(value) => {
                                                                const updatedPcieSlots = [...product.pcieSlots];
                                                                updatedPcieSlots[index] = { ...updatedPcieSlots[index], type: value };
                                                                handleArrayChange('pcieSlots', updatedPcieSlots);
                                                            }}
                                                            width="33%"
                                                        />
                                                        <InputField
                                                            type="select"
                                                            label={`Slot ${index + 1} Version`}
                                                            options={motherboardPcieVersion}
                                                            value={slot.version}
                                                            onChange={(value) => {
                                                                const updatedPcieSlots = [...product.pcieSlots];
                                                                updatedPcieSlots[index] = { ...updatedPcieSlots[index], version: value };
                                                                handleArrayChange('pcieSlots', updatedPcieSlots);
                                                            }}
                                                            width="33%"
                                                        />
                                                        <InputField
                                                            type="number"
                                                            label={`Count`}
                                                            value={slot.count}
                                                            onChange={(value) => {
                                                                const updatedPcieSlots = [...product.pcieSlots];
                                                                updatedPcieSlots[index] = {
                                                                    ...updatedPcieSlots[index],
                                                                    count: parseInt(value) || 1,
                                                                };
                                                                handleArrayChange('pcieSlots', updatedPcieSlots);
                                                            }}
                                                            width="20%"
                                                            min={1}
                                                        />
                                                        <PrimaryButton
                                                            name="Remove"
                                                            onClick={() => {
                                                                const updatedPcieSlots = product.pcieSlots.filter((_, i) => i !== index);
                                                                handleArrayChange('pcieSlots', updatedPcieSlots);
                                                            }}
                                                            buttonSize="small"
                                                            isBold={0}
                                                        />
                                                    </div>
                                                ))}
                                                <PrimaryButton
                                                    name="Add PCIe Slot"
                                                    onClick={() => {
                                                        const updatedPcieSlots = [
                                                            ...product.pcieSlots,
                                                            { type: motherboardPcieSlotType[0]?.value || 'x16', version: '4.0', count: 1 },
                                                        ];
                                                        handleArrayChange('pcieSlots', updatedPcieSlots);
                                                    }}
                                                    buttonSize="medium"
                                                    isBold={1}
                                                />
                                            </div>
                                            <div>
                                                <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px' }}>
                                                    Storage Interfaces
                                                </Typography>
                                                {product.storageInterfaces.map((intf, index) => (
                                                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                                        <InputField
                                                            type="select"
                                                            label={`Interface ${index + 1} Type`}
                                                            options={motherboardStorageTypes}
                                                            value={intf.type}
                                                            onChange={(value) => {
                                                                const updatedStorageInterfaces = [...product.storageInterfaces];
                                                                updatedStorageInterfaces[index] = { ...updatedStorageInterfaces[index], type: value };
                                                                handleArrayChange('storageInterfaces', updatedStorageInterfaces);
                                                            }}
                                                            width="50%"
                                                        />
                                                        <InputField
                                                            type="number"
                                                            label={`Count`}
                                                            value={intf.count}
                                                            onChange={(value) => {
                                                                const updatedStorageInterfaces = [...product.storageInterfaces];
                                                                updatedStorageInterfaces[index] = {
                                                                    ...updatedStorageInterfaces[index],
                                                                    count: parseInt(value) || 1,
                                                                };
                                                                handleArrayChange('storageInterfaces', updatedStorageInterfaces);
                                                            }}
                                                            width="30%"
                                                            min={1}
                                                        />
                                                        <PrimaryButton
                                                            name="Remove"
                                                            onClick={() => {
                                                                const updatedStorageInterfaces = product.storageInterfaces.filter((_, i) => i !== index);
                                                                handleArrayChange('storageInterfaces', updatedStorageInterfaces);
                                                            }}
                                                            buttonSize="small"
                                                            isBold={0}
                                                        />
                                                    </div>
                                                ))}
                                                <PrimaryButton
                                                    name="Add Storage Interface"
                                                    onClick={() => {
                                                        const updatedStorageInterfaces = [
                                                            ...product.storageInterfaces,
                                                            { type: motherboardStorageTypes[0]?.value || 'SATA', count: 1 },
                                                        ];
                                                        handleArrayChange('storageInterfaces', updatedStorageInterfaces);
                                                    }}
                                                    buttonSize="medium"
                                                    isBold={1}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'ram' && (
                                    <div className="ramProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subRamProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Memory Type"
                                                    options={ramTypeOptions}
                                                    width="100%"
                                                    value={product.memoryType}
                                                    onChange={(value) => handleInputChange('memoryType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Capacity"
                                                    options={ramSizeOptions}
                                                    width="100%"
                                                    value={product.memoryCapacity}
                                                    onChange={(value) => handleInputChange('memoryCapacity', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Speed"
                                                    options={ramSpeedOptions}
                                                    width="100%"
                                                    value={product.memorySpeed}
                                                    onChange={(value) => handleInputChange('memorySpeed', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'storage' && (
                                    <div className="storageProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subStorageProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Storage Type"
                                                    options={storageTypes}
                                                    width="100%"
                                                    value={product.storageType}
                                                    onChange={(value) => handleInputChange('storageType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Capacity"
                                                    options={storageCapacities}
                                                    width="100%"
                                                    value={product.storageCapacity}
                                                    onChange={(value) => handleInputChange('storageCapacity', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'gpu' && (
                                    <div className="gpuProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subGpuProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Interface Type"
                                                    options={gpuInterfaceTypes}
                                                    width="100%"
                                                    value={product.interfaceType}
                                                    onChange={(value) => handleInputChange('interfaceType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="mm"
                                                    label="Length"
                                                    width="100%"
                                                    value={product.length}
                                                    onChange={(value) => handleInputChange('length', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Power Connectors"
                                                    options={gpuPowerConnectors}
                                                    width="100%"
                                                    value={product.powerConnectors}
                                                    onChange={(value) => handleInputChange('powerConnectors', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="VRAM"
                                                    options={gpuVramOptions}
                                                    width="100%"
                                                    value={product.vram}
                                                    onChange={(value) => handleInputChange('vram', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="GPU Chipset"
                                                    options={gpuChipsetOptions}
                                                    width="100%"
                                                    value={product.gpuChipset}
                                                    onChange={(value) => handleInputChange('gpuChipset', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="number"
                                                    label="GPU Cores"
                                                    options={gpuCores}
                                                    width="100%"
                                                    value={product.gpuCores}
                                                    onChange={(value) => handleInputChange('gpuCores', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'casing' && (
                                    <div className="casingProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subCasingProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Form Factor"
                                                    options={casingFormFactors}
                                                    width="100%"
                                                    value={product.formFactor}
                                                    onChange={(value) => handleInputChange('formFactor', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Support Motherboard Sizes"
                                                    options={casingSupportedMotherboardSizes}
                                                    width="100%"
                                                    value={product.supportedMotherboardSizes}
                                                    onChange={(value) => handleInputChange('supportedMotherboardSizes', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}

                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="mm"
                                                    label="Max GPU Length"
                                                    width="100%"
                                                    value={product.maxGpuLength}
                                                    onChange={(value) => handleInputChange('maxGpuLength', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="mm"
                                                    label="Max Cooler Height"
                                                    width="100%"
                                                    value={product.maxCoolerHeight}
                                                    onChange={(value) => handleInputChange('maxCoolerHeight', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'power' && (
                                    <div className="powerProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subPowerProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Wattage"
                                                    options={powerWattageOptions}
                                                    width="100%"
                                                    value={product.wattage}
                                                    onChange={(value) => handleInputChange('wattage', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Efficiency Rating"
                                                    options={powerEfficiencyOptions}
                                                    width="100%"
                                                    value={product.efficiencyRating}
                                                    onChange={(value) => handleInputChange('efficiencyRating', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Modular Type"
                                                    options={powerModularTypeOptions}
                                                    width="100%"
                                                    value={product.modularType}
                                                    onChange={(value) => handleInputChange('modularType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'cooling' && (
                                    <div className="coolingProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subCoolingProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Cooler Type"
                                                    options={coolerTypes}
                                                    width="100%"
                                                    value={product.coolerType}
                                                    onChange={(value) => handleInputChange('coolerType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Supported Sockets"
                                                    options={coolerSupportedSockets}
                                                    width="100%"
                                                    value={product.supportedSocket}
                                                    onChange={(value) => handleInputChange('supportedSocket', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="Watts"
                                                    label="Max TDP"
                                                    width="100%"
                                                    value={product.maxTdp}
                                                    onChange={(value) => handleInputChange('maxTdp', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="mm"
                                                    label="Height"
                                                    width="100%"
                                                    value={product.height}
                                                    onChange={(value) => handleInputChange('height', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'keyboard' && (
                                    <div className="keyboardProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subKeyboardProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Keyboard Type"
                                                    options={keyboardTypeOptions}
                                                    width="100%"
                                                    value={product.keyboardType}
                                                    onChange={(value) => handleInputChange('keyboardType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Connectivity"
                                                    options={keyboardConnectivityOptions}
                                                    width="100%"
                                                    value={product.connectivity}
                                                    onChange={(value) => handleInputChange('connectivity', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'mouse' && (
                                    <div className="mouseProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subMouseProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Connectivity"
                                                    options={mouseConnectivityOptions}
                                                    width="100%"
                                                    value={product.connectivity}
                                                    onChange={(value) => handleInputChange('connectivity', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'monitor' && (
                                    <div className="monitorProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subMonitorProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Display Size"
                                                    options={displaySizeOptions}
                                                    width="100%"
                                                    value={product.displaySize}
                                                    onChange={(value) => handleInputChange('displaySize', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Resolution"
                                                    options={resolutionOptions}
                                                    width="100%"
                                                    value={product.resolution}
                                                    onChange={(value) => handleInputChange('resolution', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Refresh Rate"
                                                    options={refreshRateOptions}
                                                    width="100%"
                                                    value={product.refreshRate}
                                                    onChange={(value) => handleInputChange('refreshRate', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Panel Type"
                                                    options={panelTypeOptions}
                                                    width="100%"
                                                    value={product.panelType}
                                                    onChange={(value) => handleInputChange('panelType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Monitor Type"
                                                    options={monitorTypeOptions}
                                                    width="100%"
                                                    value={product.monitorType}
                                                    onChange={(value) => handleInputChange('monitorType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'laptop' && (
                                    <div className="laptopProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subLaptopProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Display Size"
                                                    options={laptopDisplaySizeOptions}
                                                    width="100%"
                                                    value={product.displaySize}
                                                    onChange={(value) => handleInputChange('displaySize', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Refresh Rate"
                                                    options={laptopRefreshRateOptions}
                                                    width="100%"
                                                    value={product.refreshRate}
                                                    onChange={(value) => handleInputChange('refreshRate', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="CPU"
                                                    options={laptopCpuOptions}
                                                    width="100%"
                                                    value={product.cpu}
                                                    onChange={(value) => handleInputChange('cpu', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="RAM"
                                                    options={laptopRamOptions}
                                                    width="100%"
                                                    value={product.ram}
                                                    onChange={(value) => handleInputChange('ram', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Storage"
                                                    options={laptopStorageOptions}
                                                    width="100%"
                                                    value={product.storage}
                                                    onChange={(value) => handleInputChange('storage', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Laptop Type"
                                                    options={laptopTypeOptions}
                                                    width="100%"
                                                    value={product.laptopType}
                                                    onChange={(value) => handleInputChange('laptopType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Graphics Card"
                                                    options={laptopGraphicCardOptions}
                                                    width="100%"
                                                    value={product.graphicCard}
                                                    onChange={(value) => handleInputChange('graphicCard', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'prebuild' && (
                                    <div className="desktopProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subDesktopProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="CPU"
                                                    options={desktopCpuOptions}
                                                    width="100%"
                                                    value={product.cpu}
                                                    onChange={(value) => handleInputChange('cpu', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="CPU Cores"
                                                    options={cpuCores}
                                                    width="100%"
                                                    value={product.cpuCores}
                                                    onChange={(value) => handleInputChange('cpuCores', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="CPU Threads"
                                                    options={cpuThreads}
                                                    width="100%"
                                                    value={product.cpuThreads}
                                                    onChange={(value) => handleInputChange('cpuThreads', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="GHz"
                                                    label="CPU Base Clock"
                                                    width="100%"
                                                    value={product.cpuBaseClock}
                                                    onChange={(value) => handleInputChange('cpuBaseClock', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="GHz"
                                                    label="CPU Boost Clock"
                                                    width="100%"
                                                    value={product.cpuBoostClock}
                                                    onChange={(value) => handleInputChange('cpuBoostClock', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Graphic Card"
                                                    options={desktopGpuOptions}
                                                    width="100%"
                                                    value={product.graphicCard}
                                                    onChange={(value) => handleInputChange('graphicCard', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="GPU Series"
                                                    options={gpuChipsetOptions}
                                                    width="100%"
                                                    value={product.gpuSeries}
                                                    onChange={(value) => handleInputChange('gpuSeries', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="VRAM"
                                                    options={gpuVramOptions}
                                                    width="100%"
                                                    value={product.gpuVram}
                                                    onChange={(value) => handleInputChange('gpuVram', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    Placeholder="MHz"
                                                    label="GPU Boost Clock"
                                                    width="100%"
                                                    value={product.gpuBoostClock}
                                                    onChange={(value) => handleInputChange('gpuBoostClock', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="number"
                                                    label="GPU Cores"
                                                    width="100%"
                                                    value={product.prebuildGpuCores}
                                                    onChange={(value) => handleInputChange('prebuildGpuCores', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="RAM Capacity"
                                                    options={desktopRamOptions}
                                                    width="100%"
                                                    value={product.ramSize}
                                                    onChange={(value) => handleInputChange('ramSize', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="RAM Type"
                                                    options={ramTypeOptions}
                                                    width="100%"
                                                    value={product.ramType}
                                                    onChange={(value) => handleInputChange('ramType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="RAM Speed"
                                                    options={ramSpeedOptions}
                                                    width="100%"
                                                    value={product.ramSpeed}
                                                    onChange={(value) => handleInputChange('ramSpeed', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Storage Capacity"
                                                    options={desktopStorageOptions}
                                                    width="100%"
                                                    value={product.storage}
                                                    onChange={(value) => handleInputChange('storage', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Desktop Type"
                                                    options={desktopTypeOptions}
                                                    width="100%"
                                                    value={product.desktopType}
                                                    onChange={(value) => handleInputChange('desktopType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'expansion_network' && (
                                    <div className="expansionNetworkProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subExpansionNetworkProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Component Type"
                                                    options={expansionComponentTypes}
                                                    width="100%"
                                                    value={product.componentType}
                                                    onChange={(value) => handleInputChange('componentType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Interface Type"
                                                    options={expansionInterfaceTypes}
                                                    width="100%"
                                                    value={product.interfaceType}
                                                    onChange={(value) => handleInputChange('interfaceType', value)}
                                                    showRequiredHelper={!isEditMode ? formValidation : false}
                                                />
                                            </div>
                                            {product.componentType === 'sound_card' && (
                                                <div>
                                                    <InputField
                                                        type="select"
                                                        label="Sound Card Channels"
                                                        options={soundCardChannels}
                                                        width="100%"
                                                        value={product.soundCardChannels}
                                                        onChange={(value) => handleInputChange('soundCardChannels', value)}
                                                        showRequiredHelper={!isEditMode ? formValidation : false}
                                                    />
                                                </div>
                                            )}
                                            {product.componentType === 'wired_network_adapter' && (
                                                <div>
                                                    <InputField
                                                        type="select"
                                                        label="Network Speed"
                                                        options={wiredNetworkSpeeds}
                                                        width="100%"
                                                        value={product.wiredNetworkSpeed}
                                                        onChange={(value) => handleInputChange('wiredNetworkSpeed', value)}
                                                        showRequiredHelper={!isEditMode ? formValidation : false}
                                                    />
                                                </div>
                                            )}
                                            {product.componentType === 'wireless_network_adapter' && (
                                                <div>
                                                    <InputField
                                                        type="select"
                                                        label="WiFi Standard"
                                                        options={wifiStandards}
                                                        width="100%"
                                                        value={product.wifiStandard}
                                                        onChange={(value) => handleInputChange('wifiStandard', value)}
                                                        showRequiredHelper={!isEditMode ? formValidation : false}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='Pricing border-2 border-gray-100 rounded-lg drop-shadow-2xl pt-4 pb-4'>
                            <div className='PricingHeader ml-3 mr-3 h-fit mb-4'>
                                <Typography variant='h5' fontWeight="bold">Pricing</Typography>
                                <Typography variant='body1' fontWeight="bold" style={{ color: theme.palette.black700.main }}>Product Price</Typography>
                            </div>
                            <hr></hr>
                            <div className='PricingDetails ml-3 mr-3 grid gap-2 mt-4'>
                                <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px', display: "flex" }}>
                                    <Required></Required>Sell Price
                                </Typography>
                                <div>
                                    <InputField
                                        type='number'
                                        Placeholder="LKR"
                                        label="Price"
                                        width='100%'
                                        value={product.price}
                                        onChange={(value) => handleInputChange('price', value)}
                                        showRequiredHelper={formValidation}
                                        hideSpinner={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='p-4'>
                            <div className='float-right flex flex-row gap-x-2'>
                                {isEditMode && (
                                    <PrimaryButton
                                        fontSize="16px"
                                        name="Cancel"
                                        buttonSize="medium"
                                        isBold={1}
                                        color={"ternaryDark"}
                                        padding="50px"
                                        type="button"
                                        onClick={handleCancel}
                                    />
                                )}
                                <PrimaryButton
                                    fontSize="16px"
                                    name={isEditMode ? 'Update Product' : 'Create Product'}
                                    buttonSize="medium"
                                    isBold={1}
                                    type="submit"
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default CreateProducts;