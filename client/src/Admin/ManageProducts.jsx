import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../MoleculesComponents/Table";
import ProductCard from "../AtomicComponents/Cards/Productcard";
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
    };

    //Set up state for selected subcategory and manufacture
    const handleSubCategoryChange = (value) => {
        setSelectedSubCategory(value);
    };

    //Handle input changes for filters
    const handleInputChange = (field, value) => {
        if (field === 'statusFilter') {
            setStatusFilter(value);
        }
        // Add more 
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, itemsPerPage]); // Add pagination dependencies

    //Fetch products using filters
    useEffect(() => {
        applyFilters();
    }, [statusFilter, selectedSubCategory, products, selectedDate]);

    //fetch all the products
    const fetchProducts = async (searchTerm = "") => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/all`, {
                params: {
                    search: searchTerm,
                    page: currentPage,
                    limit: itemsPerPage
                }
            });

            console.log("API Response:", response.data);// Debugging

            if (response.data && Array.isArray(response.data.data)) {
                const allProducts = response.data.data;
                setProducts(allProducts);
                setTotalPages(response.data.pagination.totalPages); // Set total pages for pagination
                setTotalProducts(response.data.pagination.total); // Set total products for pagination
                applyFilters(allProducts);
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
        }
    };

    //Apply the filters
    const applyFilters = (allProducts = products, selectedType = selectedSubCategory) => {
        let filtered = allProducts;

        // Filter by stock status
        if (statusFilter) {
            filtered = filtered.filter(product => {
                if (statusFilter === "In Stock") return product.quantity > 5;
                if (statusFilter === "Low Stock") return product.quantity > 0 && product.quantity <= 5;
                if (statusFilter === "Out of Stock") return product.quantity === 0;
                return true;
            });
        }

        // Filter by subcategory options
        if (selectedType) {
            filtered = filtered.filter(product => product.type === selectedType);
        }

        // Filter by Date
        if (selectedDate) {
            filtered = filtered.filter(product => {
                const productDate = new Date(product.updatedAt).toLocaleDateString();
                const selectedFormatted = new Date(selectedDate).toLocaleDateString();
                return productDate === selectedFormatted;
            });
        }

        setFilteredProducts(filtered);
    };

    //Handle edit product function
    const handleEdit = (id) => {
        navigate(`/adminpanel/products/createproduct/${id}`);
    };

    //Delete product function
    const handleDelete = async () => {
        try {
            setLoading(true)
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/product/${selectedProductId}`);
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
        { id: "Id", label: "ID" },
        { id: "productCard", label: "Product" },
        { id: "date", label: "Updated at" },
        { id: "availability", label: "Stock Availability" },
        { id: "quantity", label: "Quantity" },
        { id: "stock", label: "Stock Value" },
    ];

    //Get the category label from the subcategories
    const getCategoryLabel = (type) => {
        for (const category in subCategories) {
            const found = subCategories[category].find(item => item.value === type);
            if (found) return found.label;
        }
    };

    // Table Data
    const productData = Array.isArray(filteredProducts)
        ? filteredProducts.map(product => ({
            id: product._id,
            Id: `#${product._id?.slice(-4).toUpperCase() || "----"}`,
            productCard: <ProductCard name={product.name} type={getCategoryLabel(product.type)} src={product.imgUrls?.[0]?.url} />,
            date: <TimeCard date={new Date(product.updatedAt).toLocaleDateString()} time={new Date(product.updatedAt).toLocaleTimeString()} />,
            availability: <StatusCard Status={product.quantity > 5 ? "In Stock" : product.quantity <= 5 && product.quantity > 0 ? "Low Stock" : "Out of Stock"} />,
            quantity: < QuantityCard quantity={product.quantity} unitprice={`Unit Price - ${product.price}`} />,
            stock: `${product.quantity * product.price} LKR`,
        }))
        : [];

    const iconTypes = ["view", "edit", "delete"];
    const iconActions = {
        // view: handleView,
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
                        { label: 'Products', href: "/products" },
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
                                onChange={(date) => setSelectedDate(date)}
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
                                    setSearchTerm(e.target.value);
                                    fetchProducts(e.target.value);
                                }}
                            >
                            </SearchBar>
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
        </div>

    );
};

export default ManageProducts
