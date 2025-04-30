import { Typography } from '@mui/material'
import React from 'react'

export function PageTitle({ value }) {

    return (
        <Typography variant='h4' fontWeight="bold">
            {value}
        </Typography>
    );
}

export function Required() {
    return (
        <Typography fontWeight="bold" color="error" sx={{ fontSize: '18px', marginRight: '.2rem' }}>*</Typography>
    );
}




