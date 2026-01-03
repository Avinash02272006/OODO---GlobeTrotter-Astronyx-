'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Search as SearchIcon, Filter, ArrowUpAz, MapPin, Star, Clock, DollarSign, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchPage = () => {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
                            <Compass className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Discover the World</span>
                        </div>
                        <h1 className="text-6xl font-bold tracking-tight mb-8">Where to next?</h1>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                            <div className="relative glass-card p-2 rounded-[32px] flex items-center">
                                <SearchIcon className="w-6 h-6 text-gray-500 ml-6" />
                                <input
                                    type="text"
                                    placeholder="Search cities, experiences, or itineraries..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-6 text-xl font-medium placeholder:text-gray-700"
                                />
                                <button className="btn-premium py-4 px-10 mr-2">Search</button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Popular:</span>
                            {['Paris', 'Tokyo', 'Swiss Alps', 'Bali', 'New York'].map((tag) => (
                                <button key={tag} className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/10 transition-colors">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Filters Sidebar */}
                    <div className="space-y-12">
                        <div className="glass-card p-8 rounded-[40px]">
                            <h3 className="text-xl font-bold mb-8">Filters</h3>

                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 block">Destination Type</label>
                                    <div className="space-y-3">
                                        {['City Break', 'Nature & Outdoors', 'Beach & Coastal', 'Cultural Heritage'].map((type) => (
                                            <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                                                <div className="w-5 h-5 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                                                    <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                                                </div>
                                                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 block">Budget Range</label>
                                    <div className="h-1.5 w-full bg-white/[0.03] rounded-full relative">
                                        <div className="absolute inset-y-0 left-0 w-2/3 bg-blue-500 rounded-full" />
                                        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl" />
                                    </div>
                                    <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-500">
                                        <span>$0</span>
                                        <span>$10,000+</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 block">Duration</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['1-3 Days', '4-7 Days', '8-14 Days', '14+ Days'].map((d) => (
                                            <button key={d} className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[10px] font-bold hover:bg-white/10 transition-colors">
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[40px] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/20">
                            <Sparkles className="w-6 h-6 text-blue-400 mb-4" />
                            <h4 className="font-bold mb-2">AI Recommendations</h4>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                Based on your previous trips to Europe, you might enjoy exploring <strong>Prague</strong> or <strong>Vienna</strong>.
                            </p>
                            <button className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center hover:text-blue-300 transition-colors">
                                View Suggestions <ChevronRight className="w-3 h-3 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Search Results */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold tracking-tight">84 results found</h2>
                            <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-white transition-colors">
                                <ArrowUpAz className="w-4 h-4" />
                                <span>Sort by: Recommended</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { name: 'Swiss Alps Adventure', location: 'Switzerland', rating: '4.9', price: '$2,400', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1' },
                                { name: 'Tokyo Neon Nights', location: 'Japan', rating: '4.8', price: '$3,200', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf' },
                                { name: 'Parisian Romance', location: 'France', rating: '4.7', price: '$1,800', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
                                { name: 'Bali Zen Retreat', location: 'Indonesia', rating: '4.9', price: '$1,500', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-card rounded-[40px] overflow-hidden group cursor-pointer card-glow"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <img src={`${item.img}?q=80&w=800&auto=format&fit=crop`} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-6 right-6">
                                            <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                <span className="text-[10px] font-bold">{item.rating}</span>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-6 left-6">
                                            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                                <MapPin className="w-3 h-3 text-blue-400" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{item.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">{item.name}</h3>
                                            <div className="text-xl font-bold">{item.price}</div>
                                        </div>
                                        <div className="flex items-center space-x-6 text-gray-500 text-xs">
                                            <div className="flex items-center">
                                                <Clock className="w-3.5 h-3.5 mr-1.5" />
                                                7 Days
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="w-3.5 h-3.5 mr-1.5" />
                                                Mid-range
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SearchPage;
