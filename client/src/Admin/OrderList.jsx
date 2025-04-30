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
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";


function OrderList() {

    //Backend URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [SelectedOrderId, setSelectedOrderId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);


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
                // setFilteredOrders([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setOrders([]);
            // setFilteredOrders([]);
            toast.error("Failed to fetch products");
        }
    };


    //Delete product function
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${backendUrl}/api/checkout/order/${SelectedOrderId}`);
            if (response.data.Success) {
                toast.success("Order deleted successfully", SelectedOrderId);
                fetchOrders();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to delete Order");
        }
        setOpenDialog(false);
    };

    //Open delete dialog function
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
                                    fetchOrders(e.target.value);
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
            {/* Alert Message */}
            <DialogAlert
                name="Delete Order"
                Title="Confirm Deletion"
                message="Are you sure you want to delete this Order? This action cannot be undone."
                Disagree="Cancel"
                Agree="Delete"
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                handleAgree={handleDelete}
            />
        </div>
    )
}

export default OrderList
