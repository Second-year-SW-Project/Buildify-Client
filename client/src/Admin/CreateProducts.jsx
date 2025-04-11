import React, { useState, useEffect, useRef } from 'react';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import { Typography } from '@mui/material';
import theme from '../AtomicComponents/theme';
import { InputField } from '../AtomicComponents/Inputs/Input';
import ImageSelector from '../MoleculesComponents/Admin_components/ImageSelector';
import {
    main, subCategories, coolerAttributes, cpuCores, cpuThreads, gpuAttributes,
    ramAttributes, motherboardAttributes, storageAttributes, casingAttributes,
    mouseAttributes, keyboardAttributes, monitorAttributes, laptopAttributes, desktopAttributes
} from '../AtomicComponents/ForProductForm/Category';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMainCategory, setSelectedSubCategory, setSelectedManufacture, resetForm } from "../Store/formSlice";
import { PrimaryButton } from '../AtomicComponents/Buttons/Buttons';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams, useNavigate } from "react-router-dom";

const CreateProducts = () => {
    const { id } = useParams();
    const isEditMode = !!id;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageSelectorRef = useRef();

    const {
        selectedMainCategory,
        selectedSubCategory,
        selectedManufacture,
        subCategoryOptions,
        manufactureOptions,
        socketTypeOptions,
    } = useSelector((state) => state.form);

    const handleMainCategoryChange = (selectedValue) => {
        dispatch(setSelectedMainCategory(selectedValue));
        dispatch(setSelectedSubCategory(""));
        dispatch(setSelectedManufacture(""));
        setProduct(prev => ({ ...prev, type: "" }));
    };

    const handleSubCategoryChange = (selectedValue) => {
        dispatch(setSelectedSubCategory(selectedValue));
        dispatch(setSelectedManufacture(""));
    };

    const handleManufactureChange = (selectedValue) => {
        dispatch(setSelectedManufacture(selectedValue));
        setProduct(prev => ({ ...prev, socketType: "" }));
    };

    // Attribute options
    const coolerSupportedSockets = coolerAttributes.supportedSocket;
    const coolerTypes = coolerAttributes.coolerType;
    const ramTypeOptions = ramAttributes.type;
    const ramSpeedOptions = ramAttributes.speed;
    const ramSizeOptions = ramAttributes.size;
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
    const gpuInterfaceTypes = gpuAttributes.interfaceType;
    const gpuPowerConnectors = gpuAttributes.powerConnectors;
    const gpuVramOptions = gpuAttributes.gpuVram;
    const gpuSeriesOptions = gpuAttributes.gpuSeries;
    const storageTypes = storageAttributes.storageTypes;
    const storageCapacities = storageAttributes.storageCapacities;
    const casingFormFactors = casingAttributes.formFactor;
    const casingSupportedMotherboardSizes = casingAttributes.supportedMotherboardSizes;
    const keyboardManufacturerOptions = keyboardAttributes.manufacturer;
    const keyboardTypeOptions = keyboardAttributes.type;
    const mouseTypeOptions = mouseAttributes.type;
    const displaySizeOptions = monitorAttributes.displaySize;
    const resolutionOptions = monitorAttributes.resolution;
    const refreshRateOptions = monitorAttributes.refreshRate;
    const panelTypeOptions = monitorAttributes.panelType;
    const monitorTypeOptions = monitorAttributes.monitorType;
    const laptopDisplaySizeOptions = laptopAttributes.displaySize;
    const laptopResolutionOptions = laptopAttributes.resolution;
    const laptopCpuOptions = laptopAttributes.cpu;
    const laptopRamOptions = laptopAttributes.ram;
    const laptopStorageOptions = laptopAttributes.storage;
    const laptopTypeOptions = laptopAttributes.laptopType;
    const laptopGraphicCardOptions = laptopAttributes.graphicCard;
    const desktopCpuOptions = desktopAttributes.cpu;
    const desktopGpuOptions = desktopAttributes.graphicCard;
    const desktopRamOptions = desktopAttributes.ram;
    const desktopStorageOptions = desktopAttributes.storage;
    const desktopTypeOptions = desktopAttributes.desktopType;

    const initialProductState = {
        type: "",
        name: "",
        description: "",
        imgUrls: [],
        manufacturer: "",
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
        chipset: "",
        formFactor: "",
        ramSlots: "",
        maxRam: "",
        //laptop & prebuild
        displaySize: "",
        resolution: "",
        laptopType: "",
        cpu: "",
        ram: "",
        storage: "",
        graphicCard: "",
        desktopType: "",
        //gpu
        interfaceType: "",
        length: "",
        powerConnectors: "",
        vram: "",
        series: "",
        cudaCores: "",
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
        quantity: "",
        price: "",
    };

    const [product, setProduct] = useState(initialProductState);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    const res = await axios.get(`http://localhost:8000/api/product/${id}`);
                    if (res.data.Success) {
                        const fetchedProduct = res.data.data;
                        console.log("Fetched Product====================================", fetchedProduct);
                        setProduct(fetchedProduct);

                        let foundMainCategory = null;
                        for (const [key, categoryList] of Object.entries(subCategories)) {
                            if (categoryList.some(item => item.value === fetchedProduct.type)) {
                                foundMainCategory = key;
                                break;
                            }
                        }

                        const mainCategoryLabelMap = {
                            Necessary: "Necessary",
                            Optional: "Optional",
                            Common: "Common"
                        };
                        const mainCategoryLabel = mainCategoryLabelMap[foundMainCategory];

                        if (mainCategoryLabel) {
                            dispatch(setSelectedMainCategory(mainCategoryLabel));
                        }
                        dispatch(setSelectedSubCategory(fetchedProduct.type));
                        dispatch(setSelectedManufacture(fetchedProduct.manufacturer));
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            };
            fetchProduct();
        }
    }, [id, dispatch]);

    useEffect(() => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            type: selectedSubCategory,
            manufacturer: selectedManufacture,
        }));
    }, [selectedSubCategory, selectedManufacture]);

    const handleInputChange = (field, value) => {
        console.log("===================Value", value);
        setProduct((prevProduct) => ({
            ...prevProduct,
            [field]: typeof prevProduct[field] === 'boolean' ? Boolean(value) : value,
        }));
    };

    const getChangedFields = (original, updated) => {
        const changed = {};
        for (const key in updated) {
            if (Array.isArray(updated[key])) {
                if (JSON.stringify(updated[key]) !== JSON.stringify(original[key])) {
                    changed[key] = updated[key];
                }
            } else if (updated[key] !== original[key]) {
                changed[key] = updated[key];
            }
        }
        return changed;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            selectedImages.forEach((image, index) => {
                formData.append(`image${index + 1}`, image);
            });

            if (product.type === "processor") {
                if (!product.includesCooler) product.includesCooler = false;
                if (!product.integratedGraphics) product.integratedGraphics = false;
            }

            validateRequiredFields(product, isEditMode);
            formData.append("product", JSON.stringify(product));

            const endpoint = isEditMode
                ? `http://localhost:8000/api/product/${id}`
                : `http://localhost:8000/api/product/add`;

            const response = isEditMode
                ? await axios.put(endpoint, formData)
                : await axios.post(endpoint, formData);

            if (response.data.Success) {
                toast.success(isEditMode ? "Product updated successfully" : "Product created successfully");
                if (!isEditMode) {
                    setProduct({ ...initialProductState });
                    dispatch(resetForm());
                    if (imageSelectorRef.current) {
                        imageSelectorRef.current.deleteAllImages();
                    }
                }
            } else {
                toast.error(isEditMode ? "Error in Updating" : "Error creating product. Please try again.");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const validateRequiredFields = (product, isEditMode = false) => {
        const allRequiredFields = {
            processor: ["name", "price", "description", "imgUrls", "type", "manufacturer", "quantity", "socketType", "tdp", "coreCount", "threadCount", "baseClock", "boostClock", "integratedGraphics", "includesCooler"],
            gpu: ["name", "price", "description", "imgUrls", "type", "manufacturer", "quantity", "interfaceType", "tdp", "series", "length", "powerConnectors", "vram", "boostClock", "cudaCores"],
            ram: ["name", "price", "description", "imgUrls", "type", "manufacturer", "quantity", "memoryType", "memoryCapacity", "memorySpeed"],
            motherboard: ["name", "price", "description", "imgUrls", "type", "manufacturer", "socketType", "chipset", "formFactor", "ramSlots", "maxRam", "memoryType"],
            laptop: ["name", "price", "description", "imgUrls", "type", "manufacturer", "quantity", "displaySize", "resolution", "cpu", "ram", "storage", "graphicCard"],
            prebuild: [
                "name", "price", "description", "imgUrls", "type", "manufacturer", "quantity",
                "cpu", "cpuCores", "cpuThreads", "cpuBaseClock", "cpuBoostClock",
                "graphicCard", "gpuSeries", "gpuVramGB", "gpuBoostClockMHz", "gpuCores",
                "ramSizeGB", "ramSpeedMHz", "ramType",
                "storage", "desktopType"
            ],
            default: ["name", "price", "description", "imgUrls", "type", "manufacturer", "quantity"],
        };
        const requiredFields = allRequiredFields[product.type] || allRequiredFields["default"];
        const missingFields = requiredFields.filter(field => {
            if (field === "imgUrls" && isEditMode) return false;
            if (field === "imgUrls") {
                return product.imgUrls.length === 0;
            }
            // Special validation for clock speeds in prebuild
            if (field === "cpuBaseClock" || field === "cpuBoostClock") {
                if (!product[field]) return true;
                const value = product[field].toString().trim().toLowerCase();
                if (!value.includes("ghz")) {
                    setProduct(prev => ({ ...prev, [field]: `${value} GHz` }));
                }
                return false;
            }
            if (field === "gpuBoostClockMHz") {
                if (!product[field]) return true;
                const value = product[field].toString().trim().toLowerCase();
                if (!value.includes("mhz")) {
                    setProduct(prev => ({ ...prev, [field]: `${value} MHz` }));
                }
                return false;
            }
            return product[field] === null || product[field] === "";
        });
        if (missingFields.length > 0) {
            throw new Error(`Please fill in all required fields correctly: ${missingFields.join(", ")}. CPU clocks must include GHz, GPU boost clock must include MHz.`);
        }
    };

    return (
        <div className=''>
            <div className='mt-3 mb-5 ml-6 mr-6'>
                <div><PageTitle value={isEditMode ? 'Edit Products' : 'Create New Products'}></PageTitle></div>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Products', href: "/products" },
                        { label: isEditMode ? 'Edit Product' : 'New Product' },
                    ]}
                />
            </div>
            <div>
                <form onSubmit={onSubmitHandler}>
                    <div className='grid-flow-* gap-20 pl-3 pr-3 grid gap-y-4 mb-4'>
                        <div className='Details border-2 border-gray-100 rounded-lg pt-4 pb-4'>
                            <div className='DetailsHeader ml-3 mr-3 h-fit mb-4'>
                                <Typography variant='h5' fontWeight="bold">Details</Typography>
                                <Typography variant='body1' fontWeight="bold" style={{ color: theme.palette.black700.main }}>Title, Content, Image</Typography>
                            </div>
                            <hr></hr>
                            <div className='DetailsBody ml-3 mr-3'>
                                <div className='formTitle1 mt-2 mb-4'>
                                    <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Title</Typography>
                                    <InputField
                                        onChange={(value) => handleInputChange('name', value)}
                                        value={product.name}
                                        type='text'
                                        label="Product Name"
                                        width='100%'
                                    />
                                </div>
                                <div className='formTitle2 mt-4 mb-4'>
                                    <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Content</Typography>
                                    <InputField
                                        onChange={(value) => handleInputChange('description', value)}
                                        value={product.description}
                                        type='text'
                                        label="Description"
                                        width='100%'
                                        rows={12}
                                    />
                                </div>
                                <div className='formTitle3 mt-4 mb-4'>
                                    <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Images</Typography>
                                    <ImageSelector
                                        ref={imageSelectorRef}
                                        onImagesSelect={(images) => {
                                            setSelectedImages(images);
                                            setProduct((prevProduct) => ({
                                                ...prevProduct,
                                                imgUrls: images.map((image) => URL.createObjectURL(image)),
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='Propoties border-2 border-gray-100 rounded-lg drop-shadow-2xl pt-4 pb-4'>
                            <div className='PropotiesHeader ml-3 mr-3 h-fit mb-4'>
                                <Typography variant='h5' fontWeight="bold">Propoties</Typography>
                                <Typography variant='body1' fontWeight="bold" style={{ color: theme.palette.black700.main }}>Additional function and attributes</Typography>
                            </div>
                            <hr></hr>
                            <div className='PropotiesBody ml-3 mr-3'>
                                <div className='formProperty1 grid gap-4 grid-cols-2 flex flex-row mt-4 mb-4'>
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
                                <div className='formProperty2 grid gap-4 grid-cols-3 flex flex-row mt-4 mb-4'>
                                    <div>
                                        <InputField
                                            type='select'
                                            label="Product Code"
                                            width='100%'
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type="select"
                                            label="Manufacture"
                                            width="100%"
                                            options={manufactureOptions}
                                            value={selectedManufacture}
                                            onChange={handleManufactureChange}
                                            disabled={!selectedSubCategory}
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type='number'
                                            Auto={1}
                                            label="Quantity"
                                            width='100%'
                                            value={product.quantity}
                                            onChange={(value) => handleInputChange('quantity', value)}
                                        />
                                    </div>
                                </div>
                                {selectedSubCategory === "processor" && (
                                    <div className='cpuProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
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
                                                    type='text'
                                                    Placeholder="Watts"
                                                    label="TDP"
                                                    width='100%'
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Cores"
                                                    options={cpuCores}
                                                    width='100%'
                                                    value={product.coreCount}
                                                    onChange={(value) => handleInputChange('coreCount', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Threads"
                                                    options={cpuThreads}
                                                    width='100%'
                                                    value={product.threadCount}
                                                    onChange={(value) => handleInputChange('threadCount', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    Placeholder="GHz"
                                                    label="Base Clock"
                                                    width='100%'
                                                    value={product.baseClock}
                                                    onChange={(value) => handleInputChange('baseClock', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    Placeholder="GHz"
                                                    label="Boost Clock"
                                                    width='100%'
                                                    value={product.boostClock}
                                                    onChange={(value) => handleInputChange('boostClock', value)}
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
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='checkbox'
                                                    label="Includes Cooler"
                                                    width='100%'
                                                    value={product.includesCooler}
                                                    onChange={(value) => handleInputChange('includesCooler', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "motherboard" && (
                                    <div className='motherboardProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subMotherboardProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Chipset"
                                                    options={motherboardChipsets}
                                                    value={product.chipset}
                                                    onChange={(value) => handleInputChange('chipset', value)}
                                                    width='100%'
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Form Factor"
                                                    options={motherboardFormFactors}
                                                    value={product.formFactor}
                                                    onChange={(value) => handleInputChange('formFactor', value)}
                                                    width='100%'
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Socket Type"
                                                    options={motherboardSocket}
                                                    value={product.socketType}
                                                    onChange={(value) => handleInputChange('socketType', value)}
                                                    width='100%'
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="RAM Slots"
                                                    options={motherboardRamSlots}
                                                    value={product.ramSlots}
                                                    onChange={(value) => handleInputChange('ramSlots', parseInt(value) || 0)}
                                                    width='100%'
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Max RAM"
                                                    options={motherboardMaxRam}
                                                    value={product.maxRam}
                                                    onChange={(value) => handleInputChange('maxRam', parseInt(value) || 0)}
                                                    width='100%'
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Memory Type"
                                                    options={motherboardMemoryTypes}
                                                    value={product.memoryType}
                                                    onChange={(value) => handleInputChange('memoryType', value)}
                                                    width='100%'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "ram" && (
                                    <div className='ramProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subRamProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Memory Type"
                                                    options={ramTypeOptions}
                                                    width='100%'
                                                    value={product.memoryType}
                                                    onChange={value => handleInputChange('memoryType', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Capacity"
                                                    options={ramSizeOptions}
                                                    width='100%'
                                                    value={product.memoryCapacity}
                                                    onChange={(value) => handleInputChange('memoryCapacity', parseInt(value) || 0)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Speed"
                                                    options={ramSpeedOptions}
                                                    width='100%'
                                                    value={product.memorySpeed}
                                                    onChange={(value) => handleInputChange('memorySpeed', parseInt(value) || 0)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "gpu" && (
                                    <div className='gpuProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subGpuProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Interface Type"
                                                    options={gpuInterfaceTypes}
                                                    width='100%'
                                                    value={product.interfaceType}
                                                    onChange={(value) => handleInputChange('interfaceType', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    Placeholder="mm"
                                                    label="Length"
                                                    width='100%'
                                                    value={product.length}
                                                    onChange={(value) => handleInputChange('length', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Power Connectors"
                                                    options={gpuPowerConnectors}
                                                    width='100%'
                                                    value={product.powerConnectors}
                                                    onChange={(value) => handleInputChange('powerConnectors', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    label="CUDA Cores"
                                                    width='100%'
                                                    value={product.cudaCores}
                                                    onChange={(value) => handleInputChange('cudaCores', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="GPU Series"
                                                    options={gpuSeriesOptions}
                                                    width='100%'
                                                    value={product.series}
                                                    onChange={(value) => handleInputChange('series', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="VRAM"
                                                    options={gpuVramOptions}
                                                    width='100%'
                                                    value={product.vram}
                                                    onChange={(value) => handleInputChange('vram', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    Placeholder="Watts"
                                                    label="TDP"
                                                    width='100%'
                                                    value={product.tdp}
                                                    onChange={(value) => handleInputChange('tdp', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    Placeholder="MHz"
                                                    label="BoostClock"
                                                    width='100%'
                                                    value={product.boostClock}
                                                    onChange={(value) => handleInputChange('boostClock', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "laptop" && (
                                    <div className='laptopProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subLaptopProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Display Size"
                                                    options={laptopDisplaySizeOptions}
                                                    width='100%'
                                                    value={product.displaySize}
                                                    onChange={(value) => handleInputChange('displaySize', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Resolution"
                                                    options={laptopResolutionOptions}
                                                    width='100%'
                                                    value={product.resolution}
                                                    onChange={(value) => handleInputChange('resolution', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="CPU"
                                                    options={laptopCpuOptions}
                                                    width='100%'
                                                    value={product.cpu}
                                                    onChange={(value) => handleInputChange('cpu', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="RAM"
                                                    options={laptopRamOptions}
                                                    width='100%'
                                                    value={product.ram}
                                                    onChange={(value) => handleInputChange('ram', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Storage"
                                                    options={laptopStorageOptions}
                                                    width='100%'
                                                    value={product.storage}
                                                    onChange={(value) => handleInputChange('storage', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Laptop Type"
                                                    options={laptopTypeOptions}
                                                    width='100%'
                                                    value={product.laptopType}
                                                    onChange={(value) => handleInputChange('laptopType', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Graphics Card"
                                                    options={laptopGraphicCardOptions}
                                                    width='100%'
                                                    value={product.graphicCard}
                                                    onChange={(value) => handleInputChange('graphicCard', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "prebuild" && (
                                    <div className='desktopProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subDesktopProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            {/* CPU Fields */}
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="CPU"
                                                    options={desktopCpuOptions}
                                                    width='100%'
                                                    value={product.cpu}
                                                    onChange={(value) => handleInputChange('cpu', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="CPU Cores"
                                                    options={cpuCores}
                                                    width='100%'
                                                    value={product.cpuCores}
                                                    onChange={(value) => handleInputChange('cpuCores', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="CPU Threads"
                                                    options={cpuThreads}
                                                    width='100%'
                                                    value={product.cpuThreads}
                                                    onChange={(value) => handleInputChange('cpuThreads', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    placeholder="e.g., 3.2 GHz"
                                                    label="CPU Base Clock (GHz)"
                                                    width='100%'
                                                    value={product.cpuBaseClock}
                                                    onChange={(value) => handleInputChange('cpuBaseClock', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    placeholder="e.g., 4.6 GHz"
                                                    label="CPU Boost Clock (GHz)"
                                                    width='100%'
                                                    value={product.cpuBoostClock}
                                                    onChange={(value) => handleInputChange('cpuBoostClock', value)}
                                                />
                                            </div>

                                            {/* GPU Fields */}
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="GPU"
                                                    options={desktopGpuOptions}
                                                    width='100%'
                                                    value={product.graphicCard}
                                                    onChange={(value) => handleInputChange('graphicCard', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="GPU Series"
                                                    options={[
                                                        { value: 'GTX', label: 'GTX' },
                                                        { value: 'RTX 2000', label: 'RTX 2000' },
                                                        { value: 'RTX 3000', label: 'RTX 3000' },
                                                        { value: 'RTX 4000', label: 'RTX 4000' },
                                                        { value: 'RX 6000', label: 'RX 6000' },
                                                        { value: 'RX 7000', label: 'RX 7000' },
                                                    ]}
                                                    width='100%'
                                                    value={product.gpuSeries}
                                                    onChange={(value) => handleInputChange('gpuSeries', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="VRAM (GB)"
                                                    options={gpuVramOptions}
                                                    width='100%'
                                                    value={product.gpuVramGB}
                                                    onChange={(value) => handleInputChange('gpuVramGB', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    placeholder="e.g., 2520 MHz"
                                                    label="GPU Boost Clock (MHz)"
                                                    width='100%'
                                                    value={product.gpuBoostClockMHz}
                                                    onChange={(value) => handleInputChange('gpuBoostClockMHz', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    label="GPU Cores"
                                                    width='100%'
                                                    value={product.gpuCores}
                                                    onChange={(value) => handleInputChange('gpuCores', value)}
                                                />
                                            </div>

                                            {/* RAM Fields */}
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="RAM Size (GB)"
                                                    options={desktopRamOptions}
                                                    width='100%'
                                                    value={product.ramSizeGB}
                                                    onChange={(value) => handleInputChange('ramSizeGB', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="RAM Speed (MHz)"
                                                    options={ramSpeedOptions}
                                                    width='100%'
                                                    value={product.ramSpeedMHz}
                                                    onChange={(value) => handleInputChange('ramSpeedMHz', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="RAM Type"
                                                    options={ramTypeOptions}
                                                    width='100%'
                                                    value={product.ramType}
                                                    onChange={(value) => handleInputChange('ramType', value)}
                                                />
                                            </div>

                                            {/* Existing Fields */}
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Storage"
                                                    options={desktopStorageOptions}
                                                    width='100%'
                                                    value={product.storage}
                                                    onChange={(value) => handleInputChange('storage', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Desktop Type"
                                                    options={desktopTypeOptions}
                                                    width='100%'
                                                    value={product.desktopType}
                                                    onChange={(value) => handleInputChange('desktopType', value)}
                                                />
                                            </div>
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