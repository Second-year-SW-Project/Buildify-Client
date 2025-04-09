import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomBreadcrumbs from "../AtomicComponents/Breadcrumb";
import { PageTitle } from "../AtomicComponents/Typographics/TextStyles";
import { AddButton } from "../AtomicComponents/Buttons/Buttons";
import { InputField } from "../AtomicComponents/Inputs/Input";
import { StockType, main } from "../AtomicComponents/ForAdminForms/Category";
import SetDate from "../AtomicComponents/Inputs/date";
import { SearchBar } from "../AtomicComponents/Inputs/Searchbar";
import { Divider, IconButton, TextField, Button } from "@mui/material";
import { Add, Save } from "@mui/icons-material";

function InvoiceCreate() {
  const navigate = useNavigate();

  const [fromEdit, setFromEdit] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  return (
    <div className="pl-6 grid grid-rows">
      <div className="mt-3 mb-6">
        <PageTitle value="Create Invoice"></PageTitle>
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
            sx={{ borderColor: "primary.main", mx: 2, borderRightWidth: "2px" }}
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
      </div>

      <div className="mr-4 border-2 border-black-200 rounded-md">
        <div className="filterForm grid gap-4 grid-cols-1 flex flex-row p-4">
          <div className="filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4 flex flex-row">
            <div>
              <InputField
                type="select"
                label="All Orders"
                options={StockType}
                width="100%"
              />
            </div>
            <div>
              <SetDate width="100%" label="Start Date"></SetDate>
            </div>
            <div>
              <SetDate width="100%" label="End Date"></SetDate>
            </div>
            <div>
              <SearchBar placeholder="Search" width="100%"></SearchBar>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-4 mr-4">
        <div className="float-right">
          <AddButton
            name="Create Invoice"
            isBold={1}
            buttonSize="medium"
            fontSize="16px"
            onClick={() => navigate("/invoice/invoicecreate")}
          />
        </div>
      </div>
    </div>
  );
}

export default InvoiceCreate;
