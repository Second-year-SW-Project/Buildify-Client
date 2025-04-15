import { Typography } from '@mui/material'
import React from 'react'
import { PrimaryButton } from '../AtomicComponents/Buttons/Buttons'
import { Link } from 'react-router-dom'

export default function Dashboard() {

    return (
        <div class="size-auto">
            <Link to="http://localhost:5173/customer">
                <PrimaryButton
                    fontSize="16px"
                    name="Home"
                    buttonSize="medium"
                    isBold={1}
                    color={"primary"}
                    padding="50px"
                    type="button"
                />
            </Link>
        </div>
    )
}

