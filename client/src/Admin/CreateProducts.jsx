import React, { useState, useEffect } from 'react';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'
import { Typography } from '@mui/material'
import theme from '../AtomicComponents/theme'
import { InputField } from '../AtomicComponents/Inputs/Input'
import ImageSelector from '../MoleculesComponents/Admin_components/ImageSelector';
import {
    main, coolerAttributes, cpuCores, cpuThreads, gpuAttributes,
    ramAttributes, motherboardAttributes, storageAttributes, casingAttributes,
    mouseAttributes, keyboardAttributes, monitorAttributes, laptopAttributes, desktopAttributes
} from '../AtomicComponents/ForAdminForms/Category';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMainCategory, setSelectedSubCategory, setSelectedManufacture } from "../Store/formSlice";
import { PrimaryButton } from '../AtomicComponents/Buttons/Buttons';
import axios from 'axios';
import { backendUrl } from '../main';
import { toast } from 'sonner';


const CreateProducts = () => {

    const dispatch = useDispatch();

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
        dispatch(setSelectedMainCategory(selectedValue)); // Dispatch Redux action
    };

    // Handle change in Sub Category
    const handleSubCategoryChange = (selectedValue) => {
        dispatch(setSelectedSubCategory(selectedValue)); // Dispatch Redux action

    };
    // Handle change in Manufacture
    const handleManufactureChange = (selectedValue) => {
        dispatch(setSelectedManufacture(selectedValue)); // Dispatch Redux action
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
    const gpuPowerConnectors = gpuAttributes.powerConnectors;
    const gpuVramOptions = gpuAttributes.gpuVram;
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
    const laptopGraphicsCardOptions = laptopAttributes.graphicsCard;
    //desktopAttributes
    const desktopCpuOptions = desktopAttributes.cpu;
    const desktopGpuOptions = desktopAttributes.gpu;
    const desktopRamOptions = desktopAttributes.ram;
    const desktopStorageOptions = desktopAttributes.storage;
    const desktopTypeOptions = desktopAttributes.desktopType;

    const [product, setProduct] = useState({
        type: "",
        title: "",
        content: "",
        manufacture: "",
        socketType: "",
        tdp: 0,
        cores: 0,
        threads: 0,
        baseClock: 0,
        boostClock: 0,
        integratedGraphics: false,
        includesCooler: false,
        memoryType: "",
        memoryCapacity: 0,
        memorySpeed: 0,
        quantity: 0,
        price: 0,

    });

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    // Update subCategory in product state when selectedSubCategory changes
    useEffect(() => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            type: selectedSubCategory,
        }));
    }, [selectedSubCategory]);

    // Update manufacture in product state when selectedManufacture changes
    useEffect(() => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            manufacture: selectedManufacture,
        }));
    }, [selectedManufacture]);

    const handleInputChange = (field, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [field]: value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData()

            formData.append("product", JSON.stringify(product))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image1", image2)
            image3 && formData.append("image1", image3)
            image4 && formData.append("image1", image4)

            const response = await axios.post(backendUrl + "api/product/add", formData)

            if (response.data.success) {
                toast.success("Product created successfully")
            } else {
                toast.error("Error creating product. Please try again.")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }


    }

    return (
        <div className=''>
            <div className='mt-3 mb-5 ml-6 mr-6'>
                <div><PageTitle value="Create New Products"></PageTitle></div>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Products', href: "/products" },
                        { label: 'New Product' },
                    ]} />
            </div>
            <div>
                <form onSubmit={onSubmitHandler}>
                    <div className='grid-flow-* gap-20 pl-3 pr-3 grid gap-y-4 mb-4' >
                        <div className='Details border-2 border-gray-100 rounded-lg drop-shadow-2xl pt-4 pb-4'>
                            <div className='DetailsHeader ml-3 mr-3 h-fit mb-4'>
                                <Typography variant='h5' fontWeight="bold">Details</Typography>
                                <Typography variant='body1' fontWeight="bold" style={{ color: theme.palette.black700.main }}>Title, Content, Image</Typography>
                            </div>
                            <hr></hr>
                            <div className='DetailsBody ml-3 mr-3'>
                                <div className='formTitle1 mt-2 mb-4'>
                                    <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Title</Typography>
                                    <InputField
                                        onChange={(value) => handleInputChange('title', value)}
                                        value={product.title}
                                        type='searchinput'
                                        label="Product Name"
                                        width='100%'
                                    />
                                </div>
                                <div className='formTitle2 mt-4 mb-4'>
                                    <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Content</Typography>
                                    <div>
                                        <InputField
                                            onChange={(value) => handleInputChange('content', value)}
                                            value={product.content}
                                            type='textarea'
                                            label="Description"
                                            width='100%'
                                            rows={12}
                                        />
                                    </div>
                                </div>
                                <div className='formTitle3 mt-4 mb-4'>
                                    <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Images</Typography>
                                    <div className=''><ImageSelector /></div>
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
                                        //This Should be a generate of product codes
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
                                        ></InputField>
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
                                {selectedSubCategory === "processors" && (
                                    <div className='cpuProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subCpuProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row '>
                                            <div>
                                                <InputField
                                                    type="select"
                                                    label="Socket Type"
                                                    width="100%"
                                                    options={socketTypeOptions}
                                                    disabled={!selectedManufacture}
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
                                                    onChange={(value) => handleInputChange('tdp', parseInt(value) || 0)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Cores"
                                                    options={cpuCores}
                                                    width='100%'
                                                    value={product.cores}
                                                    onChange={(value) => handleInputChange('cores', parseInt(value) || 0)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Threads"
                                                    options={cpuThreads}
                                                    width='100%'
                                                    value={product.threads}
                                                    onChange={(value) => handleInputChange('threads', parseInt(value) || 0)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    Placeholder="GHz"
                                                    label="Base Clock"
                                                    width='100%'
                                                    value={product.baseClock}
                                                    onChange={(value) => handleInputChange('cores', parseInt(value) || 0)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='text'
                                                    Placeholder="GHz"
                                                    label="Boost Clock"
                                                    width='100%'
                                                    value={product.boostClock}
                                                    onChange={(value) => handleInputChange('baseClock', parseFloat(value) || 0)}
                                                />
                                            </div>
                                        </div>
                                        <div className='subCpuProperty2 grid gap-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type='checkbox'
                                                    label="Integrated Graphics"
                                                    width='100%'
                                                    checked={product.integratedGraphics}
                                                    onChange={(value) => handleInputChange('integratedGraphics', value)}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='checkbox'
                                                    label="Includes Cooler"
                                                    width='100%'
                                                    checked={product.includesCooler}
                                                    onChange={(value) => handleInputChange('includesCooler', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedSubCategory === "motherboard" && (
                                    <div className='motherboardProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subMotherboardProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='select' label="Chipset" options={motherboardChipsets} width='100%'></InputField></div>
                                            <div><InputField type='select' label="Form Factor" options={motherboardFormFactors} width='100%'></InputField></div>
                                            <div><InputField type='select' label="Socket Type" options={motherboardSocket} width='100%'></InputField></div>
                                            <div><InputField type='select' label="RAM Slots" options={motherboardRamSlots} width='100%'></InputField></div>
                                            <div><InputField type='select' label="Max RAM" options={motherboardMaxRam} width='100%'></InputField></div>
                                            <div><InputField type='select' label="Memory Type" options={motherboardMemoryTypes} width='100%'></InputField></div>
                                            {/* There are more options for motherboards, you can add them here */}
                                        </div>
                                    </div>
                                )}{selectedSubCategory === "ram" && (
                                    <div className='ramProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subRamProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Memory Type"
                                                    options={ramTypeOptions}
                                                    width='100%'
                                                    value={product.memoryType}
                                                    onChange={(e) => setProduct({ ...product, memoryType: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Capacity"
                                                    options={ramSizeOptions}
                                                    width='100%'
                                                    value={product.memoryCapacity}
                                                    onChange={(e) => setProduct({ ...product, memoryCapacity: parseInt(e.target.value) })}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    type='select'
                                                    label="Speed"
                                                    options={ramSpeedOptions}
                                                    width='100%'
                                                    value={product.memorySpeed}
                                                    onChange={(e) => setProduct({ ...product, memorySpeed: parseInt(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* {selectedSubCategory === "gpu" && (
                                    <div className='gpuProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subGpuProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='select' label="Interface Type" options={gpuInterfaceTypes} width='100%'></InputField></div>
                                            <div><InputField type='text' Placeholder="mm" label="Length" width='100%'></InputField></div>
                                            <div><InputField type='select' label="Power Connectors" options={gpuPowerConnectors} width='100%'></InputField></div>
                                            <div><InputField type='text' Placeholder="Watts" label="TDP" width='100%'></InputField></div>
                                            <div><InputField type='text' label="Chipset" width='100%'></InputField></div>
                                            <div><InputField type='select' label="VRAM (GB)" options={gpuVramOptions} width='100%'></InputField></div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "storage" && (
                                    <div className='storageProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subStorageProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='select' label="Storage Type" options={storageTypes} width='100%'></InputField></div>
                                            <div><InputField type='select' label="Capacity" options={storageCapacities} width='100%'></InputField></div>
                                        </div>
                                    </div>
                                )} 
                                {selectedSubCategory === "casing" && (
                                    <div className='casingProperties grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subCasingProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='select' label="Form Factor" options={casingFormFactors} width='100%' /></div>
                                            <div><InputField type='select' label="Motherboard Sizes" options={casingSupportedMotherboardSizes} width='100%' /></div>
                                            <div><InputField type='text' label="Max GPU Length" Placeholder="mm" width='100%' /></div>
                                            <div><InputField type='text' label="Max Cooler Height" Placeholder="mm" width='100%' /></div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "cooling" && (
                                    <div className='cpuCoolerProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subcpuCoolerProperty1 grid gap-y-2 gap-x-4 grid-cols-4  flex flex-row '>
                                            <div><InputField type='select' label="Supported Socket" options={coolerSupportedSockets} width='100%'></InputField></div>
                                            <div><InputField type='select' label="Cooler Type" options={coolerTypes} width='100%'></InputField></div>
                                            <div><InputField type='text' Placeholder="Watts" label="Max TDP" width='100%'></InputField></div>
                                            <div><InputField type='text' Placeholder="mm" label="Height" width='100%'></InputField></div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "keyboard" && (
                                    <div className='keyboardProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subKeyboardProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='select' label="Manufacturer" options={keyboardManufacturerOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Keyboard Type" options={keyboardTypeOptions} width='100%' /></div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "mouse" && (
                                    <div className='mouseProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subMouseProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='select' label="Mouse Type" options={mouseTypeOptions} width='100%' /></div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "monitor" && (
                                    <div className='monitorProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subMonitorProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='select' label="Display Size" options={displaySizeOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Resolution" options={resolutionOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Refresh Rate" options={refreshRateOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Panel Type" options={panelTypeOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Monitor Type" options={monitorTypeOptions} width='100%' /></div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "laptop" && (
                                    <div className='laptopProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subLaptopProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='select' label="Display Size" options={laptopDisplaySizeOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Resolution" options={laptopResolutionOptions} width='100%' /></div>
                                            <div><InputField type='select' label="CPU" options={laptopCpuOptions} width='100%' /></div>
                                            <div><InputField type='select' label="RAM" options={laptopRamOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Storage" options={laptopStorageOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Laptop Type" options={laptopTypeOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Graphics Card" options={laptopGraphicsCardOptions} width='100%' /></div>
                                        </div>
                                    </div>
                                )}
                                {selectedSubCategory === "prebuilds" && (
                                    <div className='desktopProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subDesktopProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='select' label="CPU" options={desktopCpuOptions} width='100%' /></div>
                                            <div><InputField type='select' label="GPU" options={desktopGpuOptions} width='100%' /></div>
                                            <div><InputField type='select' label="RAM" options={desktopRamOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Storage" options={desktopStorageOptions} width='100%' /></div>
                                            <div><InputField type='select' label="Desktop Type" options={desktopTypeOptions} width='100%' /></div>
                                        </div>
                                    </div>
                                )}*/}

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
                                    // Sholud add the stock price if neeeded 
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
                            <div className='float-right'>
                                <PrimaryButton
                                    fontSize="16px"
                                    name="Create Product"
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
    )
}

export default CreateProducts
