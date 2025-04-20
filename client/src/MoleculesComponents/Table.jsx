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
} from "@mui/material";
import theme from "../AtomicComponents/theme.jsx";
import Iconset from "../AtomicComponents/Icons/Iconset.jsx";

//for Order Table
import {
  Collapse,
  Avatar,
  Typography,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { format } from "date-fns";
import OrderItemCard from '../AtomicComponents/Cards/OrderItemCard';
import UserCard from "../AtomicComponents/Cards/Usercard.jsx";

export function UserTable({ columns, data, iconTypes = [], iconActions = {}, width, color }) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const autoSizeCellStyle = {
    padding: "8px 16px", // Ensure consistent padding
    whiteSpace: "nowrap",
    Maxwidth: "50%",
  };

  return (
    <Paper style={{ width: width || "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: theme.palette.primary100.main }}>
              {columns.map((column) => (
                <TableCell key={column.id} style={{...autoSizeCellStyle, color: color || "gray", fontWeight: "bold" }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} hover>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ ...autoSizeCellStyle, color: color || "black" , fontWeight: "bold"}}
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
                        onClick={() => iconActions[type] && iconActions[type](row.id)}
                        translate="3s"
                        sx={{
                          "&:hover": {
                            color: theme.palette.primary.main, // Change icon color on hover
                            opacity: 0.9, // Change icon opacity on hover
                          },
                        }}
                      >
                        <Iconset type={type}/>
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper >
  );
};

export function OrderTable({ columns, orders, iconTypes = [], iconActions = {}, width, color }) {
  const [expandedRowId, setExpandedRowId] = React.useState(null);

  const toggleRow = (orderId) => {
    setExpandedRowId((prev) => (prev === orderId ? null : orderId));
  };
  

  const isRowOpen = (rowId) => expandedRowId === rowId;

  const statusColorMap = {
    Successful: "success",
    Pending: "warning",
    Refunded: "info",
    Canceled: "error",
    Completed: "success",
    Shipped: "primary",
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  const autoSizeCellStyle = {
    padding: "8px 16px", // Ensure consistent padding
    whiteSpace: "nowrap",
    Maxwidth: "50%",
  };

  return (
    <Paper sx={{ width: width || "100%", overflow: "hidden", mt: 4 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary100.main }}>
              {columns.map((column) => (
                  <TableCell key={column.id} style={{...autoSizeCellStyle, color: color || "gray", fontWeight: "bold" }}>
                    {column.label}
                  </TableCell>
                ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, index) => {
                const isOpen = isRowOpen(order._id);
                return (
                  <React.Fragment key={order._id}>
                    <TableRow 
                      sx={{ backgroundColor: isOpen ? theme.palette.black200.main : theme.palette.white.main }} 
                      hover>
                      <TableCell sx={{ fontWeight: "bold" }}>
                      {`#${order._id.slice(-4).toUpperCase()}`}
                      </TableCell>
                      <TableCell>
                        <UserCard name={order.user_name} email={order.email} src={order.profile_image}/>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {format(new Date(order.createdAt), "dd MMM yyyy")}
                        </Typography>
                        <Typography fontSize="small" color="gray">
                          {format(new Date(order.createdAt), "p")}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>{order.items.length}</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>{order.total.toLocaleString()} LKR</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={statusColorMap[order.status] || "default"}
                          size="small"
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
                                  : iconActions[type] && iconActions[type](order._id)
                              }
                              translate="3s"
                              sx={{
                                "&:hover": {
                                  color: theme.palette.primary.main, // Change icon color on hover
                                  opacity: 0.9, // Change icon opacity on hover
                                },
                              }}
                            >
                            <Iconset type={type} isOpen={type === "toggle" ? isRowOpen(order._id) : undefined}/>
                            </IconButton>
                          ))}
                        </TableCell>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                          <Box margin={2} bgcolor="#f8e9ff" borderRadius={2} p={2}>
                            {order.items.map((item, i) => (
                              <Stack
                                key={item._id}
                                direction="row"
                                justifyContent="space-between"
                                mb={2}
                              >
                                <OrderItemCard name={item.name} productId={"6005"} src={item.product_image} />
                                <Typography flex={1}>x{item.quantity}</Typography>
                                <Typography flex={1}>
                                  {(item.price).toLocaleString()} LKR
                                </Typography>
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
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
