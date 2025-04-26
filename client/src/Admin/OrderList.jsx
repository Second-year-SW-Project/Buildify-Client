import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { OrderTable } from "../MoleculesComponents/Table";
import { useSelector, useDispatch } from "react-redux";
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import SetDate from '../AtomicComponents/Inputs/date';
import { SearchBar } from '../AtomicComponents/Inputs/Searchbar';


function OrderList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [SelectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    //fetch all the orders
    const fetchOrders = async (searchTerm = "") => {
        try {
            const response = await axios.get("http://localhost:8000/api/checkout/payment", {
                params: searchTerm ? { search: searchTerm } : {}
            });

            console.log("API Response:", response.data);

            if (response.data && Array.isArray(response.data.data)) {
                const allOrders = response.data.data;
                setOrders(allOrders);
                // applyFilters(allOrders);
            } else {
                console.error("Expected an array but got:", response.data);
                setOrders([]);
                // setFilteredProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setOrders([]);
            // setFilteredProducts([]);
            toast.error("Failed to fetch products");
        }
    };

    const openDeleteDialog = (_id) => {
        console.log("Delete Order ID:", _id);
        setSelectedOrderId(_id);
        setOpenDialog(true);
    };

    const orderColumns = [
        { id: "Id", label: "OrderID" },
        { id: "userCard", label: "Customer" },
        { id: "date", label: "Ordered at" },
        { id: "quantity", label: "Items" },
        { id: "price", label: "Price" },
        { id: "orderStatus", label: "Status" },
    ];

    const iconTypes = ["view", "delete", "toggle"];
    const iconActions = {
        // view: handleView,
        delete: (_id) => {
            openDeleteDialog(_id);
        }
    };


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
            <div className="mt-5 mb-10 mr-4 border-2 border-black-200 rounded-md">
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
                    <OrderTable
                        columns={orderColumns}
                        orders={orders}
                        iconTypes={iconTypes}
                        iconActions={iconActions}
                    />
                </div>



            </div>


        </div>
    )
}

export default OrderList
