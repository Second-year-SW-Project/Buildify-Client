import React from "react";
import { UserTable } from "../MoleculesComponents/Table";
import ProductCard from "../AtomicComponents/Cards/Productcard";
import TimeCard from "../AtomicComponents/Cards/TimeCard";
import QuantityCard from "../AtomicComponents/Cards/QuantityCard";
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'
import { Box } from "@mui/system";
import { AddButton } from "../AtomicComponents/Buttons/Buttons";
import { InputField } from "../AtomicComponents/Inputs/Input";

function ManageProducts() {


    const userColumns = [
        { id: "productCard", label: "Product" },
        { id: "date", label: "Created at" },
        { id: "availability", label: "Stock Availability" },
        { id: "quantity", label: "Quantity" },
        { id: "stock", label: "Stock Value" },
    ];

    const userData = [
        {
            productCard: <ProductCard name='ASUS ROG Strix SCAR 16 (2024) G634JZR i9 14TH GEN RTX 4080' type='Casing' src='/src/assets/Sample.png' />,
            date: <TimeCard date="2024-02-14" time="1.30 pm" />,
            availability: "In Stock",
            quantity: <QuantityCard quantity="10" unitprice="Unit Price - 10,000" />,
            stock: "720,000 LKR",
        },
    ];

    const iconTypes = ["view", "edit", "delete"];

    return (
        <div className='pl-6 grid grid-rows'>
            <div className='mt-3 mb-5'>
                <PageTitle value="Manage Products"></PageTitle>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Products', href: "/products" },
                        { label: 'Manage Product' },
                    ]} />
            </div>

            <div className="pb-4 mr-4">
                <div className="float-right"><AddButton name="Add Product" isBold={1} buttonSize="medium" fontSize="16px"></AddButton></div>
            </div>


            <div className="mr-4 border-2 border-black-200 rounded-md">
                <div className="m-4">
                    <InputField placeholder="Search Product" icon="search" />
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
