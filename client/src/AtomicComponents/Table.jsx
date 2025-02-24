// UserTable.jsx
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

const users = [
  {
    name: "Gethmi Rathnayaka",
    phone: "+46 8 123 456",
    registrationDate: "2024-11-07",
    status: "Banned",
    email: "gethmi@gmail.com",
  },
  {
    name: "Sahan Tharaka",
    phone: "+54 11 1234-5678",
    registrationDate: "2024-11-08",
    status: "Inactive",
    email: "avery43@hotmail.com",
  },
  {
    name: "Thamoj DinuJAVA",
    phone: "+34 91 123 4567",
    registrationDate: "2024-11-09",
    status: "Banned",
    email: "mireya13@hotmail.com",
  },
  {
    name: "Rasmiya A",
    phone: "+52 55 1234 5678",
    registrationDate: "2024-11-10",
    status: "Active",
    email: "tyrel.greenholt@gmail.com",
  },
  {
    name: "Jannathul Mirza",
    phone: "+86 10 1234 5678",
    registrationDate: "2024-11-11",
    status: "Banned",
    email: "joana.simonis84@gmail.com",
  },
];

const UserTable = () => {
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
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f4f4f4" }}>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.registrationDate}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        color:
                          user.status === "Active"
                            ? "green"
                            : user.status === "Inactive"
                            ? "orange"
                            : "red",
                      }}
                    >
                      {user.status}
                    </span>
                  </TableCell>
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UserTable;
