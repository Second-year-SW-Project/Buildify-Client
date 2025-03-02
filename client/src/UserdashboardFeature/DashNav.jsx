import { Box } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import theme from "../AtomicComponents/theme";

export default function DashNav() {
  return (
    <Box
      sx={{
        height: "120px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "10px",
      }}
    >
      <div className="flex flex-row mr-4">
        <div className="mr-4">
          <Link to="/home">
            <Box
              sx={{
                border: `2px solid ${theme.palette.black700.main}`,
                borderRadius: "25%",
                padding: "4px",
                display: "inline-flex",
              }}
            >
              <HomeIcon
                sx={{ fontSize: 32, cursor: "pointer" }}
                color="black700"
              />
            </Box>
          </Link>
        </div>
        <div>
          <Link to="/cart">
            <Box
              sx={{
                border: `2px solid ${theme.palette.black700.main}`,
                borderRadius: "25%",
                padding: "4px",
                display: "inline-flex",
              }}
            >
              <ShoppingCartIcon
                sx={{ fontSize: 32, cursor: "pointer" }}
                color="black700"
              />
            </Box>
          </Link>
        </div>
      </div>
    </Box>
  );
}
