import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../MoleculesComponents/Table";
import { ProductCard } from "../AtomicComponents/Cards/Productcard";
import TimeCard from "../AtomicComponents/Cards/TimeCard";
import QuantityCard from "../AtomicComponents/Cards/QuantityCard";
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb'
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles'
import { AddButton, PrimaryButton } from "../AtomicComponents/Buttons/Buttons";
import { InputField } from "../AtomicComponents/Inputs/Input";
import { StockType, main, subCategories } from '../AtomicComponents/ForAdminForms/Category';
import SetDate from "../AtomicComponents/Inputs/date";
import { SearchBar } from "../AtomicComponents/Inputs/Searchbar";
import StatusCard from "../AtomicComponents/Cards/StatusCard";
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";
import ProductDetailsDialog from "../AtomicComponents/Dialogs/ProductDetailsDialog";

function ManageProducts() {

    //Backend URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    // Product details dialog state
    const [openProductDialog, setOpenProductDialog] = useState(false);
    const [selectedProductForView, setSelectedProductForView] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const navigate = useNavigate();

    //Set initial state for selected categories and options
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);

    const [loading, setLoading] = useState(false);

    //Clear filters function
    const clearFilters = () => {
        setStatusFilter('');
        setSelectedDate(null);
        setSelectedMainCategory('');
        setSelectedSubCategory('');
        setSubCategoryOptions([]);
        setSearchTerm('');
        setCurrentPage(1);
        fetchProducts();
    };

    //Set up state for selected images
    const handleMainCategoryChange = (value) => {
        setSelectedMainCategory(value);
        setSubCategoryOptions(subCategories[value] || []);
        setSelectedSubCategory('');
        setCurrentPage(1);
    };

    //Set up state for selected subcategory and manufacture
    const handleSubCategoryChange = (value) => {
        setSelectedSubCategory(value);
        setCurrentPage(1);
    };

    //Handle input changes for filters
    const handleInputChange = (field, value) => {
        if (field === 'statusFilter') {
            setStatusFilter(value);
            setCurrentPage(1);
        }
        // Add more 
    };

    // Separate useEffect for filter restoration
    useEffect(() => {
        const savedFilters = sessionStorage.getItem('productFilters');
        console.log("Restoring filters from sessionStorage:", savedFilters); // Debugging
        if (savedFilters) {
            try {
                const filterState = JSON.parse(savedFilters);
                setSearchTerm(filterState.searchTerm || '');
                setStatusFilter(filterState.statusFilter || '');
                setSelectedDate(filterState.selectedDate ? new Date(filterState.selectedDate) : null);

                if (filterState.selectedMainCategory) {
                    setSelectedMainCategory(filterState.selectedMainCategory);
                    setSubCategoryOptions(subCategories[filterState.selectedMainCategory] || []);
                }

                if (filterState.selectedSubCategory) {
                    console.log("Restoring selected subcategory:", filterState.selectedSubCategory); // Debugging
                    setSelectedSubCategory(filterState.selectedSubCategory);
                }

                setCurrentPage(filterState.currentPage || 1);
                setItemsPerPage(filterState.itemsPerPage || 5);

                // Only remove after successful restoration
                sessionStorage.removeItem('productFilters');
            } catch (error) {
                console.error('Error restoring filters:', error);
                sessionStorage.removeItem('productFilters');
            }
        }
    }, []); // Only run once on component mount

    // Separate useEffect for fetching products
    const [filtersRestored, setFiltersRestored] = useState(false);

    useEffect(() => {
        // ...restoring filters...
        setFiltersRestored(true);
    }, []);

    useEffect(() => {
        if (filtersRestored) {
            fetchProducts(searchTerm);
        }
    }, [filtersRestored, currentPage, itemsPerPage, searchTerm, statusFilter, selectedDate, selectedSubCategory]);

    //fetch all the products 
    const fetchProducts = async (searchTerm = "") => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                search: searchTerm,
                statusFilter: statusFilter,
                date: selectedDate ? selectedDate.toISOString() : null,
                subCategory: selectedSubCategory
            };
            // console.log("Fetching products with params:", params); // Debugging

            const response = await axios.get(`${backendUrl}/api/product/all`, {
                params,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data && Array.isArray(response.data.data)) {
                const allProducts = response.data.data;
                setProducts(allProducts);
                setTotalPages(response.data.pagination.totalPages); // Set total pages for pagination
                setTotalProducts(response.data.pagination.total); // Set total products for pagination
                setFilteredProducts(response.data.data);
            } else {
                console.error("Expected an array but got:", response.data);
                setProducts([]);
                setFilteredProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
            setFilteredProducts([]);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    //Handle edit product function
    const handleEdit = (id) => {
        // Store current filter state in sessionStorage
        const filterState = {
            searchTerm,
            statusFilter,
            selectedDate: selectedDate ? selectedDate.toISOString() : null,
            selectedMainCategory,
            selectedSubCategory,
            currentPage,
            itemsPerPage
        };
        sessionStorage.setItem('productFilters', JSON.stringify(filterState));
        console.log("Stored filter state:", filterState); // Debugging
        navigate(`/adminpanel/products/editproduct/${id}`);
    };

    //Handle view product function
    const handleView = (id) => {
        setSelectedProductForView(id);
        setOpenProductDialog(true);
    };

    //Handle close product dialog
    const handleCloseProductDialog = () => {
        setOpenProductDialog(false);
        setSelectedProductForView(null);
    };

    //Delete product function
    const handleDelete = async () => {
        try {
            setLoading(true)
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/${selectedProductId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.Success) {
                toast.success("Product deleted successfully", selectedProductId);
                fetchProducts();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to delete product");
        } finally {
            setLoading(false);
            setOpenDialog(false);
        }


    };

    //Open delete dialog function
    const openDeleteDialog = (_id) => {
        console.log("Delete product ID:", _id);
        setSelectedProductId(_id);
        setOpenDialog(true);
    };

    //Table Columns
    const productColumns = [
        { id: "Id", label: "ID", width: 80 },
        { id: "productCard", label: "Product", },
        { id: "date", label: "Updated at" },
        { id: "availability", label: "Stock Availability" },
        { id: "quantity", label: "Quantity" },
        { id: "stock", label: "Stock Value", width: 125 },
    ];

    //Get the category label from the subcategories
    const getCategoryLabel = (type) => {
        for (const category in subCategories) {
            const found = subCategories[category].find(item => item.value === type);
            if (found) return found.label;
        }
    };

    // Table Data
    const productData = useMemo(() => (
        Array.isArray(filteredProducts)
            ? filteredProducts.map(product => ({
                id: product._id,
                Id: `#${product._id?.slice(-4).toUpperCase() || "----"}`,
                productCard: <ProductCard name={product.name} type={getCategoryLabel(product.type)} src={product.imgUrls?.[0]?.url} />,
                date: <TimeCard date={new Date(product.updatedAt).toLocaleDateString()} time={new Date(product.updatedAt).toLocaleTimeString()} />,
                availability: <StatusCard Status={product.quantity > 5 ? "In Stock" : product.quantity <= 5 && product.quantity > 0 ? "Low Stock" : "Out of Stock"} />,
                quantity: < QuantityCard quantity={product.quantity} unitprice={`Unit Price - ${product.price?.toLocaleString() || 0} LKR`} />,
                stock: `${(product.quantity * product.price)?.toLocaleString() || 0} LKR`,
            }))
            : []
    ), [filteredProducts]);

    const iconTypes = ["view", "edit", "delete"];
    const iconActions = {
        view: (_id) => handleView(_id),
        edit: (_id) => handleEdit(_id),
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

    return (
        <div className='pl-6 grid grid-rows'>
            {/* Breadcrumbs */}
            <div className='mt-3'>
                <PageTitle value="Manage Products"></PageTitle>
                <CustomBreadcrumbs
                    paths={[
                        { label: 'Products', href: "/adminpanel/products/manageproduct" },
                        { label: 'Manage Product' },
                    ]} />
            </div>

            {/* Add Product Button */}
            <div className="pb-4 mr-4">
                <div className="float-right">
                    <AddButton
                        name="Add Product"
                        isBold={1}
                        buttonSize="medium"
                        fontSize="16px"
                        onClick={() => navigate('/adminpanel/products/createproduct')}
                    />
                </div>

            </div>


            <div className="mb-10 mr-4 border-2 border-black-200 rounded-md">
                {/* filtering from */}
                <div className='filterForm grid gap-4 grid-cols-1 flex flex-row p-4'>
                    <div className='filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4 flex flex-row'>
                        <div>
                            {/* Filter by Status */}
                            <InputField
                                type='select'
                                label="Stock"
                                options={StockType}
                                value={statusFilter}
                                onChange={(value) => handleInputChange('statusFilter', value)}
                                width='100%'
                            />
                        </div>
                        <div>
                            {/* Filter by Date */}
                            <SetDate
                                width="100%"
                                label="Date"
                                value={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date);
                                    setCurrentPage(1);
                                }}
                            >
                            </SetDate>
                        </div>
                        <div>
                            {/* Filter by Main Category */}
                            <InputField
                                type='select'
                                label="Main Category"
                                options={main}
                                value={selectedMainCategory}
                                onChange={handleMainCategoryChange}
                                width='100%'
                            />
                        </div>
                        <div>
                            {/* Filter by Sub Category */}
                            <InputField
                                type='select'
                                label="Sub Category"
                                options={subCategoryOptions}
                                disabled={!selectedMainCategory}
                                resetOnChange={handleMainCategoryChange}
                                value={selectedSubCategory}
                                onChange={(value) => handleSubCategoryChange(value)}
                                width='100%'
                            />
                        </div>
                        <div className="col-span-2 flex gap-4 items-end">
                            {/* Search Bar */}
                            <SearchBar
                                placeholder="Search"
                                width="100%"
                                value={searchTerm}
                                onChange={(e) => {
                                    const newSearchTerm = e.target.value;
                                    setSearchTerm(newSearchTerm);
                                    setCurrentPage(1);
                                    fetchProducts(newSearchTerm);
                                }}
                            />
                        </div>
                        <div className="col-span-2 flex justify">
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
                    <UserTable
                        columns={productColumns}
                        data={productData}
                        iconTypes={iconTypes}
                        iconActions={iconActions}
                        pagination={{
                            currentPage,
                            totalPages,
                            totalItems: totalProducts,
                            itemsPerPage,
                            onPageChange: handlePageChange,
                            onItemsPerPageChange: handleItemsPerPageChange
                        }}
                    />
                </div>
            </div>
            {/* Alert Message */}
            <DialogAlert
                name="Delete Product"
                Title="Confirm Deletion"
                message="Are you sure you want to delete this product? This action cannot be undone."
                Disagree="Cancel"
                Agree="Delete"
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                handleAgree={handleDelete}
                loading={loading}
            />
            {/* Product Details Dialog */}
            <ProductDetailsDialog
                open={openProductDialog}
                onClose={handleCloseProductDialog}
                productId={selectedProductForView}
            />
        </div>

    );
};

export default ManageProducts
