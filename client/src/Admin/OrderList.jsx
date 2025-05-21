import React from 'react';
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { OrderTable } from "../MoleculesComponents/Table";
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import SetDate from '../AtomicComponents/Inputs/date';
import { SearchBar } from '../AtomicComponents/Inputs/Searchbar';
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";
import { PrimaryButton } from "../AtomicComponents/Buttons/Buttons";
import OrderStatusTabs from '../MoleculesComponents/Admin_components/BasicTabs';
import { Box, Tabs, Tab } from '@mui/material';
import Divider from '@mui/material/Divider';
import FullScreenLoader from '../AtomicComponents/FullScreenLoader';
import { useNavigation } from '../MoleculesComponents/Admin_components/NavigationContext';

// Add debounce function to limit the number of API calls
const debounce = (func, wait) => {
    let timeout;
    // This function returns a new function that will delay the execution of the original function
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        // This will clear the previous timeout and set a new one
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function OrderList() {

    const navigate = useNavigate();

    //Backend URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [SelectedOrderId, setSelectedOrderId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderIdSearch, setOrderIdSearch] = useState('');
    const [status, setStatus] = useState('');
    const [statusCounts, setStatusCounts] = useState({});

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [loading, setLoading] = useState(false);

    const { showOrderView, selectedTab, setSelectedTab } = useNavigation();

    // Set initial status from selectedTab when component mounts
    useEffect(() => {
        if (selectedTab) {
            setStatus(selectedTab);
        }
    }, [selectedTab]);

    //Clear filters function
    const clearFilters = () => {
        setSelectedDate(null);
        setSearchTerm('');
        setOrderIdSearch('');
        setStatus('');
        setSelectedTab(''); // Clear the selected tab
        setCurrentPage(1);
    };

    //fetch all the orders
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                date: selectedDate ? selectedDate.toISOString() : null,
                search: searchTerm,
                orderId: orderIdSearch,
                status: selectedTab || status
            };

            const response = await axios.get(`${backendUrl}/api/checkout/payment`, { params });

            if (response.data && Array.isArray(response.data.data)) {
                const allOrders = response.data.data;
                setOrders(allOrders);
                setTotalPages(response.data.pagination.totalPages);
                setTotalOrders(response.data.pagination.total);
                setStatusCounts(response.data.statusCounts || {});
            } else {
                console.error("Expected an array but got:", response.data);
                setOrders([]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    // Create a debounced version of fetchOrders 
    const debouncedFetchOrders = useCallback(
        debounce(() => {
            fetchOrders(); // Call the fetchOrders function with the current parameters
        }, 300),
        [currentPage, itemsPerPage, searchTerm, selectedDate, orderIdSearch, status, selectedTab] // Add selectedTab to dependencies
    );

    //Call the function to fetch the orders when the component mounts or dependencies change
    useEffect(() => {
        debouncedFetchOrders(); // Call the debounced function
    }, [currentPage, itemsPerPage, searchTerm, selectedDate, orderIdSearch, status, selectedTab]); // Add selectedTab to dependencies

    //Handle edit product function
    const handleView = (id) => {
        showOrderView(id);
        navigate(`/adminpanel/orders/vieworder/${id}`);
    };


    //Delete order function
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
        } finally {
            setOpenDialog(false);
        }
    };

    //Open delete dialog function
    const openDeleteDialog = (_id) => {
        console.log("Delete Order ID:", _id);
        setSelectedOrderId(_id);
        setOpenDialog(true);
    };

    //Define the columns for the order table
    const orderColumns = [
        { id: "Id", label: "OrderID" },
        { id: "userCard", label: "Customer" },
        { id: "date", label: "Ordered at" },
        { id: "items", label: "Items" },
        { id: "price", label: "Price" },
        { id: "orderStatus", label: "Status" },
    ];

    //Define the icon types and actions for the columns
    const iconTypes = ["view", "delete", "toggle"];
    const iconActions = {
        view: (_id) => handleView(_id),
        delete: (_id) => {
            openDeleteDialog(_id);
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Handle items per page change
    const handleItemsPerPageChange = (newLimit) => {
        setItemsPerPage(newLimit);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    // Modify the order ID search handler
    const handleOrderIdSearch = (e) => {
        const value = e.target.value;
        setOrderIdSearch(value);
    };

    return (
        <div className='pl-6 grid grid-rows'>
            <FullScreenLoader open={loading} message={'Loading Data...'} />
            <div className='mt-3'>
                <PageTitle value="Order List"></PageTitle>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Orders', href: "/adminpanel/orders/orderlist" },
                        { label: 'Order List' },
                    ]} />
            </div>
            <Box>
                <div className="mt-5 mb-10 mr-4 border-2 border-black-200 rounded-md">
                    {/* Status Tabs */}
                    <OrderStatusTabs
                        status={selectedTab || status}
                        setStatus={(newStatus) => {
                            setStatus(newStatus);
                            setSelectedTab(newStatus);
                        }}
                        statusCounts={statusCounts}
                    />
                    <Divider sx={{ marginLeft: "2px" }} />
                    {/* filtering form */}
                    <div className='filterForm grid gap-4 grid-cols-1 flex flex-row p-4 pt-6'>
                        <div className='filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4 flex flex-row'>
                            <div>
                                <SetDate
                                    width="100%"
                                    label="Date"
                                    value={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                >
                                </SetDate>
                            </div>
                            <div className="col-span-1">
                                <SearchBar
                                    placeholder="Search Name or Email"
                                    width="100%"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSearchTerm(value);
                                        fetchOrders(value);
                                    }}
                                />
                            </div>
                            <div className="col-span-1">
                                <SearchBar
                                    placeholder="Search Order ID"
                                    width="100%"
                                    value={orderIdSearch}
                                    onChange={handleOrderIdSearch}
                                />
                            </div>
                            <div className="col-span-1 flex justify">
                                <PrimaryButton
                                    name="Clear"
                                    buttonSize="medium"
                                    fontSize={"16px"}
                                    onClick={clearFilters}
                                    color={"primary"}
                                />
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
                            customRenderers={{
                                userCard: (order) => order.userDetails,
                                items: (order) => order.items
                            }}
                            pagination={{
                                currentPage,
                                totalPages,
                                totalItems: totalOrders,
                                itemsPerPage,
                                onPageChange: handlePageChange,
                                onItemsPerPageChange: handleItemsPerPageChange
                            }}
                        />
                    </div>
                </div>
            </Box>

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
                loading={loading}
            />
        </div>
    )
}

export default OrderList
