"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Plus, Sparkles, MoreVertical, Search, ListFilter, Filter, ArrowUpAz, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

interface Trip {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    city: string;
}

const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const padding = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchTrips();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const fetchTrips = async () => {
        try {
            const { data } = await api.get('/trips', {
                params: { search: searchQuery }
            });
            setTrips(data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDayEvents = (day: number) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return trips.filter(trip => {
            const start = new Date(trip.startDate);
            const end = new Date(trip.endDate);
            return date >= start && date <= end;
        });
    };

    const [view, setView] = useState<'month' | 'week' | 'day'>('month');

    const getWeekDays = (date: Date) => {
        const start = new Date(date);
        start.setDate(date.getDate() - date.getDay());
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d;
        });
    };

    const weekDays = getWeekDays(currentDate);

    const nextMonth = () => {
        if (view === 'month') setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        else if (view === 'week') {
            const next = new Date(currentDate);
            next.setDate(currentDate.getDate() + 7);
            setCurrentDate(next);
        } else {
            const next = new Date(currentDate);
            next.setDate(currentDate.getDate() + 1);
            setCurrentDate(next);
        }
    };

    const prevMonth = () => {
        if (view === 'month') setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        else if (view === 'week') {
            const prev = new Date(currentDate);
            prev.setDate(currentDate.getDate() - 7);
            setCurrentDate(prev);
        } else {
            const prev = new Date(currentDate);
            prev.setDate(currentDate.getDate() - 1);
            setCurrentDate(prev);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="max-w-6xl mx-auto">
                    {/* Search & Filter Bar */}
                    <div className="glass-card p-2 rounded-[24px] border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl mb-12">
                        <div className="flex flex-col lg:flex-row items-center gap-2">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search events, trips, or dates..."
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
                                <button className="flex-1 lg:flex-none px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                                    <ArrowUpAz className="w-4 h-4" />
                                    <span className="text-sm font-medium">Sort by</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div>
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
                                <Sparkles className="w-3 h-3 text-blue-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Schedule</span>
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight mb-2">Calendar View</h1>
                            <p className="text-gray-500 text-lg">Manage your upcoming trips and daily activities.</p>
                        </div>
                        <div className="flex items-center p-1.5 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
                            <button
                                onClick={() => setView('month')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'month' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setView('week')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'week' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setView('day')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'day' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
                            >
                                Day
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Calendar Grid */}
                        <div className="lg:col-span-2">
                            <div className="glass-card rounded-[40px] overflow-hidden border border-white/10">
                                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                    <h3 className="text-2xl font-bold">
                                        {view === 'month' ? (
                                            <>{monthNames[currentDate.getMonth()]} <span className="text-gray-600">{currentDate.getFullYear()}</span></>
                                        ) : view === 'week' ? (
                                            <>Week of {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                                        ) : (
                                            <>{currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</>
                                        )}
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={prevMonth}
                                            className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextMonth}
                                            className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {view === 'month' && (
                                    <>
                                        <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.01]">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                                <div key={day} className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-7">
                                            {padding.map(i => (
                                                <div key={`pad-${i}`} className="aspect-square border-r border-b border-white/5 p-4 opacity-20" />
                                            ))}
                                            {loading ? (
                                                <div className="col-span-7 h-96 flex items-center justify-center">
                                                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                                </div>
                                            ) : (
                                                days.map(day => {
                                                    const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
                                                    const dayEvents = getDayEvents(day);

                                                    return (
                                                        <div key={day} className="aspect-square border-r border-b border-white/5 p-2 group cursor-pointer hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                                                            <span className={`text-sm font-bold ${isToday ? 'text-blue-400' : 'text-gray-400'}`}>
                                                                {day}
                                                            </span>
                                                            <div className="mt-1 space-y-1">
                                                                {dayEvents.map((event, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className={`px-1.5 py-0.5 rounded text-[7px] font-bold uppercase truncate bg-blue-500/20 text-blue-400 border border-blue-500/30`}
                                                                    >
                                                                        {event.title}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </>
                                )}

                                {view === 'week' && (
                                    <div className="grid grid-cols-7 h-[500px]">
                                        {weekDays.map((date, i) => {
                                            const isToday = date.toDateString() === new Date().toDateString();
                                            const dayEvents = trips.filter(t => {
                                                const start = new Date(t.startDate);
                                                const end = new Date(t.endDate);
                                                return date >= start && date <= end;
                                            });

                                            return (
                                                <div key={i} className={`border-r border-white/5 flex flex-col ${isToday ? 'bg-blue-500/5' : ''}`}>
                                                    <div className="p-4 text-center border-b border-white/5">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}</p>
                                                        <p className={`text-lg font-bold ${isToday ? 'text-blue-400' : ''}`}>{date.getDate()}</p>
                                                    </div>
                                                    <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                                                        {dayEvents.map((event, idx) => (
                                                            <div key={idx} className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold">
                                                                {event.title}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {view === 'day' && (
                                    <div className="p-8 h-[500px] overflow-y-auto">
                                        <div className="space-y-4">
                                            {trips.filter(t => {
                                                const start = new Date(t.startDate);
                                                const end = new Date(t.endDate);
                                                return currentDate >= start && currentDate <= end;
                                            }).map((event, idx) => (
                                                <div key={idx} className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                                                            <CalendarIcon className="w-6 h-6 text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-bold">{event.title}</h4>
                                                            <p className="text-sm text-gray-500">{event.city}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold text-blue-400">Full Day</p>
                                                        <p className="text-xs text-gray-500">Trip Event</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {trips.filter(t => {
                                                const start = new Date(t.startDate);
                                                const end = new Date(t.endDate);
                                                return currentDate >= start && currentDate <= end;
                                            }).length === 0 && (
                                                    <div className="text-center py-20 text-gray-500">
                                                        No events scheduled for this day.
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Events Sidebar */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Upcoming Events</h3>
                                <button className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {trips.slice(0, 3).map((trip, i) => (
                                    <motion.div
                                        key={trip.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="glass-card p-6 rounded-3xl group cursor-pointer card-glow border border-white/5"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                                    <CalendarIcon className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm group-hover:text-blue-400 transition-colors">{trip.title}</h4>
                                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{trip.city}</p>
                                                </div>
                                            </div>
                                            <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4 text-gray-700" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                <Clock className="w-3 h-3 mr-1.5" />
                                                {new Date(trip.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                <MapPin className="w-3 h-3 mr-1.5" />
                                                {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {trips.length === 0 && !loading && (
                                    <p className="text-gray-500 text-center py-8">No upcoming trips found.</p>
                                )}
                            </div>

                            <div className="glass-card p-8 rounded-[40px] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
                                <h4 className="font-bold mb-2 flex items-center">
                                    <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                                    Smart Tip
                                </h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Plan your trips in advance to get the best deals and ensure a smooth travel experience!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CalendarView;
