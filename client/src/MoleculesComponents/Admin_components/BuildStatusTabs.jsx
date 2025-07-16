import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import theme from '../../AtomicComponents/theme';
import { styled } from '@mui/material/styles';

const buildStatusOptions = ['All', 'Pending', 'Confirmed', 'Building', 'Completed', 'Shipped', 'Delivered', 'Canceled',];

// Define unique colors for each build status
const buildStatusColors = {
    All: theme.palette.primary400.main,
    Pending: theme.palette.warning.main,
    Confirmed: theme.palette.primaryLight.main,
    Building: theme.palette.primaryDark.main,
    Completed: theme.palette.success.main,
    Shipped: theme.palette.info.main,
    Delivered: theme.palette.primary.main,
    Canceled: theme.palette.error.main,
};

const CountBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'status',
})(({ theme, selected, status }) => ({
    backgroundColor: selected ? buildStatusColors[status] : theme.palette.black500.main,
    color: theme.palette.white.main,
    borderRadius: '5px',
    padding: '4px 6px 2px 5px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    marginLeft: '6px',
    minWidth: '20px',
    textAlign: 'center'
}));

const CustomTabLabel = ({ label, count, selected }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', color: selected ? buildStatusColors[label] : theme.palette.black500.main }}>
            {label.charAt(0) + label.slice(1)}
        </span>
        <CountBox selected={selected} status={label}>{count}</CountBox>
    </Box>
);

export default function BuildStatusTabs({ status, setStatus, statusCounts = {} }) {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
        const selectedStatus = buildStatusOptions[newValue];
        setStatus(selectedStatus === 'All' ? '' : selectedStatus);
    };

    // Set initial tab index based on current status
    useEffect(() => {
        const index = buildStatusOptions.findIndex(option =>
            option === status || (status === '' && option === 'All')
        );
        if (index !== -1) {
            setTabIndex(index);
        }
    }, [status]);

    // Calculate total builds
    const totalBuilds = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                aria-label="build status tabs"
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{
                    sx: {
                        height: 2,
                        backgroundColor: buildStatusColors[buildStatusOptions[tabIndex]],
                    },
                }}
            >
                {buildStatusOptions.map((label, index) => (
                    <Tab
                        key={label}
                        sx={{ textTransform: 'none' }}
                        label={
                            <CustomTabLabel
                                label={label}
                                count={label === 'All' ? totalBuilds : (statusCounts[label] || 0)}
                                selected={index === tabIndex}
                            />
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
}