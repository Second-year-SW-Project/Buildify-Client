import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../MoleculesComponents/Table";
import ProductCard from "../AtomicComponents/Cards/Productcard";
import TimeCard from "../AtomicComponents/Cards/TimeCard";
import QuantityCard from "../AtomicComponents/Cards/QuantityCard";
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import { AddButton } from "../AtomicComponents/Buttons/Buttons";
import { InputField } from "../AtomicComponents/Inputs/Input";
import { StockType, main, subCategories } from '../AtomicComponents/ForAdminForms/Category';
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
    applyFilters(products, '');
  };

  const handleSubCategoryChange = (selectedValue) => {
    dispatch(setSelectedSubCategory(selectedValue));
    applyFilters(products, selectedValue);
  };

  const handleInputChange = (field, value) => {
    if (field === 'statusFilter') {
      setStatusFilter(value);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [statusFilter, selectedSubCategory, products, selectedDate, searchTerm]);

  const fetchProducts = async (searchTerm = "") => {
    try {
      const response = await axios.get("http://localhost:8000/api/product/all", {
        params: searchTerm ? { search: searchTerm } : {},
      });

      if (response.data && Array.isArray(response.data.data)) {
        const allProducts = response.data.data;
        setProducts(allProducts);
        applyFilters(allProducts, selectedSubCategory);
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
    let filtered = [...allProducts];

    // Filter by stock status
    if (statusFilter) {
      filtered = filtered.filter((product) => {
        if (statusFilter === "InStock") return product.quantity > 5;
        if (statusFilter === "lowStock") return product.quantity > 0 && product.quantity <= 5;
        if (statusFilter === "OutStock") return product.quantity === 0;
        return true;
      });
    }

    // Filter by subcategory
    if (selectedType) {
      filtered = filtered.filter((product) => product.type === selectedType);
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter((product) => {
        const productDate = new Date(product.createdAt).toLocaleDateString();
        const selectedFormatted = new Date(selectedDate).toLocaleDateString();
        return productDate === selectedFormatted;
      });
    }

    // Filter by search term (enhanced to include new attributes)
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        [
          product.name,
          product.type,
          product.manufacturer,
          product.motherboardChipset || '',
          product.gpuChipset || '',
          product.coolerType || '',
          product.wattage?.toString() || '',
          product.modularType || '',
          product.storageType || '',
          product.tdp?.toString() || '',
        ].some((field) => field && field.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  };

  const handleEdit = (id) => {
    navigate(`/products/createproduct/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/product/${selectedProductId}`);
      if (response.data.Success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  const openDeleteDialog = (_id) => {
    setSelectedProductId(_id);
    setOpenDialog(true);
  };

  const productColumns = [
    { id: "productCard", label: "Product" },
    { id: "details", label: "Details" },
    { id: "date", label: "Created at" },
    { id: "availability", label: "Stock Availability" },
    { id: "quantity", label: "Quantity" },
    { id: "stock", label: "Stock Value" },
  ];

  const getCategoryLabel = (type) => {
    for (const category in subCategories) {
      const found = subCategories[category].find((item) => item.value === type);
      if (found) return found.label;
    }
    return type;
  };

  const getProductDetails = (product) => {
    switch (product.type) {
      case "processor":
        return `Socket: ${product.socketType || 'N/A'}, TDP: ${product.tdp || 'N/A'}W`;
      case "cooling":
        return `Type: ${product.coolerType || 'N/A'}, Max TDP: ${product.maxTdp || 'N/A'}W`;
      case "motherboard":
        return `Chipset: ${product.motherboardChipset || 'N/A'}, Form: ${product.formFactor || 'N/A'}`;
      case "ram":
        return `Type: ${product.memoryType || 'N/A'}, ${product.memoryCapacity || 'N/A'}GB`;
      case "storage":
        return `Type: ${product.storageType || 'N/A'}, ${product.storageCapacity || 'N/A'}GB`;
      case "gpu":
        return `Chipset: ${product.gpuChipset || 'N/A'}, VRAM: ${product.vram || 'N/A'}GB`;
      case "casing":
        return `Form: ${product.formFactor || 'N/A'}, Max GPU: ${product.maxGpuLength || 'N/A'}mm`;
      case "power":
        return `Wattage: ${product.wattage || 'N/A'}W, Rating: ${product.efficiencyRating || 'N/A'}`;
      default:
        return `Type: ${product.type || 'N/A'}`;
    }
  };

  const productData = Array.isArray(filteredProducts)
    ? filteredProducts.map((product) => ({
        id: product._id,
        productCard: (
          <ProductCard
            name={product.name}
            type={getCategoryLabel(product.type)}
            src={product.imgUrls?.[0]?.url || ''}
          />
        ),
        details: getProductDetails(product),
        date: (
          <TimeCard
            date={new Date(product.createdAt).toLocaleDateString()}
            time={new Date(product.createdAt).toLocaleTimeString()}
          />
        ),
        availability: (
          <StatusCard
            Status={
              product.quantity > 5
                ? "In Stock"
                : product.quantity <= 5 && product.quantity > 0
                ? "Low Stock"
                : "Out of Stock"
            }
          />
        ),
        quantity: (
          <QuantityCard
            quantity={product.quantity}
            unitprice={`Unit Price - ${product.price || 'N/A'}`}
          />
        ),
        stock: `${(product.quantity * product.price).toFixed(2) || '0.00'} LKR`,
      }))
    : [];

  const iconTypes = ["edit", "delete"];
  const iconActions = {
    edit: (_id) => handleEdit(_id),
    delete: (_id) => openDeleteDialog(_id),
  };

  return (
    <div className="pl-6 grid grid-rows">
      <div className="mt-3">
        <PageTitle value="Manage Products" />
        <CustomBreadcrumbs
          paths={[
            { label: "Products", href: "/products" },
            { label: "Manage Product" },
          ]}
        />
      </div>

      <div className="pb-4 mr-4">
        <div className="float-right">
          <AddButton
            name="Add Product"
            isBold={1}
            buttonSize="medium"
            fontSize="16px"
            onClick={() => navigate("/products/createproduct")}
          />
        </div>
      </div>

      <div className="mb-10 mr-4 border-2 border-gray-200 rounded-md">
        <div className="filterForm grid gap-4 grid-cols-1 flex flex-row p-4">
          <div className="filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4 flex flex-row">
            <div>
              <InputField
                type="select"
                label="Stock Status"
                options={StockType}
                value={statusFilter}
                onChange={(value) => handleInputChange("statusFilter", value)}
                width="100%"
              />
            </div>
            <div>
              <SetDate
                width="100%"
                label="Date"
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
            <div>
              <InputField
                type="select"
                label="Main Category"
                options={main}
                value={selectedMainCategory}
                onChange={handleMainCategoryChange}
                width="100%"
              />
            </div>
            <div>
              <InputField
                type="select"
                label="Sub Category"
                options={subCategoryOptions}
                disabled={!selectedMainCategory}
                value={selectedSubCategory}
                onChange={(value) => handleSubCategoryChange(value)}
                width="100%"
              />
            </div>
            <div className="col-span-2">
              <SearchBar
                placeholder="Search by name, type, chipset, etc."
                width="100%"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div sx={{ width: "100%", borderRadius: "20px" }}>
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
}

export default ManageProducts;