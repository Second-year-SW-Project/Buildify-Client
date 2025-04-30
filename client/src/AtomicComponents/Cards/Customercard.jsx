import React from "react";
import { Typography } from "@mui/material";

export default function CustomerCard({ name, status }) {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="flex items-center space-x-3">
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
          {capitalize(status)}
        </Typography>
      </div>
    </div>
  );
}
