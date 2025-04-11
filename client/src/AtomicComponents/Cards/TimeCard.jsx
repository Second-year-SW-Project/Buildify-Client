import React from "react";
import { Typography } from "@mui/material";


export default function TimeCard({ date, time }) {
    return (
        <div>
            <Typography variant="body2">{date}</Typography>
            <Typography variant="caption" color="gray">{time}</Typography>
        </div>
    );
}