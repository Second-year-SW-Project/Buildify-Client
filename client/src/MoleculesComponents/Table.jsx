import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Avatar,
  Typography,
  Chip,
  Box,
  Stack,
  Collapse,
} from "@mui/material";
import theme from "../AtomicComponents/theme.jsx";
import Iconset from "../AtomicComponents/Icons/Iconset.jsx";
import { format } from "date-fns";
import OrderItemCard from "../AtomicComponents/Cards/OrderItemCard";
import UserCard from "../AtomicComponents/Cards/Usercard.jsx";

export function UserTable({
  columns,
  data,
  iconTypes = [],
  iconActions = {},
  width,
  color,
  idKey = "id",
  pagination = null,
}) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    if (pagination) {
      pagination.onPageChange(newPage + 1); // Convert to 1-based index for API
    } else {
      setPage(newPage);
    }
  };

  // Handle rows per page changes
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (pagination) {
      pagination.onItemsPerPageChange(newRowsPerPage);
    } else {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    }
  };

  const autoSizeCellStyle = {
    padding: "8px 16px", // Ensure consistent padding
    whiteSpace: "nowrap",
    wordBreak: 'break-word',
  };

  const getIdValue = (obj, key) => {
    return key.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  };

  // Use pagination props if provided, otherwise use local state
  const currentPage = pagination ? pagination.currentPage - 1 : page; // Convert to 0-based index for MUI
  const currentRowsPerPage = pagination ? pagination.itemsPerPage : rowsPerPage;
  const totalCount = pagination ? pagination.totalItems : data.length;

  return (
    <Paper style={{ width: width || "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              style={{ backgroundColor: theme.palette.primary100.main }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    ...autoSizeCellStyle,
                    color: color || "gray",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      ...autoSizeCellStyle,
                      color: color || "black",
                      fontWeight: "bold",
                      whiteSpace: 'normal',
                      minWidth: column.width || 'auto',
                    }}
                  >
                    {row[column.id]}
                  </TableCell>
                ))}
                {iconTypes.length > 0 && (
                  <TableCell style={autoSizeCellStyle}>
                    {iconTypes.map((type, idx) => (
                      <IconButton
                        key={idx}
                        disableRipple
                        onClick={() =>
                          iconActions[type] &&
                          iconActions[type](getIdValue(row, idKey))
                        }
                        translate="3s"
                        sx={{
                          "&:hover": {
                            color: theme.palette.primary.main,
                            opacity: 0.9,
                          },
                        }}
                      >
                        <Iconset
                          type={type}
                          isOpen={
                            type === "toggle" ? isRowOpen(row.id) : undefined
                          }
                        />
                      </IconButton>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={currentRowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => {
          const totalPages = pagination ? pagination.totalPages : Math.ceil(count / currentRowsPerPage);
          return `${from}-${to} of ${count} (Page ${currentPage + 1} of ${totalPages})`;
        }}
      />
    </Paper>
  );
}

export function OrderTable({
  columns,
  orders,
  iconTypes = [],
  iconActions = {},
  width,
  color,
  pagination = null,
  customRenderers = {},
}) {

  const [expandedRowId, setExpandedRowId] = React.useState(null);

  const toggleRow = (orderId) => {
    setExpandedRowId((prev) => (prev === orderId ? null : orderId));
  };

  const isRowOpen = (rowId) => expandedRowId === rowId;

  const statusColorMap = {
    Successful: "success",
    Pending: "warning",
    Refunded: "ternary",
    Canceled: "error",
    Shipped: "info",
    Delivered: "primary"
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    if (pagination) {
      pagination.onPageChange(newPage + 1); // Convert to 1-based index for API
    } else {
      setPage(newPage);
    }
  };

  // Handle rows per page changes
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (pagination) {
      pagination.onItemsPerPageChange(newRowsPerPage);
    } else {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    }
  };

  const autoSizeCellStyle = {
    padding: "8px 16px",
    whiteSpace: "nowrap",
    Maxwidth: "50%",
  };

  // Use pagination props if provided, otherwise use local state
  const currentPage = pagination ? pagination.currentPage - 1 : page; // Convert to 0-based index for MUI
  const currentRowsPerPage = pagination ? pagination.itemsPerPage : rowsPerPage;
  const totalCount = pagination ? pagination.totalItems : data.length;

  return (
    <Paper sx={{ width: width || "100%", overflow: "hidden", mt: 4 }}>
      <TableContainer>
        <Table sx={{ borderRadius: "20px" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary100.main }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    ...autoSizeCellStyle,
                    color: color || "gray",
                    fontWeight: "bold",
                    padding: column.padding,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => {
              const isOpen = isRowOpen(order._id);
              return (
                <React.Fragment key={order._id}>
                  <TableRow
                    sx={{
                      backgroundColor: isOpen
                        ? theme.palette.black200.main
                        : theme.palette.white.main,
                    }}
                    hover
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {order._id
                        ? `#${order._id.slice(-4).toUpperCase()}`
                        : "#----"}
                    </TableCell>
                    <TableCell>
                      {order.user_id ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar
                            src={order.profilePicture}
                            alt={order.user_name}
                            sx={{ width: 40, height: 40 }}
                          />
                          <Box>
                            <Typography variant="subtitle2" fontWeight={"bold"}>{order.user_name}</Typography>
                            <Typography variant="caption" color="textSecondary">{order.email}</Typography>
                          </Box>
                        </Box>
                      ) : (
                        <UserCard
                          name={order.user_name}
                          email={order.email}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {format(new Date(order.createdAt), "dd MMM yyyy")}
                      </Typography>
                      <Typography fontSize="small" color="gray">
                        {format(new Date(order.createdAt), "p")}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                      {order.items.length}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {order.total !== undefined
                        ? order.total.toLocaleString()
                        : "0"}{" "}
                      LKR
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={statusColorMap[order.status] || "default"}
                        size="small"
                        sx={{
                          padding: "5px",
                          height: "30px",
                          width: "100px",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    {iconTypes.length > 0 && (
                      <TableCell style={autoSizeCellStyle}>
                        {iconTypes.map((type, idx) => (
                          <IconButton
                            key={idx}
                            disableRipple
                            onClick={() =>
                              type === "toggle"
                                ? toggleRow(order._id)
                                : iconActions[type] &&
                                iconActions[type](order._id)
                            }
                            translate="3s"
                            sx={{
                              "&:hover": {
                                color: theme.palette.primary.main,
                                opacity: 0.9,
                              },
                            }}
                          >
                            <Iconset
                              type={type}
                              isOpen={
                                type === "toggle"
                                  ? isRowOpen(order._id)
                                  : undefined
                              }
                            />
                          </IconButton>
                        ))}
                      </TableCell>
                    )}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={8}
                    >
                      <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <Box margin={1} p={1}>
                          {order.items.map((item, i) => (
                            <Stack
                              key={item._id}
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                              bgcolor="#f8e9ff"
                              borderRadius={2}
                              width="100%"
                              mb={1}
                              p={1}
                            >
                              <Box flex={3} display="flex" alignItems="center">
                                <OrderItemCard
                                  name={item.name}
                                  type={item.type}
                                  src={item.product_image}
                                />
                              </Box>
                              <Box
                                flex={1}
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-end"
                                textAlign="right"
                              >
                                <Typography fontWeight="bold" flex={1}>
                                  x {item.quantity}
                                </Typography>
                                <Typography
                                  fontSize={14}
                                  flex={1}
                                  color="black500"
                                >
                                  Unit Price - {item.price}
                                </Typography>
                              </Box>
                              <Box
                                flex={1}
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="center"
                                textAlign="right"
                                marginRight={2}
                              >
                                <Typography fontWeight="bold" flex={1}>
                                  {item.price * item.quantity} LKR
                                </Typography>
                              </Box>
                            </Stack>
                          ))}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={currentRowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => {
          const totalPages = pagination ? pagination.totalPages : Math.ceil(count / currentRowsPerPage);
          return `${from}-${to} of ${count} (Page ${currentPage + 1} of ${totalPages})`;
        }}
      />
    </Paper>
  );
}

export function OrderSummary({
  columns,
  orders,
  width,
  color,
  pagination = null,
}) {
  const statusColorMap = {
    Successful: "success",
    Pending: "warning",
    Shipped: "info",
    Delivered: "primary"
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    if (pagination) {
      pagination.onPageChange(newPage + 1); // Convert to 1-based index for API
    } else {
      setPage(newPage);
    }
  };

  // Handle rows per page changes
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (pagination) {
      pagination.onItemsPerPageChange(newRowsPerPage);
    } else {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    }
  };

  const autoSizeCellStyle = {
    padding: "8px 16px",
    whiteSpace: "nowrap",
  };

  // Use pagination props if provided, otherwise use local state
  const currentPage = pagination ? pagination.currentPage - 1 : page;
  const currentRowsPerPage = pagination ? pagination.itemsPerPage : rowsPerPage;
  const totalCount = pagination ? pagination.totalItems : orders.length;

  return (
    <Paper sx={{ width: width || "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ borderRadius: "20px" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary100.main, borderRadius: "50px" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    ...autoSizeCellStyle,
                    color: color || "gray",
                    fontWeight: "bold",
                    width: column.width || 'auto',
                    padding: column.padding,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell sx={{ fontWeight: "bold" }} style={{ minWidth: 85 }}>
                  {order._id ? `#${order._id.slice(-4).toUpperCase()}` : "#----"}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} style={{ minWidth: 230 }}>
                    <Avatar
                      src={order.profilePicture}
                      alt={order.user_name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box sx={{
                      wordBreak: 'break-word'
                    }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {order.user_name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {order.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography style={{ minWidth: 130 }}>
                    {format(new Date(order.createdAt), "dd MMM yyyy")}
                  </Typography>
                  <Typography fontSize="small" color="gray">
                    {format(new Date(order.createdAt), "p")}
                  </Typography>
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  {order.address || "N/A"}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }} style={{ minWidth: 75 }}>
                  {order.items?.length || 0}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} style={{ minWidth: 120 }}>
                  {order.total !== undefined
                    ? order.total.toLocaleString()
                    : "0"}{" "}
                  LKR
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={statusColorMap[order.status] || "default"}
                    size="small"
                    sx={{
                      padding: "5px",
                      height: "30px",
                      width: "100px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={currentRowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => {
          const totalPages = pagination ? pagination.totalPages : Math.ceil(count / currentRowsPerPage);
          return `${from}-${to} of ${count} (Page ${currentPage + 1} of ${totalPages})`;
        }}
      />
    </Paper>
  );
}

export function GameTable({
  columns,
  data,
  width,
  color,
}) {
  // Only show the first 5 rows, no pagination
  const autoSizeCellStyle = {
    padding: "8px 10px",
    whiteSpace: "normal", // Allow wrapping
    wordBreak: "break-word", // Break long words
    maxWidth: 220, // Limit cell width for wrapping
  };
  return (
    <Paper sx={{ width: width || "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ borderRadius: "16px" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary100.main }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    ...autoSizeCellStyle,
                    color: color || "gray",
                    fontWeight: "bold",
                    width: column.width || 'auto',
                    padding: "12px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, 5).map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ ...autoSizeCellStyle, color: color || "black", fontWeight: "bold" }}
                  >
                    {row[column.id]}
                  </TableCell>
                ))}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export function TopProductsTable({
  columns,
  cardDetails,
  width,
  color,
  pagination = null, // for future API-based pagination
  onPageChange, // callback for page change (future API)
  onRowsPerPageChange, // callback for rows per page change (future API)
}) {
  // Ensure cardDetails is always an array
  const rows = Array.isArray(cardDetails) ? cardDetails : [cardDetails];
  // Pagination state
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5; // Always 5 as per requirements

  // Use pagination props if provided, otherwise use local state
  const currentPage = pagination ? pagination.currentPage - 1 : page; // 0-based for MUI
  const totalCount = pagination ? pagination.totalItems : rows.length;

  // Handler for page change
  const handleChangePage = (event, newPage) => {
    if (pagination && onPageChange) {
      onPageChange(newPage + 1); // 1-based for API
    } else {
      setPage(newPage);
    }
  };

  // Handler for rows per page change (future-proof, but always 5 for now)
  const handleChangeRowsPerPage = (event) => {
    if (pagination && onRowsPerPageChange) {
      onRowsPerPageChange(5); // Always 5
    } else {
      setPage(0);
    }
  };

  const autoSizeCellStyle = {
    padding: "8px 10px",
    whiteSpace: "normal", // Allow wrapping
    wordBreak: "break-word", // Break long words
    maxWidth: 220, // Limit cell width for wrapping
  };
  return (
    <Paper sx={{ width: width || "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ borderRadius: "16px" }}>
          <TableBody>
            {rows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ ...autoSizeCellStyle, color: color || "black", fontWeight: "bold" }}
                  >
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Rows per page"}
        labelDisplayedRows={({ from, to, count }) => {
          const totalPages = pagination ? pagination.totalPages : Math.ceil(count / rowsPerPage);
          return `${from}-${to} of ${count} (Page ${currentPage + 1} of ${totalPages})`;
        }}
      />
    </Paper>
  );
}

// How to Use

// const userColumns = [
//   { id: "userCard", label: "User" },
//   { id: "phone", label: "Phone Number" },
//   { id: "registrationDate", label: "Registration Date" },
//   { id: "status", label: "Status" },
// ];

// const userData = [
//   {
//     userCard: <Usercard name='Gethmi Rathnyaka' email='gethmirathnayaka@gmai.com' src='yourprofile image' ></Usercard>,
//     phone: "+46 8 123 456",
//     registrationDate: "2024-11-07",
//     status: "Banned",
//   },
//   {
//     userCard: <Usercard name='Sahan Tharaka' email='sahantharaka@gmai.com' src='yourprofile image' ></Usercard>,
//     phone: "+54 11 1234-5678",
//     registrationDate: "2024-11-08",
//     status: "Inactive",
//   },
// ];

// const iconTypes = ["edit", "more"];

//   return (
//  <Box sx={{ width: '100%', maxWidth: 1000, borderRadius: "20px" }}>
//     <UserTable
//       columns={userColumns}
//       data={userData}
//       iconTypes={iconTypes}
//     />
//   </Box>
//   );
