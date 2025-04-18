import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet } from "react-router-dom";
import Iconset from './AtomicComponents/Icons/Iconset';
import theme from './AtomicComponents/theme';
//remove this and end undo

// import Layout from "./Admin/Layout.jsx";

// //adminpanel pages
// import Dashboard from "./Admin/Dashboard.jsx";
// import AdminProfile from "./Admin/AdminProfile.jsx";
// import AdminSetting from "./Admin/AdminSetting.jsx";
// import ManageProducts from "./Admin/ManageProducts.jsx";
// import CreateProducts from "./Admin/CreateProducts.jsx";
// import Usermanage from "./Admin/Usermanage.jsx";
// import Complaints from "./Admin/Complaints.jsx";
// import RMA from "./Admin/RMA.jsx";
// import Review from "./Admin/Review.jsx";
// import InvoiceList from "./Admin/InvoiceList.jsx";
// import InvoiceCreate from "./Admin/InvoiceCreate.jsx";
// import CreateGames from "./Admin/CreateGames.jsx";
// import ManageGames from "./Admin/ManageGames.jsx";
// import OrderList from "./Admin/OrderList.jsx";
// import ReceivedOrders from "./Admin/ReceivedOrders.jsx";
// //Login pages
// import Signup from "./Login/Signup.jsx";
// import Login from "./Login/Login.jsx";
// import Verify from "./Login/Verify.jsx";
// import ResetPassword from "./Login/Resetpassword.jsx";
// import ForgetPassword from "./Login/Forgetpassword.jsx";
// import ComplaintSubmit from "./User/ComplaintSubmit.jsx";
// import UserComplaints from "./User/UserComplaints.jsx";

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
    return item; // headers or dividers
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
    title: 'Feedbacks',
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
        segment: 'comments&reviews',
        title: 'Comments & Reviews',
        icon: <Iconset type="comments" />,
      },
      {
        segment: 'rma',
        title: 'RMA',
        icon: <Iconset type="RMA" />,
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

  return (
    <AppProvider
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

// export const adminRouter =
// {
//   path: "/adminpanel",
//   Component: AdminApp,
//   children: [
//     {
//       path: "auth/signup",
//       Component: Signup,
//     },
//     {
//       path: "auth/login",
//       Component: Login,
//     },
//     {
//       path: "auth/verify",
//       Component: Verify,
//     },
//     {
//       path: "auth/resetpassword",
//       Component: ResetPassword,
//     },
//     {
//       path: "auth/forgetpassword",
//       Component: ForgetPassword,
//     },
//     {
//       path: "user/complaint",
//       Component: ComplaintSubmit,
//     },
//     {
//       path: "user/complaintHistory",
//       Component: UserComplaints,
//     },
//     {
//       path: "",
//       Component: Layout,
//       children: [
//         {
//           path: "dashboard",
//           Component: Dashboard,
//         },
//         {
//           path: "admin",
//           Component: AdminProfile,
//         },
//         {
//           path: "admin/profile",
//           Component: AdminProfile,
//         },
//         {
//           path: "admin/setting",
//           Component: AdminSetting,
//         },
//         {
//           path: "games",
//           Component: ManageGames,
//         },
//         {
//           path: "games/managegames",
//           Component: ManageGames,
//         },
//         {
//           path: "games/creategame",
//           children: [
//             {
//               index: true, // Route when no ID is provided
//               Component: CreateGames,
//             },
//             {
//               path: ":id", // Route for editing a product
//               Component: CreateGames,
//             },
//           ],
//         },
//         {
//           path: "products",
//           Component: ManageProducts,
//         },
//         {
//           path: "products/manageproduct",
//           Component: ManageProducts,
//         },
//         {
//           path: "products/createproduct",
//           children: [
//             {
//               index: true, //Route when no ID is provided
//               Component: CreateProducts,
//             },
//             {
//               path: ":id", //Route for editing a product
//               Component: CreateProducts,
//             },
//           ],
//         },
//         {
//           path: "orders",
//           Component: OrderList,
//         },
//         {
//           path: "orders/orderlist",
//           children: [
//             {
//               index: true, //Route when no ID is provided
//               Component: OrderList,
//             },
//             {
//               path: ":id", //Route for editing a product
//               Component: OrderList,
//             },
//           ],
//         },
//         {
//           path: "orders/receivedorders",
//           children: [
//             {
//               index: true, //Route when no ID is provided
//               Component: ReceivedOrders,
//             },
//             {
//               path: ":id", //Route for editing a product
//               Component: ReceivedOrders,
//             },
//           ],
//         },

//         {
//           path: "usermanage",
//           Component: Usermanage,
//         },
//         {
//           path: "feedbackmanage",
//           Component: Complaints,
//         },
//         {
//           path: "feedbackmanage/complaints",
//           Component: Complaints,
//         },
//         {
//           path: "feedbackmanage/rma",
//           Component: RMA,
//         },
//         {
//           path: "feedbackmanage/comments&reviews",
//           Component: Review,
//         },
//         {
//           path: "invoice",
//           Component: InvoiceList,
//         },
//         {
//           path: "invoice/invoicelist",
//           Component: InvoiceList,
//         },
//         {
//           path: "invoice/invoicecreate",
//           Component: InvoiceCreate,
//         },
//       ],
//     },
//   ],
// };

export default AdminApp;



