import { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconset from '../../AtomicComponents/Icons/Iconset';

const AccountDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }} src="/src/assets/images/user-avatar.png" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        mt: 1.5,
                        minWidth: 180,
                        borderRadius: 2,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                    }
                }}
            >
                <MenuItem onClick={() => handleNavigation('/admin/profile')}>
                    <Iconset type="profile" sx={{ mr: 1 }} /> Profile
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/admin/setting')}>
                    <Iconset type="settings" sx={{ mr: 1 }} /> Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleNavigation('/logout')}>
                    <Iconset type="logout" sx={{ mr: 1 }} /> Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountDropdown;
