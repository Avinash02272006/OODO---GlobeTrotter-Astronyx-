'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Search, Filter, ArrowUpAz, MessageSquare, Heart, Share2, User, MapPin, Star, Sparkles, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Community = () => {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">GlobeTrotter Social</span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight mb-2">Travel Community</h1>
                        <p className="text-gray-500 text-lg">Discover itineraries, tips, and stories from fellow travelers.</p>
                    </div>
                    <button className="btn-premium">Share Your Journey</button>
                </div>

                {/* Search and Filters Bar */}
                <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 mb-16">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search itineraries, destinations, or travelers..."
                            className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl focus:outline-none focus:border-white/20 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="flex-1 md:flex-none px-6 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-sm font-medium">
                            <ArrowUpAz className="w-4 h-4" /> Sort
                        </button>
                    </div>
                </div>

                {/* Community Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Feed */}
                    <div className="lg:col-span-2 space-y-12">
                        {[1, 2, 3].map((post) => (
                            <motion.div
                                key={post}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="glass-card rounded-[40px] overflow-hidden group"
                            >
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                                <User className="w-6 h-6 text-gray-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">Alex Thompson</h4>
                                                <p className="text-xs text-gray-500">2 hours ago • Explorer</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/10 transition-colors">
                                            Follow
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                                        10 Days in Northern Italy: A Slow Travel Guide
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-8">
                                        Just returned from an incredible journey through Lake Como, Verona, and the Dolomites.
                                        If you're looking for a mix of luxury and nature, this is the perfect route...
                                    </p>

                                    <div className="aspect-video rounded-[32px] overflow-hidden mb-8 relative">
                                        <img
                                            src={`https://images.unsplash.com/photo-${post === 1 ? '1523906834658-6e24ef2386f9' : post === 2 ? '1516483638261-f4dbaf036963' : '1506744038136-46273834b3fb'}?q=80&w=2070&auto=format&fit=crop`}
                                            alt="Destination"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute bottom-6 left-6">
                                            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                                <MapPin className="w-3 h-3 text-blue-400" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Dolomites, Italy</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                        <div className="flex items-center space-x-8">
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-400 transition-colors">
                                                <Heart className="w-5 h-5" />
                                                <span className="text-sm font-medium">1.2k</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 transition-colors">
                                                <MessageSquare className="w-5 h-5" />
                                                <span className="text-sm font-medium">84</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors">
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm font-bold">4.9</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                        {/* Trending Destinations */}
                        <div className="glass-card p-8 rounded-[40px]">
                            <h3 className="text-xl font-bold mb-8">Trending Now</h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'Kyoto, Japan', posts: '2.4k posts', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e' },
                                    { name: 'Santorini, Greece', posts: '1.8k posts', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff' },
                                    { name: 'Bali, Indonesia', posts: '1.5k posts', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-4 group cursor-pointer">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden">
                                            <img src={`${item.img}?q=80&w=200&auto=format&fit=crop`} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm group-hover:text-blue-400 transition-colors">{item.name}</h4>
                                            <p className="text-xs text-gray-500">{item.posts}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Contributors */}
                        <div className="glass-card p-8 rounded-[40px]">
                            <h3 className="text-xl font-bold mb-8">Top Contributors</h3>
                            <div className="space-y-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                                <User className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">User_{i}</h4>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Level {10 - i}</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Community;
