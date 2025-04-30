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

export default function SideNav() {
  return (
    <aside className="fixed top-[175px] w-64 h-[calc(100vh-4rem)] bg-white border-r shadow-md p-4">
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user/profile" className="group">
            <ListItemIcon className="group-hover:text-purple-500">
              <AccountBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/user/savedBuilds"
            className="group"
          >
            <ListItemIcon className="group-hover:text-purple-500">
              <ConstructionOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Saved Builds"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user/orders" className="group">
            <ListItemIcon className="group-hover:text-purple-500">
              <LocalOfferOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Your Orders"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/user/reviews" className="group">
            <ListItemIcon className="group-hover:text-purple-500">
              <ReviewsOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Your Reviews"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/user/orderHistory"
            className="group"
          >
            <ListItemIcon className="group-hover:text-purple-500">
              <HistoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Order History"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/user/rmaSupport"
            className="group"
          >
            <ListItemIcon className="group-hover:text-purple-500">
              <DangerousOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="RMA Support"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/user/settings"
            className="group"
          >
            <ListItemIcon className="group-hover:text-purple-500">
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/user/complaint"
            className="group"
          >
            <ListItemIcon className="group-hover:text-purple-500">
              <HelpOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Complaints"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </aside>
  );
}
