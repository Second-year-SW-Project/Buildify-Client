import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useMemo } from "react";
import { NavigationProvider } from './MoleculesComponents/Admin_components/NavigationContext';
import DialogAlert from './AtomicComponents/Dialogs/Dialogs';
import Iconset from './AtomicComponents/Icons/Iconset';
import theme from './AtomicComponents/theme';
import axios from 'axios';
import { toast } from "sonner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

//Set the base path for the navigation segments
const addBaseToSegments = (items, basePath) =>
  items.map((item) => {
    if (item.segment) {
      const newSegment = `${basePath}/${item.segment}`; //add the base path 
      return {
        ...item,
        segment: newSegment,
        children: item.children
          ? item.children
          : undefined,
      };
    }
    return item;
  });

//Define the base path
const BASE_PATH = 'adminpanel';

//Define the navigation structure
const NAVIGATION = addBaseToSegments([
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
        title: 'Profile',
        icon: <Iconset type="profile" />,
      },
      {
        segment: 'setting',
        title: 'Settings',

        icon: <Iconset type='settings' />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Games',
  },
  {
    segment: 'games',
    title: 'Games',
    icon: <Iconset type="games" />,
    children: [
      {
        segment: 'managegames',
        title: 'Manage Games',
        icon: <Iconset type="gamesList" />,
      },
      {
        segment: 'creategame',
        title: 'Create Game',
        icon: <Iconset type="gamesCreate" />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Product & Order',
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <Iconset type="product" />,
    children: [
      {
        segment: 'manageproduct',
        title: 'Manage Product',
        icon: <Iconset type="productList" />,
      },
      {
        segment: 'createproduct',
        title: 'Create Product',
        icon: <Iconset type="productCreate" />,
      },
    ],

  },
  {
    segment: 'orders',
    title: 'Orders ',
    icon: <Iconset type="order" />,
    children: [
      {
        segment: 'orderlist',
        title: 'Order List',
        icon: <Iconset type="orderList" />,
      },
      {
        segment: 'receivedorders',
        title: 'Received Orders',
        icon: <Iconset type="receivedOrders" />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'User Section',
  },
  {
    segment: 'usermanage',
    title: 'User Manage',
    icon: <Iconset type="user-manage" />,

  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Feedbacks & Comment and Reviews',
  },
  {
    segment: 'feedbackmanage',
    title: 'Feedback Manage',
    icon: <Iconset type="feedback-manage" />,
    children: [
      {
        segment: 'complaints',
        title: 'Complaints',
        icon: <Iconset type="complains" />,
      },
      {
        segment: 'rma',
        title: 'RMA',
        icon: <Iconset type="RMA" />,
      }
    ],
  },
  {
    segment: 'commentreview',
    title: 'Comments & Reviews',
    icon: <Iconset type="comments" />,
    children: [

      {
        segment: 'comment',
        title: 'Comments',
        icon: <Iconset type="comments" />,
      },
      {
        segment: 'review',
        title: 'Review',
        icon: <Iconset type="comments" />,
      }
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Invoices',
  },
  {
    segment: 'invoice',
    title: 'Invoice ',
    icon: <Iconset type="invoice" />,
    children: [
      {
        segment: 'invoicelist',
        title: 'Invoice List',
        icon: <Iconset type="invoiceList" />,
      },
      {
        segment: 'invoicecreate',
        title: 'Create Invoice',
        icon: <Iconset type="createInvoice" />,
      },
    ],
  },

], BASE_PATH);



//Define the AdminApp component
function AdminApp() {
  const [session, setSession] = useState(null);
  const [roleChecked, setRoleChecked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // List of public/auth routes (relative to /adminpanel)
  const publicRoutes = [
    "/adminpanel/auth/login",
    "/adminpanel/auth/signup",
    "/adminpanel/auth/verify",
    "/adminpanel/auth/resetpassword",
    "/adminpanel/auth/forgetpassword"
  ];

  //Fetch the admin data when the component runs
  useEffect(() => {
    // Always allow public routes
    if (publicRoutes.includes(location.pathname)) {
      setRoleChecked(true);
      setShowDialog(false);
      return;
    }

    const fetchAdminData = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) {
        setShowDialog(true);
        setRoleChecked(true);
        return;
      }

      try {
        const res = await axios.get(`${backendUrl}/api/v1/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const { name, email, profilePicture, Role } = res.data.user;

        setSession({
          user: {
            name,
            email,
            image: profilePicture,
          },
        });

        if (Role != "admin") { //Check if the user has admin role
          setShowDialog(true);
        } else {
          setShowDialog(false);
        }
      } catch (error) {
        setShowDialog(true);
      } finally {
        setRoleChecked(true);
      }
    };

    fetchAdminData(); //Call the function
  }, [location.pathname]);

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate("/"); // Redirect to home or login
  };

  //Handle the sign out process
  const handleSignOut = async () => {
    try {
      await axios.post(`${backendUrl}/api/v1/users/logout`, {},
        { withCredentials: true }
      );

      //Clear the session and local storage
      setSession(null);
      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      toast.success("Logout successfully");

      navigate("/adminpanel/auth/login"); //Redirect to the login page

    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  const handleCancle = () => {
    setShowDialog(false);
    navigate("/adminpanel/auth/login");
  }
  const authentication = useMemo(
    () => ({
      signIn: () => { },
      signOut: handleSignOut,
    }),
    []
  );

  if (!roleChecked) return null;

  if (showDialog) {
    return (
      <DialogAlert
        Title="Access Denied"
        message="Admin access required. You do not have permission to view this page."
        Agree="Go to Home"
        Disagree="Login Again"
        open={true}
        handleClose={handleCancle}
        handleAgree={handleDialogClose}
      />
    );
  }

  return (
    <NavigationProvider>
      <AppProvider
        session={session}
        authentication={authentication}
        navigation={NAVIGATION}
        branding={{
          logo: (
            <img
              src="/src/assets/images/Logos/logo-white.png"
              alt="Logo"
              style={{
                marginLeft: "8px",
                marginTop: "4px",
                maxWidth: "100%",
                height: "auto",
                width: "140px",
              }}
            />
          ),
          title: "",
        }}
        theme={theme}
      >
        <Outlet />
      </AppProvider>
    </NavigationProvider>
  );
}


export default AdminApp;



