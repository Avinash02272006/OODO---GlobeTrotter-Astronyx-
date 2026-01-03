'use client';

import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import {
    MapPin,
    Search,
    Navigation,
    Plus,
    GripVertical,
    Trash2,
    ArrowLeft,
    Save,
    Sparkles,
    Info,
    ChevronRight,
    DollarSign,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

const TripItineraryEditor = () => {
    const { id } = useParams();
    const router = useRouter();
    const [trip, setTrip] = useState<any>(null);
    const [stops, setStops] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const { data } = await api.get(`/trips/${id}`);
                setTrip(data);
                setStops(data.stops || [
                    { id: '1', city: 'Paris', country: 'France', duration: '3 days' },
                    { id: '2', city: 'London', country: 'UK', duration: '2 days' },
                    { id: '3', city: 'Amsterdam', country: 'Netherlands', duration: '2 days' },
                ]);
            } catch (error) {
                console.error('Failed to fetch trip:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTrip();
    }, [id]);

    const handleSave = async () => {
        try {
            await api.put(`/trips/${id}`, { ...trip, stops });
            router.push(`/trips/${id}/view`);
        } catch (error) {
            console.error('Failed to save itinerary:', error);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin" />
        </div>
    );

    return (
        <main className="h-screen bg-black text-white overflow-hidden flex flex-col">
            <Navbar />

            <div className="flex-1 flex pt-20">
                {/* Sidebar - Planning Area */}
                <div className="w-full md:w-[450px] bg-black border-r border-white/10 flex flex-col z-20">
                    <div className="p-8 border-b border-white/10">
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div className="flex items-center space-x-3">
                                <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500">
                                    <Info className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="btn-premium py-2 px-6 text-sm flex items-center"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Trip
                                </button>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight mb-2">{trip?.title}</h1>
                        <p className="text-gray-500 text-sm mb-8">Drag to reorder stops and optimize your route.</p>

                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Add a city or place..."
                                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                        <Reorder.Group axis="y" values={stops} onReorder={setStops} className="space-y-4">
                            {stops.map((stop, index) => (
                                <Reorder.Item
                                    key={stop.id}
                                    value={stop}
                                    className="group"
                                >
                                    <div className="glass-card p-5 rounded-3xl flex items-center space-x-4 cursor-grab active:cursor-grabbing hover:border-white/20 transition-all">
                                        <div className="text-gray-600 group-hover:text-gray-400 transition-colors">
                                            <GripVertical className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold">{stop.city}</h3>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stop.duration}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{stop.country}</p>
                                        </div>
                                        <button className="p-2 text-gray-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {index < stops.length - 1 && (
                                        <div className="flex flex-col items-center py-2 space-y-1">
                                            <div className="w-[1px] h-4 bg-white/10" />
                                            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.05]">
                                                <Navigation className="w-3 h-3 text-blue-400" />
                                                <span className="text-[10px] font-bold text-gray-600">2h 45m • $85</span>
                                            </div>
                                            <div className="w-[1px] h-4 bg-white/10" />
                                        </div>
                                    )}
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>

                        <button className="w-full py-6 border border-white/5 border-dashed rounded-[32px] flex flex-col items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.02] transition-all group">
                            <Plus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Add another stop</span>
                        </button>
                    </div>

                    <div className="p-8 bg-white/[0.02] border-t border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Route Insights</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                                <div className="flex items-center text-gray-500 mb-1">
                                    <DollarSign className="w-3 h-3 mr-1" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Est. Cost</span>
                                </div>
                                <div className="text-lg font-bold">$1,420</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                                <div className="flex items-center text-gray-500 mb-1">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Travel Time</span>
                                </div>
                                <div className="text-lg font-bold">8h 15m</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-1 relative bg-[#0a0a0c]">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale contrast-125" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />

                    {/* Map Overlay UI */}
                    <div className="absolute top-8 right-8 flex flex-col space-y-4">
                        <div className="p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col space-y-2">
                            <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">+</button>
                            <div className="h-[1px] bg-white/10 mx-2" />
                            <button className="p-3 hover:bg-white/10 rounded-xl transition-colors">-</button>
                        </div>
                        <button className="p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                            <Navigation className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Animated Route Line Placeholder */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.path
                            d="M 200 300 Q 400 100 600 400 T 900 200"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeDasharray="8 8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.3 }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </svg>
                </div>
            </div>
        </main>
    );
};

export default TripItineraryEditor;
