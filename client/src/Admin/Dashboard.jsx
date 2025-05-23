import { Typography } from '@mui/material';
import { React, useState } from 'react';
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
        { id: "contact", label: "Contact" },
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

    const palette = ['#7B16AE', '#8A00FC', '#de1aff', '#1cbab7', '#2C87C3', '#80d1ff', '#E8CCFE'];

    const data = [
        { value: 5, label: 'Ram', color: palette[0] },
        { value: 10, label: 'Graphic Cards', color: palette[1] },
        { value: 15, label: 'Processors', color: palette[2] },
        { value: 10, label: 'Motherboard', color: palette[3] },
        { value: 25, label: 'Storages', color: palette[4] },
        { value: 20, label: 'Casings', color: palette[5] },
        { value: 10, label: 'Power Supplys', color: palette[6] },
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

    return (
        <div className="mt-2 border-2 border-gray-200 rounded-lg m-2 max-w-full">
            <div className="relative w-[1080px] h-64 rounded-lg m-2 overflow-hidden max-w-full">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    slidesPerView={1}
                    effect="fade"
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    fadeEffect={{ crossFade: true }}
                    className="w-full h-full"
                >
                    {[slide1, slide2, slide3].map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Overlay background */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />

                {/* Text overlay */}
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
                        </div>
                    </div>
                    <div className='ProductsList flex flex-row'>
                        <BarChart
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
                <div className='flex flex-row justify-between items-center p-2'>
                    <Typography variant="h6" fontWeight="bold" color='primary'>Recent Orders</Typography>
                    <div sx={{ width: '100%', borderRadius: "20px" }}>
                        <OrderSummary
                            columns={orderColumns}
                            orders={normalOrders}
                            customRenderers={{
                                userCard: (order) => order.userDetails,
                                items: (order) => order.items
                            }}
                        // pagination={{
                        //     currentPage,
                        //     totalPages,
                        //     totalItems: totalOrders,
                        //     itemsPerPage,
                        //     onPageChange: handlePageChange,
                        //     onItemsPerPageChange: handleItemsPerPageChange
                        // }}
                        />
                    </div>
                </div>
            </div>

        </div>

    );
}
