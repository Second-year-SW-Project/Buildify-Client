import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CustomBreadcrumbs from "../AtomicComponents/Breadcrumb";
import { PageTitle } from "../AtomicComponents/Typographics/TextStyles";
import { AddButton } from "../AtomicComponents/Buttons/Buttons";
import { InputField } from "../AtomicComponents/Inputs/Input";
import { InvoiceStatus } from "../AtomicComponents/ForAdminForms/Category";
import SetDate from "../AtomicComponents/Inputs/date";
import {
  Divider,
  TextField,
  Button,
  Autocomplete,
  Skeleton,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import Iconset from "../AtomicComponents/Icons/Iconset.jsx";
import { toast } from "sonner";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function InvoiceEdit() {
  const navigate = useNavigate();
  const { invoiceId } = useParams();

  // State for form fields
  const [invoiceData, setInvoiceData] = useState(null);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [dateCreated, setDateCreated] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  // Fetch invoice data for editing
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/invoices/get/${invoiceId}`
        );

        if (res.data) {
          setInvoiceData(res.data);
          setItems(res.data.items || []);
        } else {
          console.error("Invoice data not found:", res.data);
          toast.error("Invoice data not found.");
        }
      } catch (err) {
        console.error("Error fetching invoice data:", err);
        toast.error("Error fetching invoice data.");
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  // Fetch products for dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/all`, {
          params: { search: "" },
        });
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Update states based on fetched invoice data
  useEffect(() => {
    if (invoiceData) {
      setInvoiceNumber(invoiceData.invoiceNumber);
      setInvoiceStatus(invoiceData.invoiceStatus);
      setDateCreated(new Date(invoiceData.dateCreated));
      setDueDate(new Date(invoiceData.dueDate));
      setShippingCost(invoiceData.shippingCost);
      setDiscount(invoiceData.discount);
      setFromAddress(invoiceData.fromAddress);
      setToAddress(invoiceData.toAddress);
    }
  }, [invoiceData]);

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        itemCode: "",
        itemName: "",
        subCategory: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Price calculations
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const itemTotal =
        parseFloat(item.price || 0) * parseFloat(item.quantity || 0);
      return sum + itemTotal;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const total =
    subtotal + parseFloat(shippingCost || 0) - parseFloat(discount || 0);

  //Update Invoice
  const handleSubmit = async () => {
    const invoiceDataToUpdate = {
      fromAddress,
      toAddress,
      items: items.map((item) => ({
        itemCode: item.itemCode,
        itemName: item.itemName,
        subCategory: item.subCategory,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingCost: parseFloat(shippingCost),
      discount: parseFloat(discount),
      subtotal,
      total,
      invoiceNumber,
      invoiceStatus,
      dateCreated,
      dueDate,
    };

    try {
      const response = await axios.put(
        `${API_URL}/edit/${invoiceId}`,
        invoiceDataToUpdate
      );
      toast.success(response.data.message);
      navigate("/adminpanel/invoice/invoicelist");
    } catch (error) {
      console.error("Invoice update failed:", error);
      console.log("Error details:", error.response?.data);
      toast.error(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <div className="pl-6 grid grid-rows">
        <div className="mt-3 mb-6">
          <PageTitle value="Edit Invoice" />
          <CustomBreadcrumbs
            paths={[
              { label: "Invoice", href: "/invoice/invoiceedit" },
              { label: "Edit Invoice" },
            ]}
          />
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md border border-purple-600 mb-2">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-purple-600 font-semibold mb-1">From:</p>
              </div>
              <p className="text-gray-800">{fromAddress}</p>
            </div>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: "primary.main",
                mx: 2,
                borderRightWidth: "2px",
              }}
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-purple-600 font-semibold mb-1">To:</p>
              </div>
              <p className="text-gray-800">{toAddress}</p>
            </div>
          </div>

          <div className="grid gap-4 p-2">
            <div className="grid gap-y-4 gap-x-4 grid-cols-4">
              <div>
                <InputField
                  type="text"
                  label="Invoice Number*"
                  width="100%"
                  value={invoiceNumber}
                  onChange={setInvoiceNumber}
                />
              </div>
              <div>
                <InputField
                  type="select"
                  label="Status"
                  options={InvoiceStatus}
                  width="100%"
                  value={invoiceStatus}
                  onChange={setInvoiceStatus}
                />
              </div>
              <div>
                <SetDate
                  width="100%"
                  label="Date Created"
                  value={dateCreated}
                  onChange={setDateCreated}
                />
              </div>
              <div>
                <SetDate
                  width="100%"
                  label="Due Date"
                  value={dueDate}
                  onChange={setDueDate}
                />
              </div>
            </div>

            <div>
              <p className="text-purple-600 font-semibold mb-1">Details:</p>
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 w-full items-start mb-4">
                  <Autocomplete
                    options={products}
                    getOptionLabel={(option) => option._id || option.name}
                    onChange={(e, value) => {
                      if (value) {
                        handleItemChange(index, "itemCode", value._id);
                        handleItemChange(index, "itemName", value.name);
                        handleItemChange(index, "subCategory", value.type);
                        handleItemChange(index, "price", value.price);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Item Code" fullWidth />
                    )}
                  />
                  <InputField
                    type="text"
                    label="Item name"
                    width="100%"
                    value={item.itemName}
                    onChange={(val) => handleItemChange(index, "itemName", val)}
                  />

                  <TextField
                    label="Sub Category"
                    value={item.subCategory}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <InputField
                    type="number"
                    Auto={1}
                    label="Quantity"
                    width="100%"
                    value={item.quantity}
                    onChange={(val) => handleItemChange(index, "quantity", val)}
                  />
                  <InputField
                    type="text"
                    Placeholder="LKR"
                    label="Selling Price"
                    width="100%"
                    value={item.price}
                    onChange={(val) => handleItemChange(index, "price", val)}
                  />
                  {items.length > 1 && (
                    <div className="p-2">
                      <Button
                        color="error"
                        startIcon={<Iconset type="delete" />}
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={addItem}
                className="mt-2"
              >
                Add Item
              </Button>
            </div>

            {/* Calculation section */}
            <div className="ml-auto w-1/3">
              <div className="grid grid-cols-2 gap-x-2 ">
                <InputField
                  type="text"
                  Placeholder="LKR"
                  label="Shipping Cost"
                  width="100%"
                  value={shippingCost}
                  onChange={setShippingCost}
                />
                <InputField
                  type="text"
                  Placeholder="LKR"
                  label="Discount"
                  width="100%"
                  value={discount}
                  onChange={setDiscount}
                />
              </div>
              <div className="float-right">
                <p className="text-purple-600 font-semibold mb-1">
                  Subtotal: LKR {subtotal.toFixed(2)}
                </p>
                <p className="text-purple-600 font-semibold mb-1">
                  Shipping: LKR {parseFloat(shippingCost || 0).toFixed(2)}
                </p>
                <p className="text-purple-600 font-semibold mb-1">
                  Discount: LKR {parseFloat(discount || 0).toFixed(2)}
                </p>
                <p className="font-semibold mb-1 text-lg">
                  Total: LKR {total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-4 mr-4">
          <div className="float-right">
            <div className="flex gap-2">
              <AddButton
                name="Save Changes"
                isBold={1}
                buttonSize="medium"
                fontSize="16px"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceEdit;
