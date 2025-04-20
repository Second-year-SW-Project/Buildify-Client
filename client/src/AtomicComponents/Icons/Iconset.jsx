import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DevicesIcon from '@mui/icons-material/Devices';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ErrorIcon from '@mui/icons-material/Error';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TryIcon from '@mui/icons-material/Try';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from "@mui/icons-material/Group";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EditNoteIcon from '@mui/icons-material/EditNote';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermMediaSharpIcon from '@mui/icons-material/PermMediaSharp';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GamesIcon from '@mui/icons-material/Games';
import VideogameAssetSharpIcon from '@mui/icons-material/VideogameAssetSharp';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Iconset({ type = 'notification', fontSize = '30px', color, isOpen }) {
    const renderIcon = () => {

        switch (type) {
            case 'photo': return <AddPhotoAlternateSharpIcon color={color} sx={{ fontSize }} />;
            case 'image': return <PermMediaSharpIcon color={color} sx={{ fontSize }} />;
            case 'edit': return <EditIcon color={color} sx={{ fontSize }} />;
            case 'more': return <MoreVertIcon color={color} sx={{ fontSize }} />;
            case 'delete': return <DeleteIcon color="delete" sx={{ fontSize }} />;
            case 'add': return <AddIcon color={color} sx={{ fontSize }} />;
            case 'search': return <SearchIcon color={color} sx={{ fontSize }} />;
            case 'view': return <VisibilityIcon color={color} sx={{ fontSize }} />;
            case 'dashboard': return <DashboardIcon color={color} sx={{ fontSize }} />;
            case 'settings': return <SettingsIcon color={color} sx={{ fontSize }} />;
            case 'product': return <DevicesIcon color={color} sx={{ fontSize }} />;
            case 'order': return <LocalShippingIcon color={color} sx={{ fontSize }} />;
            case 'productList': return <ListAltIcon color={color} sx={{ fontSize }} />;
            case 'productCreate': return <PlaylistAddIcon color={color} sx={{ fontSize }} />;
            case 'orderList': return <PlaylistAddCheckIcon color={color} sx={{ fontSize }} />;
            case 'receivedOrders': return <EventNoteIcon color={color} sx={{ fontSize }} />;
            case 'comments': return <QuestionAnswerIcon color={color} sx={{ fontSize }} />;
            case 'RMA': return <TryIcon color={color} sx={{ fontSize }} />;
            case 'user-manage': return <GroupIcon color={color} sx={{ fontSize }} />;
            case 'feedback-manage': return <FeedbackIcon color={color} sx={{ fontSize }} />;
            case 'complains': return <ErrorIcon color={color} sx={{ fontSize }} />;
            case 'invoice': return <DescriptionIcon color={color} sx={{ fontSize }} />;
            case 'invoiceList': return <ReceiptLongIcon color={color} sx={{ fontSize }} />;
            case 'createInvoice': return <EditNoteIcon color={color} sx={{ fontSize }} />;
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
            case 'cart': return <ShoppingCartIcon color={color} sx={{ fontSize }} />;
            case 'admin': return <AdminPanelSettingsIcon color={color} sx={{ fontSize }} />;
            case 'profile': return <AccountCircleIcon color={color} sx={{ fontSize }} />;
            case 'games': return <SportsEsportsIcon color={color} sx={{ fontSize }} />;
            case 'gamesList': return <GamesIcon color={color} sx={{ fontSize }} />;
            case 'gamesCreate': return <VideogameAssetSharpIcon color={color} sx={{ fontSize }} />;
            case 'toggle':
                return isOpen
                    ? <KeyboardArrowUpIcon color={color} sx={{ fontSize: 40 }} />
                    : <KeyboardArrowDownIcon color={color} sx={{ fontSize: 40 }} />;
            default: return null;
        }
    };
    return <span>{renderIcon()}</span>;
}

//How to Use

//import Iconset from "./AtomicComponents/Icons/Iconset";
//<Iconset type="edit" fontSize="30px" color="primary" /> //font size should be in pixels