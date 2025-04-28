import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function InvoiceDetailsModal({ open, onClose, invoice }) {
  if (!invoice) return null;

  const downloadInvoicePdf = () => {
    const invoiceElement = document.getElementById("invoice-content");
    const previousOverflow = invoiceElement.style.overflow;

    // Disable overflow for full capture
    invoiceElement.style.overflow = "visible";

    html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice-${invoice?.invoiceNumber}.pdf`);

      // Reset overflow style
      invoiceElement.style.overflow = previousOverflow;
    });
  };

  const formatInvoiceStatus = (status) => {
    if (!status) return "";

    // Insert space before every capital letter
    const spaced = status.replace(/([A-Z])/g, " $1");

    // Capitalize first letter
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  };
  console.log(invoice.invoiceStatus);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent id="invoice-content" sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="bold" fontSize={23}>
            Invoice
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography color="primary" fontWeight="bold" mb={1}>
              {formatInvoiceStatus(invoice.invoiceStatus)}
            </Typography>

            <Typography fontWeight="bold" fontSize={20}>
              {invoice.invoiceNumber}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography color="primary" fontWeight="bold" mb={1}>
              Invoice From:
            </Typography>
            <Typography fontWeight="bold">{invoice.fromName}</Typography>
            {invoice.fromAddress.split(",").map((line, index) => (
              <Typography key={index}>{line.trim()}</Typography>
            ))}
            <Typography>{invoice.fromContact}</Typography>
          </Box>

          <Box>
            <Typography color="primary" fontWeight="bold" mb={1}>
              Invoice To:
            </Typography>
            <Typography fontWeight="bold">{invoice.toName}</Typography>
            {invoice.toAddress.split(",").map((line, index) => (
              <Typography key={index}>{line.trim()}</Typography>
            ))}
            <Typography>{invoice.toContact}</Typography>
          </Box>

          {/* Dates */}
          <Box>
            <Typography fontWeight="bold" mb={1}>
              Date created
            </Typography>
            <Typography>
              {new Date(invoice.dateCreated).toLocaleDateString()}
            </Typography>
            <Typography fontWeight="bold" mt={2}>
              Due date
            </Typography>
            <Typography>
              {new Date(invoice.dueDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Items Table */}
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F3E8FF" }}>
              <TableCell sx={{ width: "45%" }}>
                <strong>Description</strong>
              </TableCell>
              <TableCell align="center" sx={{ width: "5%" }}>
                <strong>Quantity</strong>
              </TableCell>
              <TableCell align="right" sx={{ width: "25%" }}>
                <strong>Unit price</strong>
              </TableCell>
              <TableCell align="right" sx={{ width: "25%" }}>
                <strong>Total</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoice.items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Typography>{item.itemName}</Typography>
                  {item.SubCategory && (
                    <Typography variant="body2" color="text.secondary">
                      {item.SubCategory}
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">
                  {item.price.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {(item.quantity * item.price).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Totals */}
        <Box
          mt={3}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          gap={1}
        >
          <Box display="flex" width="300px" justifyContent="space-between">
            <Typography fontWeight="bold">Subtotal</Typography>
            <Typography>LKR {invoice.subtotal.toLocaleString()}</Typography>
          </Box>
          <Box display="flex" width="300px" justifyContent="space-between">
            <Typography fontWeight="bold">Shipping</Typography>
            <Typography>LKR {invoice.shippingCost.toLocaleString()}</Typography>
          </Box>
          <Box display="flex" width="300px" justifyContent="space-between">
            <Typography fontWeight="bold">Discount</Typography>
            <Typography>
              {invoice.discount
                ? `LKR ${invoice.discount.toLocaleString()}`
                : "-"}
            </Typography>
          </Box>
          <Divider sx={{ width: "300px", my: 1 }} />
          <Box display="flex" width="300px" justifyContent="space-between">
            <Typography fontWeight="bold" fontSize="1.2rem">
              Total
            </Typography>
            <Typography fontWeight="bold" fontSize="1.2rem">
              LKR {invoice.total.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={downloadInvoicePdf} color="secondary">
          Download PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InvoiceDetailsModal;
