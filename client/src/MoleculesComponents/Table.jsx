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

  // Sort data by updatedAt (most recent first)
  const sortedData = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return [...data].sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0);
      const dateB = new Date(b.updatedAt || b.createdAt || 0);
      return dateB - dateA; // Most recent first (descending order)
    });
  }, [data]);

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
    wordBreak: "break-word",
  };

  const getIdValue = (obj, key) => {
    return key.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  };

  // Use pagination props if provided, otherwise use local state
  const currentPage = pagination ? pagination.currentPage - 1 : page; // Convert to 0-based index for MUI
  const currentRowsPerPage = pagination ? pagination.itemsPerPage : rowsPerPage;
  const totalCount = pagination ? pagination.totalItems : sortedData.length;

  return (
    <Paper style={{ width: width || "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              style={{ backgroundColor: theme.palette.primary100.main }}
            >
              {(columns || []).map((column) => (
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
            {sortedData && sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <TableRow key={index} hover>
                  {(columns || []).map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        ...autoSizeCellStyle,
                        color: color || "black",
                        fontWeight: "bold",
                        whiteSpace: "normal",
                        minWidth: column.width || "auto",
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (iconTypes.length > 0 ? 1 : 0)}
                  align="center"
                >
                  <Typography>No data found</Typography>
                </TableCell>
              </TableRow>
            )}
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
          const totalPages =
            pagination?.totalPages ??
            Math.ceil(totalCount / currentRowsPerPage);
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
}) {
  const [expandedRowId, setExpandedRowId] = React.useState(null);

  const toggleRow = (orderId) => {
    setExpandedRowId((prev) => (prev === orderId ? null : orderId));
  };

  const isRowOpen = (rowId) => expandedRowId === rowId;

  const statusColorMap = {
    Completed: "delete",
    Pending: "warning",
    Refunded: "ternary",
    Canceled: "error",
    Shipped: "info",
    Delivered: "primaryprimary",
    Successful: "success",
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
  const totalCount = pagination ? pagination.totalItems : orders.length;

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
            {orders && orders.length > 0 ? (
              orders.map((order, index) => {
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
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              src={order.profilePicture}
                              alt={order.user_name}
                              sx={{ width: 40, height: 40 }}
                            />
                            <Box>
                              <Typography
                                variant="subtitle2"
                                fontWeight={"bold"}
                              >
                                {order.user_name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                {order.email}
                              </Typography>
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
                        <Typography sx={{ fontWeight: "bold" }}>
                          {format(new Date(order.createdAt), "dd MMM yyyy")}
                        </Typography>
                        <Typography fontSize="small" color="gray">
                          {format(new Date(order.createdAt), "p")}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
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
                                bgcolor="#e9f7ff"
                                borderRadius={2}
                                width="100%"
                                mb={1}
                                p={1}
                                sx={{
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "background-color 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: "#a8def3ff",
                                  },
                                }}
                              >
                                <Box
                                  flex={3}
                                  display="flex"
                                  alignItems="center"
                                >
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
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (iconTypes.length > 0 ? 1 : 0)}
                  align="center"
                >
                  <Typography>No orders found</Typography>
                </TableCell>
              </TableRow>
            )}
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
          const totalPages = pagination
            ? pagination.totalPages
            : Math.ceil(count / currentRowsPerPage);
          return `${from}-${to} of ${count} (Page ${currentPage + 1} of ${totalPages})`;
        }}
      />
    </Paper>
  );
}

export function BuildTable({
  columns,
  builds,
  iconTypes = [],
  iconActions = {},
  width,
  color,
  pagination = null,
}) {
  const [expandedRowId, setExpandedRowId] = React.useState(null);

  const toggleRow = (buildId) => {
    setExpandedRowId((prev) => (prev === buildId ? null : buildId));
  };

  const isRowOpen = (rowId) => expandedRowId === rowId;

  const statusColorMap = {
    Pending: "warning",
    Confirmed: "primaryLight",
    Building: "primaryDark",
    Completed: "delete",
    Shipped: "info",
    Delivered: "primaryprimary",
    Canceled: "error",
    Successful: "success",
  };

  // Delivery method color mapping
  const deliveryMethodColorMap = {
    "Home Delivery": "primary",
    "Pick up at store": "infoprimary",
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
  const totalCount = pagination ? pagination.totalItems : builds.length;

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
            {builds && builds.length > 0 ? (
              builds.map((build, index) => {
                const isOpen = isRowOpen(build._id);
                return (
                  <React.Fragment key={build._id}>
                    <TableRow
                      sx={{
                        backgroundColor: isOpen
                          ? theme.palette.black200.main
                          : theme.palette.white.main,
                      }}
                      hover
                    >
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {build._id
                          ? `#${build._id.slice(-4).toUpperCase()}`
                          : "#----"}
                      </TableCell>
                      <TableCell sx={{ paddingRight: 0 }}>
                        {build.userId ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              src={build.profilePicture}
                              alt={build.userName}
                              sx={{ width: 40, height: 40 }}
                            />
                            <Box>
                              <Typography
                                variant="subtitle2"
                                fontWeight={"bold"}
                              >
                                {build.userName}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                {build.userEmail}
                              </Typography>
                            </Box>
                          </Box>
                        ) : (
                          <UserCard
                            name={build.userName}
                            email={build.userEmail}
                          />
                        )}
                      </TableCell>
                      <TableCell sx={{ minWidth: 120 }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {build.createdAt
                            ? format(new Date(build.createdAt), "dd MMM yyyy")
                            : "-"}
                        </Typography>
                        <Typography fontSize="small" color="gray">
                          {build.createdAt
                            ? format(new Date(build.createdAt), "p")
                            : "-"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          paddingRight: 1,
                        }}
                      >
                        <Chip
                          label={
                            build.deliveryMethod === "Home Delivery"
                              ? "By Delivery"
                              : build.deliveryMethod === "Pick up at store"
                                ? "By Store"
                                : build.deliveryMethod
                          }
                          color={
                            deliveryMethodColorMap[build.deliveryMethod] ||
                            "default"
                          }
                          size="small"
                          sx={{
                            padding: "8px 16px",
                            height: "30px",
                            minWidth: "120px",
                            textAlign: "center",
                            fontWeight: "bold",
                            letterSpacing: "0.5px",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          minWidth: 130,
                          fontSize: "15px",
                        }}
                      >
                        {build.TotalPrice !== undefined
                          ? build.TotalPrice.toLocaleString()
                          : "0"}{" "}
                        LKR
                      </TableCell>
                      <TableCell sx={{ paddingRight: 0 }}>
                        <Chip
                          label={build.buildStatus}
                          color={statusColorMap[build.buildStatus] || "default"}
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
                                  ? toggleRow(build._id)
                                  : iconActions[type] &&
                                    iconActions[type](build._id)
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
                                    ? isRowOpen(build._id)
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
                            {build.components && build.components.length > 0 ? (
                              build.components.map((comp, i) => (
                                <Stack
                                  key={comp.componentId || comp._id || i}
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                  bgcolor="#e9f7ff"
                                  borderRadius={2}
                                  width="100%"
                                  mb={1}
                                  p={1}
                                  sx={{
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                      backgroundColor: "#a8def3ff",
                                    },
                                  }}
                                >
                                  <Box
                                    flex={3}
                                    display="flex"
                                    alignItems="center"
                                  >
                                    <OrderItemCard
                                      name={comp.name}
                                      type={comp.type}
                                      src={comp.product_image}
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
                                      x {comp.quantity}
                                    </Typography>
                                    <Typography
                                      fontSize={14}
                                      flex={1}
                                      color="black500"
                                    >
                                      Unit Price - {comp.price || "N/A"}
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
                                      {comp.price && comp.quantity
                                        ? (
                                            comp.price * comp.quantity
                                          ).toLocaleString()
                                        : comp.price || "N/A"}{" "}
                                      LKR
                                    </Typography>
                                  </Box>
                                </Stack>
                              ))
                            ) : (
                              <Typography>No components</Typography>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <Typography>No builds found</Typography>
                </TableCell>
              </TableRow>
            )}
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
          const totalPages = pagination
            ? pagination.totalPages
            : Math.ceil(count / currentRowsPerPage);
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
    Completed: "success",
    Pending: "warning",
    Shipped: "info",
    Delivered: "primaryprimary",
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
            <TableRow
              sx={{
                backgroundColor: theme.palette.primary100.main,
                borderRadius: "50px",
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    ...autoSizeCellStyle,
                    color: color || "gray",
                    fontWeight: "bold",
                    width: column.width || "auto",
                    padding: column.padding,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    style={{ minWidth: 85 }}
                  >
                    {order._id
                      ? `#${order._id.slice(-4).toUpperCase()}`
                      : "#----"}
                  </TableCell>
                  <TableCell sx={{ minWidth: 320 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      style={{ minWidth: 230 }}
                    >
                      <Avatar
                        src={order.profilePicture}
                        alt={order.user_name}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box
                        sx={{
                          wordBreak: "break-word",
                        }}
                      >
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
                  <TableCell
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                    style={{ minWidth: 75 }}
                  >
                    {order.items?.length || 0}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    style={{ minWidth: 120 }}
                  >
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>Currently Not Available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={currentRowsPerPage}
        page={currentPage}
      />
    </Paper>
  );
}

export function BuildSummary({
  columns,
  builds,
  width,
  color,
  pagination = null,
}) {
  const statusColorMap = {
    Pending: "warning",
  };

  const autoSizeCellStyle = {
    padding: "8px 16px",
    whiteSpace: "nowrap",
  };

  // Use pagination props if provided, otherwise use local state
  const currentPage = pagination ? pagination.currentPage - 1 : page;
  const currentRowsPerPage = pagination ? pagination.itemsPerPage : rowsPerPage;
  const totalCount = pagination ? pagination.totalItems : builds.length;

  return (
    <Paper sx={{ width: width || "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ borderRadius: "20px" }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme.palette.primary100.main,
                borderRadius: "50px",
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    ...autoSizeCellStyle,
                    color: color || "gray",
                    fontWeight: "bold",
                    width: column.width || "auto",
                    padding: column.padding,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {builds && builds.length > 0 ? (
              builds.map((build) => (
                <TableRow key={build._id}>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    style={{ minWidth: 85 }}
                  >
                    {build._id
                      ? `#${build._id.slice(-4).toUpperCase()}`
                      : "#----"}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      style={{ minWidth: 230 }}
                    >
                      <Avatar
                        src={
                          build.profilePicture ||
                          build.userDetails?.profilePicture
                        }
                        alt={build.userName || build.userDetails?.name}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box
                        sx={{
                          wordBreak: "break-word",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          {build.userName || build.userDetails?.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {build.userEmail || build.userDetails?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ minWidth: 130 }}>
                      {format(new Date(build.createdAt), "dd MMM yyyy")}
                    </Typography>
                    <Typography fontSize="small" color="gray">
                      {format(new Date(build.createdAt), "p")}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    {build.buildName || "Custom Build"}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    style={{ minWidth: 120 }}
                  >
                    {build.totalCharge !== undefined
                      ? build.totalCharge.toLocaleString()
                      : "0"}{" "}
                    LKR
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={build.buildStatus}
                      color={statusColorMap[build.buildStatus] || "default"}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>Currently Not Available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={currentRowsPerPage}
        page={currentPage}
      />
    </Paper>
  );
}

export function GameTable({ columns, data, width, color }) {
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
                    width: column.width || "auto",
                    padding: "12px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.slice(0, 7).map((row, index) => (
                <TableRow key={index} hover>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        ...autoSizeCellStyle,
                        color: color || "black",
                        fontWeight: "bold",
                      }}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>No games found</Typography>
                </TableCell>
              </TableRow>
            )}
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
}) {
  // Ensure cardDetails is always an array
  const rows = Array.isArray(cardDetails) ? cardDetails : [cardDetails];
  // Pagination state
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5; // Always 5 as per requirements

  // Use pagination props if provided, otherwise use local state
  const currentPage = pagination ? pagination.currentPage - 1 : page; // 0-based for MUI
  const totalCount = pagination ? pagination.totalItems : rows.length;

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
            {rows && rows.length > 0 ? (
              rows
                .slice(
                  currentPage * rowsPerPage,
                  currentPage * rowsPerPage + rowsPerPage
                )
                .map((row, index) => (
                  <TableRow key={index} hover>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{
                          ...autoSizeCellStyle,
                          color: color || "black",
                          fontWeight: "bold",
                        }}
                      >
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>No products found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export function TopBuildsTable({ columns, builds, width, color }) {
  // Only show the first 5 rows, no pagination (same as TopProductsTable)
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
                    width: column.width || "auto",
                    padding: "12px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {builds && builds.length > 0 ? (
              builds.slice(0, 5).map((build, index) => (
                <TableRow key={index} hover>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        ...autoSizeCellStyle,
                        color: color || "black",
                        fontWeight: "bold",
                      }}
                    >
                      {build[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>No builds found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
