import { Typography } from '@mui/material';
import FullScreenLoader from '../AtomicComponents/FullScreenLoader';
import { React, useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';
import Iconset from '../AtomicComponents/Icons/Iconset';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { OrderSummary, GameTable, TopProductsTable, TopBuildsTable, BuildSummary } from '../MoleculesComponents/Table';
import { GameCard, TopProductCard } from "../AtomicComponents/Cards/Productcard";
import BuildCard from "../AtomicComponents/Cards/BuildCard";
import TimeCard from "../AtomicComponents/Cards/TimeCard";
import { subCategories } from '../AtomicComponents/ForAdminForms/Category';
import axios from 'axios';
import dayjs from 'dayjs';
import slide1 from '../assets/images/DashboadSlider/1.png';
import slide2 from '../assets/images/DashboadSlider/3.png';
import slide3 from '../assets/images/DashboadSlider/4.png';
import Product from '../assets/images/DashboadSlider/Product.png';
import Order from '../assets/images/DashboadSlider/Order.png';
import Games from '../assets/images/DashboadSlider/Games.png';
import { InputField } from '../AtomicComponents/Inputs/Input';
import { PrimaryButton } from '../AtomicComponents/Buttons/Buttons';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);

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

    const topBuildsColumns = [
        { id: "buildCard", label: "Build" },
        { id: "date", label: "Delivered On" },
    ];

    const buildColumns = [
        { id: "Id", label: "BuildID" },
        { id: "userCard", label: "Customer" },
        { id: "date", label: "Ordered at" },
        { id: "buildName", label: "Build Name" },
        { id: "totalCharge", label: "Total Charge" },
        { id: "buildStatus", label: "Status" },
    ];

    const [orderFilter, setOrderFilter] = useState('All');
    const [salesFilter, setSalesFilter] = useState('All');
    const [pendingFilter, setPendingFilter] = useState('All');
    const [growthFilter, setgrowthFilter] = useState('All');

    // Build summary filters
    const [buildOrderFilter, setBuildOrderFilter] = useState('All');
    const [buildRevenueFilter, setBuildRevenueFilter] = useState('All');
    const [buildPendingFilter, setBuildPendingFilter] = useState('All');


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Build table pagination states
    const [buildCurrentPage, setBuildCurrentPage] = useState(1);
    const [buildTotalPages, setBuildTotalPages] = useState(1);
    const [totalBuilds, setTotalBuilds] = useState(0);
    const [buildItemsPerPage, setBuildItemsPerPage] = useState(5);

    const palette = ['#7B16AE', '#8A00FC', '#de1aff', '#1cbab7', '#2C87C3', '#80d1ff', '#E8CCFE'];

    const [pendingOrders, setPendingOrders] = useState([]);
    const [pendingBuilds, setPendingBuilds] = useState([]);
    const [games, setGames] = useState([]);
    const [topBuilds, setTopBuilds] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState('Necessary');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchGames = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}/api/game/games`);
            if (response.data && Array.isArray(response.data.games)) {
                setGames(response.data.games);
            } else {
                setGames([]);
            }
        } catch (error) {
            setGames([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchTopBuilds = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}/api/build-transactions/top-builds?limit=5`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data && Array.isArray(response.data.data)) {
                setTopBuilds(response.data.data);
            } else {
                setTopBuilds([]);
            }
        } catch (error) {
            setTopBuilds([]);
        } finally {
            setLoading(false);
        }
    };

    const getDateRange = (filter) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        switch (filter) {
            case 'today':
                return {
                    startDate: today.toISOString(),
                    endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
                };
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return {
                    startDate: weekAgo.toISOString(),
                    endDate: now.toISOString()
                };
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                return {
                    startDate: monthAgo.toISOString(),
                    endDate: now.toISOString()
                };
            default: // 'All'
                return {
                    startDate: null,
                    endDate: null
                };
        }
    };

    const fetchTopProducts = async () => {
        try {
            setLoading(true);
            const dateRange = getDateRange(growthFilter);
            const response = await axios.get(`${backendUrl}/api/product/top-products`, {
                params: {
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    limit: 5
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data && Array.isArray(response.data.data)) {
                setTopProducts(response.data.data);
            } else {
                setTopProducts([]);
            }
        } catch (error) {
            setTopProducts([]);
        } finally {
            setLoading(false);
        }
    };

    //Fetches the games when the component is mounted
    useEffect(() => {
        fetchGames();
        fetchTopBuilds();
        fetchTopProducts();
    }, []);

    // Refetch top products when growthFilter changes
    useEffect(() => {
        fetchTopProducts();
    }, [growthFilter]);

    //Maps the games to the game data
    const gameData = Array.isArray(games)
        ? games.map(game => ({
            gameCard: <GameCard name={game.name} type="Game" src={game.image} />,
            date: <TimeCard date={new Date(game.createdAt).toLocaleDateString()} time={new Date(game.createdAt).toLocaleTimeString()} />,
        }))
        : [];

    // Get top 5 games
    const topGames = gameData.slice(0, 6);

    //Maps the top builds to the build data
    const topBuildsData = Array.isArray(topBuilds)
        ? topBuilds.map(build => ({
            buildCard: <BuildCard
                name={build.buildName}
                src={build.buildImage}
                totalCharge={build.totalCharge}
            />,
            date: <TimeCard
                date={build.deliveredDate ? new Date(build.deliveredDate).toLocaleDateString() : 'N/A'}
                time={build.deliveredDate ? new Date(build.deliveredDate).toLocaleTimeString() : ''}
            />,
        }))
        : [];

    //Maps the top products to the product data
    const topProductsData = Array.isArray(topProducts)
        ? topProducts.map(product => ({
            topProductCard: <TopProductCard
                name={product.name}
                orderCount={product.reviewCount}
                src={product.image}
                sales={product.sales.toLocaleString()}
                rate={product.rating}
            />,
        }))
        : [];

    const [orderSummary, setOrderSummary] = useState({ totalOrders: 0, pendingOrders: 0, totalPrice: 0 });
    const [buildSummary, setBuildSummary] = useState({ totalBuildOrders: 0, pendingBuildOrders: 0, totalBuildRevenue: 0 });

    // Fetch order summary total based on filter
    const fetchOrderSummary = async (filter, type) => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    // Fetch build summary total based on filter
    const fetchBuildSummary = async (filter, type) => {
        try {
            setLoading(true);
            const res = await axios.get(`${backendUrl}/api/build-transactions/build-summary-total?filter=${filter}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );
            setBuildSummary(prev => ({
                ...prev,
                [type]: res.data[type]
            }));
        } catch (err) {
            console.error('Error fetching build summary:', err);
        } finally {
            setLoading(false);
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

    // Build summary useEffect hooks
    useEffect(() => {
        fetchBuildSummary(buildOrderFilter, 'totalBuildOrders');
    }, [buildOrderFilter]);

    useEffect(() => {
        fetchBuildSummary(buildPendingFilter, 'pendingBuildOrders');
    }, [buildPendingFilter]);

    useEffect(() => {
        fetchBuildSummary(buildRevenueFilter, 'totalBuildRevenue');
    }, [buildRevenueFilter]);

    // Fetch pending orders
    const fetchPendingOrders = async () => {
        try {
            setLoading(true);
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

            if (response.data && Array.isArray(response.data.data)) {
                setPendingOrders(response.data.data);
                setTotalOrders(response.data.pagination.total);
                setTotalPages(response.data.pagination.totalPages);
            } else {
                console.error('API returned unexpected data structure:', response.data);
            }
        } catch (error) {
            console.error("Error fetching pending orders:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch pending builds
    const fetchPendingBuilds = async () => {
        try {
            setLoading(true);
            const params = {
                page: buildCurrentPage,
                limit: buildItemsPerPage,
            };

            const response = await axios.get(`${backendUrl}/api/build-transactions/build-summary`, {
                params,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            if (response.data && Array.isArray(response.data.data)) {
                setPendingBuilds(response.data.data);
                setTotalBuilds(response.data.pagination.total);
                setBuildTotalPages(response.data.pagination.totalPages);
            } else {
                console.error('API returned unexpected build data structure:', response.data);
            }
        } catch (error) {
            console.error("Error fetching pending builds:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingOrders();
        fetchPendingBuilds();
    }, [currentPage, itemsPerPage, buildCurrentPage, buildItemsPerPage]);

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
                setLoading(true);
                const response = await fetch(`${backendUrl}/api/product/counts/by-main-category?mainCategory=${selectedMainCategory}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
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
            } finally {
                setLoading(false);
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
                setLoading(true);
                const response = await axios.get(`${backendUrl}/api/checkout/bar-chart-summary`, {
                    params: { filter: barChartRange },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                let { xLabels, sales, refund, cancle, other, rawCancleOrders } = response.data || {};
                let newXLabels = [], newSales = [], newRefund = [], newCancle = [], newOther = [];
                const today = dayjs();
                if (barChartRange === 'thisweek' || barChartRange === 'lastweek') {
                    const weekRef = barChartRange === 'thisweek' ? today : today.subtract(1, 'week');
                    newXLabels = getAllDaysOfWeek(weekRef);
                    newXLabels.forEach((label, idx) => {
                        const i = xLabels.indexOf(label);
                        newSales.push(i !== -1 ? sales[i] : 0);
                        newRefund.push(i !== -1 ? refund[i] : 0);
                        // Only sum canceled orders with valid stepTimestamps.Successful
                        if (rawCancleOrders && Array.isArray(rawCancleOrders[label])) {
                            const validCancleSum = rawCancleOrders[label]
                                .filter(order => {
                                    const d = order?.stepTimestamps?.Successful ? new Date(order.stepTimestamps.Successful) : null;
                                    return d && d.getFullYear() > 2000;
                                })
                                .reduce((sum, order) => sum + (order.total || 0), 0);
                            newCancle.push(validCancleSum);
                        } else {
                            newCancle.push(i !== -1 ? cancle[i] : 0);
                        }
                        newOther.push(i !== -1 ? other[i] : 0);
                    });
                } else if (barChartRange === 'thismonth' || barChartRange === 'lastmonth') {
                    const monthRef = barChartRange === 'thismonth' ? today : today.subtract(1, 'month');
                    const daysInMonth = monthRef.daysInMonth();
                    newXLabels = Array.from({ length: daysInMonth }, (_, i) => monthRef.date(i + 1).format('YYYY-MM-DD'));
                    newXLabels.forEach((label, idx) => {
                        const i = xLabels.indexOf(label);
                        newSales.push(i !== -1 ? sales[i] : 0);
                        newRefund.push(i !== -1 ? refund[i] : 0);
                        if (rawCancleOrders && Array.isArray(rawCancleOrders[label])) {
                            const validCancleSum = rawCancleOrders[label]
                                .filter(order => {
                                    const d = order?.stepTimestamps?.Successful ? new Date(order.stepTimestamps.Successful) : null;
                                    return d && d.getFullYear() > 2000;
                                })
                                .reduce((sum, order) => sum + (order.total || 0), 0);
                            newCancle.push(validCancleSum);
                        } else {
                            newCancle.push(i !== -1 ? cancle[i] : 0);
                        }
                        newOther.push(i !== -1 ? other[i] : 0);
                    });
                } else if (barChartRange === 'thisyear' || barChartRange === 'lastyear') {
                    const yearRef = barChartRange === 'thisyear' ? today : today.subtract(1, 'year');
                    newXLabels = getAllMonthsOfYear(yearRef);
                    newXLabels.forEach((month, idx) => {
                        const i = xLabels.indexOf(month);
                        newSales.push(i !== -1 ? sales[i] : 0);
                        newRefund.push(i !== -1 ? refund[i] : 0);
                        if (rawCancleOrders && Array.isArray(rawCancleOrders[month])) {
                            const validCancleSum = rawCancleOrders[month]
                                .filter(order => {
                                    const d = order?.stepTimestamps?.Successful ? new Date(order.stepTimestamps.Successful) : null;
                                    return d && d.getFullYear() > 2000;
                                })
                                .reduce((sum, order) => sum + (order.total || 0), 0);
                            newCancle.push(validCancleSum);
                        } else {
                            newCancle.push(i !== -1 ? cancle[i] : 0);
                        }
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

                // Calculate grossProfit with the new cancled logic
                const grossProfit = newSales.reduce((a, b) => a + b, 0)
                    - newOther.reduce((a, b) => a + b, 0)
                    - newRefund.reduce((a, b) => a + b, 0)
                    - newCancle.reduce((a, b) => a + b, 0);
                setTotalGrowth(grossProfit);
            } catch (err) {
                setBarChartData({ sales: [], refund: [], cancle: [], other: [], xLabels: [] });
                setTotalGrowth(0);
            } finally {
                setLoading(false);
            }
        };
        fetchBarChartData();
    }, [barChartRange, backendUrl]);

    // Helper: get all days in week
    function getAllDaysOfWeek(date) {
        const startOfWeek = dayjs(date).startOf('week').add(1, 'day'); // Monday
        return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
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
            <FullScreenLoader open={!!loading} message={'Loading Data...'} />
            <div className='Swipper relative rounded-lg h-72 grid gap-4 flex flex-row m-2'>
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
                                <Link to="/adminpanel/orders/buildorderlist">
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

            <div className='OrderSummary grid gap-4 grid-cols-3 flex flex-row mt-6 mb-6 pl-2 pr-2'>

                <div className="TotalOrders relative border-2 border-stone-200 rounded-2xl pb-2 pt-4 pr-6 pl-6">
                    {/* Top content */}
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="h5" fontWeight="bold" color="primary">Total Orders</Typography>
                            <Typography variant="h2" fontWeight="bold">{orderSummary.totalOrders}</Typography>
                        </div>
                        <div className="pt-4">
                            <Iconset type="cart" fontSize="110px" color="primaryDark" />
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
                                className="cursor-pointer"
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>
                </div>

                <div className="TotalRevenue relative border-2 border-stone-200 rounded-2xl pb-2 pt-4 pr-6 pl-6">
                    {/* Top content */}
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="h5" fontWeight="bold" color="primary">Total Revenue</Typography>
                            <Typography variant="h4" fontWeight="bold">{orderSummary.totalPrice.toLocaleString()} LKR</Typography>
                        </div>
                        <div className="pt-4">
                            <Iconset type="money" fontSize="110px" color="primaryDark" />
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
                        <Link to="/adminpanel/orders/orderlist" state={{ selectedTab: 'Successful' }}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer"
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
                            <Iconset type="pending" fontSize="110px" color="primaryDark" />
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
                        <Link to="/adminpanel/orders/orderlist" state={{ selectedTab: 'Pending' }}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer"
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>
                </div>


            </div>

            <div className='BuildSummary grid gap-4 grid-cols-3 flex flex-row mt-6 mb-6 pl-2 pr-2'>
                <div className="TotalBuilds relative border-2 border-stone-200 rounded-2xl pb-2 pt-4 pr-6 pl-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="h5" fontWeight="bold" color="primary">Build Orders</Typography>
                            <Typography variant="h2" fontWeight="bold">{buildSummary.totalBuildOrders}</Typography>
                        </div>
                        <div className="pt-4">
                            <Iconset type="archive" fontSize="110px" color="primaryDark" />
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
                            value={buildOrderFilter}
                            onChange={(val) => setBuildOrderFilter(val)}
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
                        <Link to="/adminpanel/orders/buildorderlist">
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer"
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>
                </div>

                <div className="TotalBuidRevenue relative border-2 border-stone-200 rounded-2xl pb-2 pt-4 pr-6 pl-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="h5" fontWeight="bold" color="primary">Build Revenue</Typography>
                            <Typography variant="h4" fontWeight="bold">{buildSummary.totalBuildRevenue.toLocaleString()} LKR</Typography>
                        </div>
                        <div className="pt-4">
                            <Iconset type="money" fontSize="110px" color="primaryDark" />
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
                            value={buildRevenueFilter}
                            onChange={(val) => setBuildRevenueFilter(val)}
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
                        <Link to="/adminpanel/orders/buildorderlist" state={{ selectedTab: 'Delivered' }}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer"
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>
                </div>

                <div className="PendingBuilds relative border-2 border-stone-200 rounded-2xl pb-2 pt-4 pr-6 pl-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <Typography variant="h5" fontWeight="bold" color="primary">Pending Builds</Typography>
                            <Typography variant="h2" fontWeight="bold">{buildSummary.pendingBuildOrders}</Typography>
                        </div>
                        <div className="pt-4">
                            <Iconset type="workHistory" fontSize="110px" color="primaryDark" />
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
                            value={buildPendingFilter}
                            onChange={(val) => setBuildPendingFilter(val)}
                            options={[
                                { value: 'All', label: 'All' },
                                { value: 'today', label: 'Today' },
                                { value: 'yesterday', label: 'Yesterday' },
                                { value: 'lastweek', label: 'Last Week' },
                                { value: 'thisweek', label: 'This Week' },
                            ]}
                        />

                        {/* Right: View All link */}
                        <Link to="/adminpanel/orders/buildorderlist" state={{ selectedTab: 'Pending' }}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer"
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
                            <Typography variant="h6" fontWeight="bold" color="primary">Gross Profit</Typography>
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
                <div className='TopBuilds grid border-2 border-stone-200 rounded-2xl flex flex-row h-300'>
                    <div className='flex flex-row justify-between mr-4 ml-4 mt-4 min-h-10'>
                        <Typography variant="h6" fontWeight="bold" color='primary'>Top Builds</Typography>
                        <Link to="/adminpanel/orders/buildorderlist" state={{ selectedTab: 'Delivered' }}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer"
                                sx={{ marginTop: 1 }}
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>

                    <div className='p-2 mb-2' sx={{ width: '100%' }}>
                        <TopBuildsTable
                            columns={topBuildsColumns}
                            builds={topBuildsData}
                        />
                    </div>
                </div>
                <div className='Topproducts grid border-2 border-stone-200 rounded-2xl flex flex-row h-300'>
                    <div className='flex flex-row justify-between ml-4 mr-4 min-h-10'>
                        <Typography variant="h6" fontWeight="bold" color='primary' sx={{ marginTop: 2 }}>Top Products</Typography>
                        <div className='mt-3'>
                            <InputField
                                type="select"
                                size="small"
                                width="140px"
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

                    <div className='p-2 overflow-x-auto w-full' sx={{ width: '100%' }}>
                        <TopProductsTable
                            columns={topProductColumns}
                            cardDetails={topProductsData}
                        />
                    </div>

                </div>
                <div className='Recentgames grid border-2 border-stone-200 rounded-2xl flex flex-row h-300'>
                    <div className='flex flex-row justify-between mr-4 ml-4 mt-4 min-h-10'>
                        <Typography variant="h6" fontWeight="bold" color='primary'>Recent Added Games</Typography>
                        <Link to="/adminpanel/games/managegames" state={{ selectedTab: 'Pending' }}>
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer"
                                sx={{ marginTop: 1 }}
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>

                    <div className='p-2 mb-2' sx={{ width: '100%' }}>
                        <GameTable
                            columns={gameColumns}
                            data={topGames}
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
                                className="cursor-pointer"
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
            <div className='recentBuilds grid gap-4 grid-cols-1 border-2 border-stone-200 rounded-2xl flex flex-row mt-8 mb-8 ml-2 mr-2'>
                <div className='flex flex-col justify-between mt-2'>
                    <div className='flex flex-row justify-between items-center mb-4 mr-6 ml-4'>
                        <Typography variant="h6" fontWeight="bold" color='primary' sx={{ justifyContent: "end" }}>Recent Builds</Typography>
                        <Link to="/adminpanel/orders/buildorderlist" state={{ selectedTab: 'Pending' }}>
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="primary"
                                className="cursor-pointer"
                            >
                                View All
                            </Typography>
                        </Link>
                    </div>
                    <div sx={{ width: '100%' }}>
                        {pendingBuilds.length > 0 ? (
                            <BuildSummary
                                columns={buildColumns}
                                builds={pendingBuilds}
                                pagination={{
                                    currentPage: buildCurrentPage,
                                    totalPages: buildTotalPages,
                                    totalItems: totalBuilds,
                                    itemsPerPage: buildItemsPerPage,
                                }}
                            />
                        ) : (
                            <Typography variant="body1" color="textSecondary" sx={{ p: 2 }}>
                                No pending builds found
                            </Typography>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
