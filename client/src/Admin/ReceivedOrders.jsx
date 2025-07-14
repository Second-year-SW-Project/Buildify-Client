import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { BuildTable } from "../MoleculesComponents/Table";
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import SetDate from '../AtomicComponents/Inputs/date';
import { SearchBar } from '../AtomicComponents/Inputs/Searchbar';
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";
import { PrimaryButton } from "../AtomicComponents/Buttons/Buttons";
import BuildStatusTabs from '../MoleculesComponents/Admin_components/BuildStatusTabs';
import { Box, Divider } from '@mui/material';
import FullScreenLoader from '../AtomicComponents/FullScreenLoader';
import { useNavigation } from '../MoleculesComponents/Admin_components/NavigationContext';

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function ReceivedOrders() {
    const navigate = useNavigate();
    const location = useLocation();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [selectedBuildId, setSelectedBuildId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [builds, setBuilds] = useState([]);
    const [buildIdSearch, setBuildIdSearch] = useState('');
    const [status, setStatus] = useState('');
    const [statusCounts, setStatusCounts] = useState({});

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBuilds, setTotalBuilds] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const { showOrderView, selectedTab, setSelectedTab } = useNavigation();

    useEffect(() => {
        if (!selectedTab && location.state && location.state.selectedTab) {
            setSelectedTab(location.state.selectedTab);
        }
    }, [selectedTab, location.state, setSelectedTab]);

    const clearFilters = () => {
        setSelectedDate(null);
        setSearchTerm('');
        setBuildIdSearch('');
        setStatus('');
        setSelectedTab('');
        setCurrentPage(1);
    };

    const fetchBuilds = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                date: selectedDate ? selectedDate.toISOString() : null,
                search: searchTerm,
                buildId: buildIdSearch,
                buildStatus: selectedTab || status
            };
            const response = await axios.get(`${backendUrl}/api/build-transactions`, {
                params,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (response.data && response.data.Success && Array.isArray(response.data.data)) {
                const allReceivedOrders = response.data.data;
                setBuilds(allReceivedOrders);
                setTotalBuilds(response.data.pagination?.total || 0);
                setTotalPages(response.data.pagination?.totalPages || 1);
                setStatusCounts(response.data.statusCounts || {});
            } else {
                setBuilds([]);
            }
        } catch (error) {
            console.error("Error fetching builds:", error);
            setBuilds([]);
            toast.error("Failed to fetch builds");
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchBuilds = useCallback(
        debounce(() => {
            fetchBuilds();
        }, 300),
        [currentPage, itemsPerPage, searchTerm, selectedDate, buildIdSearch, status, selectedTab]
    );

    useEffect(() => {
        debouncedFetchBuilds();
    }, [currentPage, itemsPerPage, searchTerm, selectedDate, buildIdSearch, status, selectedTab]);

    const handleView = (id) => {
        showOrderView(id);
        navigate(`/adminpanel/orders/viewbuild/${id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${backendUrl}/api/build-transactions/${selectedBuildId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                toast.success(response.data.message || "Build deleted successfully");
                fetchBuilds();
            } else {
                toast.error(response.data.message || "Failed to delete build");
            }
        } catch (error) {
            toast.error("Failed to delete build");
        } finally {
            setOpenDialog(false);
        }
    };

    const openDeleteDialog = (_id) => {
        setSelectedBuildId(_id);
        setOpenDialog(true);
    };

    const buildColumns = [
        { id: "Id", label: "BuildID" },
        { id: "userCard", label: "Customer" },
        { id: "createdAt", label: "Ordered at" },
        { id: "deliveryMethod", label: "Delivery Method" },
        { id: "TotalPrice", label: "Total Price" },
        { id: "buildStatus", label: "Status" },
    ];

    const iconTypes = ["view", "delete", "toggle"];
    const iconActions = {
        view: (_id) => handleView(_id),
        delete: (_id) => openDeleteDialog(_id)
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleItemsPerPageChange = (newLimit) => {
        setItemsPerPage(newLimit);
        setCurrentPage(1);
    };
    const handleBuildIdSearch = (e) => {
        const value = e.target.value;
        setBuildIdSearch(value);
        setCurrentPage(1);
    };
    const handleSearchTermChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1);
        fetchBuilds(value);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCurrentPage(1);
    };
    const handleStatusTabChange = (newStatus) => {
        setStatus(newStatus);
        setSelectedTab(newStatus);
        setCurrentPage(1);
    };

    const memoizedBuilds = useMemo(() => {
        return builds.map(build => {
            const customerName = build.userName || build.userDetails?.name || '';
            const customerEmail = build.userEmail || build.userDetails?.email || '';
            return {
                ...build,
                shortBuildId: build._id ? `#${build._id.slice(-4).toUpperCase()}` : '',
                formattedDate: build.createdAt ? new Date(build.createdAt).toLocaleString() : '',
                customerName,
                customerEmail,
                formattedTotal: build.TotalPrice ? `LKR ${build.TotalPrice.toLocaleString()}` : '',
                componentsSummary: Array.isArray(build.components)
                    ? build.components.map(comp => `${comp.name} x${comp.quantity}`).join(', ')
                    : '',
                status: build.buildStatus// Map buildStatus to status for table compatibility
            };
        });
    }, [builds]);

    return (
        <div className='pl-6 grid grid-rows'>
            <FullScreenLoader open={loading} message={'Loading Data...'} />
            <div className='mt-3'>
                <PageTitle value="Build Order List"></PageTitle>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Orders', href: "/adminpanel/orders/receivedorders" },
                        { label: 'Build Order List' },
                    ]} />
            </div>
            <Box>
                <div className="mt-5 mb-10 mr-4 border-2 border-black-200 rounded-md">
                    <BuildStatusTabs
                        status={selectedTab || status}
                        setStatus={handleStatusTabChange}
                        statusCounts={statusCounts}
                    />
                    <Divider sx={{ marginLeft: "2px" }} />
                    <div className='filterForm grid gap-4 grid-cols-1 flex flex-row p-4 pt-6'>
                        <div className='filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4 flex flex-row'>
                            <div>
                                <SetDate
                                    width="100%"
                                    label="Date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className="col-span-1">
                                <SearchBar
                                    placeholder="Search Name or Email"
                                    width="100%"
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                                />
                            </div>
                            <div className="col-span-1">
                                <SearchBar
                                    placeholder="Search Build ID"
                                    width="100%"
                                    value={buildIdSearch}
                                    onChange={handleBuildIdSearch}
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
                    <div sx={{ width: '100%', borderRadius: "20px" }}>
                        <BuildTable
                            columns={buildColumns}
                            builds={memoizedBuilds}
                            iconTypes={iconTypes}
                            iconActions={iconActions}
                            pagination={{
                                currentPage,
                                totalPages,
                                totalItems: totalBuilds,
                                itemsPerPage,
                                onPageChange: handlePageChange,
                                onItemsPerPageChange: handleItemsPerPageChange
                            }}
                        />
                    </div>
                </div>
            </Box>
            <DialogAlert
                name="Delete Build"
                Title="Confirm Deletion"
                message="Are you sure you want to delete this Build? This action cannot be undone."
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

export default ReceivedOrders
