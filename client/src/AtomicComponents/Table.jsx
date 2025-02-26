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
} from "@mui/material";
import theme from "./theme.jsx";
import Iconset from "./Icons/Iconset.jsx";



export function UserTable({ columns, data }) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
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
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                  <TableCell>
                    <Iconset type="edit" />
                    <Iconset type="more" />
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

export default UserTable;

// How to Use

//   const userColumns = [
//     { id: "useCard", label: "User"  },
//     { id: "phone", label: "Phone Number" },
//     { id: "registrationDate", label: "Registration Date" },
//     { id: "status", label: "Status" },
//   ];

//   const userData = [
//     {
//       name: <Usercard name='Gethmi Rathnyaka' email='gethmirathnayaka@gmai.com' src='yourprofile image' ></Usercard>,
//       phone: "+46 8 123 456",
//       registrationDate: "2024-11-07",
//       status: "Banned",
//     },
//     {
//       name: <Usercard name='Sahan Tharaka' email='sahantharaka@gmai.com' src='yourprofile image' ></Usercard>,
//       phone: "+54 11 1234-5678",
//       registrationDate: "2024-11-08",
//       status: "Inactive",
//     },
//   ];

//   return (
//    <Box sx={{ width: '100%', maxWidth: 1000, borderRadius: "20px" }}>
//   <UserTable
//     columns={userColumns}
//     data={userData}
//   />
// </Box>
//   );
