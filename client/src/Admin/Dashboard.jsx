import { Typography } from '@mui/material'
import React from 'react'
import { PrimaryButton } from '../AtomicComponents/Buttons/Buttons'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

    const navigate = useNavigate();
    return (
        <div class="size-auto">
            <PrimaryButton
                fontSize="16px"
                name="Home"
                buttonSize="medium"
                isBold={1}
                color={"primary"}
                padding="50px"
                type="button"
                onClick={() => {
                    window.location.href = 'http://localhost:5173/customer';
                }}
            />
        </div>
    )
}

