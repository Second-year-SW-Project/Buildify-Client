import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import theme from '../../AtomicComponents/theme';
import { styled } from '@mui/material/styles';

const statusOptions = ['All', 'Pending', 'Completed', 'Shipped', 'Delivered', 'Successful', 'Refunded', 'Canceled'];

// Define unique colors for each status
const statusColors = {
    All: theme.palette.primary400.main,
    Pending: theme.palette.warning.main,
    Completed: theme.palette.delete.main,
    Refunded: theme.palette.ternary.main,
    Canceled: theme.palette.error.main,
    Shipped: theme.palette.info.main,
    Delivered: theme.palette.primaryprimary.main,
    Successful: theme.palette.success.main,
};

const CountBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'status',
})(({ theme, selected, status }) => ({
    backgroundColor: selected ? statusColors[status] : theme.palette.black500.main,
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
        <span style={{ fontWeight: 'bold', color: selected ? statusColors[label] : theme.palette.black500.main }}>
            {label}
        </span>
        <CountBox selected={selected} status={label}>{count}</CountBox>
    </Box>
);

export default function OrderStatusTabs({ status, setStatus, statusCounts = {} }) {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
        const selectedStatus = statusOptions[newValue];
        setStatus(selectedStatus === 'All' ? '' : selectedStatus);
    };

    // Set initial tab index based on current status
    useEffect(() => {
        const index = statusOptions.findIndex(option =>
            option === status || (status === '' && option === 'All')
        );
        if (index !== -1) {
            setTabIndex(index);
        }
    }, [status]);

    // Calculate total orders
    const totalOrders = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                aria-label="order status tabs"
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{
                    sx: {
                        height: 2,
                        backgroundColor: statusColors[statusOptions[tabIndex]],
                    },
                }}
            >
                {statusOptions.map((label, index) => (
                    <Tab
                        key={label}
                        sx={{ textTransform: 'none' }}
                        label={
                            <CustomTabLabel
                                label={label}
                                count={label === 'All' ? totalOrders : (statusCounts[label] || 0)}
                                selected={index === tabIndex}
                            />
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
}
