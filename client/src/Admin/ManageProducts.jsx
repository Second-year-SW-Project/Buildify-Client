import React from "react";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../MoleculesComponents/Table";
import ProductCard from "../AtomicComponents/Cards/Productcard";
import TimeCard from "../AtomicComponents/Cards/TimeCard";
import QuantityCard from "../AtomicComponents/Cards/QuantityCard";
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'
import { AddButton } from "../AtomicComponents/Buttons/Buttons";
import { InputField } from "../AtomicComponents/Inputs/Input";
import { StockType, main } from '../AtomicComponents/ForAdminForms/Category';
import SetDate from "../AtomicComponents/Inputs/date";
import { SearchBar } from "../AtomicComponents/Inputs/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMainCategory } from "../Store/formSlice";

function ManageProducts() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        selectedMainCategory,
        subCategoryOptions,
    } = useSelector((state) => state.form);

    const handleMainCategoryChange = (selectedValue) => {
        dispatch(setSelectedMainCategory(selectedValue)); // Dispatch Redux action
    };

    const userColumns = [
        { id: "productCard", label: "Product" },
        { id: "date", label: "Created at" },
        { id: "availability", label: "Stock Availability" },
        { id: "quantity", label: "Quantity" },
        { id: "stock", label: "Stock Value" },
    ];

    const userData = [
        {
            productCard: <ProductCard name='ASUS ROG Strix SCAR 16 (2024) G634JZR' type='Casing' src='/src/assets/Sample.png' />,
            date: <TimeCard date="2024-02-14" time="1.30 pm" />,
            availability: "In Stock",
            quantity: <QuantityCard quantity="10" unitprice="Unit Price - 10,000" />,
            stock: "720,000 LKR",
        },
    ];

    const iconTypes = ["view", "edit", "delete"];

    return (
        <div className='pl-6 grid grid-rows'>
            <div className='mt-3'>
                <PageTitle value="Manage Products"></PageTitle>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Products', href: "/products" },
                        { label: 'Manage Product' },
                    ]} />
            </div>

            <div className="pb-4 mr-4">
                <div className="float-right">
                    <AddButton
                        name="Add Product"
                        isBold={1}
                        buttonSize="medium"
                        fontSize="16px"
                        onClick={() => navigate('/products/createproduct')}
                    />
                </div>

            </div>


            <div className="mr-4 border-2 border-black-200 rounded-md">
                <div className='filterForm grid gap-4 grid-cols-1 flex flex-row p-4'>
                    <div className='filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4 flex flex-row'>
                        <div><InputField type='select' label="Stock" options={StockType} width='100%' /></div>
                        <div><SetDate width="100%" label="Date"></SetDate></div>
                        <div><InputField type='select' label="Category" options={main} value={selectedMainCategory} onChange={handleMainCategoryChange} width='100%' /></div>
                        <div><InputField type='select' label="Category" options={subCategoryOptions} disabled={!selectedMainCategory} width='100%' /></div>
                        <div className="col-span-2"><SearchBar placeholder="Search" width="100%"></SearchBar></div>
                    </div>
                </div>
                <div sx={{ width: '100%', borderRadius: "20px" }}>
                    <UserTable
                        columns={userColumns}
                        data={userData}
                        iconTypes={iconTypes}
                    />
                </div>
            </div>
        </div>

    );
};

export default ManageProducts
