'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import TripMap from '@/components/trips/TripMap';
import ItineraryBuilder from '@/components/trips/ItineraryBuilder';
import BudgetChart from '@/components/trips/BudgetChart';
import { PieChart, Wallet, Share2, Settings, Loader2, MapPin, Compass } from 'lucide-react';
import api from '@/lib/api';

const TripDetails = ({ params }: { params: { id: string } }) => {
    const [trip, setTrip] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTrip = async () => {
        try {
            const { data } = await api.get(`/trips/${params.id}`);
            setTrip(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch trip details.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTrip();
    }, [params.id]);

    const budgetData = {
        labels: ['Accommodation', 'Food', 'Transport', 'Sightseeing'],
        values: trip?.stops?.reduce((acc: any, stop: any) => {
            stop.activities?.forEach((act: any) => {
                const cat = act.category || 'Sightseeing';
                acc[cat] = (acc[cat] || 0) + act.cost;
            });
            return acc;
        }, { Accommodation: 0, Food: 0, Transport: 0, Sightseeing: 0 })
    };

    const budgetValues = Object.values(budgetData.values);
    const budgetLabels = Object.keys(budgetData.values);

    const handleShare = () => {
        const url = `${window.location.origin}/trips/${params.id}/view`;
        navigator.clipboard.writeText(url);
        alert('Itinerary link copied to clipboard!');
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </main>
        );
    }

    if (error || !trip) {
        return (
            <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p className="text-gray-400 mb-8">{error || 'Trip not found.'}</p>
                <button onClick={() => window.location.href = '/dashboard'} className="btn-primary">
                    Back to Dashboard
                </button>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="flex flex-col lg:flex-row h-screen pt-20">
                {/* Left Sidebar: Itinerary & Stats */}
                <div className="w-full lg:w-1/3 xl:w-1/4 border-r border-white/10 overflow-y-auto p-6 scrollbar-hide">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-3xl font-bold">{trip.title}</h1>
                            <div className="flex gap-2">
                                <button onClick={handleShare} className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Share2 className="w-5 h-5" /></button>
                                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Settings className="w-5 h-5" /></button>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                                <Wallet className="w-4 h-4 text-green-400" />
                                <span>Budget: ${trip.budget}</span>
                            </div>
                            {trip.distance && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                    <span>{trip.distance} km</span>
                                </div>
                            )}
                            {trip.travelMode && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                                    <Compass className="w-4 h-4 text-purple-400" />
                                    <span>{trip.travelMode}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <ItineraryBuilder stops={trip.stops} tripId={trip.id} onUpdate={fetchTrip} />

                    {/* Budget Analytics Preview */}
                    <div className="mt-12 glass-dark p-6 rounded-3xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold">Budget Analytics</h3>
                            <PieChart className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="h-48">
                            <BudgetChart data={{ labels: budgetLabels, values: budgetValues as number[] }} />
                        </div>
                    </div>
                </div>

                {/* Main Content: Map */}
                <div className="flex-1 relative">
                    <TripMap stops={trip.stops} />

                    {/* Floating Controls */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-dark px-6 py-3 rounded-full flex items-center gap-8 z-10">
                        <button className="text-sm font-medium hover:text-blue-400 transition-colors">Route View</button>
                        <button className="text-sm font-medium hover:text-blue-400 transition-colors">Satellite</button>
                        <button className="text-sm font-medium hover:text-blue-400 transition-colors">3D View</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TripDetails;
