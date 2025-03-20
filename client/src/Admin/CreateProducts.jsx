import React, { useState } from 'react';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'
import { Typography } from '@mui/material'
import theme from '../AtomicComponents/theme'
import { InputField } from '../AtomicComponents/Inputs/Input'
import ImageSelector from '../MoleculesComponents/Admin_components/ImageSelector';

import { main, subCategories, manufacture, socketTypes, supportedSocket, coolerType } from '../AtomicComponents/ForAdminForms/Category';

function CreateProducts() {

    // State for selected main category and subcategories
    const [selectedMainCategory, setSelectedMainCategory] = useState("");
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);

    // Handle change in Main Category
    const handleMainCategoryChange = (selectedValue) => {
        setSelectedMainCategory(selectedValue);
        // Set subcategory options based on the selected main category
        setSubCategoryOptions(subCategories[selectedValue] || []);

    };

    //State for selected manufacture
    const [selectSubCategory, setSelectedSubCategory] = useState("");
    const [manufactureOptions, setManufactureOptions] = useState([]);

    //Handle change in Sub Category
    const handleSubCategoryChange = (selectedValue) => {
        setSelectedSubCategory(selectedValue);
        // Set manufacture options based on the selected sub category
        setManufactureOptions(manufacture[selectedValue] || []);
    }

    // State for selected socket type
    const [selectedManufacture, setSelectedManufacture] = useState("");
    const [socketTypeOptions, setSocketTypeOptions] = useState([]);
    // Handle change in Manufacture
    const handleManufactureChange = (selectedValue) => {
        setSelectedManufacture(selectedValue);
        // Set socket type options based on the selected manufacture
        setSocketTypeOptions(socketTypes[selectedValue] || []);
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
                <form>
                    <div className='grid-flow-* gap-20 pl-3 pr-3 grid gap-y-4' >
                        <div className='Details border-2 border-gray-100 rounded-lg drop-shadow-2xl pt-4 pb-4'>
                            <div className='DetailsHeader ml-3 mr-3 h-fit mb-4'>
                                <Typography variant='h5' fontWeight="bold">Details</Typography>
                                <Typography variant='body1' fontWeight="bold" style={{ color: theme.palette.black700.main }}>Title, Content, Image</Typography>
                            </div>
                            <hr></hr>
                            <div className='DetailsBody ml-3 mr-3'>
                                <div className='formTitle1 mt-2 mb-4'>
                                    <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Title</Typography>
                                    <InputField type='searchinput' label="Product Name" width='100%'></InputField>
                                </div>
                                <div className='formTitle2 mt-4 mb-4'>
                                    <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Content</Typography>
                                    <div><InputField type='textarea' label="Description" width='100%' rows={12}></InputField></div>
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
                                    <div><InputField type='select' label="Main Category" options={main} value={selectedMainCategory}
                                        onChange={handleMainCategoryChange} width='100%'></InputField></div>
                                    <div><InputField type='select' label="Sub Category" options={subCategoryOptions} value={selectSubCategory}
                                        onChange={handleSubCategoryChange} disabled={!selectedMainCategory} width='100%'></InputField></div>
                                </div>
                                <div className='formProperty2 grid gap-4 grid-cols-3 flex flex-row mt-4 mb-4'>
                                    <div><InputField type='select' label="Product Code" width='100%'></InputField></div>
                                    <div><InputField type='select' label="Manufacture" width='100%' options={manufactureOptions} value={selectedManufacture}
                                        onChange={handleManufactureChange} disabled={!selectSubCategory}></InputField></div>
                                    <div><InputField type='number' Auto={1} label="Quantity" width='100%'></InputField></div>
                                </div>
                                {selectSubCategory === "processors" && (
                                    <div className='cpuProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subCpuProperty1 grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row '>
                                            <div><InputField type='select' label="Socket Type" width='100%' options={socketTypeOptions} disabled={!selectedManufacture}></InputField></div>
                                            <div><InputField type='text' Placeholder="Watts" label="TDP" width='100%'></InputField></div>
                                            <div><InputField type='select' label="Cores" width='100%'></InputField></div>
                                            <div><InputField type='select' label="Threads" width='100%'></InputField></div>
                                            <div><InputField type='text' Placeholder="GHz" label="Base Clock" width='100%'></InputField></div>
                                            <div><InputField type='text' Placeholder="GHz" label="Boost Clock" width='100%'></InputField></div>
                                        </div>
                                        <div className='subCpuProperty2 grid gap-4 grid-cols-4 flex flex-row'>
                                            <div><InputField type='checkbox' label="Integrated Graphics" width='100%'></InputField></div>
                                            <div><InputField type='checkbox' label="Includes Cooler" width='100%'></InputField></div>
                                        </div>
                                    </div>
                                )}
                                {selectSubCategory === "cooling" && (
                                    <div className='cpuCoolerProperty grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <div className='subcpuCoolerProperty1 grid gap-y-2 gap-x-4 grid-cols-4  flex flex-row '>
                                            <div><InputField type='select' label="Supported Socket" options={supportedSocket} width='100%'></InputField></div>
                                            <div><InputField type='select' label="Cooler Type" options={coolerType} width='100%'></InputField></div>
                                            <div><InputField type='text' Placeholder="Watts" label="Max TDP" width='100%'></InputField></div>
                                            <div><InputField type='text' Placeholder="mm" label="Height" width='100%'></InputField></div>
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
                            <div className='PricingDetails ml-3 mr-3 grid gap-4 mt-4 mb-4'>
                                <div><InputField type='text' Placeholder="LKR" label="Stock Price" width='100%'></InputField></div>
                                <div><InputField type='text' Placeholder="LKR" label="Selling Price" width='100%'></InputField></div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProducts
