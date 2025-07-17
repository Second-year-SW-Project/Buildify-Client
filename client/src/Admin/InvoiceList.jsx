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
import SetDate from "../AtomicComponents/Inputs/date";
import { SearchBar } from "../AtomicComponents/Inputs/Searchbar";
import { toast } from "sonner";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function InvoiceList() {
  const navigate = useNavigate();
  const [allInvoices, setAllInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [searchId, setSearchId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const invoiceColumns = [
    { id: "customerCard", label: "Invoice Id" },
    { id: "startdate", label: "Created" },
    { id: "enddate", label: "Due" },
    { id: "amount", label: "Amount" },
  ];

  const iconActions = {
    view: (invoiceId) => {
      const invoice = allInvoices.find(
        (inv) => inv.raw.invoiceNumber === invoiceId
      );
      setSelectedInvoice(invoice);
      console.log("Selected Invoice: ", invoice);
      setOpenInvoiceModal(true);
    },
    edit: (invoiceId) => {
      const invoice = allInvoices.find(
        (inv) => inv.raw.invoiceNumber === invoiceId
      );
      if (invoice) {
        navigate(`/adminpanel/invoice/invoiceedit/${invoice.raw._id}`);
      }
    },
    delete: (invoiceId) => {
      const invoice = allInvoices.find(
        (inv) => inv.raw.invoiceNumber === invoiceId
      );
      if (invoice) {
        handleDeleteInvoice(invoice);
      }
    },
  };

  // Delete invoice toast
  const handleDeleteInvoice = (invoice) => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this invoice?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                deleteInvoice(invoice.raw._id);
                toast.dismiss(t);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  };

  // Fetch invoices
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/invoices/get`)
      .then((res) => {
        const formattedInvoices = res.data.map((inv) => ({
          raw: inv,
          customerCard: (
            <CustomerCard name={inv.invoiceNumber} status={inv.invoiceStatus} />
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
        toast.error("Failed to fetch invoices, please try again.");
      });
  }, []);

  // Delete invoices
  const deleteInvoice = async (invoiceId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/invoices/delete/${invoiceId}`
      );
      console.log(response.data.message);

      // Remove the deleted invoice from the state
      const updatedInvoices = allInvoices.filter(
        (inv) => inv.raw._id !== invoiceId
      );

      setAllInvoices(updatedInvoices);
      setFilteredInvoices(updatedInvoices);
      toast.success("Invoice deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting invoice:",
        error.response?.data?.error || error.message
      );
      toast.error(
        "Error deleting invoice:",
        error.response?.data?.error || error.message
      );
    }
  };

  // Filter logic
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
              onClick={() => navigate("/adminpanel/invoice/invoicecreate")}
            />
          </div>
        </div>

        <div className="mr-4 border-2 border-black-200 rounded-md">
          <div className="filterForm grid gap-4 grid-cols-1 p-4">
            <div className="filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-3 ">
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
            </div>
          </div>
          <div>
            <div style={{ width: "100%", borderRadius: "20px" }}>
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
