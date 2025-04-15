import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomBreadcrumbs from "../AtomicComponents/Breadcrumb";
import { PageTitle } from "../AtomicComponents/Typographics/TextStyles";
import { AddButton } from "../AtomicComponents/Buttons/Buttons";
import { InputField } from "../AtomicComponents/Inputs/Input";
import {
  StockType,
  InvoiceStatus,
} from "../AtomicComponents/ForAdminForms/Category";
import SetDate from "../AtomicComponents/Inputs/date";
import { Divider, IconButton, TextField, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Iconset from "../AtomicComponents/Icons/Iconset.jsx";

function InvoiceCreate() {
  const navigate = useNavigate();

  // State for from fields
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("draft");
  const [dateCreated, setDateCreated] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [fromEdit, setFromEdit] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [items, setItems] = useState([
    {
      itemCode: "",
      itemName: "",
      subCategory: "",
      quantity: 1,
      price: "0",
    },
  ]);

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

  // Item management
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
        price: "0",
      },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // API Configuration
  const API_URL = "http://localhost:8000/api/invoices";

  const handleSubmit = async (isDraft = false) => {
    const invoiceData = {
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
      invoiceStatus: isDraft ? "draft" : invoiceStatus,
      dateCreated,
      dueDate,
    };

    try {
      const response = await axios.post(`${API_URL}/create`, invoiceData);
      alert(response.data.message);
      // navigate("/invoices");
    } catch (error) {
      console.error("Invoice creation failed:", error);
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <div className="pl-6 grid grid-rows">
        <div className="mt-3 mb-6">
          <PageTitle value="Create Invoice" />
          <CustomBreadcrumbs
            paths={[
              { label: "Invoice", href: "/invoice/invoicecreate" },
              { label: "Create Invoice" },
            ]}
          />
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md border border-purple-600 mb-2">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-purple-600 font-semibold mb-1">From:</p>
                <IconButton onClick={() => setFromEdit(!fromEdit)} size="small">
                  <Add fontSize="small" />
                </IconButton>
              </div>
              {fromEdit ? (
                <div className="space-y-2">
                  <InputField
                    type="textarea"
                    label="From"
                    variant="outlined"
                    width="100%"
                    row="8"
                    onChange={setFromAddress}
                    value={fromAddress}
                  />
                  <AddButton
                    name="Save"
                    isBold={1}
                    buttonSize="medium"
                    fontSize="16px"
                    onClick={() => setFromEdit(false)}
                  />
                </div>
              ) : fromAddress ? (
                <p className="text-gray-800">{fromAddress}</p>
              ) : (
                <p className="text-gray-400 italic">No address added.</p>
              )}
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
                <IconButton onClick={() => setToEdit(!toEdit)} size="small">
                  <Add fontSize="small" />
                </IconButton>
              </div>
              {toEdit ? (
                <div className="space-y-2">
                  <InputField
                    type="textarea"
                    label="To"
                    variant="outlined"
                    width="100%"
                    row="8"
                    onChange={setToAddress}
                    value={toAddress}
                  />
                  <AddButton
                    name="Save"
                    isBold={1}
                    buttonSize="medium"
                    fontSize="16px"
                    onClick={() => setToEdit(false)}
                  />
                </div>
              ) : toAddress ? (
                <p className="text-gray-800">{toAddress}</p>
              ) : (
                <p className="text-gray-400 italic">No address added.</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 p-2">
            <div className="grid gap-y-4 gap-x-4 grid-cols-4">
              <div>
                <InputField
                  type="textarea"
                  label="Invoice Number"
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
                <div key={index} className="flex gap-4 w-full items-end mb-4">
                  <InputField
                    type="select"
                    label="Item code"
                    options={StockType}
                    width="100%"
                    value={item.itemCode}
                    onChange={(val) => handleItemChange(index, "itemCode", val)}
                  />
                  <div className="flex flex-col w-full">
                    <p className="mb-1">Item Name</p>
                    <TextField
                      size="small"
                      value={item.itemName}
                      onChange={(e) =>
                        handleItemChange(index, "itemName", e.target.value)
                      }
                    />
                  </div>
                  <InputField
                    type="select"
                    label="Sub Category"
                    options={StockType}
                    width="100%"
                    value={item.subCategory}
                    onChange={(val) =>
                      handleItemChange(index, "subCategory", val)
                    }
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
            <div className="ml-auto w-1/3">
              <div className="grid grid-cols-2 gap-x-2 ">
                <InputField
                  type="text"
                  Placeholder="LKR"
                  label="Shipping Cost"
                  width="100%"
                  value={shippingCost}
                  onChange={(val) => setShippingCost(val)}
                />
                <InputField
                  type="text"
                  Placeholder="LKR"
                  label="Discount"
                  width="100%"
                  value={discount}
                  onChange={(val) => setDiscount(val)}
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
                name="Create Invoice"
                isBold={1}
                buttonSize="medium"
                fontSize="16px"
                onClick={() => handleSubmit(false)}
              />
              <Button
                variant="outlined"
                size="medium"
                onClick={() => handleSubmit(true)}
              >
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceCreate;
