import React from "react";
import { Typography } from "@mui/material";


export default function QuantityCard({ quantity, unitprice }) {
    return (
        <div>
            <Typography variant="body2" fontWeight="bold">{quantity}</Typography>
            <Typography variant="body2" color="gray">{unitprice}</Typography>
        </div>
    );
}