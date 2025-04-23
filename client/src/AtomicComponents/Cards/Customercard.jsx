import React from "react";
import { Typography } from "@mui/material";

export default function CustomerCard({ name, type, src }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 overflow-hidden rounded-full">
        <img
          className="w-full h-full object-cover rounded-full"
          src={src}
          alt="image"
        />
      </div>
      <div>
        <Typography
          variant="body2"
          fontWeight="bold"
          style={{
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" fontWeight="bold" color="primary">
          {type}
        </Typography>
      </div>
    </div>
  );
}
