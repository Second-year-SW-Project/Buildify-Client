import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Mail as MailIcon, Inbox as InboxIcon } from "@mui/icons-material";

export default function SideNav() {
  return (
    <aside className="fixed top-[175px] w-64 h-[calc(100vh-4rem)] bg-white border-r shadow-md p-4">
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/profile" className="group">
            <ListItemIcon className="group-hover:text-purple-500">
              <MailIcon />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/savedBuilds" className="group">
            <ListItemIcon className="group-hover:text-purple-500">
              <MailIcon />
            </ListItemIcon>
            <ListItemText
              primary="Saved Builds"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/myOrders" className="group">
            <ListItemIcon className="group-hover:text-purple-500">
              <MailIcon />
            </ListItemIcon>
            <ListItemText
              primary="My Orders"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/rmaSupport" className="group">
            <ListItemIcon className="group-hover:text-purple-500">
              <MailIcon />
            </ListItemIcon>
            <ListItemText
              primary="RMA Support"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/orderHistory" className="group">
            <ListItemIcon className="group-hover:text-purple-500">
              <MailIcon />
            </ListItemIcon>
            <ListItemText
              primary="Order History"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/settings" className="group">
            <ListItemIcon className="group-hover:text-purple-500">
              <InboxIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              className="group-hover:text-purple-500"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </aside>
  );
}

// import * as React from "react";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   AppBar,
//   CssBaseline,
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
// } from "@mui/material";
// import DensityMediumSharpIcon from "@mui/icons-material/DensityMediumSharp";
// import {
//   MoveToInbox as InboxIcon,
//   Mail as MailIcon,
//   Menu as MenuIcon,
//   PersonOutlineOutlined as PersonOutlineOutlinedIcon,
// } from "@mui/icons-material";

// const drawerWidth = 240;

// function SideNav(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [isClosing, setIsClosing] = React.useState(false);
//   const navigate = useNavigate();

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         <ListItem disablePadding onClick={() => navigate("/profile")}>
//           <ListItemButton>
//             <ListItemIcon>
//               <MailIcon />
//             </ListItemIcon>
//             <ListItemText primary="Profile" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem disablePadding onClick={() => navigate("/savedBuilds")}>
//           <ListItemButton>
//             <ListItemIcon>
//               <MailIcon />
//             </ListItemIcon>
//             <ListItemText primary="Saved Builds" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem disablePadding onClick={() => navigate("/myOrders")}>
//           <ListItemButton>
//             <ListItemIcon>
//               <MailIcon />
//             </ListItemIcon>
//             <ListItemText primary="My Orders" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//       <Divider />
//       <List>
//         <ListItem disablePadding onClick={() => navigate("/settings")}>
//           <ListItemButton>
//             <ListItemIcon>
//               <InboxIcon />
//             </ListItemIcon>
//             <ListItemText primary="Settings" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </div>
//   );

//   // Remove this const when copying and pasting into your project.
//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       <Box component="span" sx={{ padding: "8px" }}>
//         <DensityMediumSharpIcon
//           color="inherit"
//           aria-label="open drawer"
//           edge="start"
//           onClick={handleDrawerToggle}
//           sx={{ mr: 2, display: { sm: "none" } }}
//         ></DensityMediumSharpIcon>
//       </Box>

//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onTransitionEnd={handleDrawerTransitionEnd}
//           onClose={handleDrawerClose}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       ></Box>
//     </Box>
//   );
// }

// SideNav.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   window: PropTypes.func,
// };

// export default SideNav;
