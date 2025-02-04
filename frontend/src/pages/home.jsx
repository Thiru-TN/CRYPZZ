import React, { useEffect, useState } from 'react';
import { FaBell, FaSyncAlt, FaSearch, FaCog } from 'react-icons/fa';

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCryptoData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?' +
                'vs_currency=usd&' +
                'order=market_cap_desc&' +
                'per_page=20&' +
                'page=1&' +
                'sparkline=false&' +
                'price_change_percentage=1h,24h,7d,14d,30d,200d,1y'
            );
            const data = await response.json();
            setCoins(data);
            setLastUpdated(new Date().toLocaleTimeString());
            setError(null);
        } catch (err) {
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptoData();
        const interval = setInterval(fetchCryptoData, 120000);
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
    );
};

export default Home;