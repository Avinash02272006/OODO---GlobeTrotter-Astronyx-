"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import {
    Search as SearchIcon,
    Filter,
    ArrowUpAz,
    MapPin,
    Star,
    Clock,
    DollarSign,
    Sparkles,
    ChevronRight,
    Compass,
    SlidersHorizontal,
    LayoutGrid,
    ListFilter,
    Calendar,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import api from '@/lib/api';

const CATEGORIES = ['All', 'Adventure', 'Nature', 'Food', 'Water Sports', 'Culture', 'Sightseeing'];

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            try {
                const params: any = {};
                if (selectedCategory !== 'All') params.category = selectedCategory;
                if (searchQuery) params.search = searchQuery;

                const { data } = await api.get('/activities', { params });
                setActivities(data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchActivities, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery, selectedCategory]);

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                                    Explore Experiences
                                </h1>
                                <p className="text-gray-400 text-lg max-w-xl">
                                    Discover and book unique activities curated for your next global adventure.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Compass className="w-4 h-4" />
                                <span>Showing {activities.length} results in GlobalTrotter</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search & Filter Bar */}
                    <div className="sticky top-24 z-40 mb-12">
                        <div className="glass-card p-2 rounded-[24px] border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl">
                            <div className="flex flex-col lg:flex-row items-center gap-2">
                                <div className="relative flex-1 w-full">
                                    <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search activities, cities, or categories..."
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
                                        <SlidersHorizontal className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                        <span className="text-sm font-medium">Filter</span>
                                    </button>
                                    <button className="flex-1 lg:flex-none px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                                        <ArrowUpAz className="w-4 h-4" />
                                        <span className="text-sm font-medium">Sort by</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Category Filters */}
                    <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Results Section */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-blue-500" />
                                Recommended for you
                            </h2>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                                    <LayoutGrid className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-lg bg-white/10 text-white transition-colors">
                                    <Compass className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-24">
                                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {activities.map((activity, i) => (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative glass-card overflow-hidden rounded-[32px] border border-white/10 hover:border-blue-500/30 transition-all duration-500"
                                    >
                                        <div className="flex flex-col md:flex-row h-full">
                                            {/* Image Section */}
                                            <div className="relative w-full md:w-[350px] h-[250px] md:h-auto overflow-hidden">
                                                <Image
                                                    src={activity.image}
                                                    alt={activity.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                                                        {activity.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="flex-1 p-8 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-2">
                                                                <MapPin className="w-4 h-4" />
                                                                {activity.location}
                                                            </div>
                                                            <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-400 transition-colors">
                                                                {activity.title}
                                                            </h3>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                                                <Star className="w-4 h-4 fill-current" />
                                                                <span className="text-sm font-bold text-white">{activity.rating}</span>
                                                            </div>
                                                            <span className="text-xs text-gray-500">{activity.reviews} reviews</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-8">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4" />
                                                            {activity.duration || 'Flexible'}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            Daily departures
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-sm text-gray-500">From</span>
                                                        <span className="text-3xl font-bold">${activity.price}</span>
                                                        <span className="text-sm text-gray-500">/ person</span>
                                                    </div>
                                                    <button className="px-8 py-3.5 bg-white text-black rounded-2xl font-bold text-sm hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 group/btn">
                                                        View Details
                                                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {activities.length === 0 && !loading && (
                                    <div className="text-center py-24 text-gray-500">
                                        No activities found matching your criteria.
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                }
            `}</style>
        </main>
    );
};

export default SearchPage;
