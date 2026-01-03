'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Calendar, MapPin, ArrowRight, Camera, Sparkles, X, Map as MapIcon, DollarSign, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/trips/LeafletMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-white/[0.03] animate-pulse rounded-2xl" />
});

const mapStyles = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#000000" }]
    }
];


const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ["places"];

const CreateTrip = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialLocation = searchParams.get('location') || '';
    // Removed Google Maps loader

    const [formData, setFormData] = useState({
        title: '',
        location: initialLocation,
        startDate: '',
        endDate: '',
        description: '',
        budget: 0,
        currency: 'USD'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 });
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState(initialLocation);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialLocation) {
            handleSearch(initialLocation);
        }
    }, [initialLocation]);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        setFormData({ ...formData, location: query });

        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
            const data = await response.json();
            setSuggestions(data);

            // If we have a direct match or first suggestion, update map
            if (data.length > 0 && query === initialLocation) {
                const first = data[0];
                setMapCenter({ lat: parseFloat(first.lat), lng: parseFloat(first.lon) });
                setMarkerPosition({ lat: parseFloat(first.lat), lng: parseFloat(first.lon) });
            }
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const selectLocation = (place: any) => {
        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);
        setFormData({ ...formData, location: place.display_name });
        setSearchQuery(place.display_name);
        setMapCenter({ lat, lng: lon });
        setMarkerPosition({ lat, lng: lon });
        setSuggestions([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            console.log('Submitting trip:', formData);
            const { data } = await api.post('/trips', {
                ...formData,
                budget: Number(formData.budget)
            });
            router.push(`/trips/${data.id}`);
        } catch (err: any) {
            console.error('Failed to create trip:', err);
            setError(err.response?.data?.message || 'Failed to create trip. Please check your inputs.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white/20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-24">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-6 mb-12">
                            <h1 className="text-4xl font-bold tracking-tight whitespace-nowrap">Plan a new journey</h1>
                            <div className="h-[1px] w-full bg-white/10" />
                        </div>
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400"
                            >
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p className="text-sm">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8 mb-24">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300">Trip Title :</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Summer in the Swiss Alps"
                                    className="flex-1 px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300">Select a Place :</label>
                                <div className="flex-1 flex gap-3">
                                    <div className="flex-1 relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Where are you going?"
                                            className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all"
                                            value={formData.location}
                                            onChange={(e) => handleSearch(e.target.value)}
                                        />
                                        {formData.location && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData({ ...formData, location: '' });
                                                    setSuggestions([]);
                                                }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-all text-gray-500 hover:text-white"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}

                                        {/* Suggestions Dropdown */}
                                        <AnimatePresence>
                                            {(suggestions.length > 0 || isSearching) && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute left-0 right-0 top-full mt-2 bg-[#121212] border border-white/10 rounded-2xl overflow-hidden z-[100] shadow-2xl"
                                                >
                                                    {isSearching ? (
                                                        <div className="px-6 py-8 text-center">
                                                            <div className="w-6 h-6 border-2 border-white/10 border-t-white/50 rounded-full animate-spin mx-auto mb-2" />
                                                            <p className="text-xs text-gray-500">Searching places...</p>
                                                        </div>
                                                    ) : (
                                                        suggestions.map((place, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => selectLocation(place)}
                                                                className="w-full px-6 py-4 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-none flex items-start gap-3 group"
                                                            >
                                                                <MapPin className="w-4 h-4 mt-1 text-gray-500 group-hover:text-white transition-colors shrink-0" />
                                                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors line-clamp-2">{place.display_name}</span>
                                                            </button>
                                                        ))
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowMap(true)}
                                            className="px-6 py-4 rounded-2xl border bg-white/[0.03] border-white/[0.08] text-gray-400 hover:border-white/20 hover:bg-white/[0.05] transition-all flex items-center gap-2 whitespace-nowrap group"
                                        >
                                            <MapIcon className="w-5 h-5 group-hover:text-white transition-colors" />
                                            <span className="hidden sm:inline group-hover:text-white transition-colors">View in Map</span>
                                        </button>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center">Free & Open</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Modal Overlay */}
                            <AnimatePresence>
                                {showMap && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            className="relative w-full max-w-5xl h-[80vh] bg-[#121212] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl flex flex-col"
                                        >
                                            {/* Modal Header */}
                                            <div className="p-6 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/5 z-10">
                                                <div>
                                                    <h3 className="text-xl font-bold">{formData.location || 'Location Preview'}</h3>
                                                    <p className="text-sm text-gray-400">Interactive Map</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowMap(false)}
                                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10"
                                                >
                                                    <X className="w-6 h-6" />
                                                </button>
                                            </div>

                                            <div className="flex-1 relative w-full h-full">
                                                <LeafletMap center={mapCenter} markerPosition={markerPosition} />
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300 pt-4">Description :</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us more about your dream journey..."
                                    className="flex-1 px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300">Budget ($) :</label>
                                <div className="flex-1 relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="number"
                                        placeholder="Estimated budget"
                                        className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300">Start Date :</label>
                                <div className="flex-1 relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="date"
                                        required
                                        className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <label className="w-full md:w-48 text-lg font-medium text-gray-300">End Date :</label>
                                <div className="flex-1 relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="date"
                                        required
                                        className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-premium px-12 py-4 rounded-2xl flex items-center gap-3"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Journey'}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {/* Suggestions Section */}
                    <section>
                        <div className="flex items-center gap-6 mb-12">
                            <h2 className="text-2xl font-bold tracking-tight whitespace-nowrap">Suggestion for Places to Visit/Activities to perform</h2>
                            <div className="h-[1px] w-full bg-white/10" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Eiffel Tower", category: "Landmark", img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1974&auto=format&fit=crop" },
                                { name: "Louvre Museum", category: "Culture", img: "https://images.unsplash.com/photo-1597910034998-247214af4428?q=80&w=2070&auto=format&fit=crop" },
                                { name: "Seine River Cruise", category: "Activity", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" },
                                { name: "Montmartre", category: "District", img: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=1974&auto=format&fit=crop" },
                                { name: "Arc de Triomphe", category: "Landmark", img: "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=1974&auto=format&fit=crop" },
                                { name: "Palace of Versailles", category: "History", img: "https://images.unsplash.com/photo-1585155967349-90c1b1dc568e?q=80&w=2072&auto=format&fit=crop" },
                            ].map((item, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="aspect-square rounded-[32px] overflow-hidden mb-4 relative">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-xs text-gray-500">Popular choice</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default CreateTrip;
