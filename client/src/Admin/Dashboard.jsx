import { Typography } from '@mui/material';
import { React, useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';
import Iconset from '../AtomicComponents/Icons/Iconset';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { OrderSummary, GameTable, TopProductsTable } from '../MoleculesComponents/Table';
import { GameCard, TopProductCard } from "../AtomicComponents/Cards/Productcard";
import TimeCard from "../AtomicComponents/Cards/TimeCard";
import axios from 'axios';

import slide1 from '../assets/images/DashboadSlider/1.png';
import slide2 from '../assets/images/DashboadSlider/3.png';
import slide3 from '../assets/images/DashboadSlider/4.png';
import Product from '../assets/images/DashboadSlider/product.png';
import Order from '../assets/images/DashboadSlider/Order.png';
import Games from '../assets/images/DashboadSlider/Games.png';
import { InputField } from '../AtomicComponents/Inputs/Input';
import { Margin } from '@mui/icons-material';
import { PrimaryButton } from '../AtomicComponents/Buttons/Buttons';

import test from '../assets/images/pc1.png';

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

    const gameColumns = [
        { id: "gameCard", label: "Game" },
        { id: "date", label: "Added On" },
    ];

    const topProductColumns = [
        { id: "topProductCard", label: "Top Products" },
    ];

    const TopCard = {
        topProductCard: (
            <TopProductCard
                name="Intel 14th Gen Pro X Gaming PC Nvidia g force"
                orderCount={10}
                src={test}
                sales={"150,000"}
                rate={4.5}
            />
        ),
    };

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

    const [pendingOrders, setPendingOrders] = useState([]);
    const [games, setGames] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchGames = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/game/games`);//Fetches the games from the backend.

            console.log("API Response:", response.data);

            if (response.data && Array.isArray(response.data.games)) {
                const allGames = response.data.games;
                setGames(allGames);//if the response is successful, the games are set to the allGames array
            } else {
                console.error("Expected an array but got:", response.data);//if the response is not successful, the games are set to an empty array and the filtered games are set to an empty array
                setGames([]);
            }
        } catch (error) {
            console.error("Error fetching games:", error);//if the response is not successful, the games are set to an empty array and the filtered games are set to an empty array
            setGames([]);
            toast.error("Failed to fetch games");
        }
    };

    //Fetches the games when the component is mounted
    useEffect(() => {
        fetchGames();
    }, []);

    //Maps the games to the game data
    const gameData = Array.isArray(games)
        ? games.map(game => ({
            gameCard: <GameCard name={game.name} type="Game" src={game.image} />,
            date: <TimeCard date={new Date(game.createdAt).toLocaleDateString()} time={new Date(game.createdAt).toLocaleTimeString()} />,
        }))
        : [];

    // Get top 5 games
    const topFiveGames = gameData.slice(0, 5);

    const [orderSummary, setOrderSummary] = useState({ totalOrders: 0, pendingOrders: 0, totalPrice: 0 });

    // Fetch order summary total based on filter
    const fetchOrderSummary = async (filter, type) => {
        try {
            const res = await axios.get(`${backendUrl}/api/checkout/order-summary-total?filter=${filter}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );
            setOrderSummary(prev => ({
                ...prev,
                [type]: res.data[type]
            }));
        } catch (err) {
            // handle error
        }
    };

    useEffect(() => {
        fetchOrderSummary(orderFilter, 'totalOrders');
    }, [orderFilter]);

    useEffect(() => {
        fetchOrderSummary(pendingFilter, 'pendingOrders');
    }, [pendingFilter]);

    useEffect(() => {
        fetchOrderSummary(salesFilter, 'totalPrice');
    }, [salesFilter]);

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

    // Slides content for Summary section
    const summarySlides = [
        {
            title: 'Manage Products',
            subtitle: 'If you are here to manage products, you can add, remove and change the stock based on category.',
            button: { text: 'Manage Products', link: '/adminpanel/products' },
            image: Product
        },
        {
            title: 'Manage Orders',
            subtitle: 'If you are here to manage orders, you can view, approve, or update customer orders quickly and efficiently.',
            button: { text: 'View Orders', link: '/adminpanel/orders/orderlist' },
            image: Order
        },
        {
            title: 'Game Management',
            subtitle: 'If you are here to manage games, you can add or update games for customer builds and recommendations.',
            button: { text: 'Manage Games', link: '/adminpanel/games/managegames' },
            image: Games
        }
    ];
    const [currentSummaryIndex, setCurrentSummaryIndex] = useState(0);
    const swiperRef = useRef(null);

    const dataset = [

    ];

    return (
        <div className="mt-2 m-2 max-w-full">
            <div className='Summary relative rounded-lg h-72 grid gap-4 flex flex-row m-2'>
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    slidesPerView={1}
                    effect="coverflow"
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    fadeEffect={{ crossFade: true }}
                    style={{ width: '100%', height: '100%' }}
                    onSlideChange={swiper => setCurrentSummaryIndex(swiper.activeIndex)}
                    onSwiper={swiper => (swiperRef.current = swiper)}
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
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10 rounded-lg" />
                <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-row pl-6 pr-6 pt-4">
                    <div className='flex flex-col items-start w-3/5'>
                        <Typography variant="h3" className="text-white font-bold">Welcome Back</Typography>
                        <Typography variant="h4" className="text-white font-bold">Admin</Typography>
                        <Typography variant="h6" className="text-white mt-4">
                            {summarySlides[currentSummaryIndex].subtitle}
                        </Typography>
                        <div className="mt-4 flex flex-row gap-2">
                            <Link to={summarySlides[currentSummaryIndex].button.link}>
                                <PrimaryButton buttonSize="small" name={summarySlides[currentSummaryIndex].button.text} fontSize={"14px"} isBold={1} />
                            </Link>
                            {summarySlides[currentSummaryIndex].title === 'Manage Orders' && (
                                <Link to="/adminpanel/orders/receivedorders">
                                    <PrimaryButton buttonSize="small" name={"View Builds"} fontSize={"14px"} isBold={1} />
                                </Link>
                            )}
                        </div>

                    </div>
                    <div className='flex flex-col items-center w-2/5'>
                        <img src={summarySlides[currentSummaryIndex].image} alt="Dashboard Image" />
                    </div>
                </div>
            </div>

            <div className='Summary grid gap-4 grid-cols-3 flex flex-row mt-6 mb-6 pl-2 pr-2'>

                <div className="TotalOrders relative border-2 border-stone-200 rounded-2xl pb-2 pt-4 pr-6 pl-6">
                    {/* Top content */}
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="h5" fontWeight="bold" color="primary">Total Orders</Typography>
                            <Typography variant="h2" fontWeight="bold">{orderSummary.totalOrders}</Typography>
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
                                { value: 'yesterday', label: 'Yesterday' },
                                { value: 'lastweek', label: 'Last Week' },
                                { value: 'thisweek', label: 'This Week' },
                                { value: 'lastmonth', label: 'Last Month' },
                                { value: 'thismonth', label: 'This Month' },
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
                            <Typography variant="h4" fontWeight="bold">{orderSummary.totalPrice.toLocaleString()} LKR</Typography>
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
                                { value: 'yesterday', label: 'Yesterday' },
                                { value: 'lastweek', label: 'Last Week' },
                                { value: 'thisweek', label: 'This Week' },
                                { value: 'lastmonth', label: 'Last Month' },
                                { value: 'thismonth', label: 'This Month' },
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
                            <Typography variant="h2" fontWeight="bold">{orderSummary.pendingOrders}</Typography>
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
                                { value: 'yesterday', label: 'Yesterday' },
                                { value: 'lastweek', label: 'Last Week' },
                                { value: 'thisweek', label: 'This Week' },
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
                <div className='Stockdetails border-2 border-stone-200 rounded-2xl p-2 pl-4 flex flex-col h-auto w-full'>
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
                    <div className='Productdetails flex flex-row'>
                        <PieChart
                            series={[
                                {
                                    paddingAngle: 5,
                                    innerRadius: 60,
                                    outerRadius: 80,
                                    data,
                                },
                            ]}
                            slotProps={{
                                legend: {
                                    sx: {
                                        ml: 2,
                                        mr: 3,
                                    },
                                },
                            }}
                            height={280}
                        />
                    </div>
                </div>
                <div className='SalesChart grid border-2 border-stone-200 rounded-2xl p-2 col-span-2 flex flex-col h-auto w-full'>
                    <div className='SalesTitle flex flex-row justify-between items-top pl-2'>
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
                    <div className='Salesdetals flex flex-row'>
                        <BarChart
                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
                            yAxis={[{ width: 70, label: 'Sales (LKR)' }]}
                            series={[
                                { data: pData, label: 'pv', id: 'pvId', stack: 'total', color: palette[1] },
                                { data: uData, label: 'uv', id: 'uvId', stack: 'total', color: palette[6] },
                                { data: rData, label: 'revenue', id: 'revenueId', stack: 'total', color: palette[3] },
                                { data: tData, label: 'total', id: 'totalId', stack: 'total', color: palette[5] },
                            ]}
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                            }}
                        />
                    </div>
                </div>

            </div>

            <div className='TopDetails grid gap-4 grid-cols-3 flex flex-row mt-8 mb-8 pl-2 pr-2'>
                <div className='Builds grid border-2 border-purple-600 rounded-lg p-2 flex flex-row h-fit'>


                </div>
                <div className='Topproducts grid border-2 border-purple-600 rounded-lg flex flex-row h-fit'>
                    <div className='flex flex-row justify-between items-center ml-4 mr-4'>
                        <Typography variant="body1" fontWeight="bold" color='primary' sx={{ justifyContent: "end" }}>Top Products</Typography>
                        <div className='mt-2'>
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
                                ]}
                            />
                        </div>
                    </div>

                    <div className='p-2 mb-2 overflow-x-auto w-full' sx={{ width: '100%' }}>
                        <TopProductsTable
                            columns={topProductColumns}
                            cardDetails={[TopCard]}
                        />
                    </div>

                </div>
                <div className='Recentgames grid border-2 border-stone-200 rounded-2xl flex flex-row h-fit'>
                    <div className='flex flex-row justify-between items-center mb-4 mr-6 ml-4 mt-4'>
                        <Typography variant="body1" fontWeight="bold" color='primary' sx={{ justifyContent: "end" }}>Recent Added Games</Typography>
                        <Link to="/adminpanel/games/managegames" state={{ selectedTab: 'Pending' }}>
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

                    <div className='p-2 mb-2' sx={{ width: '100%' }}>
                        <GameTable
                            columns={gameColumns}
                            data={topFiveGames}
                        />
                    </div>

                </div>

            </div>

            <div className='recentOrders grid gap-4 grid-cols-1 border-2 border-stone-200 rounded-2xl flex flex-row mt-8 mb-8 ml-2 mr-2'>
                <div className='flex flex-col justify-between mt-2'>
                    <div className='flex flex-row justify-between items-center mb-4 mr-6 ml-4'>
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
