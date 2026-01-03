"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Search,
    Navigation,
    Plus,
    GripVertical,
    Trash2,
    ArrowLeft,
    Save,
    Sparkles,
    Info,
    ChevronRight,
    DollarSign,
    Clock,
    Calendar,
    ArrowDown,
    TrendingUp,
    Wallet,
    PieChart,
    Filter,
    ArrowUpAz,
    ListFilter,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

const TripItineraryView = () => {
    const { id } = useParams();
    const router = useRouter();
    const [trip, setTrip] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const { data } = await api.get(`/trips/${id}`);
                setTrip(data);
            } catch (error) {
                console.error('Failed to fetch trip:', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchTrip();
    }, [id]);

    if (isLoading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
    );

    if (!trip) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
            <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
            <Link href="/dashboard" className="text-blue-500 hover:underline">Back to Dashboard</Link>
        </div>
    );

    const totalSpent = trip.expenses?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;
    const activitySpent = trip.stops?.reduce((acc: number, stop: any) => {
        return acc + stop.activities?.reduce((a: number, act: any) => a + (act.cost || 0), 0);
    }, 0) || 0;
    const grandTotalSpent = totalSpent + activitySpent;

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header with Search & Filters */}
                    <div className="mb-12">
                        <div className="flex flex-col lg:flex-row items-center gap-4">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search activities, expenses, or notes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-white/[0.03] border border-white/10 rounded-[24px] focus:outline-none focus:border-blue-500/50 transition-all text-base placeholder:text-gray-600"
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full lg:w-auto">
                                <button className="flex-1 lg:flex-none px-6 py-5 bg-white/[0.03] border border-white/10 rounded-[20px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all group">
                                    <ListFilter className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                    <span className="text-sm font-medium">Group by</span>
                                </button>
                                <button className="flex-1 lg:flex-none px-6 py-5 bg-white/[0.03] border border-white/10 rounded-[20px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all group">
                                    <Filter className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                    <span className="text-sm font-medium">Filter</span>
                                </button>
                                <button className="flex-1 lg:flex-none px-6 py-5 bg-white/[0.03] border border-white/10 rounded-[20px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all group">
                                    <ArrowUpAz className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                    <span className="text-sm font-medium">Sort by</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Trip Title & Budget Summary */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                                    Itinerary for {trip.title}
                                </h1>
                                <div className="flex items-center gap-4 text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-blue-500" />
                                        <span>{trip.stops?.[0]?.city || 'Various Locations'}</span>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-blue-500" />
                                        <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-8 rounded-[32px] border border-blue-500/20 bg-blue-500/[0.02]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Total Budget</p>
                                    <p className="text-2xl font-bold">${trip.budget || 0}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Spent so far</span>
                                    <span className="font-bold text-blue-400">${grandTotalSpent}</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((grandTotalSpent / (trip.budget || 1)) * 100, 100)}%` }}
                                        className="h-full bg-blue-500"
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                                    <span>{Math.round((grandTotalSpent / (trip.budget || 1)) * 100)}% used</span>
                                    <span>${Math.max((trip.budget || 0) - grandTotalSpent, 0)} remaining</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Itinerary Timeline */}
                    <div className="space-y-24">
                        {trip.stops?.map((stop: any, stopIdx: number) => (
                            <div key={stop.id} className="relative">
                                {/* Day Marker */}
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="px-8 py-3 rounded-2xl bg-white text-black font-bold text-lg shadow-xl shadow-white/10">
                                        Stop {stopIdx + 1}
                                    </div>
                                    <div className="text-gray-500 font-medium">
                                        {stop.city}, {stop.country} ({new Date(stop.arrivalDate).toLocaleDateString()})
                                    </div>
                                    <div className="h-[1px] flex-1 bg-white/10" />
                                </div>

                                {/* Activities & Expenses Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    {/* Physical Activity Column */}
                                    <div className="lg:col-span-8 space-y-8">
                                        <div className="flex items-center gap-3 mb-6 px-4">
                                            <TrendingUp className="w-5 h-5 text-blue-500" />
                                            <h3 className="text-xl font-bold text-gray-300 uppercase tracking-widest text-sm">Activities</h3>
                                        </div>

                                        <div className="space-y-12 relative">
                                            {stop.activities?.length > 0 ? stop.activities.map((activity: any, actIdx: number) => (
                                                <div key={activity.id} className="relative">
                                                    {/* Activity Card */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        className="glass-card p-8 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all group"
                                                    >
                                                        <div className="flex items-start justify-between gap-6">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-4">
                                                                    <span className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                                                                        {activity.category || 'General'}
                                                                    </span>
                                                                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                                        <Clock className="w-3.5 h-3.5" />
                                                                        {activity.startTime ? new Date(activity.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD'}
                                                                    </div>
                                                                </div>
                                                                <h4 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                                                    {activity.title}
                                                                </h4>
                                                                <p className="text-gray-400 leading-relaxed text-sm">
                                                                    {activity.description || 'No description provided.'}
                                                                </p>
                                                            </div>
                                                            <button className="p-4 rounded-2xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                                                                <ChevronRight className="w-6 h-6" />
                                                            </button>
                                                        </div>
                                                    </motion.div>

                                                    {/* Connecting Arrow */}
                                                    {actIdx < stop.activities.length - 1 && (
                                                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/10">
                                                            <ArrowDown className="w-8 h-8 animate-bounce" />
                                                        </div>
                                                    )}
                                                </div>
                                            )) : (
                                                <div className="glass-card p-8 rounded-[32px] border border-white/5 text-center text-gray-500">
                                                    No activities planned for this stop.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expense Column */}
                                    <div className="lg:col-span-4 space-y-8">
                                        <div className="flex items-center gap-3 mb-6 px-4">
                                            <PieChart className="w-5 h-5 text-purple-500" />
                                            <h3 className="text-xl font-bold text-gray-300 uppercase tracking-widest text-sm">Expense</h3>
                                        </div>

                                        <div className="space-y-12">
                                            {stop.activities?.map((activity: any) => (
                                                <motion.div
                                                    key={`exp-${activity.id}`}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    className="glass-card p-8 rounded-[32px] border border-white/5 h-[210px] flex flex-col justify-center items-center text-center group hover:border-purple-500/30"
                                                >
                                                    <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                                                        <DollarSign className="w-6 h-6" />
                                                    </div>
                                                    <div className="text-3xl font-bold mb-1">${activity.cost || 0}</div>
                                                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                                                        {activity.category || 'Activity'}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Activity Button */}
                    <div className="mt-24 flex flex-col items-center gap-8">
                        <button
                            className="w-full py-12 border-2 border-white/5 border-dashed rounded-[40px] flex items-center justify-center gap-4 text-gray-500 hover:text-white hover:bg-white/[0.02] hover:border-blue-500/30 transition-all group"
                        >
                            <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
                                <Plus className="w-8 h-8" />
                            </div>
                            <span className="text-2xl font-bold">Add New Stop</span>
                        </button>

                        <div className="flex gap-4">
                            <Link href="/dashboard" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all">
                                Back to Dashboard
                            </Link>
                            <button className="btn-premium px-12 py-4 rounded-2xl flex items-center gap-3">
                                <Save className="w-5 h-5" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(12px);
                }
            `}</style>
        </main>
    );
};

export default TripItineraryView;
