'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar as CalendarIcon,
    MapPin,
    Clock,
    DollarSign,
    Search,
    ChevronRight,
    LayoutGrid,
    List,
    PieChart as PieChartIcon,
    ArrowLeft,
    Plus,
    MoreVertical,
    Navigation
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import { useParams } from 'next/navigation';

const ItineraryView = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'budget'>('list');
    const [isLoading, setIsLoading] = useState(true);

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
        fetchTrip();
    }, [id]);

    if (isLoading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin" />
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                {/* Trip Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Journeys
                        </Link>
                        <h1 className="text-5xl font-bold tracking-tight">{trip?.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-500">
                            <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                <span>Jan 12 - Jan 24, 2024</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{trip?.stops?.length || 0} Cities</span>
                            </div>
                            <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-2" />
                                <span>Est. $4,200</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center p-1.5 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
                        {[
                            { id: 'list', icon: <List className="w-4 h-4" />, label: 'Timeline' },
                            { id: 'calendar', icon: <CalendarIcon className="w-4 h-4" />, label: 'Calendar' },
                            { id: 'budget', icon: <PieChartIcon className="w-4 h-4" />, label: 'Budget' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setViewMode(tab.id as any)}
                                className={`flex items-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${viewMode === tab.id
                                        ? 'bg-white text-black shadow-xl'
                                        : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                {tab.icon}
                                <span className="ml-2">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {viewMode === 'list' && (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            {[1, 2, 3].map((day) => (
                                <div key={day} className="relative pl-12 md:pl-24">
                                    {/* Vertical Line */}
                                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

                                    {/* Day Marker */}
                                    <div className="absolute left-0 md:left-4 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black border border-white/20 flex items-center justify-center z-10">
                                        <span className="text-xs font-bold">D{day}</span>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-2xl font-bold tracking-tight">Paris, France</h2>
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Jan {11 + day}, 2024</span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                { time: '09:00 AM', title: 'Eiffel Tower Visit', cost: '$45', type: 'Sightseeing' },
                                                { time: '01:00 PM', title: 'Lunch at Le Meurice', cost: '$120', type: 'Dining' },
                                                { time: '04:00 PM', title: 'Louvre Museum', cost: '$20', type: 'Culture' },
                                            ].map((activity, i) => (
                                                <div key={i} className="glass-card p-6 rounded-3xl group card-glow">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                                            <Clock className="w-3 h-3 mr-1.5" />
                                                            {activity.time}
                                                        </div>
                                                        <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                                                            <MoreVertical className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{activity.title}</h3>
                                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                                        <span className="text-xs text-gray-500">{activity.type}</span>
                                                        <span className="text-sm font-bold text-gray-300">{activity.cost}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <button className="border border-white/5 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.02] transition-all group">
                                                <Plus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Add Activity</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {viewMode === 'budget' && (
                        <motion.div
                            key="budget"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            <div className="lg:col-span-2 space-y-8">
                                <div className="glass-card p-12 rounded-[40px] flex flex-col items-center justify-center min-h-[400px]">
                                    <div className="w-64 h-64 rounded-full border-[32px] border-white/[0.03] border-t-blue-500 border-r-purple-500 border-b-pink-500 relative flex items-center justify-center">
                                        <div className="text-center">
                                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Spent</span>
                                            <div className="text-5xl font-bold mt-1">$4,200</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: 'Flights', amount: '$1,200', color: 'bg-blue-500' },
                                        { label: 'Accommodation', amount: '$1,800', color: 'bg-purple-500' },
                                        { label: 'Activities', amount: '$800', color: 'bg-pink-500' },
                                        { label: 'Dining', amount: '$400', color: 'bg-orange-500' },
                                    ].map((item, i) => (
                                        <div key={i} className="glass-card p-6 rounded-3xl flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className={`w-3 h-3 rounded-full ${item.color} mr-4`} />
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                            <span className="font-bold">{item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="glass-card p-8 rounded-[32px]">
                                    <h3 className="text-xl font-bold mb-6">Budget Insights</h3>
                                    <div className="space-y-6">
                                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                                            <p className="text-sm text-blue-400 leading-relaxed">
                                                You're currently <strong>12% under budget</strong> for your Paris stay. Consider upgrading your dinner at Le Meurice!
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                                            <p className="text-sm text-yellow-400 leading-relaxed">
                                                Flight prices to Tokyo are trending up. We recommend booking within the next 48 hours.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Navigation Button */}
                <div className="fixed bottom-10 right-10 z-50">
                    <button className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-3 shadow-2xl shadow-white/20 hover:scale-105 transition-transform">
                        <Navigation className="w-6 h-6" />
                        Start Navigation
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ItineraryView;
