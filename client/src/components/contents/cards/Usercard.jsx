import React from "react";
import { Card, CardContent, Avatar, Typography } from "@mui/material";

export default function Usercard({ name='lasitha', email='lasitha@gmail.com', src='./logo.png' }) {
  return (
    <Card className="flex items-center p-4 space-x-4 w-72 shadow-md">
      <Avatar alt={name} src={src} className="w-12 h-12" />
      <CardContent className="p-0">
        <Typography variant="h6" className="text-gray-900">{name}</Typography>
        <Typography variant="body2" className="text-gray-500">{email}</Typography>
      </CardContent>
    </Card>
  );
}



//how to useee
// <Usercard name='your name' email='your email' src='yourprofile image' >
