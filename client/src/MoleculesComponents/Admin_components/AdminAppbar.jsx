import { AppBar, Toolbar, Box, Avatar, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AdminBranding() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color="white" elevation={0}>
            <Container disableGutters maxWidth={false}
                sx={{
                    width: '1350px',
                    maxWidth: '1350px',
                    margin: '0 auto',
                    paddingLeft: '0 !important',
                    paddingRight: '0 !important',
                }}>
                <Toolbar disableGutters
                    sx={{
                        minHeight: '48px !important',
                        paddingBottom: 1,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Box component="img" src="/logo-white.png" alt="Logo"
                        sx={{
                            height: 40,
                            width: 'auto',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    />

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>

        </AppBar>
    );
}

export default AdminBranding;
