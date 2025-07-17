import React from "react";
import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";

const BuildCard = ({ name, src, totalCharge }) => {
    const formatPrice = (price) => {
        return `LKR ${price?.toLocaleString() || '0'}`;
    };

    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                boxShadow: "none",
                border: "none",
                backgroundColor: "transparent",
                padding: 0,
                margin: 0,
            }}
        >
            <Avatar
                src={src}
                alt={name}
                sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 0,
                    marginRight: 2,
                }}
            />
            <CardContent sx={{ padding: "0 !important", flex: 1 }}>
                <Typography variant="body2" fontWeight="bold" noWrap>
                    {name}
                </Typography>
                <Typography variant="body2" color="primary" fontWeight="bold">
                    {formatPrice(totalCharge)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BuildCard;
