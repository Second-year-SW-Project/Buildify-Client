import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import theme from '../../AtomicComponents/theme';
import Iconset from '../../AtomicComponents/Icons/Iconset';


//This is the Admin navbar items to add or edit menu item 
const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <Iconset type="dashboard" />,

    },
    {
        segment: 'admin',
        title: 'Admin',
        icon: <Iconset type="admin" />,
        children: [
            {
                segment: 'profile',
                title: 'Prifile',
                icon: <Iconset type="profile" />,
            },
            {
                segment: 'setting',
                title: 'Setting',
                icon: <Iconset type='settings' />,
            },
        ],
    },

];


function DemoPageContent({ pathname }) {
    return (

        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',

            }}

        >
            <Typography>Dashboard content for {pathname}</Typography>
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function AdminNavbar(props) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    // State to track dark mode
    // const [isDarkMode, setIsDarkMode] = useState(false);

    // Effect to check the theme mode
    // useEffect(() => {
    //     const checkTheme = () => {
    //         const colorScheme = document.documentElement.getAttribute('data-toolpad-color-scheme');
    //         setIsDarkMode(colorScheme === 'dark');
    //     };

    // Initial check
    // checkTheme();

    // Set up a mutation observer to track theme changes
    // const observer = new MutationObserver(checkTheme);
    // observer.observe(document.documentElement, {
    //     attributes: true,
    //     attributeFilter: ['data-toolpad-color-scheme']
    // });

    // return () => observer.disconnect();

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: (<img
                    src="/assets/Logos/logo-white.png" 
                    alt='Logo'
                    style={{
                        marginLeft: '8px',
                        marginTop: '4px',
                        maxWidth: '100%',
                        height: 'auto',
                        width: '140px'
                    }}
                />
                ),
                title: '',
                homeUrl: '/toolpad/core/introduction',
            }}
            router={router}
            theme={theme}
            window={demoWindow}
        >
            <DashboardLayout>
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    )
};

AdminNavbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default AdminNavbar;