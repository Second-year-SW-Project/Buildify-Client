import React from "react";
import { Typography } from "@mui/material";


export default function ProductCard({ name, type, src }) {
    return (
        <div className="flex items-center space-x-3">
            <div>
                <img className="max-w-20 max-h-20" src={src} alt="image" />
            </div>
            <div>
                <Typography variant="body2" fontWeight="bold" style={{
                    wordBreak: "break-word", // Allow breaking long words
                    whiteSpace: "normal", // Enable wrapping
                }}>{name}</Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">{type}</Typography>
            </div>
        </div>
    );
}