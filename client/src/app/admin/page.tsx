'use client';

import React from 'react';
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
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPanel = () => {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
                            <Shield className="w-3 h-3 text-purple-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">System Administration</span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight mb-2">Control Center</h1>
                        <p className="text-gray-500 text-lg">Monitor system performance, users, and global travel trends.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/10 transition-colors">
                            <Settings className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="btn-premium">Generate System Report</button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {[
                        { label: 'Total Users', value: '12,482', change: '+12%', trend: 'up', icon: <Users className="w-5 h-5 text-blue-400" /> },
                        { label: 'Active Trips', value: '3,842', change: '+8%', trend: 'up', icon: <MapPin className="w-5 h-5 text-purple-400" /> },
                        { label: 'Revenue', value: '$842,000', change: '+24%', trend: 'up', icon: <DollarSign className="w-5 h-5 text-green-400" /> },
                        { label: 'System Load', value: '24%', change: '-2%', trend: 'down', icon: <TrendingUp className="w-5 h-5 text-orange-400" /> },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 rounded-[32px] group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <div className={`flex items-center space-x-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    <span>{stat.change}</span>
                                </div>
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">{stat.label}</h3>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Recent Activity Table */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                    <input
                                        type="text"
                                        placeholder="Search logs..."
                                        className="pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs focus:outline-none focus:border-white/20 transition-all"
                                    />
                                </div>
                                <button className="p-2 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/10 transition-colors">
                                    <Filter className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="glass-card rounded-[40px] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">User</th>
                                            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Action</th>
                                            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                                            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">Time</th>
                                            <th className="px-8 py-6"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { user: 'Alex Thompson', action: 'Created new trip "Swiss Alps"', status: 'Success', time: '2 mins ago' },
                                            { user: 'Sarah Jenkins', action: 'Updated profile settings', status: 'Success', time: '15 mins ago' },
                                            { user: 'Michael Chen', action: 'Failed login attempt', status: 'Warning', time: '45 mins ago' },
                                            { user: 'Emma Wilson', action: 'Deleted itinerary "Bali 2023"', status: 'Success', time: '1 hour ago' },
                                            { user: 'David Miller', action: 'System backup completed', status: 'Success', time: '3 hours ago' },
                                        ].map((log, i) => (
                                            <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[10px] font-bold">
                                                            {log.user.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium">{log.user}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm text-gray-400">{log.action}</td>
                                                <td className="px-8 py-6">
                                                    <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${log.status === 'Success' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                                        }`}>
                                                        {log.status === 'Success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                        <span>{log.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm text-gray-500">{log.time}</td>
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
                            <div className="p-6 bg-white/[0.01] text-center">
                                <button className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">View All Logs</button>
                            </div>
                        </div>
                    </div>

                    {/* System Health Sidebar */}
                    <div className="space-y-12">
                        <div className="glass-card p-8 rounded-[40px]">
                            <h3 className="text-xl font-bold mb-8">System Health</h3>
                            <div className="space-y-8">
                                {[
                                    { label: 'API Server', status: 'Operational', color: 'bg-green-500' },
                                    { label: 'Database', status: 'Operational', color: 'bg-green-500' },
                                    { label: 'Storage', status: 'Operational', color: 'bg-green-500' },
                                    { label: 'Auth Service', status: 'Degraded', color: 'bg-yellow-500' },
                                ].map((service, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-2 h-2 rounded-full ${service.color} shadow-[0_0_10px_rgba(34,197,94,0.5)]`} />
                                            <span className="text-sm font-medium">{service.label}</span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{service.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[40px] bg-gradient-to-br from-purple-600/10 to-blue-600/10 border-purple-500/20">
                            <Sparkles className="w-6 h-6 text-purple-400 mb-4" />
                            <h4 className="font-bold mb-2">Admin Insights</h4>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                Traffic from <strong>Europe</strong> has increased by <strong>42%</strong> this week. Consider scaling the regional API nodes.
                            </p>
                            <button className="btn-premium w-full py-3 text-xs">Scale Infrastructure</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminPanel;
