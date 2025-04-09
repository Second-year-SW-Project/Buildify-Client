import React from "react";
import { Avatar, Typography, Box } from "@mui/material";

export default function UserCard({ name, email, src }) {
  return (
    <Box className="flex items-center space-x-3">
      <Avatar src={src} sx={{ width: 40, height: 40 }} />
      <Box>
        <Typography variant="body1" className="font-semibold text-gray-900">{name}</Typography>
        <Typography variant="body2" className="text-sm text-gray-500">{email}</Typography>
      </Box>
    </Box>
  );
}




//how to useee
// <Usercard name='your name' email='your email' src='yourprofile image' ></Usercard>
