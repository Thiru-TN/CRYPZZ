import { useEffect, useState } from 'react';
import './css/home.css';
import { useNavigate} from "react-router-dom";
import { brainwave } from '../assets';
import profileImage from '../assets/notification/image-1.png';
import { FaBell, FaSyncAlt, FaSearch, FaCog, FaChartLine, FaDollarSign, FaExchangeAlt, FaWater, FaFire, FaHome} from 'react-icons/fa';

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [loading] = useState(true);
    const [error] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [overview, setOverview] = useState({
        totalMarketCap: 0,
        total24hVolume: 0,
        liquidityChange: 0
    });
    const [trending, setTrending] = useState([]);
    const [setRecentlyAdded] = useState([]);
    const [setMostVoted] = useState([]);

    
        const navigate = useNavigate();
    
        const handlenav = () => {
            navigate("/api/feed");
        };
   

    const fetchCryptoData = async () => {
        const cachedData = localStorage.getItem("cryptoData");
        if (cachedData) {
            setCoins(JSON.parse(cachedData));
            setLastUpdated(new Date().toLocaleTimeString());
        }
    
        const data = await fetchWithRetry(
            'https://api.coingecko.com/api/v3/coins/markets?' +
            'vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h,24h,7d,14d,30d,200d,1y'
        );
    
        if (data) {
            setCoins(data);
            localStorage.setItem("cryptoData", JSON.stringify(data));
            setLastUpdated(new Date().toLocaleTimeString());
        }
    };
        

    const fetchWithRetry = async (url, retries = 3, delay = 2000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (response.status === 429) {
                    console.warn("Rate limit hit, retrying...");
                    await new Promise(res => setTimeout(res, delay * (i + 1))); // Exponential Backoff
                    continue;
                }
                return await response.json();
            } catch (error) {
                console.error(`Fetch failed: ${error}`);
            }
        }
        return null; // Return null if all retries fail
    };
    

    const fetchOverview = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/global');
            const data = await response.json();
            setOverview({
                totalMarketCap: data.data.total_market_cap.usd,
                total24hVolume: data.data.total_volume.usd,
                liquidityChange: data.data.market_cap_change_percentage_24h_usd
            });
        } catch (error) {
            console.error('Failed to fetch overview:', error);
        }
    };

    const fetchTrending = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
            const data = await response.json();
            setTrending(data.coins.slice(0, 3));
        } catch (error) {
            console.error('Failed to fetch trending:', error);
        }
    };

    const fetchRecentlyAdded = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/new?per_page=3&page=1');
            const data = await response.json();
            setRecentlyAdded(data);
        } catch (error) {
            console.error('Failed to fetch recently added:', error);
        }
    };

    const fetchMostVoted = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/search/trending?per_page=3');
            const data = await response.json();
            setMostVoted(data.coins.slice(0, 3));
        } catch (error) {
            console.error('Failed to fetch most voted:', error);
        }
    };

    useEffect(() => {
        fetchCryptoData();
        fetchOverview();
        fetchTrending();
        fetchRecentlyAdded();
        fetchMostVoted();
        
        const interval = setInterval(() => {
            fetchCryptoData();
            fetchOverview();
            fetchTrending();
            fetchRecentlyAdded();
            fetchMostVoted();
        }, 300000); // Change to 5 minutes (300000 ms)
    
        return () => clearInterval(interval);
    }, []);
    

    const formatPrice = (num) => {
        if (!num) return 'N/A';
        if (num < 0.01) return `$${num.toFixed(6)}`;
        if (num < 1) return `$${num.toFixed(4)}`;
        if (num < 10) return `$${num.toFixed(3)}`;
        return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const formatNumber = (num) => {
        if (!num) return 'N/A';
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
        if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
        return `$${num.toFixed(2)}`;
    };

    const formatPercent = (num) => {
        if (!num) return 'N/A';
        return `${num.toFixed(2)}%`;
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home">
            {/* Top Bar */}
            <div className="top-bar">
            <div className="logo">
            <img
                src={brainwave}
                alt="Brainwave Logo"
                onClick={handlenav}
                style={{ cursor: "pointer" }}
                className="h-10"
            />
        </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <FaSearch className="search-icon" />
                </div>
                <div className="icon-group">
                    <FaSyncAlt className="icon" onClick={() => { fetchCoins(); fetchLiveFeed(); }} />
                    <FaBell className="icon" />
                    <FaCog className="icon" />
                    <div className="user-icon-container">
                        <img src={profileImage} alt="User Icon" className="user-icon" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Left Section - Live Feed */}
                <div className="left-section">
                    <div className="min-h-screen bg-gray-900">
            {/* Enhanced Top Bar */}
            <div className="bg-black shadow-lg p-4 flex justify-between items-center border-b border-purple-800">
                <div className="flex items-center space-x-6">
                    <h1 className="text-xl font-bold text-purple-400">Crypto Dashboard</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search coins..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-purple-700 focus:outline-none focus:border-purple-500"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                    </div>
                </div>
                
                <div className="flex items-center space-x-6">
                    <button 
                        onClick={fetchCryptoData}
                        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300"
                    >
                        <FaSyncAlt className={loading ? 'animate-spin' : ''} />
                        <span className="text-sm">Last updated: {lastUpdated}</span>
                    </button>
                    
                </div>
            </div>

            <div className="p-6">
                {error && (
                    <div className="bg-red-900 border-l-4 border-red-500 text-red-200 p-4 mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                    {filteredCoins.map((coin) => (
                        <div key={coin.id} className="bg-black rounded-lg shadow-lg p-6 border border-purple-800">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                                    <div>
                                        <h2 className="text-xl font-bold text-white">
                                            {coin.name} 
                                            <span className="ml-2 text-sm text-purple-400">#{coin.market_cap_rank}</span>
                                        </h2>
                                        <span className="text-purple-300">{coin.symbol.toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white mb-1">
                                        {formatPrice(coin.current_price)}
                                    </div>
                                    <div className={`text-lg font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {formatPercent(coin.price_change_percentage_24h)}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="bg-gray-900 p-3 rounded border border-purple-700">
                                    <div className="text-sm text-purple-300">Market Cap</div>
                                    <div className="font-semibold text-white">{formatNumber(coin.market_cap)}</div>
                                </div>
                                <div className="bg-gray-900 p-3 rounded border border-purple-700">
                                    <div className="text-sm text-purple-300">24h Volume</div>
                                    <div className="font-semibold text-white">{formatNumber(coin.total_volume)}</div>
                                </div>
                                <div className="bg-gray-900 p-3 rounded border border-purple-700">
                                    <div className="text-sm text-purple-300">Circulating Supply</div>
                                    <div className="font-semibold text-white">{Math.round(coin.circulating_supply).toLocaleString()}</div>
                                </div>
                                <div className="bg-gray-900 p-3 rounded border border-purple-700">
                                    <div className="text-sm text-purple-300">Max Supply</div>
                                    <div className="font-semibold text-white">{coin.max_supply ? Math.round(coin.max_supply).toLocaleString() : 'N/A'}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="bg-gray-900 p-3 rounded border border-purple-700">
                                    <div className="text-sm text-purple-300">All Time High</div>
                                    <div className="font-semibold text-white">{formatPrice(coin.ath)}</div>
                                    <div className="text-xs text-purple-400">
                                        {formatPercent(coin.ath_change_percentage)} from ATH
                                    </div>
                                </div>
                                <div className="bg-gray-900 p-3 rounded border border-purple-700">
                                    <div className="text-sm text-purple-300">All Time Low</div>
                                    <div className="font-semibold text-white">{formatPrice(coin.atl)}</div>
                                    <div className="text-xs text-purple-400">
                                        {formatPercent(coin.atl_change_percentage)} from ATL
                                    </div>
                                </div>
                                <div className="bg-gray-900 p-3 rounded border border-purple-700">
                                    <div className="text-sm text-purple-300">Market Cap Dominance</div>
                                    <div className="font-semibold text-white">
                                        {formatPercent(coin.market_cap_dominance || (coin.market_cap / coin.total_volume * 100))}
                                    </div>
                                </div>
                                <div className="bg-gray-900 p-3 rounded border border-purple-700">
                                    <div className="text-sm text-purple-300">Fully Diluted Valuation</div>
                                    <div className="font-semibold text-white">{formatNumber(coin.fully_diluted_valuation)}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                                {['1h', '24h', '7d', '14d', '30d', '200d', '1y'].map((period) => {
                                    const value = coin[`price_change_percentage_${period}_in_currency`] ||
                                                coin[`price_change_percentage_${period}`];
                                    return (
                                        <div key={period} 
                                             className={`p-2 rounded text-center border ${
                                                 value >= 0 
                                                 ? 'bg-green-900 border-green-700 text-green-200' 
                                                 : 'bg-red-900 border-red-700 text-red-200'
                                             }`}>
                                            <div className="text-xs">{period}</div>
                                            {formatPercent(value)}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
                </div>
                {/* Right Section - Coin Cards */}
                <div className="right-section">
                <div className="w-96 space-y-6 p-6 bg-gray-900">
                        {/* Overview Card */}
                        <div className="bg-black rounded-lg p-6 border border-purple-800">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-purple-400 flex items-center">
                                    <FaChartLine className="mr-2" /> Overview
                                </h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-purple-300">
                                        <FaDollarSign className="mr-2" /> Market Cap
                                    </div>
                                    <div className="text-white font-semibold">
                                        {formatNumber(overview.totalMarketCap)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-purple-300">
                                        <FaExchangeAlt className="mr-2" /> 24h Volume
                                    </div>
                                    <div className="text-white font-semibold">
                                        {formatNumber(overview.total24hVolume)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-purple-300">
                                        <FaWater className="mr-2" /> Liquidity ±2%
                                    </div>
                                    <div className={`font-semibold ${overview.liquidityChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {overview.liquidityChange.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trending Card */}
                        <div className="bg-black rounded-lg p-6 border border-purple-800">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-purple-400 flex items-center">
                                    <FaFire className="mr-2" /> Trending
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {trending.map((coin, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={coin.item.small} alt={coin.item.name} className="w-6 h-6 mr-2" />
                                            <span className="text-white">{coin.item.name}</span>
                                        </div>
                                        <span className="text-purple-300">{coin.item.symbol}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
