import React, { useState, useEffect, useRef } from 'react';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import { Typography } from '@mui/material';
import theme from '../AtomicComponents/theme';
import { InputField } from '../AtomicComponents/Inputs/Input';
import ImageSelector from '../MoleculesComponents/Admin_components/ImageSelector';
import {
    main,
    subCategories,
    manufacture,
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
import { useSelector, useDispatch } from 'react-redux';
import {
    setSelectedMainCategory,
    setSelectedSubCategory,
    setSelectedManufacture,
    resetForm,
} from '../Store/formSlice';
import { PrimaryButton } from '../AtomicComponents/Buttons/Buttons';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom';

const CreateProducts = () => {
    const { id } = useParams();
    const isEditMode = !!id;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageSelectorRef = useRef();

    // Get state from Redux store
    const {
        selectedMainCategory,
        selectedSubCategory,
        selectedManufacture,
        subCategoryOptions,
        manufactureOptions,
        socketTypeOptions,
    } = useSelector((state) => state.form);

    // Handle change in Main Category
    const handleMainCategoryChange = (selectedValue) => {
        dispatch(setSelectedMainCategory(selectedValue));
        dispatch(setSelectedSubCategory("")); // Reset Sub Category when Main Category changes
        dispatch(setSelectedManufacture("")); // Reset manufacture when Main Category changes
        setProduct((prev) => ({ ...prev, type: '' })); // Reset product type

    };

    // Handle change in Sub Category
    const handleSubCategoryChange = (selectedValue) => {
        dispatch(setSelectedSubCategory(selectedValue));
        dispatch(setSelectedManufacture("")); // Reset manufacture when Sub Category changes

    };
    // Handle change in Manufacture
    const handleManufactureChange = (selectedValue) => {
        dispatch(setSelectedManufacture(selectedValue));
        setProduct((prev) => ({ ...prev, socketType: '' })); // Reset socket type when manufacture changes
    };

    // coolerAttributes
    const coolerSupportedSockets = coolerAttributes.supportedSocket;
    const coolerTypes = coolerAttributes.coolerType;
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
    const motherboardExpansionSlots = motherboardAttributes.expansionSlots;
    //gpuAttributes
    const gpuInterfaceTypes = gpuAttributes.interfaceType;
    const gpuChipsetOptions = gpuAttributes.gpuChipset
    const gpuPowerConnectors = gpuAttributes.powerConnectors;
    const gpuVramOptions = gpuAttributes.gpuVram;
    const gpuSeriesOptions = gpuAttributes.gpuSeries;
    //storageAttributes
    const storageTypes = storageAttributes.storageTypes;
    const storageCapacities = storageAttributes.storageCapacities;
    //casingAttributes
    const casingFormFactors = casingAttributes.formFactor;
    const casingSupportedMotherboardSizes = casingAttributes.supportedMotherboardSizes;
    //keyboardAttributes
    const keyboardManufacturerOptions = keyboardAttributes.manufacturer;
    const keyboardTypeOptions = keyboardAttributes.type;
    //mouseAttributes
    const mouseTypeOptions = mouseAttributes.type;
    //monitorAttributes
    const displaySizeOptions = monitorAttributes.displaySize;
    const resolutionOptions = monitorAttributes.resolution;
    const refreshRateOptions = monitorAttributes.refreshRate;
    const panelTypeOptions = monitorAttributes.panelType;
    const monitorTypeOptions = monitorAttributes.monitorType;
    //laptopAttributes
    const laptopDisplaySizeOptions = laptopAttributes.displaySize;
    const laptopResolutionOptions = laptopAttributes.resolution;
    const laptopCpuOptions = laptopAttributes.cpu;
    const laptopRamOptions = laptopAttributes.ram;
    const laptopStorageOptions = laptopAttributes.storage;
    const laptopTypeOptions = laptopAttributes.laptopType;
    const laptopGraphicCardOptions = laptopAttributes.graphicCard;
    //desktopAttributes
    const desktopCpuOptions = desktopAttributes.cpu;
    const desktopGpuOptions = desktopAttributes.graphicCard;
    const desktopRamOptions = desktopAttributes.ram;
    const desktopStorageOptions = desktopAttributes.storage;
    const desktopTypeOptions = desktopAttributes.desktopType;
    // New attribute options for expansion_network
    const expansionComponentTypes = expansionNetworkAttributes.componentType;
    const expansionInterfaceTypes = expansionNetworkAttributes.interfaceType;
    const soundCardChannels = expansionNetworkAttributes.soundCardChannels;
    const wiredNetworkSpeeds = expansionNetworkAttributes.wiredNetworkSpeed;
    const wifiStandards = expansionNetworkAttributes.wifiStandard;
    // power supply attributes
    const powerWattageOptions = powerAttributes.wattage;
    const powerEfficiencyOptions = powerAttributes.efficiencyRating;
    const powerModularTypeOptions = powerAttributes.modularType;


    const initialProductState = {
        type: "",
        name: "",
        description: "",
        imgUrls: [],
        manufacturer: "",
        productCode: "",
        quantity: "",
        stockPrice: "",
        price: "",
        //cpu
        socketType: "",
        tdp: "",
        coreCount: "",
        threadCount: "",
        baseClock: "",
        boostClock: "",
        integratedGraphics: "",
        includesCooler: "",
        //memory
        memoryType: "",
        memoryCapacity: "",
        memorySpeed: "",
        //motherboard
        motherboardChipset: '',
        formFactor: "",
        ramSlots: "",
        maxRam: "",
        supportedMemoryTypes: [],
        pcieSlots: [],
        storageInterfaces: [],
        //gpu
        interfaceType: "",
        length: "",
        powerConnectors: "",
        vram: "",
        series: "",
        gpuChipset: "",
        cudaCores: "",
        //laptop & prebuild
        displaySize: "",
        resolution: "",
        laptopType: "",
        cpu: "",
        ram: "",
        storage: "",
        graphicCard: "",
        desktopType: "",
        //prebuild additional fields
        cpuCores: "",
        cpuThreads: "",
        cpuBaseClock: "",
        cpuBoostClock: "",
        gpuSeries: "",
        gpuVramGB: "",
        gpuBoostClockMHz: "",
        gpuCores: "",
        ramSizeGB: "",
        ramSpeedMHz: "",
        ramType: "",
        //expansion_network fields
        componentType: "",
        soundCardChannels: "",
        networkSpeed: "",
        wifiStandard: "",
        //storage fields
        storageType: "",
        storageCapacity: "",
        //cooler fields
        coolerType: "",
        supportedSocket: "",
        maxTdp: "",
        height: "",
        //casing fields
        maxGpuLength: '',
        maxCoolerHeight: '',
        supportedMotherboardSizes: [],
        //power field
        efficiencyRating: '',
        modularType: '',
        wattage: '',
    };

    const [product, setProduct] = useState(initialProductState);
    // State to hold selected images
    const [selectedImages, setSelectedImages] = useState([]);

    // Fetch product data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`);
                    if (res.data.Success) {

                        const fetchedProduct = res.data;
                        console.log("=====================fetched Product", fetchedProduct);
                        const { _id, ...productFields } = fetchedProduct;

                        setProduct({
                            ...initialProductState,
                            ...productFields,
                            imgUrls: productFields.imgUrls || [],
                            //     powerConnectors: productFields.powerConnectors || [],
                            //     supportedMemoryTypes: productFields.supportedMemoryTypes || [],
                            //     pcieSlots: productFields.pcieSlots || [],
                            //     storageInterfaces: productFields.storageInterfaces || [],
                            //     supportedMotherboardSizes: productFields.supportedMotherboardSizes || [],
                        }); //to be comment(NEED TO CHECK)
                        setSelectedImages(productFields.imgUrls || []); //to be comment(NEED TO CHECK)

                        //Set main category
                        let foundMainCategory = null;

                        for (const [key, categoryList] of Object.entries(subCategories)) {
                            if (categoryList.some((item) => item.value === productFields.type)) {
                                foundMainCategory = key;// "Necessary", "Optional", or "Common"
                                break;
                            }
                        }
                        // Map category
                        const mainCategoryLabelMap = {
                            Necessary: 'Necessary',
                            Optional: 'Optional',
                            Common: 'Common',
                        };
                        const mainCategoryLabel = mainCategoryLabelMap[foundMainCategory];
                        if (mainCategoryLabel) {
                            dispatch(setSelectedMainCategory(mainCategoryLabel));
                        }
                        dispatch(setSelectedSubCategory(productFields.type));
                        dispatch(setSelectedManufacture(productFields.manufacturer));
                    } else {
                        toast.error('Failed to load product');
                        // navigate('/products/manageproduct');
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                    toast.error('Failed to load product data');
                    // navigate('/products/manageproduct');
                }
            };
            fetchProduct();
        }
    }, [id, dispatch, isEditMode, navigate]);

    useEffect(() => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            type: selectedSubCategory,
            manufacturer: selectedManufacture,
        }));
    }, [selectedSubCategory, selectedManufacture]);

    const handleInputChange = (field, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [field]: typeof prevProduct[field] === 'boolean' ? Boolean(value) : value,
        }));
    };

    const handleArrayChange = (field, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [field]: Array.isArray(value) ? value : [value],
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            // Only append new image files, not URLs
            selectedImages.forEach((image, index) => {
                if (typeof image !== 'string') {
                    formData.append(`image${index + 1}`, image);
                }
            });

            if (product.type === 'processor') {
                if (!product.includesCooler) product.includesCooler = false;
                if (!product.integratedGraphics) product.integratedGraphics = false;
            }

            //validation function for reqired fields
            validateRequiredFields(product, isEditMode);

            // Exclude _id from product payload
            const { _id, ...productData } = product;
            formData.append('product', JSON.stringify(productData));

            const endpoint = isEditMode
                ? `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`
                : `${import.meta.env.VITE_BACKEND_URL}/api/product/add`;

            const response = isEditMode
                ? await axios.put(endpoint, formData)
                : await axios.post(endpoint, formData);

            if (response.data.Success) {
                toast.success(isEditMode ? 'Product updated successfully' : 'Product created successfully');
                if (!isEditMode) {
                    setProduct({ ...initialProductState });
                    //Reset Redux States
                    setSelectedImages([]);
                    dispatch(resetForm());
                    if (imageSelectorRef.current) {
                        imageSelectorRef.current.deleteAllImages();
                    }
                } else {
                    navigate('/products/manageproduct');
                }

            } else {
                toast.error(isEditMode ? 'Error in updating' : 'Error creating product. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const validateRequiredFields = (product, isEditMode = false) => {
        const allRequiredFields = {
            processor: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'socketType',
                'tdp',
                'coreCount',
                'threadCount',
                'baseClock',
                'boostClock',
                'integratedGraphics',
                'includesCooler',
            ],
            cooling: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'supportedSocket',
                'maxTdp',
                'height',
                'coolerType',
                'tdp',
            ],
            gpu: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'interfaceType',
                'tdp',
                'length',
                'powerConnectors',
                'vram',
                'gpuChipset',
            ],
            ram: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'memoryType',
                'memoryCapacity',
                'memorySpeed',
                'tdp',
            ],
            motherboard: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'socketType',
                'motherboardChipset',
                'formFactor',
                'ramSlots',
                'maxRam',
                'supportedMemoryTypes',
                'pcieSlots',
                'storageInterfaces',
                'tdp',
            ],
            storage: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'storageType',
                'storageCapacity',
                'tdp',
            ],
            casing: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'formFactor',
                'supportedMotherboardSizes',
                'maxGpuLength',
                'maxCoolerHeight',
            ],
            power: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'wattage',
                'efficiencyRating',
                'modularType',
            ],
            laptop: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'displaySize',
                'resolution',
                'cpu',
                'ram',
                'storage',
                'graphicCard',
            ],
            prebuild: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'cpu',
                'cpuCores',
                'cpuThreads',
                'cpuBaseClock',
                'cpuBoostClock',
                'graphicCard',
                'gpuSeries',
                'gpuVramGB',
                'gpuBoostClockMHz',
                'gpuCores',
                'ramSizeGB',
                'ramSpeedMHz',
                'ramType',
                'storage',
                'desktopType',
            ],
            expansion_network: [
                'name',
                'price',
                'description',
                'imgUrls',
                'type',
                'manufacturer',
                'quantity',
                'interfaceType',
                'componentType',
            ],
            default: ['name', 'price', 'description', 'imgUrls', 'type', 'manufacturer', 'quantity'],
        };

        if (product.type === 'expansion_network') {
            if (product.componentType === 'sound_card') {
                allRequiredFields.expansion_network.push('soundCardChannels');
            } else if (product.componentType === 'wired_network_adapter') {
                allRequiredFields.expansion_network.push('networkSpeed');
            } else if (product.componentType === 'wireless_network_adapter') {
                allRequiredFields.expansion_network.push('wifiStandard');
            }
        }

        const requiredFields = allRequiredFields[product.type] || allRequiredFields['default'];
        const missingFields = requiredFields.filter((field) => {
            if (field === 'imgUrls' && isEditMode) return false;
            if (field === 'imgUrls') return product.imgUrls.length === 0;
            if (field === 'supportedMemoryTypes' || field === 'pcieSlots' || field === 'storageInterfaces' || field === 'supportedMotherboardSizes' || field === 'powerConnectors') {
                return !product[field] || product[field].length === 0;
            } //(NEED TO CHECK)
            return product[field] === null || product[field] === '' || product[field] === undefined;
        });

        if (missingFields.length > 0) {
            throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}.`);
        }
    };

    // Override manufactureOptions for expansion_network
    const getManufactureOptions = () => {
        return manufactureOptions;
    };

    return (
        <div>
            <div className="mt-3 mb-5 ml-6 mr-6">
                <div>
                    <PageTitle value={isEditMode ? 'Edit Products' : 'Create New Products'} />
                </div>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Products', href: '/products' },
                        { label: isEditMode ? 'Edit Product' : 'New Product' },
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
                                    <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px' }}>
                                        Title
                                    </Typography>
                                    <InputField
                                        onChange={(value) => handleInputChange('name', value)}
                                        value={product.name}
                                        type="text"
                                        label="Product Name"
                                        width="100%"
                                    />
                                </div>
                                <div className="formTitle2 mt-4 mb-4">
                                    <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px' }}>
                                        Content
                                    </Typography>
                                    <InputField
                                        onChange={(value) => handleInputChange('description', value)}
                                        value={product.description}
                                        type="text"
                                        label="Description"
                                        width="100%"
                                        rows={12}
                                    />
                                </div>
                                <div className="formTitle3 mt-4 mb-4">
                                    <Typography variant="h6" fontWeight="bold" style={{ marginBottom: '6px' }}>
                                        Images
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
                                    Additional function and attributes
                                </Typography>
                            </div>
                            <hr />
                            <div className="PropertiesBody ml-3 mr-3">
                                <div className="formProperty1 grid gap-4 grid-cols-2 flex flex-row mt-4 mb-4">
                                    <div>
                                        <InputField
                                            type="select"
                                            label="Main Category"
                                            options={main}
                                            value={selectedMainCategory}
                                            onChange={handleMainCategoryChange}
                                            width="100%"
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type="select"
                                            label="Sub Category"
                                            options={subCategoryOptions}
                                            value={selectedSubCategory}
                                            onChange={handleSubCategoryChange}
                                            disabled={!selectedMainCategory}
                                            width="100%"
                                        />
                                    </div>
                                </div>
                                <div className="formProperty2 grid gap-4 grid-cols-3 flex flex-row mt-4 mb-4">
                                    <div>
                                        <InputField
                                            type="text"
                                            label="Product Code"
                                            width="100%"
                                            value={product.productCode || ''}
                                            onChange={(value) => handleInputChange('productCode', value)}
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type="select"
                                            label="Manufacturer"
                                            width="100%"
                                            options={getManufactureOptions()}
                                            value={selectedManufacture}
                                            onChange={handleManufactureChange}
                                            disabled={!selectedSubCategory}
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type="number"
                                            Auto={1}
                                            label="Quantity"
                                            width="100%"
                                            value={product.quantity}
                                            onChange={(value) => handleInputChange('quantity', value)}
                                        />
                                    </div>
                                </div>
                                {selectedSubCategory === 'processor' && (
                                    <div className='cpuProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subCpuProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Socket Type"
                                                    width="100%"
                                                    options={socketTypeOptions}
                                                    disabled={!product.manufacturer}
                                                    value={product.socketType}
                                                    onChange={(value) => handleInputChange('socketType', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
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
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="e.g., 3.2 GHz"
                                                    label="Base Clock"
                                                    width="100%"
                                                    value={product.baseClock}
                                                    onChange={(value) => handleInputChange('baseClock', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="e.g., 4.6 GHz"
                                                    label="Boost Clock"
                                                    width="100%"
                                                    value={product.boostClock}
                                                    onChange={(value) => handleInputChange('boostClock', value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='subCpuProperty2 grid gap-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type="checkbox"
                                                    label="Integrated Graphics"
                                                    width="100%"
                                                    checked={product.integratedGraphics}
                                                    onChange={(value) => handleInputChange('integratedGraphics', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="checkbox"
                                                    label="Includes Cooler"
                                                    width="100%"
                                                    checked={product.includesCooler}
                                                    onChange={(value) => handleInputChange('includesCooler', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'cooling' && (
                                    <div className="coolingProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subCoolingProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">

                                            {/* <div className='subCpuProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'> */}
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Cooler Type"
                                                    options={coolerTypes}
                                                    width="100%"
                                                    value={product.coolerType}
                                                    onChange={(value) => handleInputChange('coolerType', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Supported Sockets"
                                                    options={coolerSupportedSockets}
                                                    width="100%"
                                                    value={product.supportedSocket}
                                                    onChange={(value) => handleArrayChange('supportedSocket', value)}
                                                    multiple
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="Watts"
                                                    label="Max TDP"
                                                    width="100%"
                                                    value={product.maxTdp}
                                                    onChange={(value) => handleInputChange('maxTdp', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="mm"
                                                    label="Height"
                                                    width="100%"
                                                    value={product.height}
                                                    onChange={(value) => handleInputChange('height', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'motherboard' && (
                                    <div className='motherboardProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-6'>
                                        <div className='subMotherboardProperty1 grid gap-y-4 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Chipset"
                                                    options={motherboardChipsets}
                                                    value={product.motherboardChipset}
                                                    onChange={(value) => handleInputChange('motherboardChipset', value)}
                                                    width="100%"
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
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Memory Types"
                                                    options={motherboardMemoryTypes}
                                                    value={product.supportedMemoryTypes}
                                                    onChange={(value) => handleArrayChange('supportedMemoryTypes', value)}
                                                    width="100%"
                                                    multiple
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="subMotherboardProperty2 grid gap-y-2 gap-x-4 grid-cols-3 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="PCIe Slots"
                                                    options={motherboardPcieSlotType}
                                                    value={product.pcieSlots.map((slot) => slot.type)}
                                                    onChange={(value) =>
                                                        handleArrayChange(
                                                            'pcieSlots',
                                                            value.map((v) => ({ type: v, version: '4.0' }))
                                                        )
                                                    }
                                                    width="100%"
                                                    multiple
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="PCIe Version"
                                                    options={motherboardPcieVersion}
                                                    value={product.pcieSlots.map((slot) => slot.version)}
                                                    onChange={(value) =>
                                                        handleArrayChange(
                                                            'pcieSlots',
                                                            value.map((v) => ({ type: product.pcieSlots[0]?.type || 'x16', version: v }))
                                                        )
                                                    }
                                                    width="100%"
                                                    multiple
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Storage Interfaces"
                                                    options={motherboardStorageTypes}
                                                    value={product.storageInterfaces.map((intf) => intf.type)}
                                                    onChange={(value) =>
                                                        handleArrayChange(
                                                            'storageInterfaces',
                                                            value.map((v) => ({ type: v, count: 1 }))
                                                        )
                                                    }
                                                    width="100%"
                                                    multiple
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'ram' && (
                                    <div className="ramProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subRamProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Memory Type"
                                                    options={ramTypeOptions}
                                                    width="100%"
                                                    value={product.memoryType}
                                                    onChange={(value) => handleInputChange('memoryType', value)}
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
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'storage' && (
                                    <div className="storageProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subStorageProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Storage Type"
                                                    options={storageTypes}
                                                    width="100%"
                                                    value={product.storageType}
                                                    onChange={(value) => handleInputChange('storageType', value)}
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
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'gpu' && (
                                    <div className="gpuProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subGpuProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Interface Type"
                                                    options={gpuInterfaceTypes}
                                                    width="100%"
                                                    value={product.interfaceType}
                                                    onChange={(value) => handleInputChange('interfaceType', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="mm"
                                                    label="Length"
                                                    width="100%"
                                                    value={product.length}
                                                    onChange={(value) => handleInputChange('length', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Power Connectors"
                                                    options={gpuPowerConnectors}
                                                    width="100%"
                                                    value={product.powerConnectors}
                                                    onChange={(value) => handleArrayChange('powerConnectors', value)}
                                                    multiple
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
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="Watts"
                                                    label="TDP"
                                                    width="100%"
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'casing' && (
                                    <div className="casingProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subCasingProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Form Factor"
                                                    options={casingFormFactors}
                                                    width="100%"
                                                    value={product.formFactor}
                                                    onChange={(value) => handleInputChange('formFactor', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Supported Motherboard Sizes"
                                                    options={casingSupportedMotherboardSizes}
                                                    width="100%"
                                                    value={product.supportedMotherboardSizes}
                                                    onChange={(value) => handleArrayChange('supportedMotherboardSizes', value)}
                                                    multiple
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="mm"
                                                    label="Max GPU Length"
                                                    width="100%"
                                                    value={product.maxGpuLength}
                                                    onChange={(value) => handleInputChange('maxGpuLength', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="mm"
                                                    label="Max Cooler Height"
                                                    width="100%"
                                                    value={product.maxCoolerHeight}
                                                    onChange={(value) => handleInputChange('maxCoolerHeight', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'power' && (
                                    <div className="powerProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-6">
                                        <div className="subPowerProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Wattage"
                                                    options={powerWattageOptions}
                                                    width="100%"
                                                    value={product.wattage}
                                                    onChange={(value) => handleInputChange('wattage', value)}
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'keyboard' && (
                                    <div className="keyboardProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subKeyboardProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Keyboard Type"
                                                    options={keyboardTypeOptions}
                                                    width="100%"
                                                    value={product.keyboardType}
                                                    onChange={(value) => handleInputChange('keyboardType', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'mouse' && (
                                    <div className="mouseProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subMouseProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Mouse Type"
                                                    options={mouseTypeOptions}
                                                    width="100%"
                                                    value={product.mouseType}
                                                    onChange={(value) => handleInputChange('mouseType', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'monitor' && (
                                    <div className="monitorProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subMonitorProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Display Size"
                                                    options={displaySizeOptions}
                                                    width="100%"
                                                    value={product.displaySize}
                                                    onChange={(value) => handleInputChange('displaySize', value)}
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'laptop' && (
                                    <div className="laptopProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subLaptopProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Display Size"
                                                    options={laptopDisplaySizeOptions}
                                                    width="100%"
                                                    value={product.displaySize}
                                                    onChange={(value) => handleInputChange('displaySize', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Resolution"
                                                    options={laptopResolutionOptions}
                                                    width="100%"
                                                    value={product.resolution}
                                                    onChange={(value) => handleInputChange('resolution', value)}
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'prebuild' && (
                                    <div className="desktopProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subDesktopProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="CPU"
                                                    options={desktopCpuOptions}
                                                    width="100%"
                                                    value={product.cpu}
                                                    onChange={(value) => handleInputChange('cpu', value)}
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
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="e.g., 3.2 GHz"
                                                    label="CPU Base Clock"
                                                    width="100%"
                                                    value={product.cpuBaseClock}
                                                    onChange={(value) => handleInputChange('cpuBaseClock', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="e.g., 4.6 GHz"
                                                    label="CPU Boost Clock"
                                                    width="100%"
                                                    value={product.cpuBoostClock}
                                                    onChange={(value) => handleInputChange('cpuBoostClock', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="GPU"
                                                    options={desktopGpuOptions}
                                                    width="100%"
                                                    value={product.graphicCard}
                                                    onChange={(value) => handleInputChange('graphicCard', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="GPU Series"
                                                    options={gpuSeriesOptions}
                                                    width="100%"
                                                    value={product.gpuSeries}
                                                    onChange={(value) => handleInputChange('gpuSeries', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="VRAM (GB)"
                                                    options={gpuVramOptions}
                                                    width="100%"
                                                    value={product.gpuVramGB}
                                                    onChange={(value) => handleInputChange('gpuVramGB', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    placeholder="e.g., 2520 MHz"
                                                    label="GPU Boost Clock (MHz)"
                                                    width="100%"
                                                    value={product.gpuBoostClockMHz}
                                                    onChange={(value) => handleInputChange('gpuBoostClockMHz', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="text"
                                                    label="GPU Cores"
                                                    width="100%"
                                                    value={product.gpuCores}
                                                    onChange={(value) => handleInputChange('gpuCores', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="RAM Size (GB)"
                                                    options={desktopRamOptions}
                                                    width="100%"
                                                    value={product.ramSizeGB}
                                                    onChange={(value) => handleInputChange('ramSizeGB', value)}
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
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="RAM Speed (MHz)"
                                                    options={ramSpeedOptions}
                                                    width="100%"
                                                    value={product.ramSpeedMHz}
                                                    onChange={(value) => handleInputChange('ramSpeedMHz', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Storage"
                                                    options={desktopStorageOptions}
                                                    width="100%"
                                                    value={product.storage}
                                                    onChange={(value) => handleInputChange('storage', value)}
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === 'expansion_network' && (
                                    <div className="expansionNetworkProperty grid gap-y-2 gap-x-4 grid-cols-1 flex flex-row mt-4 mb-4">
                                        <div className="subExpansionNetworkProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row">
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Component Type"
                                                    options={expansionComponentTypes}
                                                    width="100%"
                                                    value={product.componentType}
                                                    onChange={(value) => handleInputChange('componentType', value)}
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
                                                        value={product.networkSpeed}
                                                        onChange={(value) => handleInputChange('networkSpeed', value)}
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
                                <Typography variant='body1' fontWeight="bold" style={{ color: theme.palette.black700.main }}>Buy and Sale Prices</Typography>
                            </div>
                            <hr></hr>
                            <div className='PricingDetails ml-3 mr-3 grid gap-2 mt-4'>
                                <div>
                                    <InputField
                                        type='text'
                                        Placeholder="LKR"
                                        label="Stock Price"
                                        width='100%'
                                    />
                                </div>
                                <div>
                                    <InputField
                                        type='text'
                                        Placeholder="LKR"
                                        label="Selling Price"
                                        width='100%'
                                        value={product.price}
                                        onChange={(value) => handleInputChange('price', value)}
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
                                        onClick={() => navigate('/products/manageproduct')}
                                    />
                                )}
                                <PrimaryButton
                                    fontSize="16px"
                                    name={isEditMode ? 'Update Product' : 'Create Product'}
                                    buttonSize="medium"
                                    isBold={1}
                                    type="submit"
                                />
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateProducts;