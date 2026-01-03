'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Plus, Sparkles, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const padding = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Schedule</span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight mb-2">Travel Calendar</h1>
                        <p className="text-gray-500 text-lg">Manage your upcoming trips and daily activities.</p>
                    </div>
                    <div className="flex items-center p-1.5 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
                        <button className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-black shadow-xl">Month</button>
                        <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:text-white transition-all">Week</button>
                        <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:text-white transition-all">Day</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Calendar Grid */}
                    <div className="lg:col-span-2">
                        <div className="glass-card rounded-[40px] overflow-hidden">
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <h3 className="text-2xl font-bold">
                                    {monthNames[currentDate.getMonth()]} <span className="text-gray-600">{currentDate.getFullYear()}</span>
                                </h3>
                                <div className="flex items-center space-x-4">
                                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 border-b border-white/5">
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
                                {days.map(day => {
                                    const isToday = day === new Date().getDate();
                                    const hasEvent = [12, 13, 14, 15].includes(day);

                                    return (
                                        <div key={day} className="aspect-square border-r border-b border-white/5 p-4 group cursor-pointer hover:bg-white/[0.02] transition-colors relative">
                                            <span className={`text-sm font-bold ${isToday ? 'text-blue-400' : 'text-gray-400'}`}>
                                                {day}
                                            </span>
                                            {hasEvent && (
                                                <div className="absolute bottom-4 left-4 right-4 h-1.5 rounded-full bg-blue-500/40" />
                                            )}
                                            {day === 12 && (
                                                <div className="absolute inset-0 flex items-center justify-center p-2">
                                                    <div className="w-full h-full bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                                                        <span className="text-[8px] font-bold uppercase text-blue-400 hidden md:block">Paris Trip</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
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
                            {[
                                { title: 'Flight to Paris', time: '09:00 AM', date: 'Jan 12', type: 'Travel' },
                                { title: 'Hotel Check-in', time: '02:00 PM', date: 'Jan 12', type: 'Stay' },
                                { title: 'Eiffel Tower Tour', time: '10:00 AM', date: 'Jan 13', type: 'Activity' },
                            ].map((event, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 rounded-3xl group cursor-pointer card-glow"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                                <CalendarIcon className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm group-hover:text-blue-400 transition-colors">{event.title}</h4>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{event.type}</p>
                                            </div>
                                        </div>
                                        <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4 text-gray-700" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                            <Clock className="w-3 h-3 mr-1.5" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                            <MapPin className="w-3 h-3 mr-1.5" />
                                            {event.date}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="glass-card p-8 rounded-[40px] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/20">
                            <h4 className="font-bold mb-2 flex items-center">
                                <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                                Smart Tip
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                You have a 5-hour gap between your flight and check-in. We recommend visiting the <strong>Louvre Museum</strong> which is on your way!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CalendarView;
