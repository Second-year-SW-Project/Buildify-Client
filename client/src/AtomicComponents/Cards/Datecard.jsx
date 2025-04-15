import React from "react";
import { Typography } from "@mui/material";

export default function DateCard({ date }) {
  return (
    <div>
      <Typography variant="body3">{date}</Typography>
    </div>
  );
}
