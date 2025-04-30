import { DashboardLayout } from '@toolpad/core';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
}

