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
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";
import { InputField } from "../AtomicComponents/Inputs/Input";
import SetDate from "../AtomicComponents/Inputs/date";
import { SearchBar } from "../AtomicComponents/Inputs/Searchbar";
import { toast } from "sonner";
import FullScreenLoader from "../AtomicComponents/FullScreenLoader";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function InvoiceList() {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);

  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const invoiceColumns = [
    { id: "customerCard", label: "Invoice Id" },
    { id: "startdate", label: "Created" },
    { id: "enddate", label: "Due" },
    { id: "amount", label: "Amount" },
  ];

  const iconActions = {
    view: (invoiceId) => {
      const invoice = invoices.find(
        (inv) => inv.raw.invoiceNumber === invoiceId
      );
      setSelectedInvoice(invoice);
      setOpenInvoiceModal(true);
    },
    edit: (invoiceId) => {
      const invoice = invoices.find(
        (inv) => inv.raw.invoiceNumber === invoiceId
      );
      if (invoice) {
        navigate(`/adminpanel/invoice/invoiceedit/${invoice.raw._id}`);
      }
    },
    delete: (invoiceId) => {
      const invoice = invoices.find(
        (inv) => inv.raw.invoiceNumber === invoiceId
      );
      if (invoice) {
        handleDeleteInvoice(invoice);
      }
    },
  };
  const handleConfirmDelete = async () => {
    if (!invoiceToDelete) return;

    setLoading(true);
    try {
      await axios.delete(
        `${backendUrl}/api/invoices/delete/${invoiceToDelete.raw._id}`
      );
      toast.success("Invoice deleted successfully!");
      setInvoices((prev) =>
        prev.filter((inv) => inv.raw._id !== invoiceToDelete.raw._id)
      );
      setOpenDialog(false);
      setInvoiceToDelete(null);
    } catch (error) {
      toast.error("Failed to delete invoice");
    } finally {
      setLoading(false);
    }
  };

  // const iconActions = {
  //   view: (invoiceId) => {
  //     const invoice = allInvoices.find(
  //       (inv) => inv.raw.invoiceNumber === invoiceId
  //     );
  //     setSelectedInvoice(invoice);
  //     console.log("Selected Invoice: ", invoice);
  //     setOpenInvoiceModal(true);
  //   },
  //   edit: (invoiceId) => {
  //     const invoice = allInvoices.find(
  //       (inv) => inv.raw.invoiceNumber === invoiceId
  //     );
  //     if (invoice) {
  //       navigate(`/adminpanel/invoice/invoiceedit/${invoice.raw._id}`);
  //     }
  //   },
  //   delete: (invoiceId) => {
  //     const invoice = allInvoices.find(
  //       (inv) => inv.raw.invoiceNumber === invoiceId
  //     );
  //     if (invoice) {
  //       handleDeleteInvoice(invoice);
  //     }
  //   },
  // };

  // Delete invoice toast
  const handleDeleteInvoice = (invoice) => {
    setInvoiceToDelete(invoice);
    setOpenDialog(true);
  };

  // Fetch invoices
  useEffect(() => {
    async function fetchInvoices() {
      setLoading(true);
      try {
        const params = {
          page,
          limit: rowsPerPage,
        };

        if (searchId) params.search = searchId;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await axios.get(`${backendUrl}/api/invoices/get`, {
          params,
        });

        // Your backend returns: { data: invoices[], totalCount: number }
        const formattedInvoices = response.data.data.map((inv) => ({
          raw: inv,
          customerCard: (
            <CustomerCard name={inv.invoiceNumber} status={inv.invoiceStatus} />
          ),
          startdate: <DateCard date={inv.dateCreated?.slice(0, 10)} />,
          enddate: <DateCard date={inv.dueDate?.slice(0, 10)} />,
          amount: `${inv.total} LKR`,
        }));

        setInvoices(formattedInvoices);
        setTotalItems(response.data.totalCount);
      } catch (err) {
        console.error("Failed to fetch invoices", err);
        toast.error("Failed to fetch invoices, please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, [page, rowsPerPage, searchId, startDate, endDate]);

  // Delete invoices
  const deleteInvoice = async (invoiceId) => {
    try {
      await axios.delete(`${backendUrl}/api/invoices/delete/${invoiceId}`);
      toast.success("Invoice deleted successfully!");
      // After deletion, refetch invoices to update list
      fetchInvoices();
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
        error.message ||
        "Failed to delete invoice"
      );
    }
  };
  // const deleteInvoice = async (invoiceId) => {
  //   try {
  //     const response = await axios.delete(
  //       `${backendUrl}/api/invoices/delete/${invoiceId}`
  //     );
  //     console.log(response.data.message);

  //     // Remove the deleted invoice from the state
  //     const updatedInvoices = allInvoices.filter(
  //       (inv) => inv.raw._id !== invoiceId
  //     );

  //     setAllInvoices(updatedInvoices);
  //     setFilteredInvoices(updatedInvoices);
  //     setPage(1);
  //     toast.success("Invoice deleted successfully!");
  //   } catch (error) {
  //     console.error(
  //       "Error deleting invoice:",
  //       error.response?.data?.error || error.message
  //     );
  //     toast.error(
  //       "Error deleting invoice:",
  //       error.response?.data?.error || error.message
  //     );
  //   }
  // };

  // Filter logic
  // useEffect(() => {
  //   let filtered = allInvoices;

  //   if (searchId) {
  //     filtered = filtered.filter((inv) =>
  //       inv.raw.invoiceNumber.toLowerCase().includes(searchId.toLowerCase())
  //     );
  //   }

  //   if (startDate) {
  //     filtered = filtered.filter(
  //       (inv) => new Date(inv.raw.dateCreated) >= new Date(startDate)
  //     );
  //   }

  //   if (endDate) {
  //     filtered = filtered.filter(
  //       (inv) => new Date(inv.raw.dueDate) <= new Date(endDate)
  //     );
  //   }

  //   setFilteredInvoices(filtered);
  // }, [searchId, startDate, endDate, allInvoices]);

  const handleCloseInvoiceModal = () => {
    setOpenInvoiceModal(false);
  };

  return (
    <>
      <FullScreenLoader open={loading} message={"Loading Data..."} />
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
                  data={invoices}
                  iconTypes={["view", "edit", "delete"]}
                  iconActions={iconActions}
                  idKey="raw.invoiceNumber"
                  pagination={{
                    currentPage: page,
                    itemsPerPage: rowsPerPage,
                    totalItems,
                    onPageChange: (newPage) => setPage(newPage),
                    onItemsPerPageChange: (newSize) => {
                      setRowsPerPage(newSize);
                      setPage(1);
                    },
                  }}
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
        <DialogAlert
          name="Delete Order"
          Title="Confirm Deletion"
          message="Are you sure you want to delete this Order? This action cannot be undone."
          Disagree="Cancel"
          Agree="Delete"
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          handleAgree={handleConfirmDelete}
          loading={loading}
        />
        ;
      </div>
    </>
  );
}

export default InvoiceList;
