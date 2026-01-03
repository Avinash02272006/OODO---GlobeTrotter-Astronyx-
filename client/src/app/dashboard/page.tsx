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
                <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 mb-12">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search journeys..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <h2 className="text-xl font-bold tracking-tight">Ongoing Trips</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {ongoingTrips.map(trip => (
                                        <TripCard key={trip.id} trip={trip} />
                                    ))}
                                </div>
                            </section>
                        )}

                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold tracking-tight">Upcoming Adventures</h2>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{upcomingTrips.length} Trips</span>
                            </div>
                            {upcomingTrips.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {upcomingTrips.map(trip => (
                                        <TripCard key={trip.id} trip={trip} />
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
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-bold tracking-tight">Past Memories</h2>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{completedTrips.length} Trips</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-60 hover:opacity-100 transition-opacity">
                                    {completedTrips.map(trip => (
                                        <TripCard key={trip.id} trip={trip} />
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
