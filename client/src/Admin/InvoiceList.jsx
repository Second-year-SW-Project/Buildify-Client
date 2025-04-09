import React from "react";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../MoleculesComponents/Table";
import CustomerCard from "../AtomicComponents/Cards/Customercard";
import TimeCard from "../AtomicComponents/Cards/TimeCard";
import CustomBreadcrumbs from "../AtomicComponents/Breadcrumb";
import { PageTitle } from "../AtomicComponents/Typographics/TextStyles";
import { AddButton } from "../AtomicComponents/Buttons/Buttons";
import { InputField } from "../AtomicComponents/Inputs/Input";
import { StockType, main } from "../AtomicComponents/ForAdminForms/Category";
import SetDate from "../AtomicComponents/Inputs/date";
import { SearchBar } from "../AtomicComponents/Inputs/Searchbar";
import ToolpadFixer from "../MoleculesComponents/ToolpadFixer";

function InvoiceList() {
  const navigate = useNavigate();

  const invoiceColumns = [
    { id: "customerCard", label: "Customer" },
    { id: "startdate", label: "Created" },
    { id: "enddate", label: "Due" },
    { id: "amount", label: "Amount" },
  ];

  const invoiceData = [
    {
      customerCard: (
        <CustomerCard
          name="ASUS ROG Strix SCAR 16 (2024) G634JZR"
          type="Casing"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi50-FcEbEamVMqvkhUo8jklEge0uZIG9pbg&s"
        />
      ),
      startdate: <TimeCard date="2024-02-14" time="1.30 pm" />,
      enddate: <TimeCard date="2024-02-14" time="1.30 pm" />,
      amount: "720,000 LKR",
    },
  ];

  const iconTypes = ["view", "edit", "delete"];

  return (
    <div>
      <ToolpadFixer></ToolpadFixer>
      <div className="ml-[330px] -mt-[600px]">
    <div className="pl-6 grid grid-rows">
      <div className="mt-3">
        <PageTitle value="Invoice List"></PageTitle>
        <CustomBreadcrumbs
          paths={[
            { label: "Invoice", href: "/invoice/invoicelist" },
            { label: "Invoice List" },
          ]}
        />
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
        <div sx={{ width: "100%", borderRadius: "20px" }}>
          <UserTable
            columns={invoiceColumns}
            data={invoiceData}
            iconTypes={iconTypes}
          />
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default InvoiceList;
