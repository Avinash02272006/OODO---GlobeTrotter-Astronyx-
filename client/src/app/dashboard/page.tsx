'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import TripCard from '@/components/trips/TripCard';
import { Plus, Search, Filter, Loader2, ArrowUpAz, MapPin, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import Link from 'next/link';

const Dashboard = () => {
    const [trips, setTrips] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const { data } = await api.get('/trips');
                setTrips(data);
            } catch (error) {
                console.error('Failed to fetch trips:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTrips();
    }, []);

    const ongoingTrips = trips.filter(trip => {
        const now = new Date();
        return new Date(trip.startDate) <= now && new Date(trip.endDate) >= now;
    });

    const upcomingTrips = trips.filter(trip => new Date(trip.startDate) > new Date());
    const completedTrips = trips.filter(trip => new Date(trip.endDate) < new Date());

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">My Journeys</h1>
                        <p className="text-gray-500">Manage and explore your travel itineraries.</p>
                    </div>
                    <Link href="/trips/create">
                        <button className="btn-premium flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Plan New Trip
                        </button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-16">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search bar ......"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <Loader2 className="w-10 h-10 text-white/20 animate-spin" />
                        <p className="text-gray-500 font-medium">Loading your journeys...</p>
                    </div>
                ) : trips.length === 0 ? (
                    <div className="glass-card rounded-[40px] p-16 text-center max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-white/[0.03] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <MapPin className="w-10 h-10 text-gray-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">No trips planned yet</h2>
                        <p className="text-gray-500 mb-10 leading-relaxed">
                            Your travel history is empty. Start by creating your first personalized multi-city itinerary.
                        </p>
                        <Link href="/trips/create">
                            <button className="btn-premium">Create Your First Trip</button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {ongoingTrips.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold tracking-tight mb-8">Ongoing</h2>
                                <div className="space-y-6">
                                    {ongoingTrips.map(trip => (
                                        <Link key={trip.id} href={`/trips/${trip.id}`}>
                                            <div className="glass-card p-12 rounded-[32px] border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{trip.title}</h3>
                                                        <p className="text-gray-500 text-lg">Short Over View of the Trip</p>
                                                    </div>
                                                    <ChevronRight className="w-8 h-8 text-gray-700 group-hover:text-white group-hover:translate-x-2 transition-all" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section>
                            <h2 className="text-3xl font-bold tracking-tight mb-8">Up-coming</h2>
                            {upcomingTrips.length > 0 ? (
                                <div className="space-y-6">
                                    {upcomingTrips.map(trip => (
                                        <Link key={trip.id} href={`/trips/${trip.id}`}>
                                            <div className="glass-card p-12 rounded-[32px] border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{trip.title}</h3>
                                                        <p className="text-gray-500 text-lg">Short Over View of the Trip</p>
                                                    </div>
                                                    <ChevronRight className="w-8 h-8 text-gray-700 group-hover:text-white group-hover:translate-x-2 transition-all" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-card rounded-3xl p-12 text-center border-dashed">
                                    <p className="text-gray-500">No upcoming trips. Time to plan something new!</p>
                                </div>
                            )}
                        </section>

                        {completedTrips.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold tracking-tight mb-8">Completed</h2>
                                <div className="space-y-6">
                                    {completedTrips.map(trip => (
                                        <Link key={trip.id} href={`/trips/${trip.id}`}>
                                            <div className="glass-card p-12 rounded-[32px] border border-white/10 hover:border-white/20 transition-all group cursor-pointer opacity-70 hover:opacity-100">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{trip.title}</h3>
                                                        <p className="text-gray-500 text-lg">Short Over View of the Trip</p>
                                                    </div>
                                                    <ChevronRight className="w-8 h-8 text-gray-700 group-hover:text-white group-hover:translate-x-2 transition-all" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Dashboard;
