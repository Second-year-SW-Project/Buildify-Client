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
import { subCategories } from '../AtomicComponents/ForAdminForms/Category';
import axios from 'axios';
import dayjs from 'dayjs';

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

    const [orderFilter, setOrderFilter] = useState('All');
    const [salesFilter, setSalesFilter] = useState('All');
    const [pendingFilter, setPendingFilter] = useState('All');
    const [growthFilter, setgrowthFilter] = useState('thisweek');


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const palette = ['#7B16AE', '#8A00FC', '#de1aff', '#1cbab7', '#2C87C3', '#80d1ff', '#E8CCFE'];

    const [pendingOrders, setPendingOrders] = useState([]);
    const [games, setGames] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState('Necessary');
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

    const getLabelFromValue = (category, value) => {
        const list = subCategories[category] || [];
        const match = list.find(item => item.value === value);
        return match ? match.label : value.charAt(0).toUpperCase() + value.slice(1);
    };


    useEffect(() => {
        const fetchPieChartData = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/product/counts/by-main-category?mainCategory=${selectedMainCategory}`);
                const data = await response.json();
                if (data.Success) {
                    setPieChartData(
                        data.data.map((item, idx) => ({
                            value: item.count,
                            label: getLabelFromValue(selectedMainCategory, item.value),
                            color: palette[idx % palette.length],
                        }))
                    );
                } else {
                    setPieChartData([]);
                }
            } catch (err) {
                setPieChartData([]);
            }
        };
        fetchPieChartData();
    }, [selectedMainCategory, backendUrl]);

    // BarChart dynamic data state
    const [barChartData, setBarChartData] = useState({ sales: [], refund: [], cancle: [], other: [], xLabels: [] });
    const [barChartRange, setBarChartRange] = useState('thisweek'); // Set default to 'This Week'
    const [totalGrowth, setTotalGrowth] = useState(0);

    // Fetch BarChart data from backend
    useEffect(() => {
        const fetchBarChartData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/checkout/bar-chart-summary`, { params: { filter: barChartRange } });
                let { xLabels, sales, refund, cancle, other } = response.data || {};
                let newXLabels = [], newSales = [], newRefund = [], newCancle = [], newOther = [];
                const today = dayjs();
                if (barChartRange === 'thisweek' || barChartRange === 'lastweek') {
                    const weekRef = barChartRange === 'thisweek' ? today : today.subtract(1, 'week');
                    newXLabels = getAllDaysOfWeek(weekRef);
                    // Debug: Compare frontend and backend xLabels
                    if (process.env.NODE_ENV !== 'production') {
                        const missing = newXLabels.filter(l => !xLabels.includes(l));
                        const extra = xLabels.filter(l => !newXLabels.includes(l));
                        if (missing.length || extra.length) {
                            // eslint-disable-next-line no-console
                            console.warn('BarChart week/day label mismatch:', { missing, extra, frontend: newXLabels, backend: xLabels });
                        }
                    }
                    newXLabels.forEach((label, idx) => {
                        const i = xLabels.indexOf(label);
                        newSales.push(i !== -1 ? sales[i] : 0);
                        newRefund.push(i !== -1 ? refund[i] : 0);
                        newCancle.push(i !== -1 ? cancle[i] : 0);
                        newOther.push(i !== -1 ? other[i] : 0);
                    });
                } else if (barChartRange === 'thismonth' || barChartRange === 'lastmonth') {
                    const monthRef = barChartRange === 'thismonth' ? today : today.subtract(1, 'month');
                    // Group by day for month filters
                    const daysInMonth = monthRef.daysInMonth();
                    newXLabels = Array.from({ length: daysInMonth }, (_, i) => monthRef.date(i + 1).format('YYYY-MM-DD'));
                    newXLabels.forEach((label, idx) => {
                        const i = xLabels.indexOf(label);
                        newSales.push(i !== -1 ? sales[i] : 0);
                        newRefund.push(i !== -1 ? refund[i] : 0);
                        newCancle.push(i !== -1 ? cancle[i] : 0);
                        newOther.push(i !== -1 ? other[i] : 0);
                    });
                } else if (barChartRange === 'thisyear' || barChartRange === 'lastyear') {
                    const yearRef = barChartRange === 'thisyear' ? today : today.subtract(1, 'year');
                    newXLabels = getAllMonthsOfYear(yearRef);
                    newXLabels.forEach((month, idx) => {
                        const i = xLabels.indexOf(month);
                        newSales.push(i !== -1 ? sales[i] : 0);
                        newRefund.push(i !== -1 ? refund[i] : 0);
                        newCancle.push(i !== -1 ? cancle[i] : 0);
                        newOther.push(i !== -1 ? other[i] : 0);
                    });
                } else {
                    newXLabels = xLabels;
                    newSales = sales;
                    newRefund = refund;
                    newCancle = cancle;
                    newOther = other;
                }
                setBarChartData({ xLabels: newXLabels, sales: newSales, refund: newRefund, cancle: newCancle, other: newOther });
                const growth = newSales.reduce((a, b) => a + b, 0) - newRefund.reduce((a, b) => a + b, 0) - newCancle.reduce((a, b) => a + b, 0) - newOther.reduce((a, b) => a + b, 0);
                setTotalGrowth(growth);
            } catch (err) {
                setBarChartData({ sales: [], refund: [], cancle: [], other: [], xLabels: [] });
                setTotalGrowth(0);
            }
        };
        fetchBarChartData();
    }, [barChartRange, backendUrl]);

    // Helper: get all days in week
    function getAllDaysOfWeek(date) {
        const startOfWeek = dayjs(date).startOf('week').add(1, 'day'); // Monday
        return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
    }
    // Helper: get all week ranges in month, only including days within the month
    function getAllWeeksOfMonth(date) {
        const start = dayjs(date).startOf('month');
        const end = dayjs(date).endOf('month');
        let weeks = [];
        let current = start;
        while (current.isBefore(end) || current.isSame(end, 'day')) {
            // Start of week: current
            let weekStart = current;
            let weekEnd = current.endOf('week');
            // Clamp weekStart and weekEnd to the month
            if (weekStart.isBefore(start)) weekStart = start;
            if (weekEnd.isAfter(end)) weekEnd = end;
            weeks.push(`${weekStart.format('YYYY-MM-DD')} - ${weekEnd.format('YYYY-MM-DD')}`);
            current = weekEnd.add(1, 'day');
        }
        console.log('BarChart getAllWeeksOfMonth (frontend):', weeks);
        return weeks;
    }
    // Helper: get all months in year
    function getAllMonthsOfYear(date) {
        return Array.from({ length: 12 }, (_, i) => dayjs(date).month(i).format('MMMM'));
    }

    // Helper for y-axis label formatting
    const formatYAxisLabel = (value) => {
        if (value >= 1000000) return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
        return value;
    };

    return (
        <div className="mt-2 m-2 max-w-full">
            <div className='Summary relative rounded-lg h-72 grid gap-4 flex flex-row m-2'>
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    slidesPerView={1}
                    effect="coverflow"
                    autoplay={{
                        delay: 4000,
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
                            width="150px"
                            value={selectedMainCategory}
                            onChange={val => setSelectedMainCategory(val)}
                            options={[
                                { value: "Necessary", label: "Build Necessary" },
                                { value: "Optional", label: "Build Optional" },
                                { value: "Common", label: "Single Category" },
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
                                    data: pieChartData,
                                },
                            ]}
                            slotProps={{
                                legend: {
                                    sx: {
                                        ml: 2,
                                        mr: 3,
                                        width: '110px',
                                        '& .MuiChartsLegend-root': {
                                            flexWrap: 'wrap', // ensure wrapping if needed
                                        },
                                        '& .MuiChartsLegend-series': {
                                            display: 'flex',
                                            alignItems: 'center',
                                        },
                                        '& .MuiChartsLegend-label': {
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word',
                                            lineHeight: 1.2,
                                            flex: 1,
                                        },
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
                            <Typography variant="body1" fontWeight="bold">{totalGrowth.toLocaleString()} LKR</Typography>
                        </div>
                        <div className='mr-6 pt-1'>
                            <InputField
                                type="select"
                                size="small"
                                width="140px"
                                value={barChartRange}
                                onChange={val => setBarChartRange(val)}
                                options={[
                                    { value: 'lastweek', label: 'Last Week' },
                                    { value: 'thisweek', label: 'This Week' },
                                    { value: 'lastmonth', label: 'Last Month' },
                                    { value: 'thismonth', label: 'This Month' },
                                    { value: 'thisyear', label: 'This Year' },
                                    { value: 'lastyear', label: 'Last Year' },
                                ]}
                            />
                        </div>
                    </div>
                    <div className='Salesdetals flex flex-row'>
                        <BarChart
                            xAxis={[{
                                data: barChartData.xLabels,
                                scaleType: 'band',
                                tickLabelStyle: {
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                    fontSize: 11,
                                    maxWidth: 80,
                                },
                            }]}
                            yAxis={[{
                                width: 80,
                                label: 'Sales (LKR)',
                                tickLabelStyle: {
                                    fontSize: 15,
                                    maxWidth: 80,
                                },
                                valueFormatter: formatYAxisLabel,
                            }]}
                            series={[
                                { data: barChartData.sales, label: 'Sales', id: 'sales', stack: 'total', color: palette[1] },
                                { data: barChartData.refund, label: 'Refunded', id: 'refund', stack: 'total', color: palette[6] },
                                { data: barChartData.cancle, label: 'Cancled', id: 'cancle', stack: 'total', color: palette[3] },
                                { data: barChartData.other, label: 'Other Cost', id: 'other', stack: 'total', color: palette[5] },
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
