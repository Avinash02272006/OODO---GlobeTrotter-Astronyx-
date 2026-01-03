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
                <div className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome back, Traveler</h1>
                    <p className="text-gray-500">Where would you like to go next?</p>
                </div>

                {/* Quick Actions / Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: <Compass className="w-5 h-5 text-blue-400" />, label: "Plan New Trip", href: "/trips/create" },
                        { icon: <Clock className="w-5 h-5 text-purple-400" />, label: "Recent Itineraries", href: "/dashboard" },
                        { icon: <Star className="w-5 h-5 text-yellow-400" />, label: "Saved Places", href: "/search" },
                        { icon: <Globe className="w-5 h-5 text-green-400" />, label: "Explore Cities", href: "/search" },
                    ].map((item, i) => (
                        <Link key={i} href={item.href}>
                            <div className="glass-card p-6 rounded-2xl flex items-center space-x-4 group cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    {item.icon}
                                </div>
                                <span className="font-medium text-sm group-hover:text-white transition-colors">{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Banner Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full h-[400px] rounded-[40px] overflow-hidden mb-16 group"
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

                {/* Top Regional Selections */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold tracking-tight">Popular Destinations</h2>
                        <Link href="/search" className="text-sm text-gray-500 hover:text-white transition-colors">View all</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {[
                            { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" },
                            { name: "Tokyo", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop" },
                            { name: "London", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop" },
                            { name: "New York", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop" },
                            { name: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" },
                        ].map((city, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-4 relative">
                                    <img src={city.img} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg">{city.name}</h3>
                                <p className="text-xs text-gray-500">Explore activities</p>
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

