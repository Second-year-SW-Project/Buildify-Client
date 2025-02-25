import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserTable = ({ columns, data, color, backgroundColor, width }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper style={{ width: width || "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: backgroundColor || "#f4f4f4" }}>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ color: color || "black" }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ color: color || "black" }}>Actions</TableCell>
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
                      style={{ color: color || "black" }}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="more">
                      <MoreVertIcon />
                    </IconButton>
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
    </Paper>
  );
};

export default UserTable;

// Usage Example

// const userColumns = [
//     { id: "name", label: "Name" },
//     { id: "phone", label: "Phone Number" },
//     { id: "registrationDate", label: "Registration Date" },
//     { id: "status", label: "Status" },
//   ];

//   const userData = [
//     {
//       name: "Gethmi Rathnayaka",
//       phone: "+46 8 123 456",
//       registrationDate: "2024-11-07",
//       status: "Banned",
//     },
//     {
//       name: "Sahan Tharaka",
//       phone: "+54 11 1234-5678",
//       registrationDate: "2024-11-08",
//       status: "Inactive",
//     },
//   ];

//   return (
//     <User Table
//       columns={userColumns}
//       data={userData}
//       color="blue"
//       backgroundColor="#e0e0e0"
//       width="80%"
//     />
//   )
