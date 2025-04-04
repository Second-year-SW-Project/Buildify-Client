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
import { StockType, main, subCategories } from '../AtomicComponents/ForProductForm/Category';
import SetDate from "../AtomicComponents/Inputs/date";
import { SearchBar } from "../AtomicComponents/Inputs/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMainCategory, setSelectedSubCategory } from "../Store/formSlice";
import StatusCard from "../AtomicComponents/Cards/StatusCard";
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";

function ManageProducts() {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        selectedMainCategory,
        subCategoryOptions,
        selectedSubCategory,
    } = useSelector((state) => state.form);

    const handleMainCategoryChange = (selectedValue) => {
        dispatch(setSelectedMainCategory(selectedValue));
        dispatch(setSelectedSubCategory(''));
    };

    const handleSubCategoryChange = (selectedValue) => {
        dispatch(setSelectedSubCategory(selectedValue));
        applyFilters(products, selectedValue);
    };


    const handleInputChange = (field, value) => {
        if (field === 'statusFilter') {
            setStatusFilter(value);
        }
        // Add more fields if needed
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [statusFilter, selectedSubCategory, products, selectedDate]);

    const fetchProducts = async (searchTerm = "") => {
        try {
            const response = await axios.get("http://localhost:8000/api/product/all", {
                params: searchTerm ? { search: searchTerm } : {}
            });

            console.log("API Response:", response.data);

            if (response.data && Array.isArray(response.data.data)) {
                const allProducts = response.data.data;
                setProducts(allProducts);
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
                const productDate = new Date(product.createdAt).toLocaleDateString();
                const selectedFormatted = new Date(selectedDate).toLocaleDateString();
                return productDate === selectedFormatted;
            });
        }

        setFilteredProducts(filtered);
    };

    const handleEdit = (id) => {
        navigate(`/products/edit/${id}`);
    };

    const handleDelete = async () => {
        try {
            console.log("funtion=================", selectedProductId)
            const response = await axios.delete(`http://localhost:8000/api/product/${selectedProductId}`);
            if (response.data.Success) {
                toast.success("Product deleted successfully", selectedProductId);
                fetchProducts();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to delete product");
        }
        setOpenDialog(false);
    };

    const openDeleteDialog = (_id) => {
        console.log("Delete product ID:", _id);
        setSelectedProductId(_id);
        setOpenDialog(true);
    };

    const productColumns = [
        { id: "productCard", label: "Product" },
        { id: "date", label: "Created at" },
        { id: "availability", label: "Stock Availability" },
        { id: "quantity", label: "Quantity" },
        { id: "stock", label: "Stock Value" },
    ];

    const getCategoryLabel = (type) => {
        for (const category in subCategories) {
            const found = subCategories[category].find(item => item.value === type);
            if (found) return found.label;
        }
    };

    const productData = Array.isArray(filteredProducts)
        ? filteredProducts.map(product => ({
            id: product._id,
            productCard: <ProductCard name={product.name} type={getCategoryLabel(product.type)} src={product.imgUrls?.[0]?.url} />,
            date: <TimeCard date={new Date(product.createdAt).toLocaleDateString()} time={new Date(product.createdAt).toLocaleTimeString()} />,
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


            <div className="mb-10 mr-4 border-2 border-black-200 rounded-md">
                <div className='filterForm grid gap-4 grid-cols-1 flex flex-row p-4'>
                    <div className='filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4 flex flex-row'>
                        <div>
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
                            <SetDate
                                width="100%"
                                label="Date"
                                onChange={(date) => setSelectedDate(date)}
                            >
                            </SetDate>
                        </div>
                        <div>
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
                            <InputField
                                type='select'
                                label="Sub Category"
                                options={subCategoryOptions}
                                disabled={!selectedMainCategory}
                                //reset when main category is changed
                                resetOnChange={handleMainCategoryChange}
                                value={selectedSubCategory}
                                onChange={(value) => handleSubCategoryChange(value)}
                                width='100%'
                            />
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
                <div sx={{ width: '100%', borderRadius: "20px" }}>
                    <UserTable
                        columns={productColumns}
                        data={productData}
                        iconTypes={iconTypes}
                        iconActions={iconActions}
                    />
                </div>
            </div>
            <DialogAlert
                name="Delete Product"
                Title="Confirm Deletion"
                message="Are you sure you want to delete this product? This action cannot be undone."
                Disagree="Cancel"
                Agree="Delete"
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                handleAgree={handleDelete}
            />
        </div>

    );
};

export default ManageProducts
