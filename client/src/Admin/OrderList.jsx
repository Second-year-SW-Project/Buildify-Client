import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../MoleculesComponents/Table";
import { useSelector, useDispatch } from "react-redux";
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import SetDate from '../AtomicComponents/Inputs/date';
import { SearchBar } from '../AtomicComponents/Inputs/Searchbar';

function OrderList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const orderColumns = [
        { id: "Id", label: "OrderID" },
        { id: "userCard", label: "Customer" },
        { id: "date", label: "Created at" },
        { id: "quantity", label: "Items" },
        { id: "price", label: "Price" },
        { id: "orderStatus", label: "Status" },
    ];

    return (
        <div className='pl-6 grid grid-rows'>
            <div className='mt-3'>
                <PageTitle value="Order List"></PageTitle>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Orders', href: "/orders" },
                        { label: 'Order List' },
                    ]} />
            </div>
            <div className="mb-10 mr-4 border-2 border-black-200 rounded-md">
                {/* filtering from */}
                <div className='filterForm grid gap-4 grid-cols-1 flex flex-row p-4'>
                    <div className='filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4 flex flex-row'>
                        <div>
                            <SetDate
                                width="100%"
                                label="Date"
                                onChange={(date) => setSelectedDate(date)}
                            >
                            </SetDate>
                        </div>
                        <div className="col-span-2">
                            <SearchBar
                                placeholder="Search"
                                width="100%"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    fetchProducts(e.target.value);
                                }}
                            >
                            </SearchBar>
                        </div>
                    </div>
                </div>
                {/* Table Details */}
                <div sx={{ width: '100%', borderRadius: "20px" }}>
                    <UserTable
                        columns={orderColumns}
                        data={productData}
                        iconTypes={iconTypes}
                        iconActions={iconActions}
                    />
                </div>



            </div>


        </div>
    )
}

export default OrderList
