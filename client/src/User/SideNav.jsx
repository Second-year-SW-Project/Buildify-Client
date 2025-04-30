import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";

// User dashboard pages array
const navItems = [
  { text: "Profile", icon: <AccountBoxOutlinedIcon />, to: "/user/profile" },
  {
    text: "Saved Builds",
    icon: <ConstructionOutlinedIcon />,
    to: "/user/savedBuilds",
  },
  { text: "Your Orders", icon: <LocalOfferOutlinedIcon />, to: "/user/orders" },
  { text: "Your Reviews", icon: <ReviewsOutlinedIcon />, to: "/user/reviews" },
  {
    text: "Order History",
    icon: <HistoryOutlinedIcon />,
    to: "/user/orderHistory",
  },
  {
    text: "RMA Support",
    icon: <DangerousOutlinedIcon />,
    to: "/user/rmaSupport",
  },
  { text: "Settings", icon: <SettingsOutlinedIcon />, to: "/user/settings" },
  {
    text: "Complaints",
    icon: <HelpOutlineOutlinedIcon />,
    to: "/user/complaint",
  },
];

export default function SideNav() {
  return (
    <aside className="fixed top-[175px] w-64 h-[calc(100vh-4rem)] bg-white border-r shadow-md p-4">
      <List>
        {navItems.map(({ text, icon, to }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={to} className="group">
              <ListItemIcon className="group-hover:text-purple-500">
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                className="group-hover:text-purple-500"
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </aside>
  );
}
