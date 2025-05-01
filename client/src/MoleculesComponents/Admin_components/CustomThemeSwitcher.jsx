import React from 'react';
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Popover,
    Radio,
    RadioGroup,
    Tooltip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

function CustomThemeSwitcher() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [themeMode, setThemeMode] = React.useState('system'); // local state

    const toggleMenu = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleThemeChange = (event) => {
        const value = event.target.value;
        setThemeMode(value);
        // NOTE: In Toolpad Core 0.8.1, theme changes need to be managed manually or via context
        console.log(`Theme set to: ${value}`);
    };

    return (
        <>
            <Tooltip title="Settings" enterDelay={1000}>
                <IconButton onClick={toggleMenu}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={toggleMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                disableAutoFocus
            >
                <Box sx={{ p: 2 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Theme</FormLabel>
                        <RadioGroup
                            aria-label="theme"
                            name="theme"
                            value={themeMode}
                            onChange={handleThemeChange}
                        >
                            <FormControlLabel value="light" control={<Radio />} label="Light" />
                            <FormControlLabel value="system" control={<Radio />} label="System" />
                            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Popover>
        </>
    );
}

export default CustomThemeSwitcher;
