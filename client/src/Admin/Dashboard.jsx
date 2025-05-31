import { Typography } from '@mui/material';
import { React, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';
import Iconset from '../AtomicComponents/Icons/Iconset';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { OrderSummary } from '../MoleculesComponents/Table';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import slide1 from '../assets/images/DashboadSlider/1.png';
import slide2 from '../assets/images/DashboadSlider/2.png';
import slide3 from '../assets/images/DashboadSlider/3.png';
import { InputField } from '../AtomicComponents/Inputs/Input';
import { Margin } from '@mui/icons-material';

export default function Dashboard() {

    //Define the columns for the order table
    const orderColumns = [
        { id: "Id", label: "OrderID" },
        { id: "userCard", label: "Customer" },
        { id: "date", label: "Ordered at" },
        { id: "address", label: "Shipping Address" },
        { id: "items", label: "Items" },
        { id: "price", label: "Total Price" },
        { id: "orderStatus", label: "Status" },
    ];

    const [normalOrders, setNormalOrders] = useState([]);
    const [status, setStatus] = useState('');

    const [orderFilter, setOrderFilter] = useState('All');
    const [salesFilter, setSalesFilter] = useState('All');
    const [pendingFilter, setPendingFilter] = useState('All');
    const [StockFilter, setStockFilter] = useState('All');
    const [growthFilter, setgrowthFilter] = useState('All');


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const palette = ['#7B16AE', '#8A00FC', '#de1aff', '#1cbab7', '#2C87C3', '#80d1ff', '#E8CCFE'];

    const data = [
        {
            london: 59,
            paris: 57,
            newYork: 86,
            seoul: 21,
            month: 'Jan',
        },
        {
            london: 50,
            paris: 52,
            newYork: 78,
            seoul: 28,
            month: 'Feb',
        },
        {
            london: 47,
            paris: 53,
            newYork: 106,
            seoul: 41,
            month: 'Mar',
        },
        {
            london: 54,
            paris: 56,
            newYork: 92,
            seoul: 73,
            month: 'Apr',
        },
        {
            london: 57,
            paris: 69,
            newYork: 92,
            seoul: 99,
            month: 'May',
        },
        {
            london: 60,
            paris: 63,
            newYork: 103,
            seoul: 144,
            month: 'June',
        },
        {
            london: 59,
            paris: 60,
            newYork: 105,
            seoul: 319,
            month: 'July',
        },
        {
            london: 65,
            paris: 60,
            newYork: 106,
            seoul: 249,
            month: 'Aug',
        },
        {
            london: 51,
            paris: 51,
            newYork: 95,
            seoul: 131,
            month: 'Sept',
        },
        {
            london: 60,
            paris: 65,
            newYork: 97,
            seoul: 55,
            month: 'Oct',
        },
        {
            london: 67,
            paris: 64,
            newYork: 76,
            seoul: 48,
            month: 'Nov',
        },
        {
            london: 61,
            paris: 70,
            newYork: 103,
            seoul: 25,
            month: 'Dec',
        },
    ];

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const rData = [1400, 1200, 1100, 900, 800, 700, 600];
    const tData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
        'Page H',
        'Page I',
        'Page J',
        'Page K',
        'Page L',
    ];

    const [pendingOrders, setPendingOrders] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Fetch pending orders
    const fetchPendingOrders = async () => {
        try {
            console.log('Fetching pending orders...');
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                status: 'Pending'
            };

            const response = await axios.get(`${backendUrl}/api/checkout/payment`, {
                params,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            console.log('Received data:', response.data);

            if (response.data && Array.isArray(response.data.data)) {
                setPendingOrders(response.data.data);
                setTotalOrders(response.data.pagination.total);
                setTotalPages(response.data.pagination.totalPages);
                console.log('Updated state with:', {
                    orders: response.data.data,
                    total: response.data.pagination.total,
                    pages: response.data.pagination.totalPages
                });
            } else {
                console.error('API returned unexpected data structure:', response.data);
            }
        } catch (error) {
            console.error("Error fetching pending orders:", error);
        }
    };

    useEffect(() => {
        console.log('Dashboard mounted, fetching orders...');
        fetchPendingOrders();
    }, [currentPage, itemsPerPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const chartSetting = {
        yAxis: [
            {
                label: 'rainfall (mm)',
                width: 60,
            },
        ],
        height: 300,
    };

    const dataset = [

    ];

    return (
        <div className="mt-2 border-2 border-gray-200 rounded-lg m-2 max-w-full">
            <div className='Summary relative rounded-lg h-64 grid gap-4 flex flex-row m-2'>
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    slidesPerView={1}
                    effect="fade"
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    fadeEffect={{ crossFade: true }}
                    style={{ width: '100%', height: '100%' }}
                >
                    {[slide1, slide2, slide3].map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>


                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10 rounded-lg" />


                <div className="absolute top-0 left-0 z-20 w-full h-full p-6 flex flex-col justify-center">
                    <Typography variant="h4" className="text-white font-bold">Welcome Back</Typography>
                    <Typography variant="h4" className="text-white font-bold">Admin</Typography>
                    <Typography variant="body1" className="text-white mt-4">
                        If you are here to manage products, you can add, remove and change the stock based on category.
                    </Typography>
                </div>
            </div>

            <div className='Summary grid gap-4 grid-cols-3 flex flex-row mt-6 mb-6 pl-2 pr-2'>

                <div className="TotalOrders relative border-2 border-stone-200 rounded-2xl pb-2 pt-4 pr-6 pl-6">
                    {/* Top content */}
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="h5" fontWeight="bold" color="primary">Total Orders</Typography>
                            <Typography variant="h2" fontWeight="bold">100</Typography>
                        </div>
                        <div className="pt-4">
                            <Iconset type="cart" fontSize="110px" color="primary" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        {/* Left: Filter */}
                        <InputField
                            type="select"
                            variant="standard"
                            label="Filter"
                            size="small"
                            width="110px"
                            value={orderFilter}
                            onChange={(val) => setOrderFilter(val)}
                            options={[
                                { value: 'All', label: 'All' },
                                { value: 'today', label: 'Today' },
                                { value: 'week', label: 'This Week' },
                                { value: 'month', label: 'This Month' },
                                { value: 'year', label: 'This Year' },
                            ]}
                        />

                        {/* Right: View All link */}
                        <Link to="/adminpanel/orders">
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer hover:underline"
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>
                </div>

                <div className="TotalSales relative border-2 border-stone-200 rounded-2xl pb-2 pt-4 pr-6 pl-6">
                    {/* Top content */}
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="h5" fontWeight="bold" color="primary">Total Sales</Typography>
                            <Typography variant="h4" fontWeight="bold">257.3K LKR</Typography>
                        </div>
                        <div className="pt-4">
                            <Iconset type="money" fontSize="110px" color="primary" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        {/* Left: Filter */}
                        <InputField
                            type="select"
                            variant="standard"
                            label="Filter"
                            size="small"
                            width="110px"
                            value={salesFilter}
                            onChange={(val) => setSalesFilter(val)}
                            options={[
                                { value: 'All', label: 'All' },
                                { value: 'today', label: 'Today' },
                                { value: 'week', label: 'This Week' },
                                { value: 'month', label: 'This Month' },
                                { value: 'year', label: 'This Year' },
                            ]}
                        />

                        {/* Right: View All link */}
                        <Link to="/adminpanel/products">
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer hover:underline"
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>
                </div>

                <div className="PendingOrders relative border-2 border-stone-200 rounded-2xl pb-2 pt-4 pr-6 pl-6">
                    {/* Top content */}
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="h5" fontWeight="bold" color="primary">Pending Orders</Typography>
                            <Typography variant="h2" fontWeight="bold">15</Typography>
                        </div>
                        <div className="pt-4">
                            <Iconset type="bag" fontSize="110px" color="primary" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        {/* Left: Filter */}
                        <InputField
                            type="select"
                            variant="standard"
                            label="Filter"
                            size="small"
                            width="110px"
                            value={pendingFilter}
                            onChange={(val) => setPendingFilter(val)}
                            options={[
                                { value: 'All', label: 'All' },
                                { value: 'today', label: 'Today' },
                                { value: 'week', label: 'This Week' },
                                { value: 'month', label: 'This Month' },
                            ]}
                        />

                        {/* Right: View All link */}
                        <Link to="/adminpanel/products">
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer hover:underline"
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>
                </div>


            </div>

            <div className='Analytics grid gap-4 grid-cols-3 flex flex-row mt-8 mb-8 pl-2 pr-2'>
                <div className='Products border-2 border-stone-200 rounded-2xl p-2 pl-4 flex flex-col h-auto w-full'>
                    <div className='ProductsTitle flex flex-col'>
                        <Typography variant="h6" fontWeight="bold" color="primary">Stock Availability</Typography>
                        <InputField
                            type="select"
                            variant="standard"
                            size="small"
                            width="110px"
                            value={StockFilter}
                            onChange={(val) => setStockFilter(val)}
                            options={[
                                { value: 'All', label: 'All' },
                                { value: 'today', label: 'Today' },
                                { value: 'week', label: 'This Week' },
                                { value: 'month', label: 'This Month' },
                                { value: 'year', label: 'This Year' },
                            ]}
                        />
                    </div>
                    <div className='ProductsList flex flex-row'>
                        <PieChart
                            series={[
                                {
                                    paddingAngle: 5,
                                    innerRadius: 70,
                                    outerRadius: 100,
                                    data,
                                },
                            ]}
                            color={palette}
                            margin={{ right: 5 }}
                            width={200}
                            height={280}
                            slotProps={{
                                legend: {
                                    sx: {
                                        ml: 4,
                                    },
                                },
                            }}
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                            }}
                        />
                    </div>
                </div>
                <div className='SalesTable grid border-2 border-stone-200 rounded-2xl p-2 col-span-2 flex flex-col h-auto w-full'>
                    <div className='ProductsTitle flex flex-row justify-between items-top pl-2'>
                        <div className='flex flex-col'>
                            <Typography variant="h6" fontWeight="bold" color="primary">Total Growth</Typography>
                            <Typography variant="body1" fontWeight="bold">257,500 LKR</Typography>
                        </div>

                        <div className='mr-6 pt-1'>
                            <InputField
                                type="select"
                                size="small"
                                width="110px"
                                value={growthFilter}
                                onChange={(val) => setgrowthFilter(val)}
                                options={[
                                    { value: 'All', label: 'All' },
                                    { value: 'today', label: 'Today' },
                                    { value: 'week', label: 'This Week' },
                                    { value: 'month', label: 'This Month' },
                                    { value: 'year', label: 'This Year' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className='ProductsList flex flex-row'>
                        {/* <BarChart
                            width={700}
                            height={280}
                            series={[
                                { data: pData, label: 'pv', id: 'pvId', stack: 'total', color: palette[1] },
                                { data: uData, label: 'uv', id: 'uvId', stack: 'total', color: palette[6] },
                                { data: rData, label: 'revenue', id: 'revenueId', stack: 'total', color: palette[3] },
                                { data: tData, label: 'total', id: 'totalId', stack: 'total', color: palette[5] },
                            ]}
                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
                            yAxis={[{ width: 50 }]}
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                                padding: 0,
                            }}
                        /> */}
                        <BarChart
                            dataset={data}
                            xAxis={[{ dataKey: 'month' }]}
                            series={[
                                { dataKey: 'london', label: 'London' },
                                { dataKey: 'paris', label: 'Paris' },
                                { dataKey: 'newYork', label: 'New York' },
                                { dataKey: 'seoul', label: 'Seoul' },
                            ]}
                            {...chartSetting}
                        />
                    </div>
                </div>

            </div>

            <div className='TopDetails grid gap-4 grid-cols-3 flex flex-row mt-8 mb-8 pl-2 pr-2'>
                <div className='Products grid border-2 border-purple-600 rounded-lg p-2 flex flex-row h-fit'>

                </div>
                <div className='SalesTable grid border-2 border-purple-600 rounded-lg p-2 flex flex-row h-fit'>

                </div>
                <div className='SalesTable grid border-2 border-purple-600 rounded-lg p-2 flex flex-row h-fit'>

                </div>

            </div>

            <div className='recentOrders grid gap-4 grid-cols-1 border-2 border-purple-600 rounded-lg flex flex-row mt-8 mb-8 ml-2 mr-2'>
                <div className='flex flex-col justify-between p-2 pl-4 pr-4'>
                    <div className='flex flex-row justify-between items-center mb-4 mr-6'>
                        <Typography variant="h6" fontWeight="bold" color='primary' sx={{ justifyContent: "end" }}>Recent Orders</Typography>
                        <Link to="/adminpanel/orders/orderlist" state={{ selectedTab: 'Pending' }}>
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer hover:underline"
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>

                    <div sx={{ width: '100%' }}>
                        {pendingOrders.length > 0 ? (
                            <OrderSummary
                                columns={orderColumns}
                                orders={pendingOrders}
                                pagination={{
                                    currentPage,
                                    totalPages,
                                    totalItems: totalOrders,
                                    itemsPerPage,
                                    onPageChange: handlePageChange,
                                    onItemsPerPageChange: handleItemsPerPageChange
                                }}
                            />
                        ) : (
                            <Typography variant="body1" color="textSecondary" sx={{ p: 2 }}>
                                No pending orders found
                            </Typography>
                        )}
                    </div>
                </div>
            </div>

        </div>

    );
}
