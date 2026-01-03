'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, ArrowUpAz, Globe, Compass, Clock, Star } from 'lucide-react';
import Link from 'next/link';

const DashboardHome = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-12">
            <div className="container mx-auto px-6">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back, Traveler</h1>
                    <p className="text-gray-500">Where would you like to go next?</p>
                </div>

                {/* Banner Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full h-[450px] rounded-[40px] overflow-hidden mb-10 group"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-12 left-12 max-w-lg">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Featured Destination</span>
                        </div>
                        <h2 className="text-5xl font-bold mb-4 leading-tight">Swiss Alps <br />Winter Escape</h2>
                        <p className="text-gray-300 mb-8 leading-relaxed">Experience the magic of the Alps with our curated 7-day winter itinerary. Perfect for adventure seekers and luxury travelers.</p>
                        <Link href="/trips/create">
                            <button className="btn-premium">Explore Itinerary</button>
                        </Link>
                    </div>
                </motion.div>

                {/* Search & Filter Row */}
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-16">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search bar ......"
                            className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-colors text-sm"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <button className="flex-1 lg:flex-none px-8 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                            Group by
                        </button>
                        <button className="flex-1 lg:flex-none px-8 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                            Filter
                        </button>
                        <button className="flex-1 lg:flex-none px-8 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                            Sort by...
                        </button>
                    </div>
                </div>

                {/* Top Regional Selections */}
                <section className="mb-20">
                    <div className="flex items-center gap-6 mb-10">
                        <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">Top Regional Selections</h2>
                        <div className="h-[1px] w-full bg-white/10" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {[
                            { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" },
                            { name: "Tokyo", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop" },
                            { name: "London", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop" },
                            { name: "New York", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop" },
                            { name: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" },
                        ].map((city, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-square rounded-3xl overflow-hidden mb-4 relative">
                                    <img src={city.img} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg">{city.name}</h3>
                                <p className="text-xs text-gray-500">Explore activities</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Previous Trips */}
                <section className="mb-20">
                    <div className="flex items-center gap-6 mb-10">
                        <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">Previous Trips</h2>
                        <div className="h-[1px] w-full bg-white/10" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Summer in Amalfi", date: "Aug 2025", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop" },
                            { name: "Kyoto Cherry Blossoms", date: "Apr 2025", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" },
                            { name: "Iceland Road Trip", date: "Jan 2025", img: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=2059&auto=format&fit=crop" },
                        ].map((trip, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-[3/4] rounded-[32px] overflow-hidden mb-6 relative">
                                    <img src={trip.img} alt={trip.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6">
                                        <p className="text-xs font-medium text-white/60 mb-1">{trip.date}</p>
                                        <h3 className="font-bold text-xl">{trip.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Plan a Trip Floating Button */}
                <div className="fixed bottom-10 right-10 z-50">
                    <Link href="/trips/create">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-3 shadow-2xl shadow-white/20"
                        >
                            <Plus className="w-6 h-6" />
                            Plan a trip
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;

