import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../MoleculesComponents/Table";
import InvoiceDetailsModal from "./InvoiceDetailsModal";
import CustomerCard from "../AtomicComponents/Cards/Customercard";
import DateCard from "../AtomicComponents/Cards/Datecard";
import CustomBreadcrumbs from "../AtomicComponents/Breadcrumb";
import { PageTitle } from "../AtomicComponents/Typographics/TextStyles";
import { AddButton } from "../AtomicComponents/Buttons/Buttons";
import { InputField } from "../AtomicComponents/Inputs/Input";
import { StockType, main } from "../AtomicComponents/ForAdminForms/Category";
import SetDate from "../AtomicComponents/Inputs/date";
import { SearchBar } from "../AtomicComponents/Inputs/Searchbar";

function InvoiceList() {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState([]);
  const [allInvoices, setAllInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [searchId, setSearchId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const invoiceColumns = [
    { id: "customerCard", label: "Customer" },
    { id: "startdate", label: "Created" },
    { id: "enddate", label: "Due" },
    { id: "amount", label: "Amount" },
  ];

  const iconActions = {
    view: (invoiceId) => {
      console.log("Invoice ID:", invoiceId);
      const invoice = allInvoices.find(
        (inv) => inv.raw.invoiceNumber === invoiceId
      );
      setSelectedInvoice(invoice);
      console.log("Selected Invoice: ", invoice);
      setOpenInvoiceModal(true);
    },
    edit: (id) => {
      //edit
    },
    delete: (id) => {},
  };

  // Fetch invoices from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/invoices/get")
      .then((res) => {
        const formattedInvoices = res.data.map((inv) => ({
          raw: inv,
          customerCard: (
            <CustomerCard
              name={inv.invoiceNumber}
              type={inv.invoiceNumber}
              src={
                inv.customerImage || "https://via.placeholder.com/150" // placeholder image
              }
            />
          ),
          startdate: <DateCard date={inv.dateCreated?.slice(0, 10)} />,
          enddate: <DateCard date={inv.dueDate?.slice(0, 10)} />,
          amount: `${inv.total} LKR`,
        }));

        setAllInvoices(formattedInvoices);
        setFilteredInvoices(formattedInvoices);
      })
      .catch((err) => {
        console.error("Failed to fetch invoices", err);
      });
  }, []);

  useEffect(() => {
    let filtered = allInvoices;

    if (searchId) {
      filtered = filtered.filter((inv) =>
        inv.raw.invoiceNumber.toLowerCase().includes(searchId.toLowerCase())
      );
    }

    if (startDate) {
      filtered = filtered.filter(
        (inv) => new Date(inv.raw.dateCreated) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (inv) => new Date(inv.raw.dueDate) <= new Date(endDate)
      );
    }

    setFilteredInvoices(filtered);
  }, [searchId, startDate, endDate, allInvoices]);

  const handleCloseInvoiceModal = () => {
    setOpenInvoiceModal(false);
  };

  return (
    <div>
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
          <div className="filterForm grid gap-4 grid-cols-1 p-4">
            <div className="filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4 ">
              <div>
                <InputField
                  type="text"
                  label="Search Invoice ID"
                  value={searchId}
                  onChange={(val) => setSearchId(val)}
                  width="100%"
                />
              </div>
              <div>
                <SetDate
                  width="100%"
                  label="Start Date"
                  onChange={(val) => setStartDate(val)}
                ></SetDate>
              </div>
              <div>
                <SetDate
                  width="100%"
                  label="End Date"
                  onChange={(val) => setEndDate(val)}
                ></SetDate>
              </div>
              <div>
                <SearchBar placeholder="Search" width="100%"></SearchBar>
              </div>
            </div>
          </div>
          <div sx={{ width: "100%", borderRadius: "20px" }}>
            <UserTable
              columns={invoiceColumns}
              data={filteredInvoices}
              iconTypes={["view", "edit", "delete"]}
              iconActions={iconActions}
              idKey="raw.invoiceNumber"
            />
          </div>
        </div>
      </div>
      {selectedInvoice && selectedInvoice.raw && (
        <InvoiceDetailsModal
          open={openInvoiceModal}
          onClose={handleCloseInvoiceModal}
          invoice={selectedInvoice.raw}
        />
      )}
    </div>
  );
}

export default InvoiceList;
