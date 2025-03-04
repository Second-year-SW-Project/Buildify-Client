import React from "react";
import UserTable from "../MoleculesComponents/Table";
import Usercard from "../AtomicComponents/Cards/Usercard";
import { Box } from "@mui/system";

const ProductManage = () => {

    const userColumns = [
        { id: "userCard", label: "User" },
        { id: "phone", label: "Phone Number" },
        { id: "registrationDate", label: "Registration Date" },
        { id: "status", label: "Status" },
    ];

    const userData = [
        {
            userCard: <Usercard name='Gethmi Rathnyaka' email='gethmirathnayaka@gmai.com' src='yourprofile image' ></Usercard>,
            phone: "+46 8 123 456",
            registrationDate: "2024-11-07",
            status: "Banned",
        },
        {
            userCard: <Usercard name='Sahan Tharaka' email='sahantharaka@gmai.com' src='yourprofile image' ></Usercard>,
            phone: "+54 11 1234-5678",
            registrationDate: "2024-11-08",
            status: "Inactive",
        },
    ];

    const iconTypes = ["edit", "more"];

    return (
        <Box sx={{ width: '100%', maxWidth: 1000, borderRadius: "20px" }}>
            <UserTable
                columns={userColumns}
                data={userData}
                iconTypes={iconTypes}
            />
        </Box>
    );
};

export default ProductManage;
