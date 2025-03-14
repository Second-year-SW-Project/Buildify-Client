import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReceiptIcon from "@mui/icons-material/Receipt";
import GroupIcon from "@mui/icons-material/Group";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlaceIcon from "@mui/icons-material/Place";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CreateIcon from "@mui/icons-material/Create";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import MessageIcon from "@mui/icons-material/Message";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function Iconset({ type='notification', fontSize='30px', color = "primary" }) {
    const renderIcon = () => {
        switch (type) {
            case 'edit': return <EditIcon color={color} sx={{ fontSize }} />;
            case 'more': return <MoreVertIcon color={color} sx={{ fontSize }} />;
            case 'delete': return <DeleteIcon color={color} sx={{ fontSize }} />;
            case 'add': return <AddIcon color={color} sx={{ fontSize }} />;
            case 'search': return <SearchIcon color={color} sx={{ fontSize }} />;
            case 'view': return <VisibilityIcon color={color} sx={{ fontSize }} />;
            case 'dashboard': return <DashboardIcon color={color} sx={{ fontSize }} />;
            case 'settings': return <SettingsIcon color={color} sx={{ fontSize }} />;
            case 'product': return <ShoppingBagIcon color={color} sx={{ fontSize }} />;
            case 'order': return <ReceiptIcon color={color} sx={{ fontSize }} />;
            case 'user-manage': return <GroupIcon color={color} sx={{ fontSize }} />;
            case 'feedback-manage': return <FeedbackIcon color={color} sx={{ fontSize }} />;
            case 'invoice': return <ReceiptIcon color={color} sx={{ fontSize }} />;
            case 'call': return <PhoneIcon color={color} sx={{ fontSize }} />;
            case 'email': return <EmailIcon color={color} sx={{ fontSize }} />;
            case 'calendar': return <CalendarTodayIcon color={color} sx={{ fontSize }} />;
            case 'location': return <PlaceIcon color={color} sx={{ fontSize }} />;
            case 'notification': return <NotificationsIcon color={color} sx={{ fontSize }} />;
            case 'darkmode': return <DarkModeIcon color={color} sx={{ fontSize }} />;
            case 'key': return <VpnKeyIcon color={color} sx={{ fontSize }} />;
            case 'pen': return <CreateIcon color={color} sx={{ fontSize }} />;
            case 'heart': return <FavoriteIcon color={color} sx={{ fontSize }} />;
            case 'download': return <DownloadIcon color={color} sx={{ fontSize }} />;
            case 'message': return <MessageIcon color={color} sx={{ fontSize }} />;
            case 'signout': return <ExitToAppIcon color={color} sx={{ fontSize }} />;
            case 'money': return <MonetizationOnIcon color={color} sx={{ fontSize }} />;
            case 'pending': return <HourglassEmptyIcon color={color} sx={{ fontSize }} />;
            default: return null;
        }
    };
    return <span>{renderIcon()}</span>;
}



//font size should be in pixels
