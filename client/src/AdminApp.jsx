import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import Iconset from './AtomicComponents/Icons/Iconset';
import theme from './AtomicComponents/theme';
import React from 'react';

const addBaseToSegments = (items, basePath) =>
  items.map((item) => {
    if (item.segment) {
      const newSegment = `${basePath}/${item.segment}`;
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

const BASE_PATH = 'adminpanel';

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


function AdminApp() {

  const [session, setSession] = React.useState({
    user: {
      name: 'Admin User',
      email: 'admin@example.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const navigate = useNavigate();

  const handleSignOut = () => {
    setSession(null);
    navigate('/adminpanel/auth/signup');
  };

  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession({
        user: {
          name: 'Admin User',
          email: 'admin@example.com',
          image: 'https://avatars.githubusercontent.com/u/19550456',
        },
      });
    },
    signOut: handleSignOut,

  }), []);

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        logo: (<img
          src='/src/assets/images/Logos/logo-white.png'
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
      }}
      theme={theme}
    >
      <Outlet />
    </AppProvider>
  )
}

export default AdminApp;



