"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import {
    Users,
    MapPin,
    TrendingUp,
    DollarSign,
    Settings,
    Shield,
    AlertCircle,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Filter,
    MoreVertical,
    Sparkles,
    ListFilter,
    ArrowUpAz,
    ChevronRight,
    Activity,
    BarChart3,
    PieChart as PieChartIcon,
    Globe,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import api from '@/lib/api';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [popularActivities, setPopularActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [tabLoading, setTabLoading] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        if (activeTab === 'users') {
            const delayDebounceFn = setTimeout(() => {
                fetchUsers();
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        }
        if (activeTab === 'activities') fetchActivities();
    }, [activeTab, searchQuery]);

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/admin/stats');
            setStats(data);
        } catch (error) {
            console.error('Error fetching admin stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setTabLoading(true);
        try {
            const { data } = await api.get('/admin/users', {
                params: { search: searchQuery }
            });
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setTabLoading(false);
        }
    };

    const fetchActivities = async () => {
        setTabLoading(true);
        try {
            const { data } = await api.get('/admin/activities');
            setPopularActivities(data);
        } catch (error) {
            console.error('Error fetching popular activities:', error);
        } finally {
            setTabLoading(false);
        }
    };

    const tabs = [
        { id: 'users', label: 'Manage Users', icon: <Users className="w-4 h-4" /> },
        { id: 'cities', label: 'Popular Cities', icon: <Globe className="w-4 h-4" /> },
        { id: 'activities', label: 'Popular Activities', icon: <Activity className="w-4 h-4" /> },
        { id: 'analytics', label: 'User Trends and Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    ];

    if (loading) {
        return (
            <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                    <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Loading System Data...</p>
                </div>
            </main>
        );
    }

    const analyticsData = stats?.tripTrends?.map((item: any) => ({
        name: new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short' }),
        trips: item._count.id,
        users: Math.floor(item._count.id * 1.5) // Mocking user growth based on trips for now
    })) || [];

    const pieData = stats?.popularCities?.map((item: any) => ({
        name: item.city,
        value: item._count.city
    })) || [];

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-24">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                                <Shield className="w-5 h-5 text-purple-400" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
                        </div>
                        <p className="text-gray-500 text-lg max-w-2xl">
                            Comprehensive system oversight, user management, and global travel analytics.
                        </p>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="glass-card p-2 rounded-[24px] border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl mb-8">
                        <div className="flex flex-col lg:flex-row items-center gap-2">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search users, trips, or system logs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-transparent rounded-2xl focus:outline-none text-base placeholder:text-gray-600"
                                />
                            </div>

                            <div className="h-10 w-[1px] bg-white/10 hidden lg:block" />

                            <div className="flex items-center gap-2 w-full lg:w-auto p-1">
                                <button className="flex-1 lg:flex-none px-6 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-xl flex items-center justify-center gap-2 transition-all group">
                                    <ListFilter className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                    <span className="text-sm font-medium">Group by</span>
                                </button>
                                <button className="flex-1 lg:flex-none px-6 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-xl flex items-center justify-center gap-2 transition-all group">
                                    <Filter className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                    <span className="text-sm font-medium">Filter</span>
                                </button>
                                <button className="flex-1 lg:flex-none px-6 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20">
                                    <ArrowUpAz className="w-4 h-4" />
                                    <span className="text-sm font-medium">Sort by</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-white/10 border-white/20 text-white shadow-lg'
                                    : 'bg-white/[0.02] border-white/5 text-gray-500 hover:bg-white/[0.05] hover:text-gray-300'
                                    }`}
                            >
                                {tab.icon}
                                <span className="text-sm font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {tabLoading ? (
                                <div className="flex items-center justify-center py-24">
                                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                                </div>
                            ) : (
                                <>
                                    {activeTab === 'analytics' && (
                                        <div className="space-y-8">
                                            {/* Stats Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                {[
                                                    { label: 'Total Users', value: stats?.totalUsers || 0, change: '+12%', trend: 'up', icon: <Users className="w-5 h-5 text-blue-400" /> },
                                                    { label: 'Total Trips', value: stats?.totalTrips || 0, change: '+8%', trend: 'up', icon: <MapPin className="w-5 h-5 text-purple-400" /> },
                                                    { label: 'Total Stops', value: stats?.totalStops || 0, change: '+24%', trend: 'up', icon: <Globe className="w-5 h-5 text-green-400" /> },
                                                    { label: 'Avg Rating', value: '4.8', change: '+0.2', trend: 'up', icon: <Sparkles className="w-5 h-5 text-yellow-400" /> },
                                                ].map((stat, i) => (
                                                    <div key={i} className="glass-card p-6 rounded-[32px] border border-white/10">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                                                {stat.icon}
                                                            </div>
                                                            <div className={`text-xs font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                                                {stat.change}
                                                            </div>
                                                        </div>
                                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                                                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Charts Section */}
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                <div className="lg:col-span-2 glass-card p-8 rounded-[40px] border border-white/10 min-h-[400px]">
                                                    <div className="flex items-center justify-between mb-8">
                                                        <h3 className="text-xl font-bold">User Growth & Trips</h3>
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                                                <span className="text-xs text-gray-400">Users</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full bg-purple-500" />
                                                                <span className="text-xs text-gray-400">Trips</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="h-[300px] w-full">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <AreaChart data={analyticsData.length > 0 ? analyticsData : MOCK_ANALYTICS_DATA}>
                                                                <defs>
                                                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                                    </linearGradient>
                                                                    <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                                    </linearGradient>
                                                                </defs>
                                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                                                <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                                                                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                                                                <Tooltip
                                                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                                                    itemStyle={{ fontSize: '12px' }}
                                                                />
                                                                <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" />
                                                                <Area type="monotone" dataKey="trips" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTrips)" />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>

                                                <div className="glass-card p-8 rounded-[40px] border border-white/10 flex flex-col">
                                                    <h3 className="text-xl font-bold mb-8">Popular Cities</h3>
                                                    <div className="flex-1 h-[250px]">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <PieChart>
                                                                <Pie
                                                                    data={pieData.length > 0 ? pieData : MOCK_PIE_DATA}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    innerRadius={60}
                                                                    outerRadius={80}
                                                                    paddingAngle={5}
                                                                    dataKey="value"
                                                                >
                                                                    {(pieData.length > 0 ? pieData : MOCK_PIE_DATA).map((entry: any, index: number) => (
                                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                    ))}
                                                                </Pie>
                                                                <Tooltip
                                                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                                                />
                                                            </PieChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                    <div className="space-y-3 mt-4">
                                                        {(pieData.length > 0 ? pieData : MOCK_PIE_DATA).map((item: any, i: number) => (
                                                            <div key={i} className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                                                    <span className="text-xs text-gray-400">{item.name}</span>
                                                                </div>
                                                                <span className="text-xs font-bold">{item.value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'users' && (
                                        <div className="glass-card rounded-[40px] border border-white/10 overflow-hidden">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">User</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Trips Made</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Joined</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Role</th>
                                                        <th className="px-8 py-6"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {users.map((user, i) => (
                                                        <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                                            <td className="px-8 py-6">
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm">
                                                                        {user.firstName?.charAt(0) || user.email.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-bold text-sm">{user.firstName} {user.lastName}</h4>
                                                                        <p className="text-xs text-gray-500">{user.email}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm font-medium">{user._count.trips}</span>
                                                                    <button className="p-1 hover:bg-white/10 rounded-md transition-colors text-purple-400">
                                                                        <ChevronRight className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-6 text-sm text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                            <td className="px-8 py-6">
                                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                                    {user.role}
                                                                </span>
                                                            </td>
                                                            <td className="px-8 py-6 text-right">
                                                                <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <MoreVertical className="w-4 h-4 text-gray-600" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {activeTab === 'cities' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {(stats?.popularCities || []).map((city: any, i: number) => (
                                                <div key={i} className="glass-card rounded-[40px] overflow-hidden border border-white/10 group cursor-pointer">
                                                    <div className="h-48 relative overflow-hidden">
                                                        <img src={`https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop`} alt={city.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                        <div className="absolute bottom-6 left-6">
                                                            <h4 className="text-xl font-bold">{city.city}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="p-8 flex items-center justify-between">
                                                        <div>
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total Trips</p>
                                                            <p className="text-2xl font-bold">{city._count.city}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Growth</p>
                                                            <p className="text-lg font-bold text-green-400">+12%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'activities' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {popularActivities.map((activity, i) => (
                                                <div key={i} className="glass-card p-8 rounded-[40px] border border-white/10 flex items-center justify-between group hover:border-white/20 transition-all">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Activity className="w-6 h-6 text-purple-400" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xl font-bold mb-1">{activity.title}</h4>
                                                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Activity</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold mb-1">{activity._count.title}</p>
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Sparkles className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                            <span className="text-xs font-bold">Popular</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
};

const MOCK_ANALYTICS_DATA = [
    { name: 'Jan', users: 4000, trips: 2400 },
    { name: 'Feb', users: 3000, trips: 1398 },
    { name: 'Mar', users: 2000, trips: 9800 },
    { name: 'Apr', users: 2780, trips: 3908 },
    { name: 'May', users: 1890, trips: 4800 },
    { name: 'Jun', users: 2390, trips: 3800 },
];

const MOCK_PIE_DATA = [
    { name: 'Adventure', value: 400 },
    { name: 'Leisure', value: 300 },
    { name: 'Cultural', value: 300 },
    { name: 'Business', value: 200 },
];

export default AdminPanel;
