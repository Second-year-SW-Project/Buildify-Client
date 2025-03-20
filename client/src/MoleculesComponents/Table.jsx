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



export function UserTable({ columns, data, iconTypes = [], width, color }) {

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
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ ...autoSizeCellStyle, color: color || "black" , fontWeight: "bold"}}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell style={autoSizeCellStyle}>
                    {iconTypes.map((type, idx) => (
                      <IconButton
                        key={idx}
                        disableRipple
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
