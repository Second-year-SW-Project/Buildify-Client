import React from "react";
import { Typography } from "@mui/material";


export default function TimeCard({ date, time }) {
    return (
        <div>
            <Typography variant="body2" fontWeight="bold">{date}</Typography>
            <Typography variant="body2" color="gray">{time}</Typography>
        </div>
    );
}